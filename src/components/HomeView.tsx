import React from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Play, 
  Sparkles, 
  Trophy, 
  Star, 
  CheckCircle2, 
  Flame,
  Zap,
  RotateCcw
} from 'lucide-react';
import { LESSONS } from '../data/lessons';
import type { LessonModule, UserProgress } from '../types';
import { containerStagger, fadeInUpVariants, cardHover, cardTap } from '../lib/motion';

interface HomeViewProps {
  progress: UserProgress;
  onSelectLesson: (module: LessonModule) => void;
  onStartQuiz: (mode: 'quick' | 'level1' | 'level2' | 'level3') => void;
  onResetData: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  progress,
  onSelectLesson,
  onStartQuiz,
  onResetData,
}) => {
  const completedCount = progress.completedModules.length;

  return (
    <motion.div
      variants={containerStagger}
      initial="hidden"
      animate="visible"
      className="max-w-2xl mx-auto px-4 py-6 space-y-8 pb-16"
    >
      {/* Hero Section */}
      <motion.div
        variants={fadeInUpVariants}
        className="relative overflow-hidden rounded-3xl p-6 md:p-8 bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 text-white shadow-xl shadow-indigo-500/20"
      >
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-48 h-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-48 h-48 rounded-full bg-pink-500/20 blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold tracking-wide uppercase text-indigo-100">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            Grammar Mini-Game V2
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            DO / DOES <span className="text-pink-300">Master</span>
          </h2>
          <p className="text-indigo-100 text-sm sm:text-base max-w-md font-medium leading-relaxed">
            Kuasai rahasia pemakaian <strong>Do</strong> dan <strong>Does</strong> dengan mudah, visual, dan anti-bingung!
          </p>

          <div className="pt-2 flex flex-wrap gap-2.5">
            <motion.button
              whileHover={cardHover}
              whileTap={cardTap}
              onClick={() => onStartQuiz('quick')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white text-indigo-700 font-heading font-bold shadow-md hover:bg-indigo-50 transition text-sm sm:text-base tactile-press"
            >
              <Play className="w-4 h-4 fill-current" />
              Mainkan Kuis Cepat
            </motion.button>
            <motion.button
              whileHover={cardHover}
              whileTap={cardTap}
              onClick={() => onSelectLesson(LESSONS[0])}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-indigo-500/30 backdrop-blur-md border border-white/20 text-white font-heading font-bold hover:bg-white/20 transition text-sm sm:text-base tactile-press"
            >
              <BookOpen className="w-4 h-4" />
              Mulai Belajar
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Stats Ribbon */}
      <motion.div variants={fadeInUpVariants} className="grid grid-cols-3 gap-3">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-1.5">
            <Star className="w-5 h-5 fill-current" />
          </div>
          <span className="font-heading font-extrabold text-xl text-slate-800 dark:text-slate-100">
            {progress.stars}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Bintang</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-1.5">
            <Trophy className="w-5 h-5" />
          </div>
          <span className="font-heading font-extrabold text-xl text-slate-800 dark:text-slate-100">
            {progress.bestScore}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Skor Tertinggi</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-1.5">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <span className="font-heading font-extrabold text-xl text-slate-800 dark:text-slate-100">
            {completedCount}/{LESSONS.length}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Modul Tuntas</span>
        </div>
      </motion.div>

      {/* Section 1: Modul Materi Pembelajaran */}
      <motion.div variants={fadeInUpVariants} className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="font-heading font-bold text-xl text-slate-800 dark:text-slate-100">
              Modul Pembelajaran
            </h3>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
            {completedCount} dari {LESSONS.length} Selesai
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {LESSONS.map((mod, idx) => {
            const isCompleted = progress.completedModules.includes(mod.id);
            const colorGradients: Record<string, string> = {
              indigo: 'from-indigo-500 to-indigo-600',
              pink: 'from-pink-500 to-rose-600',
              emerald: 'from-emerald-500 to-teal-600',
              amber: 'from-amber-500 to-orange-600',
            };

            return (
              <motion.div
                key={mod.id}
                whileHover={cardHover}
                whileTap={cardTap}
                onClick={() => onSelectLesson(mod)}
                className="group cursor-pointer rounded-2xl p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500/50 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-slate-400">MODUL 0{idx + 1}</span>
                    {isCompleted ? (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Selesai
                      </span>
                    ) : (
                      <span className="text-xs font-medium text-slate-400">
                        {mod.slides.length} Slide
                      </span>
                    )}
                  </div>
                  <h4 className="font-heading font-bold text-base text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-1">
                    {mod.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {mod.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                    Baca Materi & Audio &rarr;
                  </span>
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${colorGradients[mod.color]}`} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Section 2: Mode Latihan & Kuis */}
      <motion.div variants={fadeInUpVariants} className="space-y-4">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-pink-500" />
          <h3 className="font-heading font-bold text-xl text-slate-800 dark:text-slate-100">
            Arena Kuis & Tantangan
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Quick Quiz */}
          <motion.div
            whileHover={cardHover}
            whileTap={cardTap}
            onClick={() => onStartQuiz('quick')}
            className="cursor-pointer rounded-2xl p-5 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/40 dark:to-purple-950/40 border-2 border-indigo-200 dark:border-indigo-800/80 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3 mb-2.5">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-sm shadow-indigo-500/20">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-base text-slate-800 dark:text-slate-100">
                  Latihan Cepat (Campuran)
                </h4>
                <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
                  10 Soal Acak • Semua Level
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Kombinasi acak pilihan ganda, dialog, dan susun kalimat untuk menguji insting grammar kamu.
            </p>
          </motion.div>

          {/* Level 1 */}
          <motion.div
            whileHover={cardHover}
            whileTap={cardTap}
            onClick={() => onStartQuiz('level1')}
            className="cursor-pointer rounded-2xl p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-500/50 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3 mb-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h4 className="font-heading font-bold text-base text-slate-800 dark:text-slate-100">
                  Level 1: Dasar Pemula
                </h4>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                  10 Soal • I/You/They vs He/She/It
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Fokus mencocokkan subjek kata ganti dan nama benda tunggal/jamak.
            </p>
          </motion.div>

          {/* Level 2 */}
          <motion.div
            whileHover={cardHover}
            whileTap={cardTap}
            onClick={() => onStartQuiz('level2')}
            className="cursor-pointer rounded-2xl p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-pink-400 dark:hover:border-pink-500/50 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3 mb-2.5">
              <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-600 dark:text-pink-400 flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h4 className="font-heading font-bold text-base text-slate-800 dark:text-slate-100">
                  Level 2: Intermediet
                </h4>
                <span className="text-xs text-pink-600 dark:text-pink-400 font-semibold">
                  12 Soal • Tanya & Negatif
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Tantangan kalimat tanya WH, percakapan dua orang, dan singkatan don't/doesn't.
            </p>
          </motion.div>

          {/* Level 3 */}
          <motion.div
            whileHover={cardHover}
            whileTap={cardTap}
            onClick={() => onStartQuiz('level3')}
            className="cursor-pointer rounded-2xl p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-500/50 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3 mb-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h4 className="font-heading font-bold text-base text-slate-800 dark:text-slate-100">
                  Level 3: Master & Jebakan
                </h4>
                <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold">
                  10 Soal • Do Ganda & Verb S-Drop
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Soal-soal jebakan yang sering mengecoh: "Does he like...", "Do you do...", dsb.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Footer & Reset Action */}
      <motion.div
        variants={fadeInUpVariants}
        className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400"
      >
        <div className="flex items-center gap-2">
          <span>English DO / DOES Master V2</span>
          <span>•</span>
          <span>Sekawan Creative</span>
        </div>

        <button
          onClick={onResetData}
          className="inline-flex items-center gap-1.5 text-slate-400 hover:text-rose-500 transition-colors py-1 px-2.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30"
          title="Reset semua skor dan modul tuntas"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Progres Belajar
        </button>
      </motion.div>
    </motion.div>
  );
};
