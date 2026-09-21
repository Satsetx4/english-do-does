export type QuestionType = 'mcq' | 'dialog' | 'build';

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  level: 1 | 2 | 3;
  prompt: string;
  subjectHint?: string;
  options?: string[];
  correctAnswer?: number;
  speakerA?: string;
  speakerB?: string;
  words?: string[];
  correctOrder?: string[];
  fullSentence: string;
  explanationEn: string;
  explanationId: string;
}

export interface LessonSlide {
  title: string;
  subtitle: string;
  coreRule: string;
  keyBadge: string;
  formula?: string;
  pronouns: {
    subject: string;
    verb: string;
    note: string;
  }[];
  examples: {
    en: string;
    id: string;
    highlight: string;
  }[];
  commonTrap?: {
    wrong: string;
    right: string;
    explanation: string;
  };
  proTip?: string;
}

export interface LessonModule {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  color: 'indigo' | 'pink' | 'emerald' | 'amber';
  slides: LessonSlide[];
}

export interface QuizResultRecord {
  question: QuizQuestion;
  userAnswer: string;
  isCorrect: boolean;
}

export interface UserProgress {
  completedModules: string[];
  stars: number;
  quizzesTaken: number;
  bestScore: number;
  soundEnabled: boolean;
}
