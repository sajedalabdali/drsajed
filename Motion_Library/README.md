# مكتبة الموشن والخطوط 🎬

33 حركة موشن جرافيك جاهزة و49 خط مجاني (40 منها تدعم العربي). كل حركة تغيّر نصها ولونها وخطها، وتطلع ملف بخلفية شفافة تحطه فوق أي فيديو، أو تخلي **Claude Code** يركّبها على فيديوك بنفسه.

جمعها وسوّاها [@saoudalajme](https://instagram.com/saoudalajme)

---

## شوف المكتبة أول

افتح ملف **`index.html`** بـ Google Chrome. بتشوف كل الحركات شغالة، وتقدر تعدّل نص أي حركة وتشوف النتيجة مباشرة، وتنسخ الطلب لكلود بضغطة.

---

## اللي تحتاجه (مرة وحدة بس)

| البرنامج | ليش | التثبيت |
|---|---|---|
| **Google Chrome** | يرسم الحركات والخط العربي متصل صح | [google.com/chrome](https://www.google.com/chrome) |
| **Node.js 18+** | يشغّل أداة التصدير | [nodejs.org](https://nodejs.org) |
| **ffmpeg** | يحوّل الحركة لفيديو | ماك: `brew install ffmpeg` · ويندوز: `winget install ffmpeg` |

ما تحتاج تثبّت أي مكتبة ثانية (npm install مو مطلوب).

---

## الطريقة الأسهل: مع Claude Code

1. افتح Claude Code **داخل مجلد المكتبة**.
2. قول له شنو تبي بالعربي، مثلاً:
   - «حط عنوان صاعد يقول *جهزت لكم مكتبة* على فيديوي `reel.mp4` من الثانية 3»
   - «سوّ لي عدّاد يوصل 500 ويكتب تحته *صوت احترافي*»
   - «سوّ ترجمة كلمة بكلمة لفيديوي»
   - «حط إطار الهوية على الفيديو كامل، وفي آخره احفظ وشارك وتابعني باسم حسابي»
3. كلود يقرأ ملف `CLAUDE.md` ويعرف كل شي: أي قالب يختار، شلون يعبّي النص، وشلون يصدّر ويركّب.

---

## الطريقة اليدوية: أمر واحد

```bash
node tools/make.mjs 01-title-rise '{"line1":"جهزت لكم","line2":"*مكتبة* كاملة"}'
```

يطلع لك ملف `.mov` بخلفية شفافة داخل مجلد `output/`. اسحبه على التايملاين فوق فيديوك.

**تركّبه على فيديوك مباشرة:**
```bash
node tools/make.mjs 13-stamp '{"text":"مجاني"}' --video reel.mp4 --at 2.5 --out reel_final.mp4
```

**خيارات:**

| الخيار | شنو يسوي |
|---|---|
| `--format prores` | ‏(الافتراضي) ‎.mov شفاف: Premiere و Final Cut و DaVinci و CapCut للكمبيوتر |
| `--format webm` | ‎.webm شفاف وحجمه صغير |
| `--format preview` | ‎.mp4 على خلفية غامقة، للمعاينة أو الإرسال |
| `--video x.mp4 --at 3` | يركّب الحركة على فيديوك من الثانية 3 |
| `--duration 5` | يغيّر مدة الحركة |
| `--mblur 1` | تصدير أسرع بدون موشن بلر (الافتراضي 3 أنعم) |

---

## الحركات

| # | القالب | النوع | أهم البيانات |
|---|---|---|---|
| 01 | `01-title-rise` عنوان صاعد | عناوين | `kicker` `line1` `line2` `y` |
| 02 | `02-highlight-box` تمييز كلمة بمربع | عناوين | `text` (الكلمة بين `#…#`) |
| 03 | `03-lower-third` بطاقة الاسم | معلومات | `name` `role` `tag` |
| 04 | `04-number-counter` عدّاد أرقام | أرقام | `value` `prefix` `suffix` `label` |
| 05 | `05-icon-list` قائمة بأيقونات | قوائم | `title` `items:[{icon,text}]` |
| 06 | `06-before-after` مقارنة قبل وبعد | مقارنات | `beforeTitle` `beforeText` `afterTitle` `afterText` |
| 07 | `07-dm-bubbles` رسائل دايركت | سوشيال | `messages:[{user,text}]` |
| 08 | `08-comment-cta` اكتب كلمة بالتعليقات | سوشيال | `keyword` `sent` |
| 09 | `09-save-share-follow` احفظ وشارك وتابعني | سوشيال | `handle` `sub` |
| 10 | `10-word-captions` ترجمة كلمة بكلمة | ترجمة | `words:[{w,start,end}]` أو `text`+`duration` |
| 11 | `11-iris-transition` انتقال دائري | انتقالات | `color` |
| 12 | `12-light-sweep` لمعة ضوء | انتقالات | — |
| 13 | `13-stamp` ختم | تأكيد | `text` `rotate` |
| 14 | `14-big-word` كلمة عملاقة | عناوين | `text` `size` |
| 15 | `15-signature-frame` إطار الهوية | إطارات | `left` `right` `duration` |
| 16 | `16-typewriter` آلة كاتبة | عناوين | `lines` `cps` |
| 17 | `17-kinetic-words` كلمات متتالية | عناوين | `words` `times` |
| 18 | `18-steps` خطوات مرقّمة | قوائم | `title` `steps` |
| 19 | `19-bar-chart` رسم بياني أعمدة | أرقام | `title` `bars:[{label,value,highlight}]` `suffix` |
| 20 | `20-ring-progress` دائرة نسبة | أرقام | `value` `label` |
| 21 | `21-quote` اقتباس | معلومات | `text` (افصل السطور بشرطة عمودية) `author` |
| 22 | `22-checklist` قائمة صح | قوائم | `title` `items` `strike` |
| 23 | `23-notification` إشعار جوال | سوشيال | `app` `title` `text` `time` |
| 24 | `24-search-bar` شريط بحث | سوشيال | `query` `results` |
| 25 | `25-countdown` عدّ تنازلي | أرقام | `from` `end` |
| 26 | `26-hearts-burst` قلوب طايرة | سوشيال | `emoji` `count` `x` `y` |
| 27 | `27-link-button` زر الرابط | سوشيال | `text` `icon` |
| 28 | `28-arrow-callout` سهم وملاحظة | تأكيد | `text` `tx` `ty` `lx` `ly` |
| 29 | `29-panel-wipe` انتقال ألواح | انتقالات | `colors` `direction` |
| 30 | `30-chapter-card` بطاقة فصل | عناوين | `number` `title` `sub` |
| 31 | `31-rating-stars` تقييم نجوم | أرقام | `rating` `label` |
| 32 | `32-price-tag` سعر وعرض | أرقام | `old` `new` `currency` `badge` |
| 33 | `33-post-card` بطاقة منشور | سوشيال | `name` `handle` `text` `likes` |

**بيانات تشتغل مع كل القوالب:**
- `accent`: لون التمييز (افتراضي `#E8835F`). اكتبه hex بـ 6 خانات.
- `font`: اسم الخط (من القائمة تحت).
- `textColor`: لون النص.
- `y`: مكان العنصر من فوق بالبكسل، والشاشة 1080×1920.
- أي كلمة بين نجمتين `*هكذا*` تطلع بلون التمييز.

أمثلة جاهزة لكل قالب موجودة في مجلد `examples/`.

---

## الخطوط (49)

**عربي + إنجليزي (40):** Alexandria · Alkalami · Almarai · Amiri · Aref Ruqaa · Badeen Display · Baloo Bhaijaan 2 · Blaka · Cairo · Changa · El Messiri · Gulzar · Handjet · Harmattan · IBM Plex Sans Arabic · Jomhuria · Katibeh · Kufam · Lalezar · Lateef · Lemonada · Mada · Marhey · Markazi Text · Mirza · Noto Kufi Arabic · Noto Naskh Arabic · Noto Sans Arabic · Playpen Sans Arabic · Qahiri · Rakkas · Readex Pro · Reem Kufi · Reem Kufi Fun · Rubik · Ruwudu · Scheherazade New · Tajawal · Vibes · Zain

**إنجليزي فقط (9):** Anton · Archivo Black · Bebas Neue · Geist Mono · Inter · Montserrat · Playfair Display · Poppins · Space Grotesk

كلها بترخيص **SIL Open Font License 1.1**: مجانية للاستخدام الشخصي والتجاري، وملف الرخصة داخل مجلد كل خط. تقدر تثبّتها على جهازك (دبل كلك على ملف ‎.ttf) وتستخدمها بأي برنامج. تبي تضيف خط OFL ثاني؟ حط مجلده داخل `fonts/` مع ملف METADATA.pb حقه بمجلد `tools/fontmeta/` وشغّل `python3 tools/build_fonts.py`.

---

## مشاكل شائعة

- **`ffmpeg not found`**: ثبّت ffmpeg من الجدول فوق، وسكّر التيرمنال وافتحه من جديد.
- **`no Chrome/Chromium/Edge found`**: ثبّت Chrome، أو حدّد مكانه بنفسك: `SEP_CHROME="/path/to/chrome" node tools/make.mjs …`
- **الخط العربي مقطّع ببرنامج المونتاج**: هذي مشكلة البرنامج نفسه. صدّر الحركة من المكتبة وحطها كفيديو، لأن Chrome يرسم العربي متصل دايماً.
- **CapCut للجوال ما يقرأ الشفافية**: صدّر بـ `--video` عشان تطلع الحركة مركّبة على فيديوك جاهزة.
