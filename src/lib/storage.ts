import type { UserProgress } from '../types';
import { LESSONS } from '../data/lessons';
import { getPercentage } from './quiz';

const STORAGE_KEY = 'english_do_does_v2_progress';
const THEME_KEY = 'dd-theme';

const DEFAULT_PROGRESS: UserProgress = {
  completedModules: [],
  stars: 0,
  quizzesTaken: 0,
  bestPercentage: 0,
  soundEnabled: true,
};

const VALID_MODULE_IDS = new Set(LESSONS.map((lesson) => lesson.id));

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function nonNegativeInteger(value: unknown): number {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0
    ? Math.floor(value)
    : 0;
}

function readBestPercentage(progress: Record<string, unknown>): number {
  if (typeof progress.bestPercentage === 'number' && Number.isFinite(progress.bestPercentage)) {
    return Math.min(100, Math.max(0, progress.bestPercentage));
  }

  if (typeof progress.bestScore === 'number' && Number.isFinite(progress.bestScore) && progress.bestScore >= 0) {
    // Legacy records lack a quiz length; using the longest mode avoids overstating their result.
    return getPercentage(progress.bestScore, 12);
  }

  return 0;
}

export function loadProgress(): UserProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_PROGRESS };
    const parsed: unknown = JSON.parse(raw);
    if (!isRecord(parsed)) return { ...DEFAULT_PROGRESS };

    const completedModules = Array.isArray(parsed.completedModules)
      ? [...new Set(parsed.completedModules.filter(
        (moduleId): moduleId is string => typeof moduleId === 'string' && VALID_MODULE_IDS.has(moduleId),
      ))]
      : [];

    return {
      completedModules,
      stars: nonNegativeInteger(parsed.stars),
      quizzesTaken: nonNegativeInteger(parsed.quizzesTaken),
      bestPercentage: readBestPercentage(parsed),
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
  const prefersDark = typeof window !== 'undefined' && typeof window.matchMedia === 'function'
    ? window.matchMedia('(prefers-color-scheme: dark)').matches
    : false;

  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
    return prefersDark ? 'dark' : 'light';
  } catch {
    return prefersDark ? 'dark' : 'light';
  }
}

export function setStoredTheme(theme: 'light' | 'dark'): void {
  if (typeof document !== 'undefined') {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }

  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // Ignore
  }
}
