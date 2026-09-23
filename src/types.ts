export type QuizMode = 'quick' | 'level1' | 'level2' | 'level3';

interface QuizQuestionBase {
  id: string;
  level: 1 | 2 | 3;
  prompt: string;
  fullSentence: string;
  explanationEn: string;
  explanationId: string;
}

export interface MCQQuestion extends QuizQuestionBase {
  type: 'mcq';
  options: string[];
  correctAnswer: number;
}

export interface DialogQuestion extends QuizQuestionBase {
  type: 'dialog';
  speakerA: string;
  speakerB: string;
  options: string[];
  correctAnswer: number;
}

export interface BuildQuestion extends QuizQuestionBase {
  type: 'build';
  words: string[];
  correctOrder: string[];
}

export type QuizQuestion = MCQQuestion | DialogQuestion | BuildQuestion;

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
  bestPercentage: number;
  soundEnabled: boolean;
}
