# Motion Library — instructions for Claude

This folder is a library of 33 motion-graphics templates and 49 open-licensed fonts for vertical videos (1080×1920, Reels/TikTok/Shorts). The user usually writes in Arabic (often Gulf dialect). Answer in the user's language and keep Arabic copy in their own dialect and words.

## What you do here

Turn requests like «حط عنوان يقول … على فيديوي من الثانية 3» into rendered animation files, or burn them straight onto the user's video.

## Tools (no npm install needed)

```bash
node tools/make.mjs <template-id> [data.json | '<inline json>'] [--out file] [--format prores|webm|png|preview] [--duration S] [--video in.mp4 --at S] [--mblur 1|3]
```

- Without `--video`: writes a transparent `.mov` (ProRes 4444) into `output/` (or `--out`). `webm` is VP9 with alpha; `preview` is an MP4 on a dark background.
- With `--video in.mp4 --at S`: overlays the animation onto the video starting at S seconds and keeps the video's audio. The video is scaled/cropped to 1080×1920.
- To place several animations on one video, chain calls: the `--out` of one becomes the `--video` of the next. Or render each with `--format prores` and overlay them in one ffmpeg command with `-itsoffset`.
- `--mblur 3` (default) is smoother; use `--mblur 1` for fast drafts.
- Requirements: Google Chrome (or Edge/Chromium), Node 18+, ffmpeg. If one is missing, tell the user how to install it (see README.md). Don't work around a missing tool.

## Templates

The catalogue, with each template's description, default duration and a working example, lives in `templates/index.js`. `examples/<id>.json` holds the same example data. Read them before choosing. Overview:

| id | use it for | main data |
|---|---|---|
| 01-title-rise | headline: small line + big line | kicker, line1, line2, y, bigSize |
| 02-highlight-box | sentence with one word on a sweeping colour box | text with `#word#`, y, size, boxAt |
| 03-lower-third | name + role card | name, role, tag, y |
| 04-number-counter | statistic counting up | value, prefix, suffix, decimals, label, y |
| 05-icon-list | title + items with icons | title, items[{icon,text}], gap |
| 06-before-after | before ✕ vs after ✓ cards | beforeTitle, beforeText, afterTitle, afterText |
| 07-dm-bubbles | DM messages popping in | messages[{user,text}], gap |
| 08-comment-cta | "comment X" call to action + "sent" toast | keyword, sent |
| 09-save-share-follow | outro: save, share, follow | handle, sub, follow, followed |
| 10-word-captions | word-synced captions | words[{w,start,end}] or text+duration, perLine |
| 11-iris-transition | circular wipe between two shots | color, cx, cy |
| 12-light-sweep | light streak to hide a cut | flash |
| 13-stamp | stamped word | text, rotate |
| 14-big-word | one giant word | text, size, white |
| 15-signature-frame | persistent brand frame (grid + top bar) | left, right, duration |
| 16-typewriter | text typed letter by letter with a cursor | lines[], cps |
| 17-kinetic-words | one big word at a time, punching in (fast hooks) | words[], times[] |
| 18-steps | numbered steps on a vertical timeline | title, steps[], gap |
| 19-bar-chart | animated bar chart | title, bars[{label,value,highlight}], suffix |
| 20-ring-progress | circular percentage | value, label |
| 21-quote | quote with big quote marks | text (lines split by \|), author |
| 22-checklist | items ticked one by one | title, items[], strike |
| 23-notification | phone notification dropping in | app, title, text, time, y |
| 24-search-bar | search query typed + results | query, results[], rtl |
| 25-countdown | 3-2-1 countdown + end word | from, end, step |
| 26-hearts-burst | floating emoji (live-stream style) | emoji[], count, x, y |
| 27-link-button | big button tapped by a hand ("link in bio") | text, icon |
| 28-arrow-callout | hand-drawn arrow pointing at a spot + label | text, tx, ty, lx, ly |
| 29-panel-wipe | coloured panels wipe across (transition, cut at half) | colors[], direction |
| 30-chapter-card | full-screen chapter card (covers the video) | number, title, sub |
| 31-rating-stars | 5 stars filling to a rating | rating, label |
| 32-price-tag | old price struck, new price + badge | old, new, currency, badge |
| 33-post-card | tweet/post card with counting likes | name, handle, text, likes |

Icons for 05 and 27: check, star, bolt, heart, play, folder, clock, chat, lock, gift, film, type, music, spark, x, download.

Data every template accepts: `accent` (6-digit hex, default `#E8835F`), `font` (one of the families below), `textColor`, `y` (px from the top on a 1080×1920 canvas), `duration`. In text fields, `*word*` colours a word with the accent.

Fonts (`fonts/`, all SIL OFL): 49 families, 40 with Arabic. The full list with Arabic support and weight ranges is in `fonts/fonts.js` (`window.ML_FONTS`). Default is Readex Pro. For Arabic text pick a family with `arabic: true`. To add an OFL font: drop its folder in `fonts/`, its METADATA.pb in `tools/fontmeta/`, run `python3 tools/build_fonts.py`.

## Working rules

1. **Timing from speech.** If the user wants an animation "when I say X", find the time first. If `whisper` is installed, transcribe with word timestamps; otherwise ask the user for the second. For `10-word-captions`, pass real word timings (`words`) whenever you can get them.
2. **Layout (1080×1920).** Instagram covers the bottom ~35% and the right edge of the lower half with its UI. Keep text in x 100–980. Headlines go near the top (`y` ≈ 280) or the lower third (`y` ≈ 1150). Don't put two text animations on screen at the same time in the same area.
3. **Transitions.** For `11-iris-transition` and `29-panel-wipe`, the screen is fully covered at exactly half its duration: put the cut between the two shots there (`--at cut - duration/2`). For `12-light-sweep`, centre it on the cut the same way. `30-chapter-card` covers the whole screen for its duration.
4. **Check before delivering.** Grab a frame from the result (`ffmpeg -ss T -i out.mp4 -frames:v 1 check.png`) and look at it: Arabic joined correctly, nothing clipped, nothing on the face. Then give the user the file path.
5. **Arabic.** Keep the user's wording and dialect exactly. Don't "correct" Gulf words into formal Arabic.
6. Templates are plain HTML (`templates/*.html` + `templates/_core.js`). If the user asks for a change no data field covers (new colour scheme, different motion), copy the template to a new file and edit the copy. Never break the originals.
