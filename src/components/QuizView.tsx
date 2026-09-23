import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Volume2, 
  Check, 
  X, 
  ArrowRight, 
} from 'lucide-react';
import type { QuizQuestion, QuizResultRecord } from '../types';
import { sound } from '../lib/sound';
import { popVariants, fadeInUpVariants, cardHover, cardTap } from '../lib/motion';
import { shuffle } from '../lib/quiz';

interface QuizViewProps {
  questions: QuizQuestion[];
  keyboardPaused: boolean;
  onFinishQuiz: (results: QuizResultRecord[]) => void;
  onRequestQuit: () => void;
}

export const QuizView: React.FC<QuizViewProps> = ({
  questions,
  keyboardPaused,
  onFinishQuiz,
  onRequestQuit,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [buildWords, setBuildWords] = useState<string[]>([]);
  const [shuffledBank, setShuffledBank] = useState<string[]>([]);
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [lives, setLives] = useState(3);
  const [results, setResults] = useState<QuizResultRecord[]>([]);
  const keyboardActionsRef = useRef({
    selectOption: (_index: number) => {},
    checkAnswer: () => {},
    nextQuestion: () => {},
  });

  const currentQ = questions[currentIndex];

  // Initialize shuffled bank for 'build' question type
  useEffect(() => {
    setSelectedOption(null);
    setBuildWords([]);
    setIsChecked(false);
    setIsCorrect(null);

    if (currentQ?.type === 'build' && currentQ.words) {
      setShuffledBank(shuffle(currentQ.words));
    }
  }, [currentIndex, currentQ]);

  // Keyboard shortcut listener (1-4 for options, Enter for Check / Continue)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (keyboardPaused || e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
      if (e.target instanceof HTMLElement && e.target.closest('input, textarea, select, [contenteditable="true"]')) return;
      if (!currentQ) return;

      if (!isChecked) {
        if (currentQ.type === 'mcq' || currentQ.type === 'dialog') {
          const num = parseInt(e.key, 10);
          if (num >= 1 && currentQ.options && num <= currentQ.options.length) {
            e.preventDefault();
            keyboardActionsRef.current.selectOption(num - 1);
          }
        }
        if (e.key === 'Enter' && !(e.target instanceof HTMLElement && e.target.closest('button, a'))) {
          e.preventDefault();
          keyboardActionsRef.current.checkAnswer();
        }
      } else {
        if (e.key === 'Enter' && !(e.target instanceof HTMLElement && e.target.closest('button, a'))) {
          e.preventDefault();
          keyboardActionsRef.current.nextQuestion();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isChecked, selectedOption, buildWords, keyboardPaused, currentQ]);

  if (!currentQ) return null;

  const handleSelectOption = (idx: number) => {
    if (isChecked) return;
    sound.playPop();
    setSelectedOption(idx);
  };

  const handleAddWord = (word: string, indexInBank: number) => {
    if (isChecked) return;
    sound.playPop();
    setBuildWords((prev) => [...prev, word]);
    setShuffledBank((prev) => prev.filter((_, i) => i !== indexInBank));
  };

  const handleRemoveWord = (word: string, indexInBuilt: number) => {
    if (isChecked) return;
    sound.playPop();
    setBuildWords((prev) => prev.filter((_, i) => i !== indexInBuilt));
    setShuffledBank((prev) => [...prev, word]);
  };

  const canCheck =
    (currentQ.type === 'mcq' || currentQ.type === 'dialog')
      ? selectedOption !== null
      : buildWords.length === (currentQ.words?.length || 0);

  const handleCheckAnswer = () => {
    if (!canCheck || isChecked) return;

    let correct = false;
    let userAnsText = '';

    if (currentQ.type === 'mcq' || currentQ.type === 'dialog') {
      correct = selectedOption === currentQ.correctAnswer;
      userAnsText = currentQ.options ? currentQ.options[selectedOption!] : '';
    } else if (currentQ.type === 'build') {
      const userBuilt = buildWords.join(' ');
      const correctBuilt = currentQ.correctOrder?.join(' ');
      correct = userBuilt === correctBuilt;
      userAnsText = userBuilt;
    }

    setIsChecked(true);
    setIsCorrect(correct);

    const record: QuizResultRecord = {
      question: currentQ,
      userAnswer: userAnsText,
      isCorrect: correct,
    };
    const nextResults = [...results, record];
    setResults(nextResults);

    if (correct) {
      sound.playCorrect();
    } else {
      sound.playWrong();
      setLives((l) => Math.max(0, l - 1));
    }
  };

  const handleNextQuestion = () => {
    sound.playPop();
    if (lives === 0 && isCorrect === false) {
      // Game over by losing all lives
      sound.playGameOver();
      onFinishQuiz(results);
      return;
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      sound.playCheer();
      onFinishQuiz(results);
    }
  };

  keyboardActionsRef.current = {
    selectOption: handleSelectOption,
    checkAnswer: handleCheckAnswer,
    nextQuestion: handleNextQuestion,
  };

  const progressPercent = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto px-4 py-4 space-y-5 pb-6">
      {/* Top Bar: Quit Button, Progress Bar, Lives */}
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onRequestQuit}
          aria-label="Keluar Kuis"
          className="w-11 h-11 rounded-xl flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition active:scale-95 tactile-press focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex-1 max-w-xs">
          <div className="flex justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
            <span>Soal {currentIndex + 1}/{questions.length}</span>
            <span>Level {currentQ.level}</span>
          </div>
          <div
            role="progressbar"
            aria-label="Progres kuis"
            aria-valuemin={0}
            aria-valuemax={questions.length}
            aria-valuenow={currentIndex + 1}
            aria-valuetext={`Soal ${currentIndex + 1} dari ${questions.length}`}
            className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden"
          >
            <motion.div
              aria-hidden="true"
              className="h-full bg-emerald-500 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Hearts Container */}
        <div className="flex items-center gap-1" role="img" aria-label={`Sisa nyawa: ${lives} dari 3`}>
          {[1, 2, 3].map((heartIndex) => (
            <Heart
              key={heartIndex}
              aria-hidden="true"
              className={`w-6 h-6 transition-all duration-300 ${
                heartIndex <= lives
                  ? 'text-rose-500 fill-rose-500 scale-100'
                  : 'text-slate-300 dark:text-slate-700 scale-90'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          variants={fadeInUpVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="rounded-3xl p-6 sm:p-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-6"
        >
          {/* Question Prompt */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                {currentQ.type === 'mcq' && 'Pilihan Ganda'}
                {currentQ.type === 'dialog' && 'Lengkapi Dialog'}
                {currentQ.type === 'build' && 'Susun Kalimat'}
              </span>
            </div>
            <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-900 dark:text-slate-50 pt-1">
              {currentQ.prompt}
            </h3>
          </div>

          {/* Render MCQ Question */}
          {currentQ.type === 'mcq' && currentQ.options && (
            <div className="space-y-3">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                let cardStyle = 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 hover:border-indigo-400 dark:hover:border-indigo-600';

                if (isChecked) {
                  if (idx === currentQ.correctAnswer) {
                    cardStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 ring-2 ring-emerald-500/20';
                  } else if (isSelected) {
                    cardStyle = 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200 ring-2 ring-rose-500/20';
                  }
                } else if (isSelected) {
                  cardStyle = 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 ring-2 ring-indigo-500/30';
                }

                return (
                  <motion.button
                    type="button"
                    key={idx}
                    whileHover={!isChecked ? cardHover : undefined}
                    whileTap={!isChecked ? cardTap : undefined}
                    onClick={() => handleSelectOption(idx)}
                    aria-pressed={isSelected}
                    disabled={isChecked}
                    className={`w-full p-4 rounded-2xl border-2 text-left font-semibold text-base sm:text-lg flex items-center justify-between transition-all tactile-press ${cardStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 flex items-center justify-center font-mono text-xs font-bold">
                        {idx + 1}
                      </span>
                      <span>{opt}</span>
                    </div>

                    {isChecked && idx === currentQ.correctAnswer && (
                      <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                        <Check className="w-4 h-4" />
                      </div>
                    )}
                    {isChecked && isSelected && idx !== currentQ.correctAnswer && (
                      <div className="w-7 h-7 rounded-full bg-rose-500 text-white flex items-center justify-center">
                        <X className="w-4 h-4" />
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          )}

          {/* Render Dialog Question */}
          {currentQ.type === 'dialog' && (
            <div className="space-y-4">
              {/* Chat Bubbles */}
              <div className="space-y-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                {currentQ.speakerA && (
                  <div className="flex items-end gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-indigo-500 text-white font-heading font-bold text-xs flex items-center justify-center shrink-0">
                      A
                    </div>
                    <div className="p-3.5 rounded-2xl rounded-bl-none bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/80 text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-100">
                      {currentQ.speakerA}
                    </div>
                  </div>
                )}
                {currentQ.speakerB && (
                  <div className="flex items-end justify-end gap-2.5">
                    <div className="p-3.5 rounded-2xl rounded-br-none bg-pink-50 dark:bg-pink-950/60 border border-pink-200 dark:border-pink-800/80 text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-100 text-right">
                      {currentQ.speakerB}
                    </div>
                    <div className="w-8 h-8 rounded-full bg-pink-500 text-white font-heading font-bold text-xs flex items-center justify-center shrink-0">
                      B
                    </div>
                  </div>
                )}
              </div>

              {/* Options for Dialog */}
              <div className="space-y-2.5">
                {currentQ.options?.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  let cardStyle = 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 hover:border-indigo-400';

                  if (isChecked) {
                    if (idx === currentQ.correctAnswer) {
                      cardStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-200 ring-2 ring-emerald-500/20';
                    } else if (isSelected) {
                      cardStyle = 'border-rose-500 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200 ring-2 ring-rose-500/20';
                    }
                  } else if (isSelected) {
                    cardStyle = 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 ring-2 ring-indigo-500/30';
                  }

                  return (
                    <motion.button
                      type="button"
                      key={idx}
                      whileHover={!isChecked ? cardHover : undefined}
                      whileTap={!isChecked ? cardTap : undefined}
                      onClick={() => handleSelectOption(idx)}
                      aria-pressed={isSelected}
                      disabled={isChecked}
                      className={`w-full p-3.5 rounded-2xl border-2 text-left font-semibold text-base flex items-center justify-between transition-all tactile-press ${cardStyle}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 flex items-center justify-center font-mono text-xs font-bold">
                          {idx + 1}
                        </span>
                        <span>{opt}</span>
                      </div>
                      {isChecked && idx === currentQ.correctAnswer && (
                        <Check className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Render Sentence Builder */}
          {currentQ.type === 'build' && (
            <div className="space-y-4">
              {/* Target / Drop Zone */}
              <div
                className={`min-h-[90px] p-4 rounded-2xl border-2 border-dashed flex flex-wrap gap-2 items-center transition-all ${
                  isChecked
                    ? isCorrect
                      ? 'border-emerald-400 bg-emerald-50/60 dark:bg-emerald-950/30'
                      : 'border-rose-400 bg-rose-50/60 dark:bg-rose-950/30'
                    : 'border-slate-300 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/40'
                }`}
              >
                {buildWords.length === 0 ? (
                  <span className="text-xs sm:text-sm text-slate-400 dark:text-slate-500 select-none">
                    Sentuh kata di bawah untuk menyusun kalimat...
                  </span>
                ) : (
                  buildWords.map((word, bIdx) => (
                    <motion.button
                      type="button"
                      key={bIdx}
                      variants={popVariants}
                      initial="hidden"
                      animate="visible"
                      onClick={() => handleRemoveWord(word, bIdx)}
                      disabled={isChecked}
                      aria-label={`Hapus kata ${word}`}
                      className="min-h-11 px-3.5 py-2 rounded-xl bg-indigo-600 text-white font-heading font-bold text-sm sm:text-base shadow-sm hover:bg-indigo-700 active:scale-95 transition tactile-press focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                      title="Klik untuk menghapus kata ini"
                    >
                      {word}
                    </motion.button>
                  ))
                )}
              </div>

              {/* Word Bank */}
              <div className="flex flex-wrap gap-2.5 justify-center pt-2">
                {shuffledBank.map((word, sIdx) => (
                  <motion.button
                    type="button"
                    key={sIdx}
                    whileHover={!isChecked ? cardHover : undefined}
                    whileTap={!isChecked ? cardTap : undefined}
                    onClick={() => handleAddWord(word, sIdx)}
                    disabled={isChecked}
                    aria-label={`Tambahkan kata ${word}`}
                    className="min-h-11 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 font-heading font-bold text-sm sm:text-base text-slate-800 dark:text-slate-200 shadow-sm hover:border-indigo-400 active:scale-95 transition tactile-press focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    {word}
                  </motion.button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Keep feedback and quiz actions in normal flow so they cannot cover the question. */}
      <div className="-mx-4 mt-4 bg-white/95 dark:bg-slate-900/95 border-t border-slate-200 dark:border-slate-800 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] transition-all">
        <div className="max-w-2xl mx-auto space-y-3">
          {/* Feedback Sheet when Checked */}
          <AnimatePresence>
            {isChecked && (
              <motion.div
                role="status"
                aria-live="polite"
                aria-atomic="true"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className={`p-4 rounded-2xl border flex items-start justify-between gap-3 ${
                  isCorrect
                    ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100'
                    : 'bg-rose-50 dark:bg-rose-950/60 border-rose-300 dark:border-rose-800 text-rose-900 dark:text-rose-100'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-white font-bold ${
                      isCorrect ? 'bg-emerald-500' : 'bg-rose-500'
                    }`}
                  >
                    {isCorrect ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                  </div>
                  <div className="space-y-0.5">
                    <h4 className="font-heading font-extrabold text-base">
                      {isCorrect ? 'Luar Biasa! Jawabanmu Tepat!' : 'Kurang Tepat!'}
                    </h4>
                    <p className="text-xs sm:text-sm font-semibold opacity-95">
                      {currentQ.explanationId}
                    </p>
                    <p className="text-xs opacity-75 font-mono">
                      Kalimat Benar: "{currentQ.fullSentence}"
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => sound.speak(currentQ.fullSentence)}
                  aria-label="Dengarkan pengucapan kalimat benar"
                  className="w-9 h-9 rounded-xl bg-white/70 dark:bg-slate-800/70 text-slate-800 dark:text-slate-100 flex items-center justify-center shrink-0 hover:scale-110 active:scale-95 transition tactile-press shadow-sm"
                  title="Dengarkan suara"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Button: Check vs Continue */}
          {!isChecked ? (
            <motion.button
              type="button"
              whileTap={canCheck ? cardTap : undefined}
              onClick={handleCheckAnswer}
              disabled={!canCheck}
              className={`w-full py-4 rounded-2xl font-heading font-bold text-base sm:text-lg shadow-md transition tactile-press flex items-center justify-center gap-2 ${
                canCheck
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-indigo-500/25 hover:from-indigo-700 hover:to-purple-700'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
              }`}
            >
              Periksa Jawaban
            </motion.button>
          ) : (
            <motion.button
              type="button"
              whileTap={cardTap}
              onClick={handleNextQuestion}
              className={`w-full py-4 rounded-2xl font-heading font-bold text-base sm:text-lg text-white shadow-md transition tactile-press flex items-center justify-center gap-2 ${
                isCorrect
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 shadow-emerald-500/25 hover:from-emerald-600 hover:to-teal-700'
                  : 'bg-gradient-to-r from-rose-500 to-pink-600 shadow-rose-500/25 hover:from-rose-600 hover:to-pink-700'
              }`}
            >
              Lanjut Soal Berikutnya
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          )}
        </div>
      </div>

    </div>
  );
};
