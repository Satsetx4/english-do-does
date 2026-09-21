import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Volume2, 
  CheckCircle, 
  Lightbulb, 
  AlertTriangle,
  Sparkles
} from 'lucide-react';
import type { LessonModule } from '../types';
import { sound } from '../lib/sound';
import { popVariants, cardHover, cardTap } from '../lib/motion';

interface LearnViewProps {
  module: LessonModule;
  onFinish: () => void;
}

export const LearnView: React.FC<LearnViewProps> = ({
  module,
  onFinish,
}) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const slide = module.slides[slideIndex];
  const isLastSlide = slideIndex === module.slides.length - 1;

  const handleNext = () => {
    sound.playPop();
    if (isLastSlide) {
      sound.playCheer();
      onFinish();
    } else {
      setSlideIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    sound.playPop();
    if (slideIndex > 0) {
      setSlideIndex((prev) => prev - 1);
    }
  };

  const handleSpeak = (text: string) => {
    sound.speak(text);
  };

  const progressPercent = ((slideIndex + 1) / module.slides.length) * 100;

  return (
    <div className="max-w-2xl mx-auto px-4 py-4 space-y-5 pb-20">
      {/* Top Slide Indicator */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
          <span className="truncate max-w-[200px]">{module.shortTitle}</span>
          <span>
            Slide {slideIndex + 1} dari {module.slides.length}
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Slide Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slideIndex}
          variants={popVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="rounded-3xl p-6 sm:p-7 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-6"
        >
          {/* Header of Slide */}
          <div className="space-y-1.5 border-b border-slate-100 dark:border-slate-800/80 pb-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 text-xs font-bold border border-indigo-200 dark:border-indigo-800">
              <Sparkles className="w-3.5 h-3.5" />
              {slide.keyBadge}
            </div>
            <h2 className="font-heading font-extrabold text-2xl text-slate-900 dark:text-slate-50">
              {slide.title}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              {slide.subtitle}
            </p>
          </div>

          {/* Core Rule Box */}
          <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/80 space-y-2">
            <span className="text-xs font-bold tracking-wide uppercase text-indigo-700 dark:text-indigo-300 block">
              Aturan Inti
            </span>
            <p className="text-sm sm:text-base font-semibold text-slate-800 dark:text-slate-100 leading-relaxed">
              {slide.coreRule}
            </p>
            {slide.formula && (
              <div className="mt-2 py-2 px-3 rounded-xl bg-white dark:bg-slate-900 border border-indigo-100 dark:border-indigo-900 text-xs sm:text-sm font-mono font-bold text-indigo-600 dark:text-indigo-400 text-center">
                {slide.formula}
              </div>
            )}
          </div>

          {/* Pronouns List / Breakdown */}
          {slide.pronouns.length > 0 && (
            <div className="space-y-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Daftar Subjek & Pasangan
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {slide.pronouns.map((p, pIdx) => (
                  <div
                    key={pIdx}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between"
                  >
                    <div>
                      <span className="font-bold text-sm text-indigo-600 dark:text-indigo-400">
                        {p.subject}
                      </span>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{p.note}</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 font-mono font-bold text-xs">
                      {p.verb}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Examples with Pronunciation Audio */}
          {slide.examples.length > 0 && (
            <div className="space-y-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Contoh Kalimat Nyata (Klik Speaker Untuk Dengar)
              </span>
              <div className="space-y-2">
                {slide.examples.map((ex, exIdx) => (
                  <div
                    key={exIdx}
                    className="p-3.5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-start justify-between gap-3 group hover:border-indigo-300 dark:hover:border-indigo-600 transition"
                  >
                    <div className="space-y-0.5">
                      <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
                        {ex.en}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {ex.id}
                      </p>
                    </div>
                    <button
                      onClick={() => handleSpeak(ex.en)}
                      aria-label="Dengarkan pengucapan"
                      className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 hover:scale-110 active:scale-95 transition tactile-press"
                      title="Dengarkan suara"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Common Trap Alert Box */}
          {slide.commonTrap && (
            <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/80 space-y-2">
              <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 text-xs font-bold uppercase">
                <AlertTriangle className="w-4 h-4" />
                Jebakan Yang Sering Bikin Salah
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm font-semibold">
                <div className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-900/80 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800/80">
                  {slide.commonTrap.wrong}
                </div>
                <div className="p-2.5 rounded-xl bg-white/80 dark:bg-slate-900/80 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/80">
                  {slide.commonTrap.right}
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                {slide.commonTrap.explanation}
              </p>
            </div>
          )}

          {/* Pro Tip Box */}
          {slide.proTip && (
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/80 flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-amber-900 dark:text-amber-200 font-medium leading-relaxed">
                {slide.proTip}
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between gap-3 pt-2">
        <button
          onClick={handlePrev}
          disabled={slideIndex === 0}
          className="px-5 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-heading font-bold text-sm flex items-center gap-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:pointer-events-none transition tactile-press"
        >
          <ChevronLeft className="w-4 h-4" />
          Sebelumnya
        </button>

        <motion.button
          whileHover={cardHover}
          whileTap={cardTap}
          onClick={handleNext}
          className={`flex-1 py-3.5 px-6 rounded-2xl text-white font-heading font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg transition tactile-press ${
            isLastSlide
              ? 'bg-gradient-to-r from-emerald-500 to-teal-600 shadow-emerald-500/25 hover:from-emerald-600 hover:to-teal-700'
              : 'bg-gradient-to-r from-indigo-500 to-purple-600 shadow-indigo-500/25 hover:from-indigo-600 hover:to-purple-700'
          }`}
        >
          {isLastSlide ? (
            <>
              <CheckCircle className="w-5 h-5" />
              Tuntaskan Modul
            </>
          ) : (
            <>
              Selanjutnya
              <ChevronRight className="w-5 h-5" />
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
};
