import { describe, expect, it } from 'vitest';
import { QUIZ_QUESTIONS } from './quizQuestions';

describe('quiz question bank', () => {
  it('keeps IDs unique and level counts unchanged', () => {
    const ids = QUIZ_QUESTIONS.map((question) => question.id);

    expect(new Set(ids).size).toBe(ids.length);
    expect(QUIZ_QUESTIONS.filter((question) => question.level === 1)).toHaveLength(10);
    expect(QUIZ_QUESTIONS.filter((question) => question.level === 2)).toHaveLength(12);
    expect(QUIZ_QUESTIONS.filter((question) => question.level === 3)).toHaveLength(10);
  });

  it('keeps choice indexes in range and sentence builder words valid', () => {
    for (const question of QUIZ_QUESTIONS) {
      if (question.type === 'mcq' || question.type === 'dialog') {
        expect(question.options.length).toBeGreaterThan(0);
        expect(Number.isInteger(question.correctAnswer)).toBe(true);
        expect(question.correctAnswer).toBeGreaterThanOrEqual(0);
        expect(question.correctAnswer).toBeLessThan(question.options.length);
      } else {
        expect([...question.words].sort()).toEqual([...question.correctOrder].sort());
      }
    }
  });

  it('uses an ordinary question instead of the emphatic neither/nor example', () => {
    const question = QUIZ_QUESTIONS.find((item) => item.id === 'q25');

    expect(question?.type).toBe('mcq');
    expect(question?.fullSentence).toBe('Do John and his friends like the new schedule?');
  });

  it('keeps the advanced level within the grammar taught in the lessons', () => {
    const q24 = QUIZ_QUESTIONS.find((question) => question.id === 'q24');

    expect(q24?.fullSentence).toBe('Rina does her homework after school.');
    expect(QUIZ_QUESTIONS.map((question) => question.fullSentence.toLowerCase()).join(' '))
      .not.toContain('neither john nor his friends do like');
  });
});
