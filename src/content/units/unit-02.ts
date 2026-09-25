import type {
  Unit,
  Lesson,
} from '../../types/content'
import { au, img } from '../helpers'

// ===========================================================================
// 2A What happened?
// ===========================================================================

const lesson2A: Lesson = {
  id: '2a',
  code: '2A',
  title: 'What happened?',
  subtitle: 'Narrative tenses \u2022 Adjectives for feelings; -ed/-ing adjectives',
  pages: [20, 22],
  labels: {
    grammar: 'narrative tenses',
    vocabulary: 'adjectives for feelings; -ed/-ing adjectives',
    pronunciation: 'weak forms of was, were and had',
  },
  objectives: [
    'understand a sequence in a narrative',
    'tell an anecdote using narrative tenses',
    'write a personal story',
  ],
  blocks: [
    {
      type: 'callout',
      title: 'Lesson 2A',
      titleAr: 'الدرس 2أ',
      tone: 'info',
      text: 'What happened? \u2013 you learn to use narrative tenses (past simple, past continuous and past perfect) to tell stories and anecdotes, and adjectives with -ed and -ing to describe feelings.',
      textAr: 'ماذا حدث؟ \u2013 تتعلم استخدام أزمنة السرد (الماضي البسيط والماضي المستمر والماضي التام) لسرد القصص والطرائف، وصفات المنتهية بـ -ed و-ing لوصف المشاعر.',
    },
    {
      type: 'vocab',
      title: 'adjectives for feelings; -ed/-ing adjectives',
      titleAr: 'صفات المشاعر؛ الصفات المنتهية بـ -ed/-ing',
      items: [
        { word: 'bored', meaning: 'feeling unhappy because something is not interesting', meaningAr: 'يشعر بالملل', example: 'We were bored, so we went into the garage.', exampleAr: 'كنا نشعر بالملل، فدخلنا المرآب.' },
        { word: 'exciting', meaning: 'making you feel excited', meaningAr: 'مثير', example: 'We were really excited when we found all dad\u2019s paints.', exampleAr: 'كنا متحمسين جداً عندما وجدنا كل ألوان أبي.' },
        { word: 'frightened', meaning: 'afraid of something', meaningAr: 'خائف', example: 'My sister and I were frightened.', exampleAr: 'كنت أنا وأختي خائفين.' },
        { word: 'embarrassed', meaning: 'feeling uncomfortable or ashamed about something', meaningAr: 'محرج / خجلان', example: 'I think he found it a bit embarrassing.', exampleAr: 'أعتقد أنه وجد الأمر محرجاً بعض الشيء.' },
        { word: 'annoyed', meaning: 'slightly angry', meaningAr: 'منزعج / متضايق', example: 'Dad is going to be really annoyed!', exampleAr: 'أبي سيكون منزعجاً جداً!' },
        { word: 'surprised', meaning: 'feeling that something unexpected has happened', meaningAr: 'متفاجئ', example: "I'm surprised you chose blue.", exampleAr: 'أنا متفاجئ أنك اخترت اللون الأزرق.' },
        { word: 'disappointed', meaning: 'unhappy because something was not as good as you hoped', meaningAr: 'محبَط / خائب الأمل', example: 'He was probably disappointed with us.', exampleAr: 'كان على الأرجح خائب الأمل منّا.' },
        { word: 'amazed', meaning: 'very surprised', meaningAr: 'مندهش', example: "It's amazing that he was so calm.", exampleAr: 'من المدهش أنه كان هادئاً إلى هذا الحد.' },
      ],
      source: 'Vocabulary Bank 2A, page 137',
    },
    {
      type: 'text',
      title: 'Reading: a story about a painting surprise',
      titleAr: 'القراءة: قصة مفاجأة الرسم',
      paragraphs: [
        'Read the story and choose the best final sentence for it. This happened when my sister and I were three and four years old. It was the summer holidays and my granddad was looking after us. We were bored, so we went into the garage and were really excited when we found all dad\u2019s paints. We decided to surprise him by painting the house while he was at work.',
        'We managed to paint a big area of wall blue before my granddad noticed. I think he found it a bit embarrassing that he wasn\u2019t watching us carefully enough. He said to us, \u201cYour dad is going to be really annoyed!\u201d My sister and I were frightened, but when dad came home, all he said was, \u201cI\u2019m surprised you chose blue. I thought you two preferred red.\u201d Now I look back, it\u2019s amazing that he was so calm. He was probably disappointed with us, but he didn\u2019t show it.',
      ],
    },
    {
      type: 'audio',
      title: 'Listening: a story about two friends in India',
      titleAr: 'الاستماع: قصة صديقتين في الهند',
      tracks: au(['2.01']),
    },
    {
      type: 'exercise',
      exercise: {
        id: 'u2-2a-listening',
        title: 'The story of Beth and Jane',
        kind: 'true-false',
        instructions: 'Listen to the story about two friends travelling in India, then answer the questions about the events.',
        instructionsAr: 'استمع إلى قصة صديقتين تسافران في الهند، ثم أجب عن الأسئلة المتعلقة بالأحداث.',
        page: 21,
        verified: true,
        questions: [
          {
            id: 'q1',
            kind: 'true-false',
            statement: 'Beth and Jane were travelling by train in India.',
            correct: true,
          },
          {
            id: 'q2',
            kind: 'true-false',
            statement: 'Jane fell off the train while she was asleep.',
            correct: true,
          },
          {
            id: 'q3',
            kind: 'true-false',
            statement: 'Jane woke up on the railway track.',
            correct: true,
          },
          {
            id: 'q4',
            kind: 'true-false',
            statement: 'Beth was not worried about Jane.',
            correct: false,
          },
          {
            id: 'q5',
            kind: 'true-false',
            statement: 'Nobody helped Jane.',
            correct: false,
          },
        ],
      },
    },
    {
      type: 'grammar',
      title: 'narrative tenses',
      titleAr: 'أزمنة السرد',
      explanation:
        'When we tell a story, we use the past continuous to set the scene (background information), the past simple for the main events, and the past perfect to talk about an earlier event.',
      explanationAr: 'عندما نسرد قصة، نستخدم الماضي المستمر لتهيئة المشهد (المعلومات الخلفية)، والماضي البسيط للأحداث الرئيسية، والماضي التام للتحدث عن حدث أقدم.',
      rule:
        "past continuous: background information \u2192 They were sleeping on the floor. past simple: the main events \u2192 Suddenly, the train stopped in the middle of nowhere. past perfect: had + past participle for an earlier event \u2192 Jane woke up on the railway track. She had fallen off the train.",
      ruleAr: 'الماضي المستمر: للمعلومات الخلفية \u2192 كانوا ينامون على الأرض. الماضي البسيط: للأحداث الرئيسية \u2192 فجأة توقف القطار في مكان مقطوع. الماضي التام: had + التصريف الماضي للحدث الأسبق \u2192 استيقظت جين على سكة القطار، وكانت قد سقطت منه.',
      table: {
        headers: ['Tense', 'Use'],
        rows: [
          { label: 'past continuous', values: ['background information / to set the scene', 'They were sleeping on the floor.', 'She was getting very worried.'] },
          { label: 'past simple', values: ['the main events in the story', 'Suddenly, the train stopped in the middle of nowhere.', 'The driver left me on the beach.'] },
          { label: 'past perfect', values: ['an earlier event in the past', 'Jane woke up on the railway track. She had fallen off the train.', 'I couldn\u2019t remember the exact beach where we had arranged to meet.'] },
        ],
      },
      examples: [
        'They were sleeping on the floor when the train stopped suddenly.',
        'I had never been on a jet ski before, so I was really excited.',
        'When I found the right place, the driver had already left.',
      ],
      bankPage: 108,
      videos: [
        { id: 'rZS5qlCGCIY', title: 'How to Talk About the Past in English' },
        { id: 'iKi4Jy6r-0s', title: 'How to Use the Past Perfect Tense in English - English Grammar Lesson' },
        { id: 'hk4MjcRdTgc', title: 'English Verb Tenses Guide - Learn About Simple, Perfect, and Continuous Tenses' },
      ],
    },
    {
      type: 'exercise',
      exercise: {
        id: 'u2-2a-grammar',
        title: 'Narrative tenses',
        kind: 'mcq',
        instructions: 'Choose the correct verb form to complete the sentences.',
        instructionsAr: 'اختر صيغة الفعل الصحيحة لإكمال الجمل.',
        page: 21,
        verified: true,
        questions: [
          {
            id: 'q1',
            kind: 'mcq',
            prompt: 'Jane woke up on the railway track. She \u2026 off the train.',
            options: [
              { label: 'had fallen', correct: true },
              { label: 'fell' },
              { label: 'was falling' },
            ],
          },
          {
            id: 'q2',
            kind: 'mcq',
            prompt: 'They \u2026 on the roof of the train when it stopped.',
            options: [
              { label: 'were sitting', correct: true },
              { label: 'sat' },
              { label: 'had sat' },
            ],
          },
          {
            id: 'q3',
            kind: 'mcq',
            prompt: 'I was walking around, when I \u2026 lost.',
            options: [
              { label: 'got', correct: true },
              { label: 'had got' },
              { label: 'was getting' },
            ],
          },
        ],
      },
    },
    {
      type: 'audio',
      title: 'Pronunciation: weak forms of was, were and had',
      titleAr: 'النطق: الصيغ النبرية لـ was وwere وhad',
      tracks: au(['2.02', '2.03']),
    },
    {
      type: 'text',
      title: 'Speaking: tell an anecdote',
      titleAr: 'التحدث: اروِ قصة خفيفة',
      paragraphs: [
        'You are going to tell your partner an anecdote about a personal memory. Choose one of the situations below, or your own idea: you visited an amazing place; you went to a fun event (a sports or music event, or a party); you saw or met someone famous or interesting; something unusual happened to you; something went wrong (you lost or forgot something).',
        'Plan your anecdote. Answer: When was it? Where were you? Who were you with? What happened? How did you feel? What happened in the end? Then tell your anecdotes in groups, adding as much detail as you can.',
      ],
    },
    {
      type: 'text',
      title: 'Writing: a personal story',
      titleAr: 'الكتابة: قصة شخصية',
      paragraphs: [
        'Read the story \u201cLeft on an island off Okinawa\u201d about what happened to Rob, then complete it with the linking phrases: after that, as soon as, at first, by the time, in the end, one day, while. Then write your own story using narrative tenses and some of the linking phrases.',
        'Linking phrases and their meanings: while (two actions happening at the same time); in the end (something that happens at the end of the story); as soon as (immediately after another action); after that (the action that happens next); by the time (an action that happened previously); one day (sets the scene at the beginning); at first (the action at the beginning).',
      ],
    },
    {
      type: 'pages',
      images: [img(34, 'What happened?', 'Adjectives for feelings and a story about painting the house'), img(35, 'Listening and grammar', 'Beth and Jane\u2019s story in India and narrative tenses'), img(36, 'Speaking and writing', 'Tell an anecdote and write a personal story')],
    },
  ],
}

