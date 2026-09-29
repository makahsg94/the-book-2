// ============================================================
//  بيانات مدرب الإنجليزي الأونلاين
//  عدّل كل اللي في الملف ده من غير ما تلمس أي صفحة تانية:
//  الأسعار، اسم المدرب، رقم الواتساب، المزايا، الأسئلة.
// ============================================================

/** رقم الواتساب بصيغة دولية من غير + (مصر = 20 ...) — دا اللي بتبعتله رسايل الحجز */
export const WHATSAPP = '201224552685'

/** الرقم اللي بيتshown للطالب بالعربي */
export const WHATSAPP_DISPLAY = '01224552685'

/** بورتفوليو المدرب — بيتبان زرار في الهيرو */
export const TRAINER_LINK =
  'https://abu-bakr-english.abwrabhmhmwd180.workers.dev/'

export interface TrainerStat {
  value: string
  label: string
  labelAr: string
}

export interface Plan {
  id: string
  name: string
  nameAr: string
  /** عدد الحصص في الأسبوع */
  perWeek: number
  /** الحصص في الشهر (٣٠ يوم ÷ ٧) */
  perMonth: number
  /** سعر الحصة الواحدة — بيتحسب أوتوماتيك ونوعّده للعرض */
  perLesson: number
  price: number
  badge?: string
  featured?: boolean
  /** خصم الدفعة مقدماً: ٣ شهور أو سنة */
  prepay: { months: number; total: number; save: number }[]
  features: { en: string; ar: string }[]
}

export interface TrainerPlan {
  id: string
  title: string
  titleAr: string
  body: string
  bodyAr: string
  icon: 'mic' | 'target' | 'chat' | 'award' | 'clock' | 'book' | 'spark' | 'layers'
}

export const TRAINER = {
  name: 'Abu Bakr Mokhtar',
  nameAr: 'أبو بكر مختار',
  role: 'Professional online English trainer',
  roleAr: 'مدرب إنجليزي أونلاين محترف',
  years: 9,
  tagline: 'Nine years of live 1:1 teaching, from zero confidence to real conversations.',
  taglineAr: 'تسع سنين تدريس لايف ١:١ — من إنجليزي مش واثق لمحادثات حقيقية.',
  bio: [
    'I teach English online the way it actually gets used: you talk from the first minute, and every grammar point lands on something you just said out loud.',
    'Nine years of weekly students taught me what keeps people going \u2014 small, measurable wins and a plan that fits a real schedule, not a perfect one.',
  ],
  bioAr: [
    'بشرح إنجليزي أونلاين بالطريقة اللي بتتقال فعلاً: إنت بتتكلم من أول دقيقة، وكل قاعدة جرامر بتترجم لشيء قلته بصوت عالي.',
    'تسع سنين مع طلاب أسبوعياً علمتني اللي بيخلّي الناس تكمّل \u2014 تقدّم صغير ملموس وخطة تناسب جدول حقيقي، مش مثالي.',
  ],
  languages: ['Arabic', 'English'],
} satisfies {
  name: string
  nameAr: string
  role: string
  roleAr: string
  years: number
  tagline: string
  taglineAr: string
  bio: string[]
  bioAr: string[]
  languages: string[]
}

// الأرقام دي كلها حقايق قابلة للتأكد — أي رقم مجاميع طلاب أو تقييم أو عدد
// حصص لازم يجي من أبو بكر نفسه، لأن الأرقام غير المؤكدة بتخرب الثقة.
export const TRAINER_STATS: TrainerStat[] = [
  { value: '9+', label: 'years teaching', labelAr: 'سنة خبرة' },
  { value: '1:1', label: 'live lessons', labelAr: 'حصص لايف' },
  { value: '60', label: 'minutes each', labelAr: 'دقيقة للحصة' },
  { value: 'Free', label: 'diagnostic test', labelAr: 'اختبار تحديد مستوى' },
]

