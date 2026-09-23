import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { ResultView } from './ResultView';
import type { QuizResultRecord } from '../types';

vi.mock('canvas-confetti', () => ({ default: vi.fn() }));

afterEach(cleanup);

function makeCorrectResults(count: number): QuizResultRecord[] {
  const question: QuizResultRecord['question'] = {
    id: 'result-test',
    level: 1,
    type: 'mcq',
    prompt: 'Do you play?',
    options: ['Do', 'Does'],
    correctAnswer: 0,
    fullSentence: 'Do you play?',
    explanationEn: 'Use do with you.',
    explanationId: 'Gunakan do dengan you.',
  };

  return Array.from({ length: count }, (_, index) => ({
    question: { ...question, id: `result-test-${index}` },
    userAnswer: 'Do',
    isCorrect: true,
  }));
}

describe('ResultView scoring', () => {
  it.each([10, 12])('shows a perfect %i-question result as 100 percent', (count) => {
    render(
      <ResultView
        results={makeCorrectResults(count)}
        totalQuestions={count}
        onPlayAgain={() => undefined}
        onGoHome={() => undefined}
      />,
    );

    expect(screen.getByRole('heading', { name: `Skor: ${count} / ${count}` })).toBeTruthy();
    expect(screen.getByText('100%')).toBeTruthy();
  });
});
