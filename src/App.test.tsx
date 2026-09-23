import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { App } from './App';

afterEach(() => {
  cleanup();
  window.localStorage.clear();
});

async function answerWrongAnswer(option: string): Promise<void> {
  fireEvent.click(screen.getByText(option));
  fireEvent.click(screen.getByRole('button', { name: 'Periksa Jawaban' }));
  fireEvent.click(screen.getByRole('button', { name: /Lanjut Soal Berikutnya/ }));
}

describe('quiz mode continuity', () => {
  it('replays Level 3 after a game over in Level 3', async () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.99);
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /Level 3: Master & Jebakan/ }));
    await screen.findByRole('heading', { name: 'What ___ your sister ___ on Sunday mornings?' });

    await answerWrongAnswer('do / does');
    await screen.findByRole('heading', { name: 'Rina ___ her homework after school.' });
    await answerWrongAnswer('do');

    if (!screen.queryByRole('button', { name: 'Mainkan Lagi' })) {
      await screen.findByRole('heading', { name: /John and his friends like the new schedule/ });
      await answerWrongAnswer('Does');
    }

    fireEvent.click(screen.getByRole('button', { name: 'Mainkan Lagi' }));
    await screen.findByRole('heading', { name: 'What ___ your sister ___ on Sunday mornings?' });
  });
});

describe('quiz shortcuts behind dialogs', () => {
  it('pauses shortcuts in Settings and returns focus to the Settings trigger', async () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.99);
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /Level 1: Dasar Pemula/ }));
    const choice = screen.getByRole('button', { name: '1 Do' });
    const settingsTrigger = screen.getByRole('button', { name: 'Pengaturan' });

    fireEvent.click(settingsTrigger);
    const dialog = screen.getByRole('dialog', { name: 'Pengaturan Aplikasi' });
    expect(dialog.getAttribute('aria-modal')).toBe('true');
    const dialogButtons = Array.from(dialog.querySelectorAll('button'));
    const initialButton = dialogButtons[0];
    const lastButton = dialogButtons[dialogButtons.length - 1];
    expect(document.activeElement).toBe(initialButton);

    lastButton.focus();
    fireEvent.keyDown(document, { key: 'Tab' });
    expect(document.activeElement).toBe(initialButton);
    fireEvent.keyDown(window, { key: '1' });
    expect(choice.getAttribute('aria-pressed')).toBe('false');

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog', { name: 'Pengaturan Aplikasi' })).toBeNull();
    expect(document.activeElement).toBe(settingsTrigger);

    fireEvent.keyDown(window, { key: '1' });
    expect(choice.getAttribute('aria-pressed')).toBe('true');
  });
});

describe('shared confirmation flows', () => {
  it('uses the same confirmation for the quiz exit button and header back button', async () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.99);
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: /Level 1: Dasar Pemula/ }));
    const activeQuestion = screen.getByRole('heading', { name: /chocolate ice cream/ });
    fireEvent.click(screen.getByRole('button', { name: 'Keluar Kuis' }));
    expect(screen.getByRole('dialog', { name: 'Keluar dari Kuis?' })).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Lanjut Kuis' }));
    expect(activeQuestion.isConnected).toBe(true);

    fireEvent.click(screen.getByRole('button', { name: 'Kembali' }));
    expect(screen.getByRole('dialog', { name: 'Keluar dari Kuis?' })).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Ya, Keluar' }));
    expect(screen.getByRole('button', { name: /Latihan Cepat/ })).toBeTruthy();
    expect(screen.queryByRole('dialog', { name: 'Keluar dari Kuis?' })).toBeNull();
  });

  it('requires confirmation for reset from Home and Settings, and resets Settings on reopen', () => {
    render(<App />);
    const homeReset = screen.getByRole('button', { name: 'Reset Progres Belajar' });

    fireEvent.click(homeReset);
    expect(screen.getByRole('dialog', { name: 'Reset Progres Belajar?' })).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Batalkan' }));
    expect(screen.queryByRole('dialog', { name: 'Reset Progres Belajar?' })).toBeNull();

    fireEvent.click(screen.getByRole('button', { name: 'Pengaturan' }));
    fireEvent.click(screen.getByRole('button', { name: 'Reset Data' }));
    expect(screen.queryByRole('dialog', { name: 'Pengaturan Aplikasi' })).toBeNull();
    expect(screen.getByRole('dialog', { name: 'Reset Progres Belajar?' })).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Batalkan' }));

    fireEvent.click(screen.getByRole('button', { name: 'Pengaturan' }));
    expect(screen.getByRole('dialog', { name: 'Pengaturan Aplikasi' })).toBeTruthy();
    expect(screen.queryByRole('dialog', { name: 'Reset Progres Belajar?' })).toBeNull();
  });

  it('synchronizes the audio control with its fresh default after a confirmed reset', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: 'Matikan Suara' }));
    expect(screen.getByRole('button', { name: 'Nyalakan Suara' })).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Reset Progres Belajar' }));
    fireEvent.click(screen.getByRole('button', { name: 'Ya, Reset Data' }));

    expect(screen.getByRole('button', { name: 'Matikan Suara' })).toBeTruthy();
  });
});
