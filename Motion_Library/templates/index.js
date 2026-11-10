window.TEMPLATES = [
 {
  "id": "01-title-rise",
  "name": "عنوان صاعد",
  "category": "عناوين",
  "description": "عنوان بسطرين: سطر صغير وسطر كبير يطلعون بنعومة مع إزالة ضبابية. كلمة بين نجمتين *هكذا* تصير بلون التمييز.",
  "example": {
   "kicker": "MOTION · LIBRARY",
   "line1": "جهزت لكم مكتبة",
   "line2": "حركات *وخطوط*",
   "y": 282
  },
  "duration": 3.5
 },
 {
  "id": "02-highlight-box",
  "name": "تمييز كلمة بمربع",
  "category": "عناوين",
  "description": "جملة تطلع وبعدها مربع ملوّن ينفرش ورا الكلمة المهمة. حط الكلمة بين علامتي # مثل #هذي#.",
  "example": {
   "text": "الأصوات #سيئة# جداً",
   "y": 1150
  },
  "duration": 3.0
 },
 {
  "id": "03-lower-third",
  "name": "بطاقة الاسم",
  "category": "معلومات",
  "description": "بطاقة اسم المتحدث ووصفه مع خط ملوّن ينمو. للتعريف بشخص أو أداة.",
  "example": {
   "name": "سعود العجمي",
   "role": "صانع محتوى · أدوات الذكاء الاصطناعي",
   "tag": "@saoudalajme"
  },
  "duration": 4.0
 },
 {
  "id": "04-number-counter",
  "name": "عدّاد أرقام",
  "category": "أرقام",
  "description": "رقم كبير يعد من الصفر للقيمة مع توهّج، وتحته وصف. للإحصائيات والنسب.",
  "example": {
   "value": 500,
   "prefix": "+",
   "suffix": "",
   "label": "صوت احترافي جاهز"
  },
  "duration": 3.5
 },
 {
  "id": "05-icon-list",
  "name": "قائمة بأيقونات",
  "category": "قوائم",
  "description": "عنوان وتحته عناصر تطلع وحدة ورا الثانية، وكل عنصر معه أيقونة. الأيقونات المتوفرة: check، star، bolt، heart، play، folder، clock، chat، lock، gift، film، type، music، spark، x، download.",
  "example": {
   "title": "شنو فيها؟",
   "items": [
    {
     "icon": "film",
     "text": "حركات موشن جاهزة"
    },
    {
     "icon": "type",
     "text": "15 خط عربي"
    },
    {
     "icon": "bolt",
     "text": "تشتغل مع كلود"
    },
    {
     "icon": "gift",
     "text": "مجانية بالكامل"
    }
   ]
  },
  "duration": 4.5
 },
 {
  "id": "06-before-after",
  "name": "مقارنة قبل وبعد",
  "category": "مقارنات",
  "description": "بطاقتين جنب بعض: قبل (رمادي مع ✕) وبعد (ملوّن مع ✓) وبينهم VS.",
  "example": {
   "beforeTitle": "قبل",
   "beforeText": "ساعات تدوّر على حركة",
   "afterTitle": "بعد",
   "afterText": "كل شي جاهز بثواني"
  },
  "duration": 4.5
 },
 {
  "id": "07-dm-bubbles",
  "name": "رسائل دايركت",
  "category": "سوشيال",
  "description": "رسائل تطلع وحدة ورا الثانية مثل الدايركت. ممتازة لهوك \"توصلني مسجات\".",
  "example": {
   "messages": [
    {
     "user": "@fahad.edits",
     "text": "شلون تسوي الحركات؟ 🤯"
    },
    {
     "user": "@noura.design",
     "text": "شنو اسم هالخط؟"
    },
    {
     "user": "@ali.creates",
     "text": "من وين تجيب الأنميشن؟"
    }
   ]
  },
  "duration": 4.0
 },
 {
  "id": "08-comment-cta",
  "name": "اكتب كلمة بالتعليقات",
  "category": "سوشيال",
  "description": "صندوق تعليق ينكتب فيه الكلمة وتنرسل مع قلب، وبعدها إشعار \"أرسلت لك\". للـ CTA.",
  "example": {
   "keyword": "مكتبة",
   "sent": "أرسلت لك المكتبة ✓"
  },
  "duration": 4.0
 },
 {
  "id": "09-save-share-follow",
  "name": "احفظ وشارك وتابعني",
  "category": "سوشيال",
  "description": "نهاية الفيديو: يد تضغط حفظ، بعدها مشاركة، وبعدها بطاقة حسابك وزر تابعني يتحول لـ \"تمت المتابعة\".",
  "example": {
   "handle": "@saoudalajme",
   "sub": "INSTAGRAM · AI TOOLS"
  },
  "duration": 3.8
 },
 {
  "id": "10-word-captions",
  "name": "ترجمة كلمة بكلمة",
  "category": "ترجمة",
  "description": "ترجمة متزامنة: كل 3 كلمات تطلع مع بعض والكلمة اللي تنقال تتلوّن وتكبر. عطها words بتوقيت كل كلمة (من Whisper) أو text و duration وتتوزع تلقائياً.",
  "example": {
   "text": "جهزت لكم مكتبة كاملة فيها حركات وخطوط جاهزة تشتغل مع كلود",
   "duration": 5
  },
  "duration": 5.0
 },
 {
  "id": "11-iris-transition",
  "name": "انتقال دائري",
  "category": "انتقالات",
  "description": "انتقال بين لقطتين: دائرة تسكّر الشاشة بلون (أسود افتراضياً) مع حلقة ملوّنة، وبعدها تفتح. حط القص بين اللقطتين بنص مدة الانتقال بالضبط.",
  "example": {
   "color": "#0A0A0A",
   "cx": 540,
   "cy": 960
  },
  "duration": 1.2
 },
 {
  "id": "12-light-sweep",
  "name": "لمعة ضوء",
  "category": "انتقالات",
  "description": "شعاع ضوء مائل يعبر الشاشة مع ومضة خفيفة. حطه على القص بين لقطتين يخفي القصة.",
  "example": {},
  "duration": 0.7
 },
 {
  "id": "13-stamp",
  "name": "ختم",
  "category": "تأكيد",
  "description": "كلمة تنختم على الشاشة بقوة مع حلقة. للتأكيد مثل \"مجاني\" أو \"خطأ\".",
  "example": {
   "text": "مجاني",
   "rotate": -8
  },
  "duration": 2.5
 },
 {
  "id": "14-big-word",
  "name": "كلمة عملاقة",
  "category": "عناوين",
  "description": "كلمة وحدة ضخمة تدخل من التكبير مع ضبابية وتنساب ببطء. تنفع ورا المتحدث أو كشاشة كاملة.",
  "example": {
   "text": "مكتبة",
   "size": 300
  },
  "duration": 3.0
 },
 {
  "id": "15-signature-frame",
  "name": "إطار الهوية",
  "category": "إطارات",
  "description": "إطار ثابت فوق الفيديو كله: خطوط شبكة رفيعة وعلامات زوايا وشريط علوي بنصين يمين ويسار. حط مدته نفس مدة فيديوك.",
  "example": {
   "left": "CLAUDE · MOTION",
   "right": "LIBRARY · <b>FREE</b>",
   "duration": 10
  },
  "duration": 10.0
 },
 {
  "id": "16-typewriter",
  "name": "آلة كاتبة",
  "category": "عناوين",
  "description": "النص ينكتب حرف حرف مع مؤشر يرمش، وتقدر تخلي سطر ثاني ينكتب بعده.",
  "example": {
   "lines": [
    "كلود يسوي المونتاج",
    "وأنت *ترتاح*"
   ],
   "y": 700
  },
  "duration": 4.0
 },
 {
  "id": "17-kinetic-words",
  "name": "كلمات متتالية",
  "category": "عناوين",
  "description": "كلمة وحدة كبيرة بالنص، وكل كلمة تضرب مكان اللي قبلها. ممتازة للهوك السريع. حط times لتوقيت كل كلمة أو تتوزع تلقائياً.",
  "example": {
   "words": [
    "لا",
    "تدوّر",
    "ولا",
    "*تتوهق*"
   ],
   "y": 820
  },
  "duration": 3.0
 },
 {
  "id": "18-steps",
  "name": "خطوات مرقّمة",
  "category": "قوائم",
  "description": "خطوات 1 و2 و3 على خط زمني عمودي، الخط يمتد والدائرة تتعبى مع كل خطوة.",
  "example": {
   "title": "شلون تستخدمها؟",
   "steps": [
    "حمّل المكتبة",
    "افتحها بكلود كود",
    "قول له شنو تبي"
   ]
  },
  "duration": 4.5
 },
 {
  "id": "19-bar-chart",
  "name": "رسم بياني أعمدة",
  "category": "أرقام",
  "description": "أعمدة ترتفع مع أرقامها، والعمود المميّز (highlight) بلون التمييز.",
  "example": {
   "title": "ساعات المونتاج بالأسبوع",
   "bars": [
    {
     "label": "بدون",
     "value": 14
    },
    {
     "label": "مع كلود",
     "value": 6
    },
    {
     "label": "مع المكتبة",
     "value": 2,
     "highlight": true
    }
   ],
   "suffix": "س"
  },
  "duration": 4.0
 },
 {
  "id": "20-ring-progress",
  "name": "دائرة نسبة",
  "category": "أرقام",
  "description": "دائرة تتعبى للنسبة المطلوبة والرقم بالنص يعد معها، وتحته وصف.",
  "example": {
   "value": 87,
   "label": "وفّرت من وقت المونتاج"
  },
  "duration": 3.5
 },
 {
  "id": "21-quote",
  "name": "اقتباس",
  "category": "معلومات",
  "description": "اقتباس بعلامات تنصيص كبيرة ملوّنة، والنص يطلع سطر سطر، وتحته اسم القائل.",
  "example": {
   "text": "الأداة الصح|توفر عليك *ساعات*",
   "author": "سعود العجمي"
  },
  "duration": 4.5
 },
 {
  "id": "22-checklist",
  "name": "قائمة صح",
  "category": "قوائم",
  "description": "عناصر يتأشر عليها صح وحدة ورا الثانية مع شطب خفيف أو بدون.",
  "example": {
   "title": "جاهز تنشر؟",
   "items": [
    "المونتاج",
    "الحركات",
    "الخطوط",
    "الصوت"
   ],
   "strike": false
  },
  "duration": 4.5
 },
 {
  "id": "23-notification",
  "name": "إشعار جوال",
  "category": "سوشيال",
  "description": "إشعار يطيح من فوق مثل إشعارات الآيفون، مع أيقونة التطبيق والعنوان والنص.",
  "example": {
   "app": "INSTAGRAM",
   "title": "fahad.edits",
   "text": "علّق: مكتبة 🔥",
   "time": "now"
  },
  "duration": 3.2
 },
 {
  "id": "24-search-bar",
  "name": "شريط بحث",
  "category": "سوشيال",
  "description": "شريط بحث ينكتب فيه السؤال حرف حرف، وبعدها تطلع النتائج تحته.",
  "example": {
   "query": "مكتبة موشن جرافيك عربي مجانية",
   "results": [
    "Motion Library — 33 حركة جاهزة",
    "49 خط عربي وإنجليزي مجاني",
    "تشتغل مع Claude Code"
   ],
   "rtl": true
  },
  "duration": 4.2
 },
 {
  "id": "25-countdown",
  "name": "عدّ تنازلي",
  "category": "أرقام",
  "description": "عد تنازلي 3، 2، 1 مع حلقة تفرغ لكل رقم، وبعدها كلمة النهاية.",
  "example": {
   "from": 3,
   "end": "يلا!"
  },
  "duration": 4.0
 },
 {
  "id": "26-hearts-burst",
  "name": "قلوب طايرة",
  "category": "سوشيال",
  "description": "قلوب (أو أي إيموجي) تطلع من تحت وتطير لفوق مثل اللايفات.",
  "example": {
   "emoji": [
    "❤️",
    "🔥",
    "😍"
   ],
   "count": 28
  },
  "duration": 3.0
 },
 {
  "id": "27-link-button",
  "name": "زر الرابط",
  "category": "سوشيال",
  "description": "زر كبير مع يد تضغط عليه وحلقة نبض. مثل: الرابط بالبايو، حمّل الحين.",
  "example": {
   "text": "الرابط بالبايو",
   "icon": "download"
  },
  "duration": 3.0
 },
 {
  "id": "28-arrow-callout",
  "name": "سهم وملاحظة",
  "category": "تأكيد",
  "description": "سهم مرسوم باليد ينرسم ويأشّر على نقطة بالشاشة، ومعه ملاحظة. حدد مكان النقطة بـ tx و ty.",
  "example": {
   "text": "شوف هنا 👀",
   "tx": 560,
   "ty": 1150,
   "lx": 230,
   "ly": 760
  },
  "duration": 3.0
 },
 {
  "id": "29-panel-wipe",
  "name": "انتقال ألواح",
  "category": "انتقالات",
  "description": "ألواح ملوّنة تمسح الشاشة وتغطيها بالكامل بنص المدة، وبعدها تنسحب. حط القص بالنص.",
  "example": {
   "colors": [
    "#E8835F",
    "#0A0A0A"
   ],
   "direction": "right"
  },
  "duration": 1.0
 },
 {
  "id": "30-chapter-card",
  "name": "بطاقة فصل",
  "category": "عناوين",
  "description": "شاشة كاملة لبداية قسم: رقم كبير وعنوان. تغطي الفيديو، استخدمها بين الأقسام.",
  "example": {
   "number": "02",
   "title": "الخطوط",
   "sub": "CHAPTER · FONTS"
  },
  "duration": 2.5
 },
 {
  "id": "31-rating-stars",
  "name": "تقييم نجوم",
  "category": "أرقام",
  "description": "خمس نجوم تتعبى وحدة ورا الثانية للتقييم المطلوب (يقبل نص نجمة)، مع الرقم والوصف.",
  "example": {
   "rating": 4.5,
   "label": "تقييم المتابعين"
  },
  "duration": 3.5
 },
 {
  "id": "32-price-tag",
  "name": "سعر وعرض",
  "category": "أرقام",
  "description": "السعر القديم ينشطب ويطلع السعر الجديد بقوة مع شارة الخصم.",
  "example": {
   "old": "49",
   "new": "0",
   "currency": "د.ك",
   "badge": "مجاناً"
  },
  "duration": 3.5
 },
 {
  "id": "33-post-card",
  "name": "بطاقة منشور",
  "category": "سوشيال",
  "description": "بطاقة تغريدة أو منشور فيها الاسم والحساب والنص، واللايكات تعد.",
  "example": {
   "name": "سعود العجمي",
   "handle": "@saoudalajme",
   "text": "جهزت لكم مكتبة فيها *33 حركة* و*49 خط* مجانية 🔥",
   "likes": 12400
  },
  "duration": 4.0
 }
];