// ===========================================================================
// 2B Storytelling
// ===========================================================================

const lesson2B: Lesson = {
  id: '2b',
  code: '2B',
  title: 'Storytelling',
  subtitle: 'Story words; types of film \u2022 Past simple and present perfect',
  pages: [23, 25],
  labels: {
    grammar: 'past simple and present perfect',
    vocabulary: 'story words; types of film',
    pronunciation: 'contracted have in the present perfect',
  },
  objectives: [
    'read an article about storytelling',
    'talk about films, books and plays using the past simple and present perfect',
    'discuss what makes a good story',
  ],
  blocks: [
    {
      type: 'callout',
      title: 'Lesson 2B',
      titleAr: 'الدرس 2ب',
      tone: 'info',
      text: 'Storytelling \u2013 you read an article about how stories have changed from cave paintings to video games, and talk about films, books and TV shows using the past simple and the present perfect.',
      textAr: 'سرد القصص \u2013 تقرأ مقالاً عن كيف تغيرت القصص من رسومات الكهوف إلى ألعاب الفيديو، وتتحدث عن الأفلام والكتب والبرامج التلفزيونية باستخدام الماضي البسيط والمضارع التام.',
    },
    {
      type: 'vocab',
      title: 'story words',
      titleAr: 'مفردات القصة',
      items: [
        { word: 'hero', meaning: 'the main person in a story', meaningAr: 'البطل', example: 'The hero of the film saves the town.', exampleAr: 'بطل الفيلم ينقذ البلدة.' },
        { word: 'characters', meaning: 'the people in a story', meaningAr: 'الشخصيات', example: 'The characters in this book are very realistic.', exampleAr: 'شخصيات هذا الكتاب واقعية جداً.' },
        { word: 'plot', meaning: 'the main events in a story', meaningAr: 'الحبكة / مجرى الأحداث', example: 'I think having an exciting plot is important.', exampleAr: 'أعتقد أن وجود حبكة مثيرة أمر مهم.' },
        { word: 'ending', meaning: 'the way a story finishes', meaningAr: 'النهاية', example: 'I like a happy ending, too.', exampleAr: 'أنا أحب النهايات السعيدة أيضاً.' },
        { word: 'storyteller', meaning: 'a person who tells the story', meaningAr: 'الراوي / الحكواتي', example: 'The storyteller at the festival was amazing.', exampleAr: 'كان الراوي في المهرجان رائعاً.' },
        { word: 'performances', meaning: 'when people act or sing in front of people', meaningAr: 'العروض / الأداء التمثيلي', example: "I love the actors' performances.", exampleAr: 'أحب أداء الممثلين.' },
        { word: 'fairytales', meaning: 'traditional stories for children', meaningAr: 'الحكايات الخيالية', example: 'My grandmother told me fairytales.', exampleAr: 'أخبرتني جدّتي حكايات خيالية.' },
        { word: 'TV shows', meaning: 'programmes which are shown on television', meaningAr: 'البرامج التلفزيونية', example: "It's the same with TV shows and films.", exampleAr: 'الأمر نفسه مع البرامج التلفزيونية والأفلام.' },
      ],
      source: 'Vocabulary Bank 2B, page 137',
    },
    {
      type: 'audio',
      title: 'Listening: what makes a good story?',
      titleAr: 'الاستماع: ما الذي يجعل القصة جيدة؟',
      tracks: au(['2.04']),
    },
    {
      type: 'exercise',
      exercise: {
        id: 'u2-2b-storywords',
        title: 'Story words: match the meanings',
        kind: 'mcq',
        instructions: 'Match the story words with their meanings.',
        instructionsAr: 'طابق مفردات القصة مع معانيها.',
        page: 23,
        verified: true,
        questions: [
          {
            id: 'q1',
            kind: 'mcq',
            prompt: 'What does "hero" mean?',
            options: [
              { label: 'the main person in a story', correct: true },
              { label: 'the people in a story' },
              { label: 'the main events in a story' },
              { label: 'the way a story finishes' },
              { label: 'a person who tells the story' },
              { label: 'when people act or sing in front of people' },
              { label: 'traditional stories for children' },
              { label: 'programmes which are shown on television' },
            ],
          },
          {
            id: 'q2',
            kind: 'mcq',
            prompt: 'What does "characters" mean?',
            options: [
              { label: 'the main person in a story' },
              { label: 'the people in a story', correct: true },
              { label: 'the main events in a story' },
              { label: 'the way a story finishes' },
              { label: 'a person who tells the story' },
              { label: 'when people act or sing in front of people' },
              { label: 'traditional stories for children' },
              { label: 'programmes which are shown on television' },
            ],
          },
          {
            id: 'q3',
            kind: 'mcq',
            prompt: 'What does "plot" mean?',
            options: [
              { label: 'the main person in a story' },
              { label: 'the people in a story' },
              { label: 'the main events in a story', correct: true },
              { label: 'the way a story finishes' },
              { label: 'a person who tells the story' },
              { label: 'when people act or sing in front of people' },
              { label: 'traditional stories for children' },
              { label: 'programmes which are shown on television' },
            ],
          },
          {
            id: 'q4',
            kind: 'mcq',
            prompt: 'What does "ending" mean?',
            options: [
              { label: 'the main person in a story' },
              { label: 'the people in a story' },
              { label: 'the main events in a story' },
              { label: 'the way a story finishes', correct: true },
              { label: 'a person who tells the story' },
              { label: 'when people act or sing in front of people' },
              { label: 'traditional stories for children' },
              { label: 'programmes which are shown on television' },
            ],
          },
          {
            id: 'q5',
            kind: 'mcq',
            prompt: 'What does "storyteller" mean?',
            options: [
              { label: 'the main person in a story' },
              { label: 'the people in a story' },
              { label: 'the main events in a story' },
              { label: 'the way a story finishes' },
              { label: 'a person who tells the story', correct: true },
              { label: 'when people act or sing in front of people' },
              { label: 'traditional stories for children' },
              { label: 'programmes which are shown on television' },
            ],
          },
          {
            id: 'q6',
            kind: 'mcq',
            prompt: 'What does "performances" mean?',
            options: [
              { label: 'the main person in a story' },
              { label: 'the people in a story' },
              { label: 'the main events in a story' },
              { label: 'the way a story finishes' },
              { label: 'a person who tells the story' },
              { label: 'when people act or sing in front of people', correct: true },
              { label: 'traditional stories for children' },
              { label: 'programmes which are shown on television' },
            ],
          },
          {
            id: 'q7',
            kind: 'mcq',
            prompt: 'What does "fairytales" mean?',
            options: [
              { label: 'the main person in a story' },
              { label: 'the people in a story' },
              { label: 'the main events in a story' },
              { label: 'the way a story finishes' },
              { label: 'a person who tells the story' },
              { label: 'when people act or sing in front of people' },
              { label: 'traditional stories for children', correct: true },
              { label: 'programmes which are shown on television' },
            ],
          },
          {
            id: 'q8',
            kind: 'mcq',
            prompt: 'What does "TV shows" mean?',
            options: [
              { label: 'the main person in a story' },
              { label: 'the people in a story' },
              { label: 'the main events in a story' },
              { label: 'the way a story finishes' },
              { label: 'a person who tells the story' },
              { label: 'when people act or sing in front of people' },
              { label: 'traditional stories for children' },
              { label: 'programmes which are shown on television', correct: true },
            ],
          },
        ],
      },
    },
    {
      type: 'exercise',
      exercise: {
        id: 'u2-2b-films',
        title: 'Guess the film',
        kind: 'mcq',
        instructions: 'Match the 10-word summaries with the famous films.',
        instructionsAr: 'طابق الملخصات المكوّنة من عشر كلمات مع الأفلام الشهيرة.',
        page: 23,
        verified: true,
        questions: [
          {
            id: 'q1',
            kind: 'mcq',
            prompt: 'Which film is described by "Boys go on a long journey to throw away a dangerous ring."?',
            options: [
              { label: 'The Lord of the Rings', correct: true },
              { label: 'Frozen' },
              { label: 'Titanic' },
              { label: 'Jurassic Park' },
              { label: 'Home Alone' },
            ],
          },
          {
            id: 'q2',
            kind: 'mcq',
            prompt: 'Which film is described by "Girl travels to find a sister who can stop an ice age."?',
            options: [
              { label: 'The Lord of the Rings' },
              { label: 'Frozen', correct: true },
              { label: 'Titanic' },
              { label: 'Jurassic Park' },
              { label: 'Home Alone' },
            ],
          },
          {
            id: 'q3',
            kind: 'mcq',
            prompt: 'Which film is described by "Great-grandma remembers the worst, most famous boat trip in history."?',
            options: [
              { label: 'The Lord of the Rings' },
              { label: 'Frozen' },
              { label: 'Titanic', correct: true },
              { label: 'Jurassic Park' },
              { label: 'Home Alone' },
            ],
          },
          {
            id: 'q4',
            kind: 'mcq',
            prompt: 'Which film is described by "World\'s best theme park becomes world\'s most dangerous theme park."?',
            options: [
              { label: 'The Lord of the Rings' },
              { label: 'Frozen' },
              { label: 'Titanic' },
              { label: 'Jurassic Park', correct: true },
              { label: 'Home Alone' },
            ],
          },
          {
            id: 'q5',
            kind: 'mcq',
            prompt: 'Which film is described by "Boy accidentally misses the family holiday and helps catch burglars at home."?',
            options: [
              { label: 'The Lord of the Rings' },
              { label: 'Frozen' },
              { label: 'Titanic' },
              { label: 'Jurassic Park' },
              { label: 'Home Alone', correct: true },
            ],
          },
        ],
      },
    },
    {
      type: 'text',
      title: 'Reading: The lives of stories',
      titleAr: 'القراءة: حياة القصص',
      paragraphs: [
        'Stories have always been important, but the ways we tell them have changed through time. Before the development of writing, people told their stories aloud. Then writing and books came along and changed all that. Now, with virtual reality and gaming technology, stories are more interactive than before. The players help to create the story. They choose names for their heroes, and decide where characters go, what they do and how they interact with other characters.',
        'Storytelling is as old as language. Stories are everywhere and in every culture. India, China and Mexico all have their own version of the fairytale Cinderella. People in the Middle East have told the story of Little Red Riding Hood for a thousand years. Australian First Nation people tell stories about how the first people sang the world into existence.',
        'Good stories last forever because they entertain us and teach us important life lessons. They show that there are good and bad people, dangers, problems and solutions. Stories often help us to see ourselves more clearly and to see how we can become better people.',
      ],
    },
    {
      type: 'exercise',
      exercise: {
        id: 'u2-2b-reading',
        title: 'Reading: true or false',
        kind: 'true-false',
        instructions: 'Read the article again and decide if these ideas are mentioned (true) or not (false).',
        instructionsAr: 'أعد قراءة المقال وقرر هل هذه الأفكار مذكورة فيه (صحيح) أم لا (خاطئ).',
        page: 25,
        verified: true,
        questions: [
          { id: 'q1', kind: 'true-false', statement: 'Storytelling is a very old art.', correct: true },
          { id: 'q2', kind: 'true-false', statement: 'We can learn a lot from stories.', correct: true },
          { id: 'q3', kind: 'true-false', statement: "Schools don't usually teach fairytales.", correct: false },
          { id: 'q4', kind: 'true-false', statement: 'People who play video games help create the story.', correct: true },
          { id: 'q5', kind: 'true-false', statement: 'Technology has changed the way we tell stories.', correct: true },
          { id: 'q6', kind: 'true-false', statement: 'Writers spend a lot of time writing TV shows.', correct: false },
          { id: 'q7', kind: 'true-false', statement: 'Some stories remain popular for a long time.', correct: true },
        ],
      },
    },
    {
      type: 'grammar',
      title: 'past simple and present perfect',
      titleAr: 'الماضي البسيط والمضارع التام',
      explanation:
        "The past simple describes an event that started and finished at a specific time in the past. The present perfect describes something that started in the past and continues, or is still important, now.",
      explanationAr: 'يصف الماضي البسيط حدثاً بدأ وانتهى في وقت محدد في الماضي. ويصف المضارع التام شيئاً بدأ في الماضي وما زال مستمراً، أو ما يزال مهماً، حتى الآن.',
      rule:
        "past simple: an event that started and finished at a specific time in the past \u2192 In December 2019, researchers in Indonesia found a cave with paintings. present perfect: something that started in the past and continues, or is still important, now \u2192 People in the Middle East have told the story of Little Red Riding Hood for a thousand years. New technologies have brought exciting new ways to tell stories.",
      ruleAr: 'الماضي البسيط: حدث بدأ وانتهى في وقت محدد في الماضي \u2192 في ديسمبر 2019، وجد الباحثون في إندونيسيا كهفاً يحتوي على رسومات. المضارع التام: شيء بدأ في الماضي وما زال مستمراً أو مهماً الآن \u2192 يروي الناس في الشرق الأوسط قصة ذات الرداء الأحمر منذ ألف عام. وقد جلبت التقنيات الجديدة طرقاً مثيرة لسرد القصص.',
      table: {
        headers: ['Tense', 'Use'],
        rows: [
          { label: 'past simple', values: ['started and finished at a specific time in the past', 'In December 2019, researchers in Indonesia found a cave with paintings.'] },
          { label: 'present perfect', values: ['started in the past and continues, or is still important, now', 'People in the Middle East have told the story of Little Red Riding Hood for a thousand years.'] },
          { label: 'present perfect of have', values: ['contracted form: I\u2019ve, you\u2019ve, they\u2019ve', "New technologies have brought exciting new ways to tell stories."] },
        ],
      },
      examples: [
        'People in the Middle East have told the story of Little Red Riding Hood for a thousand years.',
        'New technologies have brought exciting new ways to tell stories.',
        'In December 2019, researchers in Indonesia found a cave with paintings.',
      ],
      bankPage: 109,
      videos: [
        { id: 'hk4MjcRdTgc', title: 'English Verb Tenses Guide - Learn About Simple, Perfect, and Continuous Tenses' },
        { id: 'rZS5qlCGCIY', title: 'How to Talk About the Past in English' },
        { id: 'zBzUJlOo930', title: 'Present Perfect Verb Tense - English Grammar Lesson' },
      ],
    },
    {
      type: 'exercise',
      exercise: {
        id: 'u2-2b-grammar',
        title: 'Past simple or present perfect?',
        kind: 'mcq',
        instructions: 'Choose the correct verb form.',
        instructionsAr: 'اختر صيغة الفعل الصحيحة.',
        page: 24,
        verified: true,
        questions: [
          {
            id: 'q1',
            kind: 'mcq',
            prompt: 'In December 2019, researchers in Indonesia \u2026 a cave with paintings.',
            options: [
              { label: 'found', correct: true },
              { label: 'have found' },
              { label: 'find' },
            ],
          },
          {
            id: 'q2',
            kind: 'mcq',
            prompt: 'People in the Middle East \u2026 the story of Little Red Riding Hood for a thousand years.',
            options: [
              { label: 'have told', correct: true },
              { label: 'told' },
              { label: 'tell' },
            ],
          },
          {
            id: 'q3',
            kind: 'mcq',
            prompt: 'New technologies \u2026 exciting new ways to tell stories.',
            options: [
              { label: 'have brought', correct: true },
              { label: 'brought' },
              { label: 'are bringing' },
            ],
          },
        ],
      },
    },
    {
      type: 'audio',
      title: 'Pronunciation: contracted have in the present perfect',
      titleAr: 'النطق: have المخففة في المضارع التام',
      tracks: au(['2.05']),
    },
    {
      type: 'text',
      title: 'Speaking: find someone who \u2026',
      titleAr: 'التحدث: ابحث عن شخص \u2026',
      paragraphs: [
        'Move around the classroom. Ask your classmates questions and find a name to add to each activity in the table: has watched a really frightening horror film; has been to the cinema recently; has seen every episode of a TV show; has read more than fifty books; has played a lot of different video games; has read or seen a play by William Shakespeare; has acted in a film, TV show or play; has met a famous writer, actor or YouTuber. Ask more questions and add extra information.',
      ],
    },
    {
      type: 'pages',
      images: [img(37, 'Storytelling', 'Story words and film summaries'), img(38, 'Reading and grammar', 'The lives of stories and past simple vs present perfect'), img(39, 'Reading text', 'The lives of stories: from cave paintings to video games')],
    },
  ],
}

