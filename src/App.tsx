import React, { useState, useEffect, useRef } from 'react';
import { MotionConfig } from 'framer-motion';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { LearnView } from './components/LearnView';
import { QuizView } from './components/QuizView';
import { ResultView } from './components/ResultView';
import { SettingsModal } from './components/SettingsModal';
import { ConfirmationDialog } from './components/ConfirmationDialog';
import { LESSONS } from './data/lessons';
import { QUIZ_QUESTIONS } from './data/quizQuestions';
import type { LessonModule, QuizMode, QuizQuestion, QuizResultRecord, UserProgress } from './types';
import { loadProgress, saveProgress, resetAllProgress, getStoredTheme, setStoredTheme } from './lib/storage';
import { sound } from './lib/sound';
import { getPercentage, getQuizScore, selectQuestionsForMode } from './lib/quiz';

type Screen = 'home' | 'learn' | 'quiz' | 'result';

export const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('home');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isExitConfirmOpen, setIsExitConfirmOpen] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [resetFocusTarget, setResetFocusTarget] = useState<HTMLElement | null>(null);
  const settingsButtonRef = useRef<HTMLButtonElement>(null);

  const [progress, setProgress] = useState<UserProgress>({
    completedModules: [],
    stars: 0,
    quizzesTaken: 0,
    bestPercentage: 0,
    soundEnabled: true,
  });

  const [selectedModule, setSelectedModule] = useState<LessonModule>(LESSONS[0]);
  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>([]);
  const [activeQuizMode, setActiveQuizMode] = useState<QuizMode>('quick');
  const [quizResults, setQuizResults] = useState<QuizResultRecord[]>([]);

  // Initialize progress and theme on mount
  useEffect(() => {
    const p = loadProgress();
    setProgress(p);
    setSoundEnabled(p.soundEnabled);
    sound.enabled = p.soundEnabled;

    const initialTheme = getStoredTheme();
    setTheme(initialTheme);
    setStoredTheme(initialTheme);
  }, []);

  const handleToggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    setStoredTheme(nextTheme);
    sound.playPop();
  };

  const handleToggleSound = () => {
    const nextVal = !soundEnabled;
    setSoundEnabled(nextVal);
    sound.enabled = nextVal;
    if (nextVal) sound.playPop();

    const updated = { ...progress, soundEnabled: nextVal };
    setProgress(updated);
    saveProgress(updated);
  };

  const handleSelectLesson = (mod: LessonModule) => {
    setSelectedModule(mod);
    setScreen('learn');
    sound.playPop();
  };

  const handleFinishLesson = () => {
    const modId = selectedModule.id;
    const newCompleted = [...progress.completedModules];
    let newStars = progress.stars;

    if (!newCompleted.includes(modId)) {
      newCompleted.push(modId);
      newStars += 10; // Award 10 stars for completing a module
    }

    const updated: UserProgress = {
      ...progress,
      completedModules: newCompleted,
      stars: newStars,
    };

    setProgress(updated);
    saveProgress(updated);
    setScreen('home');
  };

  const handleStartQuiz = (mode: QuizMode) => {
    setActiveQuizMode(mode);
    setActiveQuestions(selectQuestionsForMode(mode, QUIZ_QUESTIONS));
    setQuizResults([]);
    setScreen('quiz');
    sound.playPop();
  };

  const handleFinishQuiz = (results: QuizResultRecord[]) => {
    const score = getQuizScore(results);
    setQuizResults(results);

    const updated: UserProgress = {
      ...progress,
      quizzesTaken: progress.quizzesTaken + 1,
      bestPercentage: Math.max(progress.bestPercentage, getPercentage(score, activeQuestions.length)),
      stars: progress.stars + score,
    };

    setProgress(updated);
    saveProgress(updated);
    setScreen('result');
  };

  const handleResetData = () => {
    const fresh = resetAllProgress();
    setProgress(fresh);
    setSoundEnabled(fresh.soundEnabled);
    sound.enabled = fresh.soundEnabled;
    sound.playPop();
  };

  const handleRequestQuizExit = () => setIsExitConfirmOpen(true);

  const handleBack = () => {
    if (screen === 'quiz') {
      handleRequestQuizExit();
      return;
    }
    setScreen('home');
  };

  const handleRequestReset = () => {
    const activeElement = document.activeElement;
    setResetFocusTarget(isSettingsOpen
      ? settingsButtonRef.current
      : activeElement instanceof HTMLElement ? activeElement : null);
    setIsSettingsOpen(false);
    setIsResetConfirmOpen(true);
  };

  const handleConfirmQuizExit = () => {
    setIsExitConfirmOpen(false);
    setQuizResults([]);
    setActiveQuestions([]);
    setScreen('home');
  };

  const handleConfirmReset = () => {
    handleResetData();
    setIsResetConfirmOpen(false);
  };

  // Header dynamic titles
  const getHeaderTitle = () => {
    switch (screen) {
      case 'learn':
        return selectedModule.shortTitle;
      case 'quiz':
        return 'Arena Kuis';
      case 'result':
        return 'Rapor Hasil Kuis';
      default:
        return 'DO / DOES Master';
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
        <Header
          title={getHeaderTitle()}
          onBack={screen !== 'home' ? handleBack : undefined}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
          theme={theme}
          onToggleTheme={handleToggleTheme}
          onOpenSettings={() => setIsSettingsOpen(true)}
          settingsButtonRef={settingsButtonRef}
        />

        <main className="flex-1 w-full">
          {screen === 'home' && (
            <HomeView
              progress={progress}
              onSelectLesson={handleSelectLesson}
              onStartQuiz={handleStartQuiz}
              onRequestReset={handleRequestReset}
            />
          )}

          {screen === 'learn' && (
            <LearnView
              module={selectedModule}
              onFinish={handleFinishLesson}
            />
          )}

          {screen === 'quiz' && (
            <QuizView
              questions={activeQuestions}
              keyboardPaused={isSettingsOpen || isExitConfirmOpen || isResetConfirmOpen}
              onFinishQuiz={handleFinishQuiz}
              onRequestQuit={handleRequestQuizExit}
            />
          )}

          {screen === 'result' && (
            <ResultView
              results={quizResults}
              totalQuestions={activeQuestions.length}
              onPlayAgain={() => handleStartQuiz(activeQuizMode)}
              onGoHome={() => setScreen('home')}
            />
          )}
        </main>

        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          theme={theme}
          onToggleTheme={handleToggleTheme}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
          onRequestReset={handleRequestReset}
          restoreFocusTo={settingsButtonRef.current}
        />
        <ConfirmationDialog
          isOpen={isExitConfirmOpen}
          titleId="quiz-exit-title"
          title="Keluar dari Kuis?"
          description="Skor dan progres kuis saat ini akan dibatalkan."
          cancelText="Lanjut Kuis"
          confirmText="Ya, Keluar"
          onCancel={() => setIsExitConfirmOpen(false)}
          onConfirm={handleConfirmQuizExit}
        />
        <ConfirmationDialog
          isOpen={isResetConfirmOpen}
          titleId="progress-reset-title"
          title="Reset Progres Belajar?"
          description="Semua bintang, akurasi terbaik, dan modul tuntas akan dihapus."
          cancelText="Batalkan"
          confirmText="Ya, Reset Data"
          onCancel={() => setIsResetConfirmOpen(false)}
          onConfirm={handleConfirmReset}
          restoreFocusTo={resetFocusTarget}
        />
      </div>
    </MotionConfig>
  );
};
