import React, { useState, useEffect } from 'react';
import { MotionConfig } from 'framer-motion';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { LearnView } from './components/LearnView';
import { QuizView } from './components/QuizView';
import { ResultView } from './components/ResultView';
import { SettingsModal } from './components/SettingsModal';
import { LESSONS } from './data/lessons';
import { QUIZ_QUESTIONS } from './data/quizQuestions';
import type { LessonModule, QuizQuestion, QuizResultRecord, UserProgress } from './types';
import { loadProgress, saveProgress, resetAllProgress, getStoredTheme, setStoredTheme } from './lib/storage';
import { sound } from './lib/sound';

type Screen = 'home' | 'learn' | 'quiz' | 'result';

export const App: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('home');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const [progress, setProgress] = useState<UserProgress>({
    completedModules: [],
    stars: 0,
    quizzesTaken: 0,
    bestScore: 0,
    soundEnabled: true,
  });

  const [selectedModule, setSelectedModule] = useState<LessonModule>(LESSONS[0]);
  const [activeQuestions, setActiveQuestions] = useState<QuizQuestion[]>([]);
  const [quizResults, setQuizResults] = useState<QuizResultRecord[]>([]);
  const [finalScore, setFinalScore] = useState(0);

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
    let newCompleted = [...progress.completedModules];
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

  const handleStartQuiz = (mode: 'quick' | 'level1' | 'level2' | 'level3') => {
    let pool: QuizQuestion[] = [];

    if (mode === 'level1') {
      pool = QUIZ_QUESTIONS.filter((q) => q.level === 1);
    } else if (mode === 'level2') {
      pool = QUIZ_QUESTIONS.filter((q) => q.level === 2);
    } else if (mode === 'level3') {
      pool = QUIZ_QUESTIONS.filter((q) => q.level === 3);
    } else {
      // Quick mix: 10 random questions from all levels
      const shuffled = [...QUIZ_QUESTIONS].sort(() => Math.random() - 0.5);
      pool = shuffled.slice(0, 10);
    }

    // Shuffle order of questions for freshness
    const shuffledPool = [...pool].sort(() => Math.random() - 0.5);

    setActiveQuestions(shuffledPool);
    setQuizResults([]);
    setFinalScore(0);
    setScreen('quiz');
    sound.playPop();
  };

  const handleFinishQuiz = (results: QuizResultRecord[], score: number) => {
    setQuizResults(results);
    setFinalScore(score);

    const updated: UserProgress = {
      ...progress,
      quizzesTaken: progress.quizzesTaken + 1,
      bestScore: Math.max(progress.bestScore, score),
      stars: progress.stars + score,
    };

    setProgress(updated);
    saveProgress(updated);
    setScreen('result');
  };

  const handleResetData = () => {
    const fresh = resetAllProgress();
    setProgress(fresh);
    sound.playPop();
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
          onBack={screen !== 'home' ? () => setScreen('home') : undefined}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
          theme={theme}
          onToggleTheme={handleToggleTheme}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />

        <main className="flex-1 w-full">
          {screen === 'home' && (
            <HomeView
              progress={progress}
              onSelectLesson={handleSelectLesson}
              onStartQuiz={handleStartQuiz}
              onResetData={handleResetData}
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
              onFinishQuiz={handleFinishQuiz}
              onQuitQuiz={() => setScreen('home')}
            />
          )}

          {screen === 'result' && (
            <ResultView
              results={quizResults}
              finalScore={finalScore}
              totalQuestions={activeQuestions.length}
              onPlayAgain={() => handleStartQuiz('quick')}
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
          onResetData={handleResetData}
        />
      </div>
    </MotionConfig>
  );
};