// ===========================================================================
// 2C A likely story!
// ===========================================================================

const lesson2C: Lesson = {
  id: '2c',
  code: '2C',
  title: 'A likely story!',
  subtitle: 'How to \u2026 apologise and give reasons',
  pages: [26, 27],
  labels: {
    grammar: 'how to \u2026 apologise and give reasons',
    vocabulary: 'collocations with get and make',
    pronunciation: 'intonation for apologising',
  },
  objectives: [
    'apologise and give reasons for being late or missing something',
    'use collocations with get and make',
    'practise the intonation of apologies',
  ],
  blocks: [
    {
      type: 'callout',
      title: 'Lesson 2C',
      titleAr: 'الدرس 2ج',
      tone: 'info',
      text: 'A likely story! \u2013 you learn to apologise and give reasons. An excuse (n) is a reason given or invented to explain why you did something wrong.',
      textAr: 'قصة محتملة! \u2013 تتعلم كيف تعتذر وتعطي أسباباً. العذر (اسم) هو سبب يُعطى أو يُختلق لشرح سبب فعل شيء خاطئ.',
    },
    {
      type: 'vocab',
      title: 'collocations with get and make',
      titleAr: 'التوافقيات اللفظية مع get وmake',
      items: [
        { word: 'get off', meaning: 'to leave a bus or train', meaningAr: 'ينزل من (الحافلة أو القطار)', example: 'I got off at the wrong bus stop!', exampleAr: 'نزلت في موقف الحافلة الخطأ!' },
        { word: 'get lost', meaning: 'to not know where you are', meaningAr: 'يتوه / يضيع الطريق', example: 'Sorry I\u2019m late \u2013 I got lost!', exampleAr: 'آسف على التأخير – لقد تهتُ!' },
        { word: 'get held up', meaning: 'to be delayed', meaningAr: 'يتأخر (بسبب عائق)', example: 'I got held up at work.', exampleAr: 'تأخرت بسبب العمل.' },
        { word: 'get the wrong day/time/date/address', meaning: 'to understand something wrongly', meaningAr: 'يخطئ في اليوم/الوقت/التاريخ/العنوان', example: 'I got the wrong day!', exampleAr: 'أخطأت في اليوم!' },
        { word: 'make a mistake', meaning: 'to do something wrong', meaningAr: 'يرتكب خطأ', example: 'I made a mistake with the address.', exampleAr: 'أخطأت في العنوان.' },
        { word: 'make a call', meaning: 'to phone someone', meaningAr: 'يُجري مكالمة هاتفية', example: 'I had to make an urgent call.', exampleAr: 'كان عليّ إجراء مكالمة عاجلة.' },
        { word: 'make a plan', meaning: 'to agree to do something at a certain time', meaningAr: 'يضع خطة / يتفق على موعد', example: 'My partner made other plans and I didn\u2019t know until it was too late.', exampleAr: 'وضع شريكي خططاً أخرى ولم أعرف إلا بعد فوات الأوان.' },
        { word: 'make a mess', meaning: 'to make something dirty or untidy', meaningAr: 'يُحدِث فوضى', example: 'My little sister made a mess and I had to clean it up.', exampleAr: 'أحدثت أختي الصغيرة فوضى واضطررت لتنظيفها.' },
      ],
    },
    {
      type: 'exercise',
      exercise: {
        id: 'u2-2c-collocations',
        title: 'Collocations with get and make',
        kind: 'mcq',
        instructions: 'Match the collocations with their meanings.',
        instructionsAr: 'طابق التوافقيات اللفظية مع معانيها.',
        page: 26,
        verified: true,
        questions: [
          {
            id: 'q1',
            kind: 'mcq',
            prompt: 'What does "get off" mean?',
            options: [
              { label: 'to leave a bus or train', correct: true },
              { label: 'to not know where you are' },
              { label: 'to be delayed' },
              { label: 'to do something wrong' },
            ],
          },
          {
            id: 'q2',
            kind: 'mcq',
            prompt: 'What does "get lost" mean?',
            options: [
              { label: 'to not know where you are', correct: true },
              { label: 'to leave a bus or train' },
              { label: 'to phone someone' },
              { label: 'to make something dirty or untidy' },
            ],
          },
          {
            id: 'q3',
            kind: 'mcq',
            prompt: 'What does "get held up" mean?',
            options: [
              { label: 'to be delayed', correct: true },
              { label: 'to do something wrong' },
              { label: 'to understand something wrongly' },
              { label: 'to agree to do something at a certain time' },
            ],
          },
          {
            id: 'q4',
            kind: 'mcq',
            prompt: 'What does "get the wrong day" mean?',
            options: [
              { label: 'to understand something wrongly', correct: true },
              { label: 'to not know where you are' },
              { label: 'to be delayed' },
              { label: 'to make something dirty or untidy' },
            ],
          },
          {
            id: 'q5',
            kind: 'mcq',
            prompt: 'What does "make a mistake" mean?',
            options: [
              { label: 'to do something wrong', correct: true },
              { label: 'to phone someone' },
              { label: 'to be delayed' },
              { label: 'to leave a bus or train' },
            ],
          },
          {
            id: 'q6',
            kind: 'mcq',
            prompt: 'What does "make a call" mean?',
            options: [
              { label: 'to phone someone', correct: true },
              { label: 'to make something dirty or untidy' },
              { label: 'to agree to do something at a certain time' },
              { label: 'to not know where you are' },
            ],
          },
          {
            id: 'q7',
            kind: 'mcq',
            prompt: 'What does "make a plan" mean?',
            options: [
              { label: 'to agree to do something at a certain time', correct: true },
              { label: 'to understand something wrongly' },
              { label: 'to be delayed' },
              { label: 'to do something wrong' },
            ],
          },
          {
            id: 'q8',
            kind: 'mcq',
            prompt: 'What does "make a mess" mean?',
            options: [
              { label: 'to make something dirty or untidy', correct: true },
              { label: 'to phone someone' },
              { label: 'to not know where you are' },
              { label: 'to leave a bus or train' },
            ],
          },
        ],
      },
    },
    {
      type: 'text',
      title: 'That\u2019s a bad excuse!',
      titleAr: 'هذا عذر سيئ!',
      paragraphs: [
        'Read the worst excuses people give for being late: \u201cMy dog\u2019s unwell\u201d (don\u2019t say your pet is ill when everyone knows you don\u2019t have one). \u201cI fell asleep, so I missed the bus\u201d (no good when your boss knows you drive to work). \u201cI thought it was Saturday today\u201d (do you want your colleagues to think you don\u2019t know what day it is?). \u201cI fell over and broke my toe\u201d (this is OK, but you need to make a plan to get back to work). \u201cI was held up in a traffic jam, so I drove a different way, but then I got lost.\u201d And finally, \u201cI spilled my breakfast and it made a mess on my shirt, and I don\u2019t have a clean one.\u201d',
        'Our advice: if you can\u2019t think of a good excuse, don\u2019t even make the call to the office!',
      ],
    },
    {
      type: 'audio',
      title: 'Listening: six conversations with problems',
      titleAr: 'الاستماع: ست محادثات فيها مشكلات',
      tracks: au(['2.06']),
    },
    {
      type: 'exercise',
      exercise: {
id: 'u2-2c-listening',
        title: 'Listen and match the problem',
        kind: 'mcq',
        instructions: 'Listen to the conversations and match each conversation with the problem.',
        instructionsAr: 'استمع إلى المحادثات وطابق كل محادثة مع المشكلة.',
        page: 27,
        verified: true,
        questions: [
          {
            id: 'q1',
            kind: 'mcq',
            prompt: 'What problem is described in Conversation 1?',
            options: [
              { label: 'The train was late so the person missed the beginning of the film.', correct: true },
              { label: 'The person got on the wrong bus and got lost.' },
              { label: 'The person got the wrong day for the meeting.' },
              { label: 'The person made a mess in the kitchen.' },
              { label: 'The person made a mistake in the exam.' },
              { label: 'The person was held up in a traffic jam.' },
            ],
          },
          {
            id: 'q2',
            kind: 'mcq',
            prompt: 'What problem is described in Conversation 2?',
            options: [
              { label: 'The train was late so the person missed the beginning of the film.' },
              { label: 'The person got on the wrong bus and got lost.', correct: true },
              { label: 'The person got the wrong day for the meeting.' },
              { label: 'The person made a mess in the kitchen.' },
              { label: 'The person made a mistake in the exam.' },
              { label: 'The person was held up in a traffic jam.' },
            ],
          },
          {
            id: 'q3',
            kind: 'mcq',
            prompt: 'What problem is described in Conversation 3?',
            options: [
              { label: 'The train was late so the person missed the beginning of the film.' },
              { label: 'The person got on the wrong bus and got lost.' },
              { label: 'The person got the wrong day for the meeting.', correct: true },
              { label: 'The person made a mess in the kitchen.' },
              { label: 'The person made a mistake in the exam.' },
              { label: 'The person was held up in a traffic jam.' },
            ],
          },
          {
            id: 'q4',
            kind: 'mcq',
            prompt: 'What problem is described in Conversation 4?',
            options: [
              { label: 'The train was late so the person missed the beginning of the film.' },
              { label: 'The person got on the wrong bus and got lost.' },
              { label: 'The person got the wrong day for the meeting.' },
              { label: 'The person made a mess in the kitchen.', correct: true },
              { label: 'The person made a mistake in the exam.' },
              { label: 'The person was held up in a traffic jam.' },
            ],
          },
          {
            id: 'q5',
            kind: 'mcq',
            prompt: 'What problem is described in Conversation 5?',
            options: [
              { label: 'The train was late so the person missed the beginning of the film.' },
              { label: 'The person got on the wrong bus and got lost.' },
              { label: 'The person got the wrong day for the meeting.' },
              { label: 'The person made a mess in the kitchen.' },
              { label: 'The person made a mistake in the exam.', correct: true },
              { label: 'The person was held up in a traffic jam.' },
            ],
          },
          {
            id: 'q6',
            kind: 'mcq',
            prompt: 'What problem is described in Conversation 6?',
            options: [
              { label: 'The train was late so the person missed the beginning of the film.' },
              { label: 'The person got on the wrong bus and got lost.' },
              { label: 'The person got the wrong day for the meeting.' },
              { label: 'The person made a mess in the kitchen.' },
              { label: 'The person made a mistake in the exam.' },
{ label: 'The person was held up in a traffic jam.', correct: true },
            ],
          },
        ],
      },
    },
    {
      type: 'audio',
      title: 'Listening: check your answers',
      titleAr: 'الاستماع: تحقق من إجاباتك',
      tracks: au(['2.07']),
    },
    {
      type: 'examples',
      title: 'How to \u2026 apologise and give reasons',
      titleAr: 'كيف تعتذر وتعطي أسباباً؟',
      items: [
        'saying sorry: Sorry I\u2019m late. / Sorry to keep you waiting. / I apologise.',
        'giving a reason: There was a \u2026 delay / problem with \u2026 My train/flight was delayed/cancelled. I got the date/day/time/address wrong. The traffic was terrible. I made a mistake.',
        'accepting responsibility: I apologise. It was my fault.',
        'taking action: I\u2019ll be there as soon as possible.',
        'responding and reassuring: Don\u2019t worry. No problem. It\u2019s/That\u2019s fine.',
      ],
    },
    {
      type: 'exercise',
      exercise: {
        id: 'u2-2c-conversations',
        title: 'Complete the conversations',
        kind: 'fill-blank',
        instructions: 'Choose the correct words to complete the conversations.',
        instructionsAr: 'اختر الكلمات الصحيحة لإكمال المحادثات.',
        page: 27,
        verified: true,
        questions: [
          {
            id: 'q1',
            kind: 'fill-blank',
            before: 'Sorry to',
            answer: 'keep',
            after: ' you waiting! My flight was delayed.',
          },
          {
            id: 'q2',
            kind: 'fill-blank',
            before: 'I got the time wrong.\n\nSorry',
            answer: 'about that',
            after: '.',
          },
          {
            id: 'q3',
            kind: 'fill-blank',
            before: "The taxi driver",
            answer: 'got',
            after: " lost! I'll be there as soon as possible.",
          },
          {
            id: 'q4',
            kind: 'fill-blank',
            before: 'It was our',
            answer: 'fault',
            after: '. We sent the wrong one.',
          },
          {
            id: 'q5',
            kind: 'fill-blank',
            before: 'Never',
            answer: 'mind',
            after: ". You're here now.",
          },
        ],
      },
    },
    {
      type: 'audio',
      title: 'Pronunciation: intonation for apologising',
      titleAr: 'النطق: التنغيم عند الاعتذار',
      tracks: au(['2.08']),
    },
    {
      type: 'exercise',
      exercise: {
        id: 'u2-2c-pronunciation',
        title: 'Intonation for apologising',
        kind: 'mcq',
        instructions: 'Listen to four apologies and choose the correct answer about the intonation.',
        instructionsAr: 'استمع إلى أربعة اعتذارات واختر الإجابة الصحيحة المتعلقة بالتنغيم.',
        page: 27,
        verified: true,
        questions: [
          {
            id: 'q1',
            kind: 'mcq',
            prompt: 'When someone apologises, their voice \u2026',
            options: [
              { label: 'starts low and gets higher', correct: true },
              { label: 'starts high and gets lower' },
              { label: 'stays at the same level' },
            ],
          },
        ],
      },
    },
    {
      type: 'text',
      title: 'Speaking: roleplay',
      titleAr: 'التحدث: تمثيل أدوار',
      paragraphs: [
        'Roleplay two situations. Student A: 1) You missed a work meeting \u2013 apologise, accept responsibility and give a reason, and explain how you will take action. 2) You made a plan to have dinner with a friend at a restaurant; the friend is very late \u2013 accept your friend\u2019s apology, check they are OK, and ask if they still want to eat.',
        'Student B: read the situations on page 148.',
      ],
    },
    {
      type: 'pages',
      images: [img(40, '"A likely story!"', 'Collocations with get and make; bad excuses'), img(41, 'How to apologise', 'Apologising, giving reasons and intonation')],
    },
  ],
}

