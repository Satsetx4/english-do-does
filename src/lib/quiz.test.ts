import { describe, expect, it } from 'vitest';
import { formatPercentage, getPercentage, getQuizScore, selectQuestionsForMode, shuffle } from './quiz';
import { QUIZ_QUESTIONS } from '../data/quizQuestions';
import type { QuizQuestion, QuizResultRecord } from '../types';

function makeResults(total: number, correctCount: number): QuizResultRecord[] {
  const question: QuizQuestion = {
    id: 'score-test',
    level: 1,
    type: 'mcq',
    prompt: 'Do you play?',
    options: ['Do', 'Does'],
    correctAnswer: 0,
    fullSentence: 'Do you play?',
    explanationEn: 'Use do with you.',
    explanationId: 'Gunakan do dengan you.',
  };

  return Array.from({ length: total }, (_, index) => ({
    question: { ...question, id: `score-test-${index}` },
    userAnswer: index < correctCount ? 'Do' : 'Does',
    isCorrect: index < correctCount,
  }));
}

describe('quiz scoring utilities', () => {
  it.each([10, 12])('counts each correct result once in a %i-question quiz', (total) => {
    expect(getQuizScore(makeResults(total, total))).toBe(total);
  });

  it('calculates fair percentages across different quiz lengths', () => {
    expect(getPercentage(10, 10)).toBe(100);
    expect(getPercentage(12, 12)).toBe(100);
    expect(getPercentage(11, 12)).toBe(91.67);
    expect(getPercentage(0, 0)).toBe(0);
  });

  it('formats the displayed percentage without unnecessary decimal places', () => {
    expect(formatPercentage(100)).toBe('100%');
    expect(formatPercentage(91.67)).toBe('91.67%');
  });
});

describe('shuffle', () => {
  it('returns a shuffled copy and leaves the source array untouched', () => {
    const source = [1, 2, 3, 4];
    const result = shuffle(source, () => 0);

    expect(result).toEqual([2, 3, 4, 1]);
    expect(source).toEqual([1, 2, 3, 4]);
  });
});

describe('quiz mode question selection', () => {
  it.each([
    ['quick', 10],
    ['level1', 10],
    ['level2', 12],
    ['level3', 10],
  ] as const)('keeps the intended question count for %s', (mode, expectedCount) => {
    const selected = selectQuestionsForMode(mode, QUIZ_QUESTIONS, () => 0.5);

    expect(selected).toHaveLength(expectedCount);
    if (mode !== 'quick') {
      const level = Number(mode.slice(-1));
      expect(selected.every((question) => question.level === level)).toBe(true);
    }
  });
});
