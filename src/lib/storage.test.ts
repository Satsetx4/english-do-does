import { afterEach, describe, expect, it } from 'vitest';
import { loadProgress } from './storage';

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
