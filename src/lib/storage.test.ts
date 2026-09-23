import { afterEach, describe, expect, it, vi } from 'vitest';
import { loadProgress, setStoredTheme } from './storage';

afterEach(() => {
  window.localStorage.clear();
});

describe('loadProgress', () => {
  it('sanitizes invalid values and migrates the legacy best score', () => {
    window.localStorage.setItem('english_do_does_v2_progress', JSON.stringify({
      completedModules: ['module-1', 'unknown-module'],
      stars: -4,
      quizzesTaken: -2,
      bestScore: 11,
      soundEnabled: false,
    }));

    expect(loadProgress()).toEqual({
      completedModules: ['module-1'],
      stars: 0,
      quizzesTaken: 0,
      bestPercentage: 91.67,
      soundEnabled: false,
    });
  });

  it('uses a safe fresh-start value when stored JSON is corrupt', () => {
    window.localStorage.setItem('english_do_does_v2_progress', '{not-json');

    expect(loadProgress()).toEqual({
      completedModules: [],
      stars: 0,
      quizzesTaken: 0,
      bestPercentage: 0,
      soundEnabled: true,
    });
  });
});

describe('setStoredTheme', () => {
  it('applies the selected theme even when browser storage is unavailable', () => {
    const setItem = vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Storage is unavailable');
    });

    expect(() => setStoredTheme('dark')).not.toThrow();
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    setItem.mockRestore();
    setStoredTheme('light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});