// ------------------------------------------------------------
//  خصم الدفعة المقدّمة: ٣ شهور −١٠٪  ·  سنة −١٥٪
//  بيتحسب أوتوماتيك من السعر الشهري عشان الأرقام ماتتعارضش
// ------------------------------------------------------------
const PREPAY_RULES = [
  { months: 3, off: 0.1 },
  { months: 12, off: 0.15 },
]

function prepayFor(price: number) {
  return PREPAY_RULES.map(({ months, off }) => ({
    months,
    total: Math.round((price * months * (1 - off)) / 10) * 10,
    save: price * months - Math.round((price * months * (1 - off)) / 10) * 10,
  }))
}

/** سعر الحصة الواحدة — بيتقرّب لأقرب ٥ جنيه */
function perLesson(price: number, perMonth: number): number {
  return Math.round(price / perMonth / 5) * 5
}

export const PLANS: Plan[] = [
  {
    id: 'weekly',
    name: 'Weekly',
    nameAr: 'حصة في الأسبوع',
    perWeek: 1,
    perMonth: 4,
    perLesson: perLesson(450, 4),
    price: 450,
    prepay: prepayFor(450),
    features: [
      { en: '1 live 1:1 lesson a week (60 min)', ar: 'حصة لايف ١:١ كل أسبوع (٦٠ دقيقة)' },
      { en: 'Free diagnostic in the first week', ar: 'اختبار تحديد مستوى مجاني في أول أسبوع' },
      { en: 'Personal study plan for your goal', ar: 'خطة مذاكرة شخصية على هدفك' },
      { en: 'Homework + voice-note correction', ar: 'واجبات مع تصحيح صوتي' },
      { en: 'Same weekly slot, cancel any month', ar: 'نفس ميعاد كل أسبوع، وتلغي في أي شهر' },
    ],
  },
  {
    id: 'twice',
    name: 'Twice a week',
    nameAr: 'حصتين في الأسبوع',
    perWeek: 2,
    perMonth: 8,
    perLesson: perLesson(800, 8),
    price: 800,
    badge: 'Most popular',
    featured: true,
    prepay: prepayFor(800),
    features: [
      { en: '2 live 1:1 lessons a week (60 min)', ar: 'حصتين لايف ١:١ كل أسبوع (٦٠ دقيقة)' },
      { en: 'Free diagnostic in the first week', ar: 'اختبار تحديد مستوى مجاني في أول أسبوع' },
      { en: 'Writing corrected every lesson', ar: 'تصحيح الكتابة في كل حصة' },
      { en: 'Monthly progress report', ar: 'تقرير تقدّم كل شهر' },
      { en: 'Free course-material pack', ar: 'ملازم ومواد كورس مجانية' },
      { en: 'Priority booking on your slots', ar: 'أولوية حجز على مواعيدك' },
    ],
  },
  {
    id: 'thrice',
    name: 'Intensive',
    nameAr: '٣ حصص في الأسبوع',
    perWeek: 3,
    perMonth: 12,
    perLesson: perLesson(1100, 12),
    price: 1100,
    badge: 'Fastest progress',
    prepay: prepayFor(1100),
    features: [
      { en: '3 live 1:1 lessons a week (60 min)', ar: '٣ حصص لايف ١:١ كل أسبوع (٦٠ دقيقة)' },
      { en: 'Everything in the twice-a-week plan', ar: 'كل مزايا باقة الحصتين' },
      { en: 'Exam or interview simulation', ar: 'محاكاة امتحان أو مقابلة' },
      { en: 'Daily voice notes between lessons', ar: 'ملاحظات صوتية يومية بين الحصص' },
      { en: 'Free make-up lessons', ar: 'حصص تعويض مجانية' },
      { en: 'Certificate of completion', ar: 'شهادة إتمام' },
    ],
  },
]

/** ملاحظة صغيرة تحت الباقات — الأرقام على أساس ٤ أسابيع في الشهر */
export const LESSONS_PER_MONTH_NOTE =
  'All plans run on a monthly subscription. Lesson counts assume a 4-week month.'

