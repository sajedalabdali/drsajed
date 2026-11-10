#!/usr/bin/env node
// Motion Library — HTML → transparent video/still renderer (from The Smart Editor by @saoudalajme).
// Drives the locally installed Chrome over the DevTools pipe (no npm packages).
// Chrome does the Arabic shaping (HarfBuzz) and RTL layout, so text is always joined correctly.
//
//   node sep_render.mjs --html templates/motion-layer.html --data graphics.json \
//        --out graphics.mov --width 1080 --height 1920 --fps 30 --duration 42.5
//   node sep_render.mjs --html templates/thumbnail.html --data thumb.json --out thumb.png \
//        --width 1280 --height 720 --still 0
//
// Template contract: page reads window.SEP_DATA, exposes SEP_seek(t) -> {empty:boolean}
// and optionally SEP_ready() (Promise) and SEP_info() (diagnostics, e.g. font availability).
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const A = {};
for (let i = 2; i < process.argv.length; i++) {
  const k = process.argv[i];
  if (k.startsWith('--')) {
    const v = process.argv[i + 1];
    if (v === undefined || v.startsWith('--')) A[k.slice(2)] = true; else { A[k.slice(2)] = v; i++; }
  }
}
const die = (m) => { console.error('[sep-render] ERROR:', m); process.exit(1); };
if ((!A.html && !A.url) || (!A.out && !A['info-only'])) die('usage: --html file|--url https://… --out file.mov|file.png [--data json] --width W --height H [--fps 30 --duration S | --still T]');
const W = parseInt(A.width || 1080), H = parseInt(A.height || 1920), FPS = parseFloat(A.fps || 30);
const START = parseFloat(A.start || 0);
const data = A.data ? JSON.parse(fs.readFileSync(A.data, 'utf8')) : {};
data.width ??= W; data.height ??= H; data.fps ??= FPS;
if (A.data) data.__base = path.dirname(path.resolve(A.data));

const CHROMES = [process.env.SEP_CHROME,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
  '/usr/bin/google-chrome', '/usr/bin/chromium',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  process.env.LOCALAPPDATA && path.join(process.env.LOCALAPPDATA, 'Google', 'Chrome', 'Application', 'chrome.exe')].filter(Boolean);
const chrome = CHROMES.find((p) => fs.existsSync(p));
if (!chrome) die('no Chrome/Chromium/Edge found (set SEP_CHROME)');

class CDP {
  constructor(proc) {
    this.seq = 0; this.pending = new Map(); this.waiters = [];
    this.out = proc.stdio[3];
    let buf = Buffer.alloc(0);
    proc.stdio[4].on('data', (chunk) => {
      buf = Buffer.concat([buf, chunk]);
      let i;
      while ((i = buf.indexOf(0)) >= 0) {
        const msg = JSON.parse(buf.subarray(0, i).toString('utf8'));
        buf = buf.subarray(i + 1);
        this.dispatch(msg);
      }
    });
  }
  dispatch(msg) {
    if (msg.id && this.pending.has(msg.id)) {
      const { res, rej, method } = this.pending.get(msg.id);
      this.pending.delete(msg.id);
      msg.error ? rej(new Error(method + ': ' + msg.error.message)) : res(msg.result);
    } else if (msg.method) {
      this.waiters = this.waiters.filter((w) => !(w.method === msg.method && (w.res(msg.params), true)));
    }
  }
  send(method, params = {}, sessionId) {
    const id = ++this.seq;
    const msg = { id, method, params };
    if (sessionId) msg.sessionId = sessionId;
    return new Promise((res, rej) => {
      this.pending.set(id, { res, rej, method });
      this.out.write(JSON.stringify(msg) + '\0');
    });
  }
  once(method) { return new Promise((res) => this.waiters.push({ method, res })); }
}

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'sep-chrome-'));
const proc = spawn(chrome, ['--headless=new', '--remote-debugging-pipe', '--no-first-run', '--no-default-browser-check',
  '--disable-gpu', '--hide-scrollbars', '--mute-audio', '--force-device-scale-factor=1', '--font-render-hinting=none',
  '--allow-file-access-from-files', '--disable-background-timer-throttling', '--disable-renderer-backgrounding',
  '--disable-extensions', `--user-data-dir=${tmp}`, 'about:blank'], { stdio: ['ignore', 'ignore', 'pipe', 'pipe', 'pipe'] });
let chromeErr = '';
proc.stdio[2].on('data', (d) => { chromeErr += d; if (chromeErr.length > 20000) chromeErr = chromeErr.slice(-10000); });
const cleanup = () => { try { proc.kill('SIGKILL'); } catch {} try { fs.rmSync(tmp, { recursive: true, force: true }); } catch {} };
process.on('exit', cleanup);

