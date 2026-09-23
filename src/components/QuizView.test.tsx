import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { QuizView } from './QuizView';
import type { QuizQuestion, QuizResultRecord } from '../types';

afterEach(cleanup);

function makeQuestions(count: number): QuizQuestion[] {
  return Array.from({ length: count }, (_, index) => ({
    id: `test-${index + 1}`,
    level: 1,
    type: 'mcq',
    prompt: `Question ${index + 1}?`,
    options: ['Do', 'Does'],
    correctAnswer: 0,
    fullSentence: 'Do you play?',
    explanationEn: 'Use do with you.',
    explanationId: 'Gunakan do dengan you.',
  }));
}

async function answerCurrentQuestion(isCorrect: boolean, nextQuestionNumber?: number): Promise<void> {
  fireEvent.click(screen.getByRole('button', { name: isCorrect ? '1 Do' : '2 Does' }));
  fireEvent.click(screen.getByRole('button', { name: 'Periksa Jawaban' }));
  fireEvent.click(screen.getByRole('button', { name: /Lanjut Soal Berikutnya/ }));
  if (nextQuestionNumber !== undefined) {
    await screen.findByRole('heading', { name: `Question ${nextQuestionNumber}?` });
  }
}

describe('QuizView scoring', () => {
  it.each([10, 12])('finishes a %i-question perfect quiz without counting the last answer twice', async (count) => {
    const onFinishQuiz = vi.fn<(results: QuizResultRecord[]) => void>();
    render(<QuizView keyboardPaused={false} questions={makeQuestions(count)} onFinishQuiz={onFinishQuiz} onRequestQuit={vi.fn()} />);

    for (let index = 0; index < count; index += 1) {
      await answerCurrentQuestion(true, index < count - 1 ? index + 2 : undefined);
    }

    expect(onFinishQuiz).toHaveBeenCalledTimes(1);
    expect(onFinishQuiz.mock.calls[0][0]).toHaveLength(count);
    expect(onFinishQuiz.mock.calls[0][0].filter((result) => result.isCorrect)).toHaveLength(count);
  });
});

describe('QuizView lives', () => {
  it('ends the quiz after the third wrong answer, not the second', async () => {
    const onFinishQuiz = vi.fn<(results: QuizResultRecord[]) => void>();
    render(<QuizView keyboardPaused={false} questions={makeQuestions(4)} onFinishQuiz={onFinishQuiz} onRequestQuit={vi.fn()} />);

    await answerCurrentQuestion(false, 2);
    await answerCurrentQuestion(false, 3);

    expect(onFinishQuiz).not.toHaveBeenCalled();

    await answerCurrentQuestion(false);

    expect(onFinishQuiz).toHaveBeenCalledTimes(1);
    expect(onFinishQuiz.mock.calls[0][0]).toHaveLength(3);
    expect(onFinishQuiz.mock.calls[0][0].filter((result) => result.isCorrect)).toHaveLength(0);
  });
});