// ===========================================================================
// 2D BBC Programme: The story of a place
// ===========================================================================

const lesson2D: Lesson = {
  id: '2d',
  code: '2D',
  title: 'The story of a place',
  subtitle: 'BBC Programme \u2022 Prepositions of time',
  pages: [28, 29],
  labels: {
    grammar: 'prepositions of time',
    skills: 'the story of a place',
    writing: 'a review of a place',
  },
  objectives: [
    'understand a TV travel programme telling the story of a place',
    'talk about a place and how it is changing',
    'write a review of a place',
  ],
  blocks: [
    {
      type: 'callout',
      title: 'Lesson 2D',
      titleAr: 'الدرس 2د',
      tone: 'info',
      text: 'The story of a place \u2013 a BBC documentary about Matera in southern Italy, famous for its caves. Watch the video and learn about how the town has changed.',
      textAr: 'قصة مكان \u2013 وثائقي بي بي سي عن مدينة ماتيرا في جنوب إيطاليا، المشهورة بكهوفها. شاهد الفيديو وتعرف على كيف تغيرت المدينة.',
    },
    {
      type: 'video',
      title: 'BBC Programme: Mediterranean with Simon Reeve',
      titleAr: 'برنامج بي بي سي: البحر المتوسط مع سيمون ريف',
      videos: [
        { title: 'BBC Programme: the story of a place', file: 'SO3 B1 U2 BBC Programmes.mp4', page: 28 },
      ],
    },
    {
      type: 'text',
      title: 'Programme information',
      titleAr: 'معلومات عن البرنامج',
      paragraphs: [
        'Simon Reeve goes on an extraordinary journey around the Mediterranean, an area that attracts about a third of the world\u2019s tourism with its beautiful beaches and fascinating historical sights. Simon travels around the Mediterranean trying to uncover the everyday reality and the history behind what tourists see. In this programme Simon visits the town of Matera, in southern Italy, where he learns about the history of its famous caves.',
      ],
    },
    {
      type: 'exercise',
      exercise: {
        id: 'u2-2d-video-1',
        title: 'Watch: number the topics',
        kind: 'ordering',
        instructions: 'Watch the BBC video clip and number the topics in the order they are mentioned.',
        instructionsAr: 'شاهد مقطع فيديو بي بي سي ورتب المواضيع بالأرقام حسب ترتيب ذكرها.',
        questions: [
          {
            id: 'q1',
            kind: 'ordering',
            title: 'Number the topics in the order they are mentioned',
            items: ['modern tourism', 'a celebration', 'Matera in the past'],
          },
        ],
      },
    },
    {
      type: 'exercise',
      exercise: {
        id: 'u2-2d-video-2',
        title: 'Watch again: complete the summary',
        kind: 'fill-blank',
        instructions: 'Complete the summary of the video with one or two words in each gap.',
        instructionsAr: 'أكمل ملخص الفيديو بكلمة أو كلمتين في كل فراغ.',
        page: 28,
        verified: true,
        questions: [
          {
            id: 'q1',
            kind: 'fill-blank',
            before: 'People lived in the caves in Matera until the',
            answer: '1950s',
            after: '.',
          },
          {
            id: 'q2',
            kind: 'fill-blank',
            before: 'The government moved people out of the caves and into',
            answer: 'modern homes',
            after: '.',
          },
          {
            id: 'q3',
            kind: 'fill-blank',
            before: 'Now, Matera is turning the caves into holiday homes and',
            answer: 'hotels',
            after: '.',
          },
          {
            id: 'q4',
            kind: 'fill-blank',
            before: 'Before, families shared the caves with their',
            answer: 'animals',
            after: '.',
          },
        ],
      },
    },
    {
      type: 'exercise',
      exercise: {
        id: 'u2-2d-video-3',
        title: 'Watch again: true or false',
        kind: 'true-false',
        instructions: 'Watch the video again and decide if the statements are true (T) or false (F).',
        instructionsAr: 'شاهد الفيديو مرة أخرى وقرر هل العبارات صحيحة (T) أم خاطئة (F).',
        page: 28,
        verified: true,
        questions: [
          { id: 'q1', kind: 'true-false', statement: 'People lived in the caves in Matera until the 1950s.', correct: true },
          { id: 'q2', kind: 'true-false', statement: 'The government converted the caves into hospitals.', correct: false },
          { id: 'q3', kind: 'true-false', statement: 'Now the caves are being turned into holiday homes and hotels.', correct: true },
          { id: 'q4', kind: 'true-false', statement: 'Before, families shared the caves with their animals.', correct: true },
          { id: 'q5', kind: 'true-false', statement: 'Many towns and villages in southern Italy have been depopulated as young people move away.', correct: true },
        ],
      },
    },
    {
      type: 'grammar',
      title: 'prepositions of time',
      titleAr: 'حروف الجر للزمن',
      explanation:
        'We use before, until and during to talk about time in a narrative about a place or situation.',
      explanationAr: 'نستخدم before وuntil وduring للحديث عن الزمن في سرد يخص مكاناً أو موقفاً.',
      rule:
        "until: the situation continues up to that time \u2192 The old way of life continued in Matera until the Italian government moved people out of the caves. before: earlier than that time \u2192 Before they moved into modern homes, families shared the caves with their animals. during: at the same time as a period \u2192 The changes happened during the 1950s.",
      ruleAr: 'until: يستمر الموقف حتى ذلك الوقت \u2192 استمرت طريقة الحياة القديمة في ماتيرا حتى نقلت الحكومة الإيطالية الناس من الكهوف. before: قبل ذلك الوقت \u2192 قبل أن ينتقلوا إلى منازل حديثة، كانت العائلات تشارك الكهوف مع حيواناتها. during: في الوقت نفسه من فترة معينة \u2192 حدثت التغييرات أثناء خمسينيات القرن الماضي.',
      table: {
        headers: ['Preposition', 'Use'],
        rows: [
          { label: 'until', values: ['continues up to that time', 'The old way of life continued until the government moved people out.'] },
          { label: 'before', values: ['earlier than that time', 'Before they moved into modern homes, families shared the caves with their animals.'] },
          { label: 'during', values: ['at the same time as a period', 'The changes happened during the 1950s.'] },
        ],
      },
      examples: [
        'The old way of life continued in Matera until the Italian government moved people out of the caves.',
        'Before they moved into modern homes, families shared the caves with their animals.',
        'The changes happened during the 1950s.',
      ],
      bankPage: 111,
      videos: [
        { id: 'ViVuOsdaHHs', title: 'How to Talk About Time in English - Time Prepositions and Phrases' },
        { id: 'By94mMolWUI', title: 'How to Use To, In, and At - Prepositions in English Grammar' },
      ],
    },
    {
      type: 'text',
      title: 'Speaking: the story of a place',
      titleAr: 'التحدث: قصة مكان',
      paragraphs: [
        'Plan to talk about a place that is special to you (or a famous place in your country). Make some notes about the place in the past and now. Work in groups and take turns to tell the story of your place. Use the key phrases: When I first visited \u2026 it was \u2026 \u2026 is well known/famous for its \u2026 The city has changed a lot. Before \u2026 it was \u2026 Nowadays, \u2026 It has a wonderful atmosphere / a fantastic history / great food / amazing art galleries \u2026 The city has a lot to offer. You can explore/enjoy/visit \u2026 I really recommend it.',
      ],
    },
    {
      type: 'text',
      title: 'Writing: a review of a place',
      titleAr: 'الكتابة: تقييم لمكان',
      paragraphs: [
        'Read the review of Cornwall and notice how it describes the place in the past and now. Then write a review of a place you know. Write about: when you first went there, what it was like then, how it has changed, what it is like now, and who you would recommend it for and why.',
        'Cornwall: \u201cI first went to Cornwall on a family holiday when I was a child. At that time, the villages were very small and the beaches were usually empty. Historically, the area was known for its fishing. Nowadays, Cornwall is one of the most popular tourist destinations in the UK, and it\u2019s becoming more popular every year. I really recommend it for families or for anybody who enjoys exploring beautiful coastlines.\u201d',
      ],
    },
    {
      type: 'pages',
      images: [img(42, 'The story of a place', 'BBC Mediterranean programme: the town of Matera'), img(43, 'Speaking and writing', 'Tell the story of a place and write a review')],
    },
  ],
}