const cdp = new CDP(proc);
const t0 = Date.now();
try {
  const { targetId } = await cdp.send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await cdp.send('Target.attachToTarget', { targetId, flatten: true });
  const s = (m, p) => cdp.send(m, p, sessionId);
  await s('Page.enable'); await s('Runtime.enable');
  await s('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: parseFloat(A.dpr || 1), mobile: false });
  await s('Emulation.setDefaultBackgroundColorOverride', { color: { r: 0, g: 0, b: 0, a: 0 } });
  await s('Page.addScriptToEvaluateOnNewDocument', { source: `window.SEP_DATA = ${JSON.stringify(data)};` });
  const loaded = cdp.once('Page.loadEventFired');
  await s('Page.navigate', { url: A.url ? A.url : pathToFileURL(path.resolve(A.html)).href });
  await loaded;
  if (A.url) {   // evidence mode: screenshot a remote page (e.g. a licence page) — no template contract
    await new Promise((r) => setTimeout(r, parseInt(A.wait || 2500)));
    const shotU = Buffer.from((await s('Page.captureScreenshot', { format: 'png', fromSurface: true })).data, 'base64');
    fs.writeFileSync(A.out, shotU);
    console.error(`[sep-render] page → ${A.out}`);
    await cdp.send('Browser.close').catch(() => {});
    cleanup();
    process.exit(0);
  }
  const evalJS = async (expression, awaitPromise = false) => {
    const r = await s('Runtime.evaluate', { expression, awaitPromise, returnByValue: true });
    if (r.exceptionDetails) throw new Error('page error: ' + (r.exceptionDetails.exception?.description || r.exceptionDetails.text));
    return r.result.value;
  };
  if (!(await evalJS('typeof window.SEP_seek === "function"'))) die('template does not define SEP_seek(t)');
  await evalJS('(window.SEP_ready ? window.SEP_ready() : document.fonts.ready).then(() => true)', true);
  const info = await evalJS('window.SEP_info ? window.SEP_info() : {}');
  if (info && Object.keys(info).length) { const { events, fit, ...brief } = info; console.error('[sep-render] info', JSON.stringify(Object.assign(brief, { events: (events || []).length, fit: (fit || []).length }))); }
  if (A.info) fs.writeFileSync(A.info, JSON.stringify(info, null, 2));
  if (A['info-only']) {   // v4: events + text-fit + fonts without rendering a frame (the sound designer runs on this)
    await cdp.send('Browser.close').catch(() => {});
    cleanup();
    process.exit(0);
  }
  const shot = async () => Buffer.from((await s('Page.captureScreenshot', { format: 'png', fromSurface: true })).data, 'base64');

  if (A.still !== undefined) {
    await evalJS(`SEP_seek(${parseFloat(A.still === true ? 0 : A.still)})`, true);
    fs.writeFileSync(A.out, await shot());
    console.error(`[sep-render] still → ${A.out} (${Date.now() - t0} ms)`);
  } else {
    const dur = parseFloat(A.duration || data.duration || 0);
    if (!(dur > 0)) die('--duration required');
    const N = Math.round(dur * FPS);
    // motion blur (v3): true temporal supersampling — SUB sub-frames across a shutter of SHUT frames, averaged premultiplied
    const SUB = Math.max(1, parseInt(A.mblur || 1)), SHUT = Math.min(1, Math.max(0.05, parseFloat(A.shutter || 0.5)));
    // v4: motion blur is a second pass over a lossless sub-frame intermediate (a single long piped tmix/select pass was
    // observed to drop frames on full-length renders with ffmpeg 9); the result's frame count is verified below.
    const mid = SUB > 1 ? A.out.replace(/(\.[a-z0-9]+)$/i, '.subframes$1') : A.out;
    const ff = spawn('ffmpeg', ['-v', 'error', '-y', '-f', 'image2pipe', '-framerate', String(FPS * SUB), '-c:v', 'png', '-i', '-',
      '-c:v', 'png', '-pix_fmt', 'rgba', mid], { stdio: ['pipe', 'inherit', 'inherit'] });
    const ffDone = new Promise((res) => ff.on('close', res));
    const write = (b) => new Promise((res) => (ff.stdin.write(b) ? res() : ff.stdin.once('drain', res)));
    let blank = null, empties = 0;
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < SUB; j++) {
        const t = START + i / FPS - (SUB > 1 ? SHUT / FPS * (SUB - 1 - j) / (SUB - 1) : 0);
        const r = await evalJS(`SEP_seek(${Math.max(START, t).toFixed(5)})`, true);
        if (r && r.empty) {
          if (!blank) blank = await shot();
          await write(blank); empties++;
        } else {
          await write(await shot());
        }
      }
      if (i % 30 === 0) console.error(`[sep-render] frame ${i}/${N}`);
    }
    ff.stdin.end();
    const code = await ffDone;
    if (code !== 0) die('ffmpeg muxing failed');
    const { spawnSync } = await import('node:child_process');
    const count = (f) => parseInt((spawnSync('ffprobe', ['-v', 'error', '-count_packets', '-select_streams', 'v:0', '-show_entries', 'stream=nb_read_packets', '-of', 'csv=p=0', f]).stdout || '0').toString().trim() || '0');
    if (SUB > 1) {
      const r = spawnSync('ffmpeg', ['-v', 'error', '-y', '-i', mid, '-vf',
        `format=gbrap,premultiply=inplace=1,tmix=frames=${SUB},unpremultiply=inplace=1,select='eq(mod(n\\,${SUB})\\,${SUB - 1})',setpts=N/(${FPS}*TB),format=rgba`,
        '-r', String(FPS), '-c:v', 'png', '-pix_fmt', 'rgba', A.out], { stdio: ['ignore', 'inherit', 'inherit'] });
      if (r.status !== 0) die('motion-blur pass failed');
      const nIn = count(mid);
      if (nIn !== N * SUB) die(`sub-frame intermediate has ${nIn} frames, expected ${N * SUB}`);
      fs.rmSync(mid, { force: true });
    }
    const nOut = count(A.out);
    if (nOut !== N) die(`rendered ${nOut} frames, expected ${N} — refusing a short/fast graphics layer`);
    console.error(`[sep-render] ${N} frames${SUB > 1 ? ' x' + SUB + ' motion-blur sub-frames' : ''} (${empties} empty) → ${A.out} in ${((Date.now() - t0) / 1000).toFixed(1)} s`);
  }
  await cdp.send('Browser.close').catch(() => {});
} catch (e) {
  console.error(chromeErr.slice(-2000));
  die(e.message);
}
cleanup();
process.exit(0);
