import type { QuizResultRecord } from '../types';
import type { QuizMode, QuizQuestion } from '../types';

export function getQuizScore(results: readonly QuizResultRecord[]): number {
  return results.filter((result) => result.isCorrect).length;
}

export function getPercentage(score: number, totalQuestions: number): number {
  if (!Number.isFinite(score) || !Number.isFinite(totalQuestions) || totalQuestions <= 0) return 0;

  const boundedScore = Math.min(totalQuestions, Math.max(0, score));
  return Math.round((boundedScore / totalQuestions) * 10_000) / 100;
}

export function formatPercentage(percentage: number): string {
  const safePercentage = Number.isFinite(percentage)
    ? Math.min(100, Math.max(0, percentage))
    : 0;

  return `${Number(safePercentage.toFixed(2))}%`;
}

export function shuffle<T>(items: readonly T[], random: () => number = Math.random): T[] {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.min(index, Math.floor(random() * (index + 1)));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  return shuffled;
}

export function selectQuestionsForMode(
  mode: QuizMode,
  questions: readonly QuizQuestion[],
  random: () => number = Math.random,
): QuizQuestion[] {
  if (mode === 'quick') return shuffle(questions, random).slice(0, 10);

  const level = mode === 'level1' ? 1 : mode === 'level2' ? 2 : 3;
  return shuffle(questions.filter((question) => question.level === level), random);
}
