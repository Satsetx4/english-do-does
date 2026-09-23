import React from 'react';
import { X, Sun, Moon, Volume2, VolumeX, RotateCcw } from 'lucide-react';
import { AccessibleDialog } from './AccessibleDialog';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onRequestReset: () => void;
  restoreFocusTo?: HTMLElement | null;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  theme,
  onToggleTheme,
  soundEnabled,
  onToggleSound,
  onRequestReset,
  restoreFocusTo,
}) => {
  return (
    <AccessibleDialog
      isOpen={isOpen}
      titleId="settings-dialog-title"
      onClose={onClose}
      restoreFocusTo={restoreFocusTo}
      panelClassName="w-full max-w-md p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-6"
    >
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h2 id="settings-dialog-title" className="font-heading font-extrabold text-xl text-slate-900 dark:text-slate-50">
              Pengaturan Aplikasi
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup"
              className="w-11 h-11 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition tactile-press focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-3">
            {/* Theme Toggle */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                </div>
                <div>
                  <span className="font-bold text-sm text-slate-800 dark:text-slate-200 block">
                    Mode Tampilan
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {theme === 'dark' ? 'Tema Gelap Elegan' : 'Tema Terang Segar'}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={onToggleTheme}
                className="px-3.5 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 font-heading font-semibold text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition tactile-press"
              >
                Ganti ke {theme === 'dark' ? 'Terang' : 'Gelap'}
              </button>
            </div>

            {/* Sound Toggle */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                  {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                </div>
                <div>
                  <span className="font-bold text-sm text-slate-800 dark:text-slate-200 block">
                    Efek Suara (Audio)
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {soundEnabled ? 'Suara & TTS Aktif' : 'Semua Suara Dibisukan'}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={onToggleSound}
                className="px-3.5 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 font-heading font-semibold text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition tactile-press"
              >
                {soundEnabled ? 'Bisukan' : 'Nyalakan'}
              </button>
            </div>

            {/* Reset Progress Section */}
            <div className="p-3.5 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/50 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
                    <RotateCcw className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-sm text-slate-800 dark:text-slate-200 block">
                      Reset Data Belajar
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      Kembali ke kondisi bersih 0%
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onRequestReset}
                  className="px-3.5 py-2.5 rounded-xl bg-rose-500 text-white font-heading font-semibold text-xs hover:bg-rose-600 transition tactile-press shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500"
                >
                  Reset Data
                </button>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 font-heading font-bold text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition tactile-press"
            >
              Tutup Pengaturan
            </button>
          </div>
    </AccessibleDialog>
  );
};
