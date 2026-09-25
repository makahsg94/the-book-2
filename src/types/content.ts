// ---------------------------------------------------------------------------
// Content model for the Speakout B1 Student's Book platform.
// All book content lives in src/content/. These types describe how lessons,
// sections and exercises are structured so the UI can render them generically
// (add a lesson → add data, no component changes required).
// ---------------------------------------------------------------------------

export interface PageImage {
  /** PDF page index (1-based) used to resolve the asset path /assets/book/pNNN.jpg */
  pdf: number
  /** Printed book page number */
  bookPage: number
  /** Optional caption shown under the image */
  caption?: string
  alt?: string
}

export interface AudioTrack {
  /** Track label as printed in the book, e.g. "2.07" or "VB 4.01" */
  label: string
  /** Public path of the audio file, e.g. /audio/034_SO3_A2_SB_2C_Audio_2_07.mp3 */
  file?: string
  /** Shown when the audio file is not included in this copy */
  note?: string
  /** Where the track appears (printed page) */
  page?: number
}

export interface VideoRef {
  title: string
  /** Source file name (in the provided media pack) */
  file: string
  /** Where the video activity appears in the book */
  page?: number
  /** Note, e.g. video not bundled to keep the project small */
  note?: string
}

// ---------------------------------------------------------------------------
// Exercises
// ---------------------------------------------------------------------------

export type ExerciseKind = 'mcq' | 'true-false' | 'fill-blank' | 'matching' | 'ordering'

export interface McqOption {
  label: string
  correct?: boolean
}

export interface MatchingPair {
  left: string
  right: string
}

export type ExerciseQuestion =
  | {
      id: string
      kind: 'mcq'
      prompt: string
      options: McqOption[]
    }
  | {
      id: string
      kind: 'true-false'
      statement: string
      correct: boolean
    }
  | {
      id: string
      kind: 'fill-blank'
      /** sentence before the blank, e.g. "I ___ football every" */
      before: string
      /** the correct answer word(s) */
      answer: string
      /** other accepted spellings/alternatives (checked case-insensitively) */
      accept?: string[]
      /** sentence after the blank */
      after: string
    }
  | {
      id: string
      kind: 'matching'
      /** pairs to match (left = item, right = correct partner) */
      pairs: MatchingPair[]
    }
  | {
      id: string
      kind: 'ordering'
      title: string
      /** items in the order the learner must reconstruct */
      items: string[]
      prompt?: string
    }

export interface Exercise {
  id: string
  /** Short name, e.g. "2A Vocabulary" */
  title: string
  kind: ExerciseKind
  /** Instructions as printed in the book */
  instructions?: string
  /** Arabic translation of the instructions, shown under the English text (for beginners) */
  instructionsAr?: string
  questions: ExerciseQuestion[]
  /** printed book page the exercise comes from */
  page?: number
  /** set true when the answer has been transcribed from the book and verified */
  verified?: boolean
  /** set true when content might contain OCR ambiguity requiring manual review */
  needsReview?: boolean
}

// ---------------------------------------------------------------------------
// Content blocks renderable inside a lesson
// ---------------------------------------------------------------------------

export interface VocabItem {
  word: string
  meaning?: string
  /** Arabic translation of the word, shown under the English meaning (for beginners) */
  meaningAr?: string
  example?: string
  /** Arabic translation of the example sentence, shown under it (for beginners) */
  exampleAr?: string
  pronunciation?: string
  note?: string
  opposite?: string
  /** a model answer / sample line that goes with the word (e.g. social phrases) */
  response?: string
  /** Arabic translation of the model answer / response line */
  responseAr?: string
}

export interface GrammarTableRow {
  label?: string
  values: string[]
}

/**
 * A video from the "Oxford Online English Grammar" YouTube playlist
 * (https://www.youtube.com/playlist?list=PLD6t6ckHsruY_i7_rZhKcRBmXDdawiqUM)
 * that explains the grammar point.
 */
export interface GrammarVideo {
  /** 11-character YouTube video id */
  id: string
  /** video title exactly as it appears in the playlist */
  title: string
}

/** Canonical playlist every GrammarVideo is taken from. */
export const OXFORD_GRAMMAR_PLAYLIST = 'PLD6t6ckHsruY_i7_rZhKcRBmXDdawiqUM'

