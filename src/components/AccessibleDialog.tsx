import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { popVariants } from '../lib/motion';

interface AccessibleDialogProps {
  isOpen: boolean;
  titleId: string;
  onClose: () => void;
  children: React.ReactNode;
  restoreFocusTo?: HTMLElement | null;
  overlayClassName?: string;
  panelClassName?: string;
}

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

export const AccessibleDialog: React.FC<AccessibleDialogProps> = ({
  isOpen,
  titleId,
  onClose,
  children,
  restoreFocusTo,
  overlayClassName = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs',
  panelClassName = '',
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!isOpen) return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    const previouslyFocused = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    const getFocusable = () => Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
      .filter((element) => element.getAttribute('aria-hidden') !== 'true');
    const initialFocus = dialog.querySelector<HTMLElement>('[data-dialog-initial-focus]')
      ?? getFocusable()[0]
      ?? dialog;

    initialFocus.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCloseRef.current();
        return;
      }

      if (event.key !== 'Tab') return;

      const focusable = getFocusable();
      if (focusable.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !dialog.contains(document.activeElement))) {
        event.preventDefault();
        first.focus();
      }
    };

    const keepFocusInside = (event: FocusEvent) => {
      if (event.target instanceof Node && !dialog.contains(event.target)) {
        (getFocusable()[0] ?? dialog).focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('focusin', keepFocusInside);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('focusin', keepFocusInside);

      const focusTarget = restoreFocusTo ?? previouslyFocused;
      if (focusTarget?.isConnected) focusTarget.focus();
    };
  }, [isOpen, restoreFocusTo]);

  if (!isOpen) return null;

  return (
        <motion.div
          className={overlayClassName}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(event) => {
            if (event.target === event.currentTarget) onCloseRef.current();
          }}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            variants={popVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={panelClassName}
          >
            {children}
          </motion.div>
        </motion.div>
  );
};
