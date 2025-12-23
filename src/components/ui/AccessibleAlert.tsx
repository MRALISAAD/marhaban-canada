'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

type AccessibleAlertProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  okLabel: string;
};

export function AccessibleAlert({
  isOpen,
  onClose,
  title,
  message,
  okLabel,
}: AccessibleAlertProps) {
  const alertRef = useRef<HTMLDivElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);
  const okButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Store the previously focused element
    previousActiveElementRef.current = document.activeElement as HTMLElement;

    // Focus the OK button when alert opens
    const timer = setTimeout(() => {
      okButtonRef.current?.focus();
    }, 0);

    // Handle ESC key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('keydown', handleEscape);
      // Restore focus to previous element
      previousActiveElementRef.current?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Split message by newlines for better formatting
  const messageLines = message.split('\n').filter((line) => line.trim());

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div
        ref={alertRef}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="alert-title"
        aria-describedby="alert-description"
        className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="alert-title" className="text-xl font-semibold text-slate-900">
          {title}
        </h2>
        <div id="alert-description" className="mt-3 text-sm text-slate-600">
          {messageLines.map((line, index) => (
            <p key={index} className={index > 0 ? 'mt-2' : ''}>
              {line}
            </p>
          ))}
        </div>
        <div className="mt-6 flex justify-end">
          <button
            ref={okButtonRef}
            type="button"
            onClick={onClose}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
          >
            {okLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

