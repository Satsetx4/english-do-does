import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  RotateCcw, 
  Home, 
  CheckCircle, 
  XCircle, 
  Volume2, 
  Sparkles
} from 'lucide-react';
import type { QuizResultRecord } from '../types';
import { sound } from '../lib/sound';
import { containerStagger, fadeInUpVariants, cardHover, cardTap } from '../lib/motion';

interface ResultViewProps {
  results: QuizResultRecord[];
  finalScore: number;
  totalQuestions: number;
  onPlayAgain: () => void;
  onGoHome: () => void;
}

export const ResultView: React.FC<ResultViewProps> = ({
  results,
  finalScore,
  totalQuestions,
  onPlayAgain,
  onGoHome,
}) => {
  const percentage = Math.round((finalScore / totalQuestions) * 100);
  const isPassed = percentage >= 60;
  const isPerfect = percentage === 100;

  useEffect(() => {
    if (isPassed) {
      confetti({
        particleCount: isPerfect ? 120 : 60,
        spread: 80,
        origin: { y: 0.6 },
      });
    }
  }, [isPassed, isPerfect]);

  return (
    <motion.div
      variants={containerStagger}
      initial="hidden"
      animate="visible"
      className="max-w-2xl mx-auto px-4 py-6 space-y-6 pb-20"
    >
      {/* Result Card Banner */}
      <motion.div
        variants={fadeInUpVariants}
        className="rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 text-white text-center shadow-xl shadow-indigo-500/20 relative overflow-hidden"
      >
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center mx-auto mb-4 shadow-inner">
          <Trophy className={`w-10 h-10 sm:w-12 sm:h-12 ${isPassed ? 'text-amber-300 fill-amber-300/30' : 'text-slate-300'}`} />
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          {isPerfect ? 'Nilai Sempurna!' : isPassed ? 'Hasil Memuaskan!' : 'Ayo Coba Lagi!'}
        </span>

        <h2 className="font-heading font-extrabold text-3xl sm:text-4xl">
          Skor: {finalScore} / {totalQuestions}
        </h2>
        <p className="text-indigo-100 text-sm sm:text-base font-medium mt-1">
          Tingkat Ketepatan: <strong className="text-white">{percentage}%</strong>
        </p>

        {/* Action Buttons */}
        <div className="pt-6 flex flex-wrap justify-center gap-3">
          <motion.button
            whileHover={cardHover}
            whileTap={cardTap}
            onClick={onPlayAgain}
            className="px-5 py-3 rounded-2xl bg-white text-indigo-700 font-heading font-bold shadow-md hover:bg-indigo-50 transition text-sm sm:text-base flex items-center gap-2 tactile-press"
          >
            <RotateCcw className="w-4 h-4" />
            Mainkan Lagi
          </motion.button>
          <motion.button
            whileHover={cardHover}
            whileTap={cardTap}
            onClick={onGoHome}
            className="px-5 py-3 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 text-white font-heading font-bold hover:bg-white/30 transition text-sm sm:text-base flex items-center gap-2 tactile-press"
          >
            <Home className="w-4 h-4" />
            Kembali ke Menu
          </motion.button>
        </div>
      </motion.div>

      {/* Smart Review: Breakdown of Questions */}
      <motion.div variants={fadeInUpVariants} className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-heading font-bold text-lg sm:text-xl text-slate-800 dark:text-slate-100">
            Smart Review (Pembahasan Soal)
          </h3>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            {results.length} Soal Dijawab
          </span>
        </div>

        <div className="space-y-3">
          {results.map((item, idx) => (
            <div
              key={idx}
              className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                item.isCorrect
                  ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/60'
                  : 'bg-rose-50/40 dark:bg-rose-950/20 border-rose-200 dark:border-rose-800/60'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <div className="mt-0.5 shrink-0">
                    {item.isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <p className="font-heading font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100">
                      {idx + 1}. {item.question.prompt}
                    </p>
                    <div className="text-xs sm:text-sm space-y-0.5">
                      <p className="text-slate-600 dark:text-slate-400">
                        Jawabanmu:{' '}
                        <strong className={item.isCorrect ? 'text-emerald-700 dark:text-emerald-300' : 'text-rose-600 dark:text-rose-400'}>
                          {item.userAnswer || '(Tidak dijawab)'}
                        </strong>
                      </p>
                      {!item.isCorrect && (
                        <p className="text-slate-800 dark:text-slate-200 font-medium">
                          Kalimat Benar:{' '}
                          <strong className="text-indigo-600 dark:text-indigo-400 font-mono">
                            {item.question.fullSentence}
                          </strong>
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => sound.speak(item.question.fullSentence)}
                  aria-label="Dengarkan pengucapan kalimat"
                  className="w-8 h-8 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0 hover:scale-110 active:scale-95 transition tactile-press shadow-xs"
                  title="Dengarkan suara"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              {/* Explanation Note */}
              <div className="mt-3 pt-3 border-t border-slate-200/60 dark:border-slate-800/60 text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                💡 <span className="font-semibold text-slate-800 dark:text-slate-200">Alasan:</span> {item.question.explanationId}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};
