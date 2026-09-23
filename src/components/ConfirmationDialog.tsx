import React from 'react';
import { AlertCircle } from 'lucide-react';
import { AccessibleDialog } from './AccessibleDialog';

interface ConfirmationDialogProps {
  isOpen: boolean;
  titleId: string;
  title: string;
  description: string;
  cancelText: string;
  confirmText: string;
  onCancel: () => void;
  onConfirm: () => void;
  restoreFocusTo?: HTMLElement | null;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  titleId,
  title,
  description,
  cancelText,
  confirmText,
  onCancel,
  onConfirm,
  restoreFocusTo,
}) => (
  <AccessibleDialog
    isOpen={isOpen}
    titleId={titleId}
    onClose={onCancel}
    restoreFocusTo={restoreFocusTo}
    panelClassName="w-full max-w-sm p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl text-center space-y-4"
  >
    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto">
      <AlertCircle className="w-6 h-6" aria-hidden="true" />
    </div>
    <h2 id={titleId} className="font-heading font-extrabold text-xl text-slate-900 dark:text-slate-50">
      {title}
    </h2>
    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
      {description}
    </p>
    <div className="flex gap-2.5 pt-2">
      <button
        type="button"
        data-dialog-initial-focus
        onClick={onCancel}
        className="flex-1 min-h-11 py-3 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-heading font-bold text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition tactile-press focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
      >
        {cancelText}
      </button>
      <button
        type="button"
        onClick={onConfirm}
        className="flex-1 min-h-11 py-3 rounded-xl bg-rose-500 text-white font-heading font-bold text-sm hover:bg-rose-600 shadow-sm transition tactile-press focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-500"
      >
        {confirmText}
      </button>
    </div>
  </AccessibleDialog>
);
