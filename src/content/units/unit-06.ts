import type { Unit } from '../../types/content'
import { au, img } from '../helpers'

export const unit06: Unit = {
  id: 'unit-6',
  number: 6,
  title: 'creators',
  phrase: 'talk about the arts, creativity and creative geniuses',
  overviewPage: 67,
  pages: [67, 78],
  intro:
    'In this unit you read about two of the arts\u2019 greatest names, talk about creativity and being creative, ask for and give opinions, and write a nomination for an award.',
  objectives: [
    '6A – read about two famous people in the arts; talk about past hobbies',
    '6B – understand people talking about creativity; talk about ways to be more creative',
    '6C – ask for and give opinions and reasons',
    '6D – understand a documentary about an artist; write a nomination for an award',
  ],
  video: [
    {
      title: 'BBC Vlogs: What creative things do you do or are you interested in?',
      file: 'SO3 B1 U6 BBC Vlogs.mp4',
      page: 67,
    },
    {
      title: 'BBC Programme: An artist at work',
      file: 'SO3 B1 U6 BBC Programmes.mp4',
      page: 76,
    },
  ],
  lessons: [
    {
      id: '6a',
      code: '6A',
      title: 'The two Pablos',
      pages: [68, 70],
      labels: {
        grammar: 'used to',
        vocabulary: 'the arts: people, places, things',
        pronunciation: 'used to',
      },
      objectives: ['read about two famous people in the arts', 'use used to to talk about past habits', 'talk about past hobbies'],
      blocks: [
        {
          type: 'text',
          title: 'Two Pablos, one century',
          titleAr: 'بابلو و بابلو: قرن واحد',
          paragraphs: [
            'Both were called Pablo, both were from Spain, both produced incredible work, both spent years abroad and both died in 1973. In the arts, Pablo Picasso and Pablo Casals are world-famous.',
            'Picasso worked in many different styles and produced thousands of works of art about different subjects, and created some of the most famous images of the twentieth century. Casals was a great performer, whose recordings continue to influence musicians today. Both lived very long lives, but their work will live even longer.',
          ],
        },
        {
          type: 'vocab',
          title: 'the arts',
          titleAr: 'الفنون',
          items: [
            { word: 'musician', meaning: 'someone who is paid to play a musical instrument', meaningAr: 'موسيقي' },
            { word: 'the arts', meaning: 'music, writing, art, literature, film, etc.', meaningAr: 'الفنون' },
            { word: 'performer', meaning: 'someone who plays music or acts in public', meaningAr: 'مؤدٍّ / فنّان أداء' },
            { word: 'recording', meaning: 'something that is recorded so people can watch or listen again in the future', meaningAr: 'تسجيل' },
            { word: 'painter', meaning: 'a person who paints pictures', meaningAr: 'رسّام' },
            { word: 'style', meaning: 'the way a work of art looks', meaningAr: 'الأسلوب / الطراز' },
            { word: 'subjects', meaning: 'the things you are writing about, drawing or discussing', meaningAr: 'الموضوعات' },
            { word: 'composer', meaning: 'someone who writes music', meaningAr: 'ملحّن' },
            { word: 'works', meaning: 'the things that artists create (music, books, etc.)', meaningAr: 'الأعمال الفنية' },
            { word: 'image', meaning: 'any kind of picture', meaningAr: 'صورة' },
          ],
          source: 'See also Vocabulary Bank, page 141 (the arts: people, places, things)',
        },
        {
          type: 'text',
          title: 'The 3 a.m. genius',
          titleAr: 'العبقري في الثالثة فجراً',
          paragraphs: [
            "Picasso's mother said that her son's first word was piz, a short form of lapiz, the Spanish word for a pencil. The boy's father was an artist. From the age of five, Picasso drew everything he saw. He used to draw at school, at home, in restaurants, even in bed. He painted his first painting when he was seven and kept it for the rest of his life. He produced nearly 50,000 works.",
            'In 1904, Picasso moved from Spain to Paris. He was twenty-three years old and so poor that he had to burn some of his paintings to keep warm. He used to pay his bills by giving people drawings instead of money. It was in Paris that Picasso became a great artist.',
            'As his fame grew, he continued to produce more and more art. He used to arrive at his studio in the afternoon and often worked until 3 a.m. He lived a long life. He worked for over seventy years, and was still painting in his nineties. By the time he died, aged ninety-one, many people believed he was the greatest artist in history.',
          ],
        },
        {
          type: 'text',
          title: 'Ninety years of music',
          titleAr: 'تسعون عاماً من الموسيقى',
          paragraphs: [
            'Pablo Casals was one of Spain\u2019s greatest musicians. His father was a music teacher and as a baby, Casals used to listen to his father playing the piano. By the age of six, Casals played the piano and the violin. One day, he saw someone performing on a cello. He immediately fell in love with the instrument, stopped playing the violin and the piano, and became a cello player.',
            'From the age of thirteen, he used to start the day with a walk in nature. After this, he used to practise playing the same notes again and again, all before breakfast! On one visit to a second-hand music store, he found a sheet of cello music by Bach. It changed his life.',
            'He travelled all over the world playing the cello. At the age of twenty-three, he even played for Queen Victoria in London. Sixty-two years later, he played for President Kennedy in the White House. Casals never stopped practising the cello. When he was in his nineties, an interviewer asked him why he still practised every day. Casals replied that it was because he thought he was getting better! By the time he died, aged ninety-six, Casals was loved all over the world.',
          ],
        },
        {
          type: 'grammar',
          title: 'used to',
          titleAr: 'used to - العادات والحالات في الماضي',
          explanation:
            'We use used to + verb to talk about a regular habit or a state in the past that is no longer true.',
          explanationAr:
            'نستخدم used to + الفعل للحديث عن عادة منتظمة أو حالة في الماضي لم تعد صحيحة الآن.',
          rule: "used to + infinitive for habits and states in the past: 'He used to draw at school.' Didn't use to + infinitive for negatives: 'I didn't use to like vegetables.' Compare with a single past event: 'He painted his first painting when he was seven.'",
          ruleAr: "استخدمنا used to + verb للتحدث عن عادة/حالة في الماضي لم تعد صحيحة الآن، مثل: He used to draw at school. وللنفي: didn’t use to + verb (I didn’t use to like vegetables). قارن مع حدث واحد محدد في الماضي: He painted his first painting when he was seven.",
          table: {
            headers: ['Form', 'Example'],
            rows: [
              { values: ['used to + verb', 'He used to listen to his father playing the piano.'] },
              { values: ["didn't use to + verb", "I didn't use to like playing sports at school."] },
              { values: ['single past event (past simple)', 'He immediately fell in love with the instrument.'] },
            ],
          },
          examples: [
            'He used to arrive at his studio in the afternoon.',
            'He used to pay his bills by giving people drawings instead of money.',
            'I used to collect toy cars when I was a child.',
            'We used to live in the countryside.',
          ],
          bankPage: 124,
          videos: [
            { id: 'rZS5qlCGCIY', title: 'How to Talk About the Past in English' },
          ],
        },
        {
          type: 'exercise',
          exercise: {
            id: 'u6-6a-usedto',
            title: 'used to or past simple',
            kind: 'mcq',
            instructions: 'Choose the correct form.',
            instructionsAr: 'اختر الصيغة الصحيحة.',
            page: 70,
            verified: true,
            questions: [
              {
                id: 'q1',
                kind: 'mcq',
                prompt: 'He used to ___ at school, at home, in restaurants.',
                options: [
                  { label: 'draw', correct: true },
                  { label: 'drew', correct: false },
                ],
              },
              {
                id: 'q2',
                kind: 'mcq',
                prompt: 'He ___ his first painting when he was seven.',
                options: [
                  { label: 'painted', correct: true },
                  { label: 'used to paint', correct: false },
                ],
              },
              {
                id: 'q3',
                kind: 'mcq',
                prompt: 'As a baby, Casals used to ___ to his father playing the piano.',
                options: [
                  { label: 'listen', correct: true },
                  { label: 'listened', correct: false },
                ],
              },
              {
                id: 'q4',
                kind: 'mcq',
                prompt: 'He ___ playing the violin and became a cello player.',
                options: [
                  { label: 'stopped', correct: true },
                  { label: 'used to stop', correct: false },
                ],
              },
            ],
          },
        },
        {
          type: 'audio',
          title: 'Pronunciation: used to',
          titleAr: 'النطق: used to',
          tracks: au(['6.01'], 70),
        },
        {
          type: 'pages',
          images: [img(82, 'Lesson 6A, page 68'), img(83, 'Lesson 6A, page 69'), img(84, 'Lesson 6A, page 70')],
        },
      ],
    },
    {
      id: '6b',
      code: '6B',
      title: 'Be creative',
      pages: [71, 73],
      labels: {
        grammar: 'comparatives and superlatives',
        vocabulary: 'creativity: word building',
        pronunciation: 'word stress in word families',
      },
      objectives: ['understand people talking about creativity', 'use comparatives and superlatives', 'write a review'],
      blocks: [
        {
          type: 'text',
          title: 'The paperclip challenge',
          titleAr: 'تحدي مشبك الورق',
          paragraphs: [
            'Try this test to see how creative you are. Look at the paperclip. What do you think it could be used for? Write down as many ideas as possible. You have one minute.',
          ],
        },
        {
          type: 'text',
          title: 'What is creativity?',
          titleAr: 'ما هو الإبداع؟',
          paragraphs: [
            "When we think about creativity we often think of the world's most talented artists - people like Frida Kahlo, Einstein or Mozart. But you don't have to have more talent than everyone else to create something new and exciting. All you need is a little imagination and a bit of free time.",
            "You might not be very artistic, or even interested in art, but maybe you're a skilful and imaginative cook and enjoy creating new and original recipes. Or you could be someone who has brilliant ideas for solving problems at work. Maybe you show your creativity using your photographic abilities.",
            'When we look at the way that computers and technology are capable of doing many of the everyday jobs we used to do, it is easy to imagine that creativity is perhaps the most important skill for the future.',
          ],
        },
        {
          type: 'vocab',
          title: 'creativity: word building',
          titleAr: 'الإبداع: بناء الكلمات',
          items: [
            { word: 'imagine / imagination / imaginative', meaning: 'verb / noun / adjective', meaningAr: 'يتخيّل / الخيال / خيالي' },
            { word: 'create / creativity / creative', meaning: 'verb / noun / adjective', meaningAr: 'يبتكر / الإبداع / مبدع' },
            { word: 'art / art / artistic', meaning: 'noun / noun / adjective', meaningAr: 'الفن / الفن / فنّي' },
            { word: 'photograph / photography / photographic', meaning: 'verb / noun / adjective', meaningAr: 'يصوّر / التصوير / فوتوغرافي' },
            { word: 'skill / skill / skilful', meaning: 'verb / noun / adjective', meaningAr: 'مهارة / مهارة / ماهر' },
            { word: 'talent / talent / talented', meaning: 'verb / noun / adjective', meaningAr: 'موهبة / موهبة / موهوب' },
          ],
        },
        {
          type: 'audio',
          title: 'Pronunciation: word stress in word families',
          titleAr: 'النطق: نبرة الكلمات في عائلات الكلمات',
          tracks: au(['6.02'], 71),
        },
        {
          type: 'audio',
          title: 'Listening: people talking about creativity',
          titleAr: 'الاستماع: أشخاص يتحدثون عن الإبداع',
          tracks: au(['6.03', '6.04'], 72),
        },
        {
          type: 'exercise',
          exercise: {
            id: 'u6-6b-listening',
            title: 'Who says what?',
            kind: 'mcq',
            instructions: 'Listen to four people (Roza, Fabio, Joshua, Meera). Match each idea with the person who mentions it.',
            instructionsAr: 'استمع إلى أربعة أشخاص (Roza و Fabio و Joshua و Meera). طابق كل فكرة مع الشخص الذي يذكرها.',
            page: 72,
            verified: true,
            questions: [
              {
                id: 'q1',
                kind: 'mcq',
                prompt: 'Which idea does Roza, film-maker, mention?',
                options: [
                  { label: 'I look for new ways to do things.', correct: true },
                  { label: 'I try to experience new situations.' },
                  { label: 'I use nature for inspiration.' },
                  { label: "I need to be creative when looking after my daughter." },
                ],
              },
              {
                id: 'q2',
                kind: 'mcq',
                prompt: 'Which idea does Fabio, chef, mention?',
                options: [
                  { label: 'I look for new ways to do things.' },
                  { label: 'I try to experience new situations.', correct: true },
                  { label: 'I use nature for inspiration.' },
                  { label: "I need to be creative when looking after my daughter." },
                ],
              },
              {
                id: 'q3',
                kind: 'mcq',
                prompt: 'Which idea does Joshua, designer, mention?',
                options: [
                  { label: 'I look for new ways to do things.' },
                  { label: 'I try to experience new situations.' },
                  { label: 'I use nature for inspiration.', correct: true },
                  { label: "I need to be creative when looking after my daughter." },
                ],
              },
              {
                id: 'q4',
                kind: 'mcq',
                prompt: 'Which idea does Meera, accountant, mention?',
                options: [
                  { label: 'I look for new ways to do things.' },
                  { label: 'I try to experience new situations.' },
                  { label: 'I use nature for inspiration.' },
                  { label: "I need to be creative when looking after my daughter.", correct: true },
                ],
              },
            ],
          },
        },
        {
          type: 'grammar',
          title: 'comparatives and superlatives',
          titleAr: 'صيغ المقارنة والتفضيل',
          explanation:
            'We use comparatives to compare two things and superlatives to say something is the best, biggest, most important, etc.',
          explanationAr:
            'نستخدم صيغة المقارنة للمقارنة بين شيئين، وصيغة التفضيل للقول إن شيئاً هو الأفضل أو الأكبر أو الأهم...',
          rule: "Short adjectives/adverbs: add -er/-est (hard, harder, the hardest). Longer adjectives or -ly adverbs: use more / the most (more carefully, the most important). Irregular: good/well - better - the best; far - further/farther - the furthest/farthest. We can also use (not) as + adjective + as to make comparisons.",
          ruleAr: "الصفات والظروف القصيرة: أضف -er / -est (hard, harder, the hardest). الصفات الأطول أو الظروف المنتهية بـ -ly: استخدم more / the most (more carefully, the most important). الشواذ: good/well - better - the best; far - further/farther - the furthest/farthest. يمكننا أيضاً استخدام (not) as + الصفة + as للمقارنة.",
          table: {
            headers: ['Form', 'Comparative', 'Superlative', 'Example'],
            rows: [
              { values: ['short, e.g. fast, hard', '-er', 'the -est', 'I have to work harder when I\u2019m at home.'] },
              { values: ['long / -ly, e.g. quickly', 'more', 'the most', 'the most important part of my job'] },
              { values: ['irregular, e.g. good/well', 'better', 'the best', "That's the best thing about cooking."] },
              { values: ['(not) as\u2026 as', '-', '-', 'Creativity is just as important as these other things.'] },
            ],
          },
          examples: [
            'Creativity is the most important part of my job.',
            'I think being creative is just as important as these other things.',
            'I think it makes my films more interesting.',
            'It\u2019s easier for me to get ideas when I\u2019m outside.',
            'It\u2019s the hardest thing about cooking.',
          ],
          bankPage: 125,
          videos: [
            { id: 'wC5GPzMb9BE', title: 'How to Use Adjectives in English - English Grammar Course' },
            { id: 'UlNuPWiyK9Y', title: 'Adjectives and Adverbs in English - 5 Levels of Difficulty' },
          ],
        },
        {
          type: 'exercise',
          exercise: {
            id: 'u6-6b-comp-sup',
            title: 'Comparatives and superlatives',
            kind: 'mcq',
            instructions: 'Choose the correct option.',
            instructionsAr: 'اختر الخيار الصحيح.',
            page: 72,
            verified: true,
            questions: [
              {
                id: 'q1',
                kind: 'mcq',
                prompt: 'Creativity is the ___ part of my job.',
                options: [
                  { label: 'most important', correct: true },
                  { label: 'more important', correct: false },
                  { label: 'importanter', correct: false },
                ],
              },
              {
                id: 'q2',
                kind: 'mcq',
                prompt: 'I think being creative is just ___ these other things.',
                options: [
                  { label: 'as important as', correct: true },
                  { label: 'more important as', correct: false },
                  { label: 'the most important', correct: false },
                ],
              },
              {
                id: 'q3',
                kind: 'mcq',
                prompt: 'It forces you to think ___ about your ideas.',
                options: [
                  { label: 'more carefully', correct: true },
                  { label: 'the most carefully', correct: false },
                  { label: 'carefuller', correct: false },
                ],
              },
              {
                id: 'q4',
                kind: 'mcq',
                prompt: 'I think it makes my films ___ interesting.',
                options: [
                  { label: 'more', correct: true },
                  { label: 'most', correct: false },
                  { label: 'the more', correct: false },
                ],
              },
              {
                id: 'q5',
                kind: 'mcq',
                prompt: "That's the ___ thing about cooking.",
                options: [
                  { label: 'best', correct: true },
                  { label: 'better', correct: false },
                  { label: 'good', correct: false },
                ],
              },
            ],
          },
        },
        {
          type: 'text',
          title: 'Writing: a review',
          titleAr: 'الكتابة: مراجعة (تقييم)',
          paragraphs: [
            'Model review (Nannarella, Rome): the best restaurant the writer has ever been to. Positive points: it\u2019s located near a busy square; talented musicians play while you eat; an imaginative menu based on traditional Italian food but with new, original ideas; delicious carbonara and lasagne; the tastiest tiramisu ever eaten; friendly, relaxed atmosphere; not as expensive as similar restaurants. Negative point: we had to eat quite quickly because we were in a hurry.',
            'Linking words: although, while (contrast), because (reason), unless (condition), because of (reason).\nExamples: "Although a lot of the dishes are traditional, they all have something special." "If you come at lunchtime, make sure you book a table, unless you don\u2019t mind waiting."',
          ],
        },
        {
          type: 'exercise',
          exercise: {
            id: 'u6-6b-linking',
            title: 'Linking words: join the ideas',
            kind: 'mcq',
            instructions: 'Match each linking word with the idea it connects.',
            instructionsAr: 'طابق كل كلمة ربط مع الفكرة التي تربطها.',
            page: 73,
            verified: true,
            questions: [
              {
                id: 'q1',
                kind: 'mcq',
                prompt: 'Which idea does "although / while" connect?',
                options: [
                  { label: 'contrast', correct: true },
                  { label: 'reason' },
                  { label: 'condition' },
                ],
              },
              {
                id: 'q2',
                kind: 'mcq',
                prompt: 'Which idea does "because / because of" connect?',
                options: [
                  { label: 'contrast' },
                  { label: 'reason', correct: true },
                  { label: 'condition' },
                ],
              },
              {
                id: 'q3',
                kind: 'mcq',
                prompt: 'Which idea does "unless" connect?',
                options: [
                  { label: 'contrast' },
                  { label: 'reason' },
                  { label: 'condition', correct: true },
                ],
              },
            ],
          },
        },
        {
          type: 'pages',
          images: [img(85, 'Lesson 6B, page 71'), img(86, 'Lesson 6B, page 72'), img(87, 'Lesson 6B, page 73')],
        },
      ],
    },
    {
      id: '6c',
      code: '6C',
      title: 'Why do you think that?',
      pages: [74, 75],
      labels: {
        grammar: 'How to\u2026 ask for and give opinions and reasons',
        vocabulary: 'extreme adjectives',
        pronunciation: 'intonation for expressing opinions',
      },
      objectives: ['ask for and give opinions and reasons', 'use extreme adjectives'],
      blocks: [
        {
          type: 'text',
          title: 'Public art - love it or hate it?',
          titleAr: 'الفن العام: تحبه أم تكرهه؟',
          paragraphs: [
            'From the art we see painted on the walls of our cities to the huge sculptures we might find outside a museum, public art is everywhere. In the past, public art often meant statues of historical figures. These days, all kinds of fantastic art has moved outside art galleries, where it has more space and a bigger audience.',
            'Public art is for everyone. It\u2019s free and you don\u2019t need to buy a ticket. It can also help to create a city\u2019s identity. For example, Louise Bourgeois\u2019s Maman, a sculpture of a giant spider outside the Guggenheim Museum, has become a symbol of Bilbao, Spain. Anthony Gormley\u2019s outstanding sculpture The Angel of the North is similarly popular with visitors to the north of England.',
            'However, not everybody likes public art. Some say it\u2019s a waste of money. Others think it\u2019s ugly. One example is graffiti. Some say it\u2019s art and others say it\u2019s vandalism. What do you think?',
          ],
        },
        {
          type: 'vocab',
          title: 'extreme adjectives',
          titleAr: 'الصفات القوية (المتطرفة)',
          items: [
            { word: 'good', meaning: 'normal adjective', meaningAr: 'جيد (صفة عادية)', example: "We can say 'very good'. We can't say 'very fantastic'.", exampleAr: "يمكننا أن نقول 'very good'، ولا يمكننا أن نقول 'very fantastic'." },
            { word: 'fantastic', meaning: 'extreme adjective', meaningAr: 'رائع (صفة قوية)', example: "We can say 'absolutely fantastic'. We can't say 'absolutely good'.", exampleAr: "يمكننا أن نقول 'absolutely fantastic'، ولا يمكننا أن نقول 'absolutely good'." },
            { word: 'bad / terrible', meaning: 'normal / extreme', meaningAr: 'سيّئ / فظيع' },
            { word: 'interesting / fascinating', meaning: 'normal / extreme', meaningAr: 'مثير للاهتمام / ساحر' },
            { word: 'big / huge', meaning: 'normal / extreme', meaningAr: 'كبير / ضخم' },
            { word: 'small / tiny', meaning: 'normal / extreme', meaningAr: 'صغير / ضئيل جداً' },
            { word: 'important / essential', meaning: 'normal / extreme', meaningAr: 'مهم / أساسي' },
            { word: 'difficult / impossible', meaning: 'normal / extreme', meaningAr: 'صعب / مستحيل' },
          ],
        },
        {
          type: 'callout',
          title: 'Note',
          titleAr: 'ملاحظة',
          tone: 'note',
          text: 'We use very with normal adjectives to make them stronger. We use absolutely with extreme adjectives to make them stronger. Extreme adjectives have a stronger meaning than normal adjectives.',
          textAr: 'نستخدم very مع الصفات العادية لتقويتها، و absolutely مع الصفات القوية لتقويتها. الصفات القوية معناها أقوى من الصفات العادية.',
        },
        {
          type: 'exercise',
          exercise: {
            id: 'u6-6c-extreme',
            title: 'Extreme adjectives',
            kind: 'mcq',
            instructions: 'Match each normal adjective with its extreme equivalent.',
            instructionsAr: 'طابق كل صفة عادية مع صفتها القوية المقابلة.',
            page: 74,
            verified: true,
            questions: [
              {
                id: 'q1',
                kind: 'mcq',
                prompt: 'What is the extreme adjective of "good"?',
                options: [
                  { label: 'fantastic', correct: true },
                  { label: 'terrible' },
                  { label: 'fascinating' },
                  { label: 'huge' },
                  { label: 'tiny' },
                  { label: 'essential' },
                  { label: 'impossible' },
                ],
              },
              {
                id: 'q2',
                kind: 'mcq',
                prompt: 'What is the extreme adjective of "bad"?',
                options: [
                  { label: 'fantastic' },
                  { label: 'terrible', correct: true },
                  { label: 'fascinating' },
                  { label: 'huge' },
                  { label: 'tiny' },
                  { label: 'essential' },
                  { label: 'impossible' },
                ],
              },
              {
                id: 'q3',
                kind: 'mcq',
                prompt: 'What is the extreme adjective of "interesting"?',
                options: [
                  { label: 'fantastic' },
                  { label: 'terrible' },
                  { label: 'fascinating', correct: true },
                  { label: 'huge' },
                  { label: 'tiny' },
                  { label: 'essential' },
                  { label: 'impossible' },
                ],
              },
              {
                id: 'q4',
                kind: 'mcq',
                prompt: 'What is the extreme adjective of "big"?',
                options: [
                  { label: 'fantastic' },
                  { label: 'terrible' },
                  { label: 'fascinating' },
                  { label: 'huge', correct: true },
                  { label: 'tiny' },
                  { label: 'essential' },
                  { label: 'impossible' },
                ],
              },
              {
                id: 'q5',
                kind: 'mcq',
                prompt: 'What is the extreme adjective of "small"?',
                options: [
                  { label: 'fantastic' },
                  { label: 'terrible' },
                  { label: 'fascinating' },
                  { label: 'huge' },
                  { label: 'tiny', correct: true },
                  { label: 'essential' },
                  { label: 'impossible' },
                ],
              },
              {
                id: 'q6',
                kind: 'mcq',
                prompt: 'What is the extreme adjective of "important"?',
                options: [
                  { label: 'fantastic' },
                  { label: 'terrible' },
                  { label: 'fascinating' },
                  { label: 'huge' },
                  { label: 'tiny' },
                  { label: 'essential', correct: true },
                  { label: 'impossible' },
                ],
              },
              {
                id: 'q7',
                kind: 'mcq',
                prompt: 'What is the extreme adjective of "difficult"?',
                options: [
                  { label: 'fantastic' },
                  { label: 'terrible' },
                  { label: 'fascinating' },
                  { label: 'huge' },
                  { label: 'tiny' },
                  { label: 'essential' },
                  { label: 'impossible', correct: true },
                ],
              },
            ],
          },
        },
        {
          type: 'audio',
          title: 'Pronunciation: intonation for expressing opinions',
          titleAr: 'النطق: التنغيم للتعبير عن الآراء',
          tracks: au(['6.05', '6.06'], 75),
        },
        {
          type: 'vocab',
          title: 'Ask for and give opinions and reasons',
          titleAr: 'اطلب الآراء وعبّر عنها مع الأسباب',
          items: [
            { word: 'asking for an opinion', meaning: 'How about you? / What makes you say that? / What do/did you think of\u2026?', meaningAr: 'وأنت؟ / ما الذي يجعلك تقول ذلك؟ / ما رأيك في…؟', response: 'What do you think about it?', responseAr: 'ما رأيك في الأمر؟' },
            { word: 'giving an opinion', meaning: 'Forme,\u2026 / In my view,\u2026 / I think\u2026 / I would say\u2026', meaningAr: 'بالنسبة لي… / في رأيي… / أعتقد… / أودّ أن أقول…', response: 'In my view, it\u2019s a really new and exciting design.', responseAr: 'في رأيي، إنه تصميم جديد ومثير حقاً.' },
            { word: 'asking for a reason', meaning: 'Why do you think that?', meaningAr: 'لماذا تعتقد ذلك؟', response: 'Why do you think that?', responseAr: 'لماذا تعتقد ذلك؟' },
            { word: 'giving a reason', meaning: 'The reason is\u2026 / It\u2019s because\u2026', meaningAr: 'السبب هو… / لأنه…', response: 'It\u2019s because it\u2019s free.', responseAr: 'السبب أنه مجاني.' },
            { word: 'agreeing to disagree', meaning: 'I suppose we\u2019re all different. / I guess it\u2019s good we\u2019re not all the same.', meaningAr: 'أفترض أننا جميعاً مختلفون. / أظن أنه من الجيد ألّا نكون جميعاً متشابهين.', response: 'I guess we all like different things.', responseAr: 'أظن أننا جميعاً نحب أشياء مختلفة.' },
          ],
        },
        {
          type: 'exercise',
          exercise: {
            id: 'u6-6c-opinions',
            title: 'Opinions and reasons',
            kind: 'mcq',
            instructions: 'Choose the correct phrase.',
            instructionsAr: 'اختر العبارة الصحيحة.',
            page: 75,
            verified: true,
            questions: [
              {
                id: 'q1',
                kind: 'mcq',
                prompt: 'Ask someone for their opinion:',
                options: [
                  { label: 'What do you think of\u2026?', correct: true },
                  { label: 'In my view,\u2026', correct: false },
                  { label: 'The reason is\u2026', correct: false },
                ],
              },
              {
                id: 'q2',
                kind: 'mcq',
                prompt: 'Give your opinion:',
                options: [
                  { label: 'I would say\u2026', correct: true },
                  { label: 'Why do you think that?', correct: false },
                  { label: 'How about you?', correct: false },
                ],
              },
              {
                id: 'q3',
                kind: 'mcq',
                prompt: 'Ask for a reason:',
                options: [
                  { label: 'Why do you think that?', correct: true },
                  { label: 'It\u2019s because\u2026', correct: false },
                  { label: 'I suppose we\u2019re all different.', correct: false },
                ],
              },
              {
                id: 'q4',
                kind: 'mcq',
                prompt: 'Give a reason for your opinion:',
                options: [
                  { label: 'The reason is\u2026', correct: true },
                  { label: 'What makes you say that?', correct: false },
                  { label: 'In my view,\u2026', correct: false },
                ],
              },
              {
                id: 'q5',
                kind: 'mcq',
                prompt: 'Agree to disagree politely:',
                options: [
                  { label: 'I guess it\u2019s good we\u2019re not all the same.', correct: true },
                  { label: 'That\u2019s wrong.', correct: false },
                  { label: 'You don\u2019t understand.', correct: false },
                ],
              },
            ],
          },
        },
        {
          type: 'pages',
          images: [img(88, 'Lesson 6C, page 74'), img(89, 'Lesson 6C, page 75')],
        },
      ],
    },
    {
      id: '6d',
      code: '6D',
      title: 'An artist at work',
      pages: [76, 77],
      labels: {
        grammar: 'present perfect + for, since and yet',
        skills: 'talk about a creative genius',
      },
      objectives: ['understand a documentary about an artist', 'use the present perfect with for, since and yet', 'write a nomination for an award'],
      blocks: [
        {
          type: 'text',
          title: 'BBC Programme: An artist at work',
          titleAr: 'BBC: برنامج - فنّان أثناء العمل',
          paragraphs: [
            'Yinka Shonibare is one of the UK\u2019s top contemporary artists. He became famous in the 1990s and since then he has produced a unique body of work, which is often colourful and humorous. He is influenced by his Nigerian origins and his work often uses colourful African fabrics. This film shows Yinka creating a figure called Balloon Man, and talking about his life and career.',
          ],
        },
        {
          type: 'video',
          title: 'Watch and order the stages',
          titleAr: 'شاهد ورتّب المراحل',
          videos: [
            {
              title: 'BBC Programme: An artist at work',
              file: 'SO3 B1 U6 BBC Programmes.mp4',
              page: 76,
            },
          ],
        },
        {
          type: 'exercise',
          exercise: {
            id: 'u6-6d-order',
            title: 'Number the stages in order',
            kind: 'ordering',
            instructions: 'Watch the video. Number the stages for creating one of Yinka\u2019s works in order.',
            instructionsAr: 'شاهد الفيديو. رقّم مراحل إنشاء أحد أعمال Yinka بالترتيب.',
            page: 76,
            verified: true,
            questions: [
              {
                id: 'q1',
                kind: 'ordering',
                title: 'Creating a sculpture',
                items: [
                  'Yinka sketches his idea on paper.',
                  'Nigel Schofield takes some photos for the sculpture.',
                  'They use the photos to make a realistic figure.',
                  'The sculpture goes to a costume-maker who covers it in fabric.',
                  'Yinka checks the sculpture and suggests changes.',
                  'The finished sculpture goes to the gallery.',
                ],
              },
            ],
          },
        },
        {
          type: 'grammar',
          title: 'present perfect + for, since and yet',
          titleAr: 'المضارع التام مع for و since و yet',
          explanation:
            'We use the present perfect with for, since and yet to talk about something that started in the past and is still true now.',
          explanationAr:
            'نستخدم المضارع التام مع for و since و yet للحديث عن شيء بدأ في الماضي وما زال صحيحاً حتى الآن.',
          rule: 'for = a period of time (for more than ten years). since = a particular time in the past (since the start of his career). yet = \u2018at any time up to now\u2019, used with negatives to emphasise that something hasn\u2019t happened but we expect it to happen soon.',
          ruleAr: 'for = مدة من الزمن (for more than ten years). since = وقت معين في الماضي (since the start of his career). yet = «في أي وقت حتى الآن»، تُستخدم مع النفي للتأكيد على أن شيئاً لم يحدث بعد لكننا نتوقع حدوثه قريباً.',
          table: {
            headers: ['Word', 'Use', 'Example'],
            rows: [
              { values: ['for', 'a period of time', 'Nigel Schofield has worked with Yinka for more than ten years.'] },
              { values: ['since', 'a particular time in the past', 'The art gallery has supported Yinka since the start of his career.'] },
              { values: ['yet', 'negative: not happened up to now', "Yinka hasn't seen the finished sculpture yet."] },
            ],
          },
          examples: [
            'The art gallery has supported Yinka since the start of his career.',
            'Nigel Schofield has worked with Yinka for more than ten years.',
            "Yinka hasn't seen the finished sculpture yet.",
          ],
          bankPage: 127,
          videos: [
            { id: 'zBzUJlOo930', title: 'Present Perfect Verb Tense - English Grammar Lesson' },
            { id: 'YwY1SvH3Mp8', title: 'How to Use the Present Perfect Simple and Present Perfect Continuous' },
            { id: 'ViVuOsdaHHs', title: 'How to Talk About Time in English - Time Prepositions and Phrases' },
          ],
        },
        {
          type: 'exercise',
          exercise: {
            id: 'u6-6d-for-since',
            title: 'for, since or yet',
            kind: 'mcq',
            instructions: 'Choose the correct word.',
            instructionsAr: 'اختر الكلمة الصحيحة.',
            page: 78,
            verified: true,
            questions: [
              {
                id: 'q1',
                kind: 'mcq',
                prompt: 'My parents have been married ___ forty years!',
                options: [
                  { label: 'for', correct: true },
                  { label: 'since', correct: false },
                  { label: 'yet', correct: false },
                ],
              },
              {
                id: 'q2',
                kind: 'mcq',
                prompt: "I've lived in this city ___ ten years.",
                options: [
                  { label: 'for', correct: true },
                  { label: 'since', correct: false },
                  { label: 'yet', correct: false },
                ],
              },
              {
                id: 'q3',
                kind: 'mcq',
                prompt: "I haven't visited the USA, but I plan to. I haven't been there ___.",
                options: [
                  { label: 'yet', correct: true },
                  { label: 'for', correct: false },
                  { label: 'since', correct: false },
                ],
              },
              {
                id: 'q4',
                kind: 'mcq',
                prompt: 'I have worked in this job ___ 2012.',
                options: [
                  { label: 'since', correct: true },
                  { label: 'for', correct: false },
                  { label: 'yet', correct: false },
                ],
              },
              {
                id: 'q5',
                kind: 'mcq',
                prompt: 'I have played the guitar ___ I was about fifteen years old.',
                options: [
                  { label: 'since', correct: true },
                  { label: 'for', correct: false },
                  { label: 'yet', correct: false },
                ],
              },
              {
                id: 'q6',
                kind: 'mcq',
                prompt: "I haven't decided where to live ___.",
                options: [
                  { label: 'yet', correct: true },
                  { label: 'since', correct: false },
                  { label: 'for', correct: false },
                ],
              },
            ],
          },
        },
        {
          type: 'audio',
          title: 'Listening: nominating a creative genius',
          titleAr: 'الاستماع: ترشيح عبقري مبدع',
          tracks: au(['6.07'], 77),
        },
        {
          type: 'text',
          title: 'Writing: a nomination for an award',
          titleAr: 'الكتابة: ترشيح شخص لجائزة',
          paragraphs: [
            'The MacArthur Fellowship offers creative individuals prize money to help them continue their creative work. It can be anyone who is pushing the boundaries of creativity within their field.',
            'Model nomination: "I would like to propose my friend Marco Santini for the creative genius award because Marco is the most creative pasta chef I know. He can cook all different types of pasta dishes using whatever ingredients he has in the kitchen. He has always made his own pasta since his grandmother taught him when he was a child. He has also invented his own new recipes. I think Marco deserves the award as he is definitely the most creative person I know."',
            'Key phrases: I\u2019m going to nominate\u2026 \u2026 is the most amazing\u2026 He has enjoyed \u2026 since\u2026 He is always drawing/cooking/looking for\u2026 He has also done a lot of\u2026 For the last few years, he has\u2026 He hasn\u2019t \u2026 yet, but\u2026 I think \u2026 deserves the award because/as\u2026',
          ],
        },
        {
          type: 'pages',
          images: [img(90, 'Lesson 6D, page 76'), img(91, 'Lesson 6D, page 77')],
        },
      ],
    },
    {
      id: '6r',
      code: 'Review',
      title: 'Unit 6 Review',
      pages: [78, 78],
      blocks: [
        {
          type: 'text',
          title: 'Review what you have learned',
          titleAr: 'راجع ما تعلمته',
          paragraphs: [
            'Complete the review exercises to practise the grammar and vocabulary of Unit 6: used to, comparatives and superlatives, and the present perfect with for, since and yet.',
          ],
        },
        {
          type: 'exercise',
          exercise: {
            id: 'u6-6r-usedto',
            title: 'Correct the mistakes',
            kind: 'mcq',
            instructions: 'Choose the correct form to fix each mistake.',
            instructionsAr: 'اختر الصيغة الصحيحة لتصحيح كل خطأ.',
            page: 78,
            verified: true,
            questions: [
              {
                id: 'q1',
                kind: 'mcq',
                prompt: 'We ___ on holiday every year when we were kids.',
                options: [
                  { label: 'used to go', correct: true },
                  { label: 'used to going', correct: false },
                  { label: 'use to go', correct: false },
                ],
              },
              {
                id: 'q2',
                kind: 'mcq',
                prompt: "I ___ like my physics teacher at school.",
                options: [
                  { label: "didn't use to", correct: true },
                  { label: "didn't used to", correct: false },
                  { label: "didn't uses to", correct: false },
                ],
              },
              {
                id: 'q3',
                kind: 'mcq',
                prompt: '___ draw a lot when you were a child?',
                options: [
                  { label: 'Did you use to', correct: true },
                  { label: 'Did you used to', correct: false },
                  { label: 'Did you use', correct: false },
                ],
              },
              {
                id: 'q4',
                kind: 'mcq',
                prompt: 'I ___ the piano, but I don\u2019t play now.',
                options: [
                  { label: 'used to play', correct: true },
                  { label: 'use to play', correct: false },
                  { label: 'used play', correct: false },
                ],
              },
              {
                id: 'q5',
                kind: 'mcq',
                prompt: 'My best friend at school ___ just across the road from me.',
                options: [
                  { label: 'used to live', correct: true },
                  { label: 'used to living', correct: false },
                  { label: 'use to live', correct: false },
                ],
              },
            ],
          },
        },
        {
          type: 'audio',
          title: 'Review listening',
          titleAr: 'استماع المراجعة',
          tracks: au(['R6.01'], 78),
        },
        {
          type: 'pages',
          images: [img(92, 'Unit 6 Review, page 78')],
        },
      ],
    },
  ],
}