export const WHY: TrainerPlan[] = [
  {
    id: 'speak-first',
    title: 'You talk in minute one',
    titleAr: 'إنت بتتكلم من أول دقيقة',
    body: 'No silent lectures. Every lesson is built around you producing English, not watching me explain it.',
    bodyAr: 'مفيش محاضرات صامتة. كل حصة مبنية على إنك إنت اللي بتنتج إنجليزي، مش أنا اللي بشرح.',
    icon: 'mic',
  },
  {
    id: 'your-goal',
    title: 'Built around your goal',
    titleAr: 'مبنية على هدفك',
    body: 'Exam, job interview, travel, or movies. We use your real life as the textbook.',
    bodyAr: 'امتحان، مقابلة شغل، سفر، أو أفلام. بنستخدم حياتك الحقيقية ككتاب.',
    icon: 'target',
  },
  {
    id: 'corrected-voice',
    title: 'You speak, I correct',
    titleAr: 'إنت تتكلم، أنا صحّح',
    body: 'You record a short answer, I send it back with the exact mistakes fixed \u2014 not a wall of grammar rules.',
    bodyAr: 'بتبعت إجابة قصيرة صوتية، وأرجعها لك مصحّحة \u2014 مش محاضرة قواعد.',
    icon: 'chat',
  },
  {
    id: 'diagnostic',
    title: 'Level tested properly',
    titleAr: 'مستواك بيتحدد صح',
    body: 'A real diagnostic in week one, so you never pay for lessons that are too easy or too hard.',
    bodyAr: 'اختبار تحديد مستوى في الأسبوع الأول، عشان ما تدفعش على حصص سهلة عليك أو صعبة.',
    icon: 'award',
  },
  {
    id: 'flexible',
    title: 'Your schedule, not mine',
    titleAr: 'مواعيدك إنت',
    body: 'A fixed weekly slot you keep for months, plus free make-up lessons when life happens.',
    bodyAr: 'ميعاد أسبوعي ثابت تحافظ عليه شهور، وحصص تعويض مجانية لما الحياة تتأخر.',
    icon: 'clock',
  },
  {
    id: 'course-fit',
    title: 'Fits this course',
    titleAr: 'متماشي مع الكورس ده',
    body: 'A2 Speakout is the practice lab. Nine years of marking writing and speaking means he knows exactly where A2 students slip.',
    bodyAr: 'كورس A2 هو المعمل. تسع سنين في تصحيح الكتابة والمحادثة معناها إنه عارف بالظبط A2 بيعيط فين.',
    icon: 'book',
  },
]

export const STEPS: TrainerPlan[] = [
  {
    id: 'send',
    title: 'Send one WhatsApp message',
    titleAr: 'ابعت رسالة واتساب واحدة',
    body: 'Tell me your level and what you need. No forms, no waiting.',
    bodyAr: 'قولي مستواك واللي محتاجه. من غير فورم ومن غير انتظار.',
    icon: 'chat',
  },
  {
    id: 'diagnostic',
    title: 'Free 20-minute diagnostic',
    titleAr: 'اختبار مجاني ٢٠ دقيقة',
    body: 'We find your level together and agree on the goal.',
    bodyAr: 'نحدد مستواك مع بعض ونتفق على الهدف.',
    icon: 'target',
  },
  {
    id: 'plan',
    title: 'Choose your weekly rhythm',
    titleAr: 'اختار عدد الحصص في الأسبوع',
    body: 'One lesson, two, or three a week \u2014 then pick monthly, 3 months, or a year.',
    bodyAr: 'حصة أو اتنين أو تلاتة في الأسبوع \u2014 ثم اختار تدفع شهري ولا ٣ شهور ولا سنة.',
    icon: 'layers',
  },
  {
    id: 'start',
    title: 'First lesson booked',
    titleAr: 'أول حصة محجوزة',
    body: 'You get the Zoom link, the study plan, and the first homework before we start.',
    bodyAr: 'هتاخد لينك زووم والخطة وأول واجب قبل ما نبدأ.',
    icon: 'spark',
  },
]