export type ContentBlock =
  | {
      type: 'text'
      title?: string
      /** Arabic translation of the title, shown under it (for beginners) */
      titleAr?: string
      paragraphs: string[]
    }
  | {
      type: 'callout'
      title?: string
      titleAr?: string
      tone?: 'info' | 'tip' | 'note' | 'warning'
      text: string
      /** Arabic translation of the callout text, shown under it (for beginners) */
      textAr?: string
    }
  | {
      type: 'vocab'
      title?: string
      titleAr?: string
      items: VocabItem[]
      /** e.g. "Vocabulary Bank page 130" */
      source?: string
    }
  | {
      type: 'grammar'
      title?: string
      titleAr?: string
      explanation?: string
      /** Arabic translation of the explanation, shown under it (for beginners) */
      explanationAr?: string
      rule?: string
      /** Arabic translation of the rule, shown under it (for beginners) */
      ruleAr?: string
      table?: { headers: string[]; rows: GrammarTableRow[] }
      examples?: string[]
      /** optional link to grammar bank book page */
      bankPage?: number
      /** Oxford Online English Grammar videos that explain this point */
      videos?: GrammarVideo[]
    }
  | {
      type: 'examples'
      title?: string
      titleAr?: string
      items: string[]
    }
  | {
      type: 'exercise'
      exercise: Exercise
    }
  | {
      type: 'audio'
      title?: string
      titleAr?: string
      tracks: AudioTrack[]
    }
  | {
      type: 'video'
      title?: string
      titleAr?: string
      videos: VideoRef[]
    }
  | {
      type: 'pages'
      images: PageImage[]
    }
  | {
      type: 'review'
      title?: string
      titleAr?: string
      text: string
    }

// ---------------------------------------------------------------------------
// Lessons and units
// ---------------------------------------------------------------------------

export interface Lesson {
  id: string
  /** lesson code as printed, e.g. "1A", "2C", "Review" */
  code: string
  title: string
  subtitle?: string
  /** printed page range, e.g. [10, 11] */
  pages: [number, number]
  /** short meta labels taken from the lesson header, e.g. "Grammar / present simple" */
  labels?: { grammar?: string; vocabulary?: string; pronunciation?: string; skills?: string; writing?: string }
  objectives?: string[]
  blocks: ContentBlock[]
}

export interface Unit {
  id: string
  number: number
  title: string
  phrase?: string
  /** set to 'review' for digital-only end-of-book content with no printed unit */
  kind?: 'review'
  /** printed page of the unit opener with learning objectives */
  overviewPage: number
  /** PDF page used for the unit hero/cover when it is not overviewPage + 2 / + 14 (digital-only units) */
  overviewPdf?: number
  pages: [number, number]
  intro?: string
  objectives?: string[]
  /** BBC video materials for the unit */
  video?: VideoRef[]
  /** class audio tracks shared across the unit */
  audio?: AudioTrack[]
  lessons: Lesson[]
  /** e.g. "Unit 1 Review" entry - rendered as a lesson too */
  videoNote?: string
}

export interface BankKind {
  id: string
  title: string
  pages: [number, number]
}

export interface Book {
  id: string
  title: string
  subtitle: string
  edition: string
  level: string
  authors: string[]
  description: string
  coverPage: number
  units: Unit[]
  banks: { id: string; title: string; description: string; pages: [number, number] }[]
  searchablePages: { pdf: number; bookPage: number; label: string; text: string }[]
}

// ---------------------------------------------------------------------------
// Unit quizzes
// ---------------------------------------------------------------------------

/**
 * Assessment category. Only categories actually supported by the material are
 * used (grammar / vocabulary / reading / communication).
 */
export type QuizCategory = 'grammar' | 'vocabulary' | 'reading' | 'communication'

/** Per-question difficulty, used to balance every unit quiz. */
export type QuizDifficulty = 'easy' | 'medium' | 'hard'

export type UnitQuizQuestion =
  | {
      kind: 'mcq'
      prompt: string
      /** the source sentence shown when the item is a gap-fill */
      options: McqOption[]
    }
  | {
      kind: 'true-false'
      statement: string
      correct: boolean
    }
  | {
      kind: 'fill-blank'
      /** sentence before the blank.  Include the base verb in brackets when the
       *  learner must conjugate, e.g. "Last year I (go)" -> answer "went". */
      before: string
      /** the correct answer word(s) */
      answer: string
      /** other accepted spellings/alternatives (checked case-insensitively) */
      accept?: string[]
      /** sentence after the blank (may be empty) */
      after: string
    }

export interface UnitQuizItem {
  id: string
  /** unit id, e.g. "unit-2" (must match a Unit in BOOK) */
  unitId: string
  /** lesson the item is based on, e.g. "2b" (used for review links) */
  lessonId: string
  category: QuizCategory
  difficulty: QuizDifficulty
  /** short skill label shown in the UI, e.g. "present simple" */
  skill: string
  /** printed page the grammar/vocabulary comes from */
  page?: number
  question: UnitQuizQuestion
  /** learner-facing explanation shown after the quiz */
  explanation: string
}

export interface UnitQuiz {
  id: string
  unitId: string
  title: string
  /** one-line overview shown on the intro screen */
  description: string
  skills: string[]
  /** optional upper bound on questions allowed by validation (default: 20) */
  maxQuestions?: number
  questions: UnitQuizItem[]
}