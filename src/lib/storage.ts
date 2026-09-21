import type { UserProgress } from '../types';

const STORAGE_KEY = 'english_do_does_v2_progress';
const THEME_KEY = 'dd-theme';

const DEFAULT_PROGRESS: UserProgress = {
  completedModules: [],
  stars: 0,
  quizzesTaken: 0,
  bestScore: 0,
  soundEnabled: true,
};

export function loadProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_PROGRESS };
    const parsed = JSON.parse(raw);
    return {
      completedModules: Array.isArray(parsed.completedModules) ? parsed.completedModules : [],
      stars: typeof parsed.stars === 'number' ? parsed.stars : 0,
      quizzesTaken: typeof parsed.quizzesTaken === 'number' ? parsed.quizzesTaken : 0,
      bestScore: typeof parsed.bestScore === 'number' ? parsed.bestScore : 0,
      soundEnabled: typeof parsed.soundEnabled === 'boolean' ? parsed.soundEnabled : true,
    };
  } catch {
    return { ...DEFAULT_PROGRESS };
  }
}

export function saveProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Gracefully handle storage quota or private mode errors
  }
}

export function resetAllProgress(): UserProgress {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore
  }
  return { ...DEFAULT_PROGRESS };
}

export function getStoredTheme(): 'light' | 'dark' {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch {
    return 'dark';
  }
}

export function setStoredTheme(theme: 'light' | 'dark'): void {
  try {
    localStorage.setItem(THEME_KEY, theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch {
    // Ignore
  }
}