export const FAQ: { q: string; qAr: string; a: string; aAr: string }[] = [
  {
    q: 'How many lessons a week do I get?',
    qAr: 'كام حصة في الأسبوع؟',
    a: 'You choose: one lesson a week (about 4 a month), two a week (about 8), or three a week (about 12). The price drops the more you take.',
    aAr: 'إنت بتختار: حصة في الأسبوع (يعني ٤ في الشهر تقريباً)، ولا اتنين (٨)، ولا تلاتة (١٢). وكل ما تاخد أكتر السعر بيقل.',
  },
  {
    q: 'Do I need a specific level to start?',
    qAr: 'محتاج مستوى معين عشان أبدأ؟',
    a: 'No. The diagnostic in the first call places you exactly, from beginner to advanced.',
    aAr: 'لأ. اختبار تحديد المستوى في أول مكالمة بيحدد مستواك بالظبط، من المبتدئ للمتقدم.',
  },
  {
    q: 'How do the lessons run?',
    qAr: 'الحصص بتمشي إزاي؟',
    a: 'Live on Zoom, 60 minutes, one-to-one. Screen-share for pronunciation and writing, camera on for speaking.',
    aAr: 'لايف على زووم، ٦٠ دقيقة، واحد لواحد. شيرنج الشاشة للنطق والكتابة، والكاميرا مفتوحة وقت الكلام.',
  },
  {
    q: 'What if I miss a lesson?',
    qAr: 'لو فاتتني حصة؟',
    a: 'You move it to another slot in the same week, or book a free make-up lesson.',
    aAr: 'تأجلها لشق تاني في نفس الأسبوع، أو تحجز حصة تعويض مجانية.',
  },
  {
    q: 'How does payment work?',
    qAr: 'الدفع بيتم إزاي؟',
    a: 'Every plan is a monthly subscription, paid by the month. You can also pay 3 months ahead and save 10%, or a full year and save 15%. Everything is confirmed on WhatsApp.',
    aAr: 'كل الباقات اشتراك شهري بيتدفع بالشهر. ينفع كمان تدفع ٣ شهور مقدماً وتوفّر ١٠٪، أو سنة وتوفّر ١٥٪. والتأكيد كله على الواتساب.',
  },
  {
    q: 'Do I get a certificate?',
    qAr: 'هل بتاخد شهادة؟',
    a: 'Yes, on the intensive plan you get a certificate of completion after you finish the course.',
    aAr: 'أيوه، في الباقة المكثفة (٣ حصص) بتاخد شهادة إتمام لما تخلص الكورس.',
  },
]

// ------------------------------------------------------------
//  لينكات الحجز
// ------------------------------------------------------------

const AR_DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩']

/** يحوّل الأرقام لصيغة عربية */
export function toArabicDigits(input: string): string {
  return input.replace(/\d/g, (d) => AR_DIGITS[Number(d)])
}

function planById(id: string): Plan | undefined {
  return PLANS.find((p) => p.id === id)
}

/** رسالة واتساب جاهزة تتعبى في الباقة المطلوبة */
export function planMessage(planId: string): string {
  const plan = planById(planId)
  const planLine = plan
    ? `الباقة المطلوبة: ${plan.nameAr} — ${plan.perWeek} حصة في الأسبوع (~${plan.perMonth} في الشهر) بـ ${plan.price} جنيه\n`
    : ''
  return (
    `السلام عليكم أبو بكر، أنا مهتم بالاشتراك الشهري للمدرب الأونلاين.\n\n` +
    planLine +
    `مستواي الحالي: \n` +
    `هدفي من الإنجليزي: \n` +
    `المواعيد اللي تناسبني: \n\n` +
    `ممكن أعرف التفاصيل؟`
  )
}

/** لينك واتساب (يفتح المحادثة برسالة جاهزة) */
export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`
}

/** لينك واتساب عام من غير باقة محددة */
export function generalWhatsappLink(): string {
  return whatsappLink(
    `السلام عليكم أبو بكر، عايز أعرف تفاصيل الاشتراك الشهري والباقات المتاحة (حصة / حصتين / تلاتة في الأسبوع).`,
  )
}
