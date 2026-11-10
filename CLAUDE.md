# drsajed — تعليمات لـ Claude

المستخدم يكتب بالعربي (لهجة خليجية غالبًا). جاوبه بلغته وبلهجته.

## مكتبة الموشن والخطوط — `Motion_Library/`

مجلد فيه 33 قالب موشن جرافيك (عناوين، عدّادات، ترجمة كلمة بكلمة، انتقالات، رسائل دايركت، ختم، رسم بياني…) و49 خط مجاني (40 منها عربي)، للفيديوهات العمودية 1080×1920 (ريلز/تيك توك/شورتس). من جمع [@saoudalajme](https://instagram.com/saoudalajme).

**متى تستخدمها:** أي طلب مثل «حط عنوان/عدّاد/ترجمة/ختم/انتقال على فيديوي»، أو «سوّ موشن»، أو تركيب حركة من ثانية معيّنة.

**قبل أي شغل:** اقرأ `Motion_Library/CLAUDE.md` (الجدول الكامل للقوالب وبياناتها)، ثم `Motion_Library/templates/index.js` وأمثلة `Motion_Library/examples/<id>.json`.

**الاستخدام (من داخل `Motion_Library/`):**
```bash
node tools/make.mjs <template-id> '<json>' [--out f] [--format prores|webm|png|preview] [--duration S] [--video in.mp4 --at S] [--mblur 1|3]
```
- بدون `--video` يطلع `.mov` شفاف (ProRes 4444) داخل `output/`.
- مع `--video` و`--at` يركّب الحركة على الفيديو ويبقي صوته.
- لعدة حركات على فيديو واحد: ناتج الأولى يصير `--video` للثانية.
- `index.html` يعرض كل القوالب للمعاينة (يفتح بـ Chrome).

**المتطلبات:** Chrome/Chromium وNode 18+ وffmpeg، بدون `npm install`. إذا ناقص شي قل للمستخدم يثبّته ولا تلتف عليه. (في البيئة السحابية Chromium موجود مسبقًا؛ تحقق من ffmpeg.)
