import React from 'react';
import { ArrowLeft, Volume2, VolumeX, Sun, Moon, Settings } from 'lucide-react';

interface HeaderProps {
  title: string;
  onBack?: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onOpenSettings?: () => void;
  rightBadge?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  onBack,
  soundEnabled,
  onToggleSound,
  theme,
  onToggleTheme,
  onOpenSettings,
  rightBadge,
}) => {
  return (
    <header className="sticky top-0 z-30 w-full backdrop-blur-md bg-white/85 dark:bg-slate-900/85 border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {onBack ? (
            <button
              onClick={onBack}
              aria-label="Kembali"
              className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition tactile-press"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          ) : (
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-white shadow-sm shadow-indigo-500/20 font-heading font-bold text-lg">
              D
            </div>
          )}
          <h1 className="font-heading font-bold text-lg md:text-xl text-slate-800 dark:text-slate-100 truncate">
            {title}
          </h1>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {rightBadge}

          <button
            onClick={onToggleSound}
            aria-label={soundEnabled ? 'Matikan Suara' : 'Nyalakan Suara'}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition tactile-press"
            title={soundEnabled ? 'Suara Aktif' : 'Suara Bisu'}
          >
            {soundEnabled ? (
              <Volume2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            ) : (
              <VolumeX className="w-5 h-5 text-slate-400" />
            )}
          </button>

          <button
            onClick={onToggleTheme}
            aria-label="Ganti Tema Gelap / Terang"
            className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition tactile-press"
            title={theme === 'dark' ? 'Mode Terang' : 'Mode Gelap'}
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-amber-400 hover:rotate-45 transition-transform duration-300" />
            ) : (
              <Moon className="w-5 h-5 text-indigo-600 hover:-rotate-12 transition-transform duration-300" />
            )}
          </button>

          {onOpenSettings && (
            <button
              onClick={onOpenSettings}
              aria-label="Pengaturan"
              className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition tactile-press"
              title="Pengaturan"
            >
              <Settings className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