// ===========================================================================
// Unit 2 Review
// ===========================================================================

const lesson2Review: Lesson = {
  id: '2r',
  code: 'Review',
  title: 'Unit 2 Review',
  subtitle: 'Narrative tenses \u2022 Past simple and present perfect \u2022 Prepositions of time',
  pages: [30, 30],
  labels: {
    grammar: 'review',
    vocabulary: 'review',
    pronunciation: 'review',
  },
  objectives: ['revise the vocabulary and grammar of Unit 2', 'check your progress'],
  blocks: [
    {
      type: 'review',
      title: 'Unit 2 Review',
      titleAr: 'مراجعة الوحدة الثانية',
      text: 'Complete the tasks to recycle the grammar and vocabulary from Unit 2: narrative tenses, past simple and present perfect, prepositions of time, and collocations with get and make.',
    },
    {
      type: 'exercise',
      exercise: {
        id: 'u2-review-narrative',
        title: 'Narrative tenses',
        kind: 'fill-blank',
        instructions: 'Complete the story with the correct form of the verbs in brackets.',
        instructionsAr: 'أكمل القصة بالصيغة الصحيحة للأفعال بين الأقواس.',
        page: 30,
        verified: true,
        questions: [
          {
            id: 'q1',
            kind: 'fill-blank',
            before: 'Tim',
            answer: 'was sitting',
            after: ' at home when his friend, Angela, sent him a message.',
          },
          {
            id: 'q2',
            kind: 'fill-blank',
            before: 'Tim',
            answer: 'had forgotten',
            after: ' they were planning to have dinner.',
          },
          {
            id: 'q3',
            kind: 'fill-blank',
            before: 'By the time Tim arrived at the restaurant, Angela',
            answer: 'had eaten',
            after: ' her meal and left!',
          },
        ],
      },
    },
    {
      type: 'exercise',
      exercise: {
        id: 'u2-review-film',
        title: 'Types of film',
        kind: 'fill-blank',
        instructions: 'Complete the sentences by choosing the correct words from the options.',
        instructionsAr: 'أكمل الجمل باختيار الكلمات الصحيحة من الخيارات.',
        page: 30,
        verified: true,
        questions: [
          {
            id: 'q1',
            kind: 'fill-blank',
            before: "I'm going to the theatre tonight to see a really funny",
            answer: 'comedy',
            after: '. The plot starts at 7.30.',
          },
          {
            id: 'q2',
            kind: 'fill-blank',
            before: "It's a great",
            answer: 'action film',
            after: ' with lots of exciting car chases, but the plot is a bit boring, unfortunately.',
          },
          {
            id: 'q3',
            kind: 'fill-blank',
            before: 'I love watching',
            answer: 'biopics',
            after: " which tell us about a famous person's life. I can't watch horror films though.",
          },
        ],
      },
    },
    {
      type: 'exercise',
      exercise: {
        id: 'u2-review-prepositions',
        title: 'Prepositions of time',
        kind: 'true-false',
        instructions: 'Correct one or two mistakes in each sentence.',
        instructionsAr: 'صحح خطأً أو خطأين في كل جملة.',
        page: 30,
        verified: true,
        questions: [
          { id: 'q1', kind: 'true-false', statement: "We can't leave during six o'clock.", correct: false },
          { id: 'q2', kind: 'true-false', statement: 'She has worked very hard at these last two months.', correct: false },
          { id: 'q3', kind: 'true-false', statement: "She'll meet us in eight o'clock at Saturday morning.", correct: false },
          { id: 'q4', kind: 'true-false', statement: 'Marco Polo travelled to China on the 1200s.', correct: false },
          { id: 'q5', kind: 'true-false', statement: 'Sam stayed with us on March and September.', correct: false },
        ],
      },
    },
    {
      type: 'exercise',
      exercise: {
        id: 'u2-review-feelings',
        title: 'How would you feel?',
        kind: 'mcq',
        instructions: 'How would you feel in these situations? Choose the best adjective.',
        instructionsAr: 'كيف ستشعر في هذه المواقف؟ اختر أفضل صفة.',
        page: 31,
        verified: true,
        questions: [
          {
            id: 'q1',
            kind: 'mcq',
            prompt: 'Your flight is delayed for five hours.',
            options: [
              { label: 'annoyed and bored', correct: true },
              { label: 'excited and surprised' },
              { label: 'calm and relaxed' },
            ],
          },
          {
            id: 'q2',
            kind: 'mcq',
            prompt: 'You send a private email to all your colleagues.',
            options: [
              { label: 'embarrassed', correct: true },
              { label: 'frightened' },
              { label: 'proud' },
            ],
          },
          {
            id: 'q3',
            kind: 'mcq',
            prompt: 'A friend sends you some flowers unexpectedly.',
            options: [
              { label: 'surprised', correct: true },
              { label: 'disappointed' },
              { label: 'nervous' },
            ],
          },
          {
            id: 'q4',
            kind: 'mcq',
            prompt: 'You have just finished running a marathon.',
            options: [
              { label: 'exhausted and proud', correct: true },
              { label: 'bored' },
              { label: 'worried' },
            ],
          },
        ],
      },
    },
    {
      type: 'audio',
      title: 'Review listening: check your answers',
      titleAr: 'استماع المراجعة: تحقق من إجاباتك',
      tracks: au(['R2.01']),
    },
  ],
}

export const unit02: Unit = {
  id: 'unit-2',
  number: 2,
  title: 'Tale tellers',
  phrase: 'narrative tenses \u2022 past simple and present perfect \u2022 collocations with get and make \u2022 storytelling',
  overviewPage: 19,
  pages: [19, 30],
  intro:
    'In this unit you learn to tell stories and anecdotes using narrative tenses, talk about films, books and TV shows using the past simple and present perfect, apologise and give reasons, and understand a TV travel programme telling the story of a place.',
  objectives: [
    'understand a sequence in a narrative',
    'read an article about storytelling',
    'apologise and give reasons',
    'understand a TV travel programme telling the story of a place',
  ],
  video: [
    { title: 'BBC Vlogs: Tell me about a happy memory', file: 'SO3 B1 U2 BBC Vlogs.mp4', page: 19 },
    { title: 'BBC Programme: the story of a place', file: 'SO3 B1 U2 BBC Programmes.mp4', page: 28 },
  ],
  lessons: [
    lesson2A,
    lesson2B,
    lesson2C,
    lesson2D,
    lesson2Review,
  ],
}