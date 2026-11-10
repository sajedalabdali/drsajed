#!/usr/bin/env node
// Motion Library — one command: template + text -> ready animation file (or straight onto your video).
//
//   node tools/make.mjs 01-title-rise '{"line1":"جهزت لكم","line2":"*مكتبة* كاملة"}'
//   node tools/make.mjs 04-number-counter examples/04-number-counter.json --format webm
//   node tools/make.mjs 01-title-rise data.json --video my.mp4 --at 2.5 --out my_with_title.mp4
//
// Formats: prores (default, .mov with transparency — Premiere / Final Cut / DaVinci / CapCut desktop)
//          webm   (VP9 with transparency — web, After Effects plugins, some mobile editors)
//          png    (PNG-in-MOV with transparency, lossless, big)
//          preview(MP4 on a dark background — to look at it / send it on WhatsApp)
// --video in.mp4 --at S : burns the animation onto your video starting at S seconds (MP4 output, keeps your audio).
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const die = (m) => { console.error('[motion-library] ' + m); process.exit(1); };
const args = process.argv.slice(2);
const pos = [], A = {};
for (let i = 0; i < args.length; i++) {
  if (args[i].startsWith('--')) { const v = args[i + 1]; if (v === undefined || v.startsWith('--')) A[args[i].slice(2)] = true; else { A[args[i].slice(2)] = v; i++; } }
  else pos.push(args[i]);
}
if (!pos[0] || A.help) die('usage: node tools/make.mjs <template-id> [data.json | \'{json}\'] [--out file] [--format prores|webm|png|preview] [--duration S] [--video in.mp4 --at S] [--mblur 3]\n  templates: ' + fs.readdirSync(path.join(ROOT, 'templates')).filter((f) => /^\d\d-.*\.html$/.test(f)).map((f) => f.slice(0, -5)).join(', '));
for (const tool of ['ffmpeg', 'ffprobe']) if (spawnSync(tool, ['-version']).status !== 0) die(`${tool} not found — install it first (mac: brew install ffmpeg · windows: winget install ffmpeg)`);

// template
const tplFile = fs.readdirSync(path.join(ROOT, 'templates')).find((f) => f === pos[0] + '.html' || (f.startsWith(pos[0]) && f.endsWith('.html')));
if (!tplFile) die('template not found: ' + pos[0]);
const id = tplFile.slice(0, -5);
const index = JSON.parse(fs.readFileSync(path.join(ROOT, 'templates', 'index.js'), 'utf8').replace(/^window\.TEMPLATES\s*=\s*/, '').replace(/;\s*$/, ''));
const meta = index.find((t) => t.id === id) || {};

// data
let data = {};
if (pos[1]) data = pos[1].trim().startsWith('{') ? JSON.parse(pos[1]) : JSON.parse(fs.readFileSync(pos[1], 'utf8'));
let dur = parseFloat(A.duration || data.duration || 0);
if (!dur && Array.isArray(data.words) && data.words.length) dur = data.words[data.words.length - 1].end + 0.3;
if (!dur && id.startsWith('05-') && Array.isArray(data.items)) dur = 0.45 + data.items.length * (data.gap || 0.45) + 1.6;
if (!dur && id.startsWith('07-') && Array.isArray(data.messages)) dur = 0.1 + data.messages.length * (data.gap || 0.8) + 1.4;
if (!dur) dur = meta.duration || 3;
data.duration = dur;

const fmt = A.video ? 'overlay' : (A.format || 'prores');
const ext = { prores: '.mov', png: '.mov', webm: '.webm', preview: '.mp4', overlay: '.mp4' }[fmt];
if (!ext) die('unknown --format ' + fmt);
const out = path.resolve(A.out || path.join(ROOT, 'output', `${id}-${Date.now().toString(36)}${ext}`));
fs.mkdirSync(path.dirname(out), { recursive: true });

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'motionlib-'));
const dataFile = path.join(tmp, 'data.json');
fs.writeFileSync(dataFile, JSON.stringify(data));
const raw = path.join(tmp, 'raw.mov');
const fps = A.fps || 30;
console.error(`[motion-library] rendering ${id} (${dur.toFixed(2)} s) …`);
const r = spawnSync(process.execPath, [path.join(ROOT, 'tools', 'render.mjs'), '--html', path.join(ROOT, 'templates', tplFile), '--data', dataFile,
  '--out', raw, '--width', '1080', '--height', '1920', '--fps', String(fps), '--duration', String(dur), '--mblur', String(A.mblur || 3)], { stdio: 'inherit' });
if (r.status !== 0) die('render failed');

const ff = (a) => { const x = spawnSync('ffmpeg', ['-v', 'error', '-y', ...a], { stdio: 'inherit' }); if (x.status !== 0) die('ffmpeg failed'); };
if (fmt === 'png') fs.copyFileSync(raw, out);
else if (fmt === 'prores') ff(['-i', raw, '-c:v', 'prores_ks', '-profile:v', '4444', '-pix_fmt', 'yuva444p10le', '-vendor', 'apl0', out]);
else if (fmt === 'webm') ff(['-i', raw, '-c:v', 'libvpx-vp9', '-pix_fmt', 'yuva420p', '-b:v', '0', '-crf', '28', '-auto-alt-ref', '0', out]);
else if (fmt === 'preview') ff(['-f', 'lavfi', '-i', `color=c=0x141110:s=1080x1920:r=${fps}:d=${dur}`, '-i', raw, '-filter_complex', '[0:v][1:v]overlay=format=auto,format=yuv420p', '-c:v', 'libx264', '-crf', '18', '-movflags', '+faststart', out]);
else {
  const at = parseFloat(A.at || 0);
  ff(['-i', A.video, '-itsoffset', String(at), '-i', raw, '-filter_complex',
    `[0:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,setsar=1[b];[b][1:v]overlay=format=auto:eof_action=pass,format=yuv420p[v]`,
    '-map', '[v]', '-map', '0:a?', '-c:v', 'libx264', '-crf', '17', '-preset', 'medium', '-c:a', 'copy', '-movflags', '+faststart', out]);
}
fs.rmSync(tmp, { recursive: true, force: true });
console.log(out);
