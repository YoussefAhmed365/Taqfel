'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';

interface AlertProps {
  variant: 'error' | 'warning' | 'success' | 'info';
  children: React.ReactNode;
  className?: string;
  onDismiss?: () => void;
}

const variants = {
  error: {
    bg: 'bg-[#ffdad6]/40',
    border: 'border-[#ffdad6]',
    text: 'text-[#93000a]',
    icon: (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm-.75 4.25a.75.75 0 011.5 0v3a.75.75 0 01-1.5 0v-3zM8 11a1 1 0 100-2 1 1 0 000 2z" />
      </svg>
    ),
  },
  warning: {
    bg: 'bg-[#fff3cd]/40',
    border: 'border-[#ffd866]',
    text: 'text-[#7a5800]',
    icon: (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8.982 1.566a1.13 1.13 0 00-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 01-1.1 0L7.1 5.995A.905.905 0 018 5zm.002 6a1 1 0 100 2 1 1 0 000-2z" />
      </svg>
    ),
  },
  success: {
    bg: 'bg-[#e6f7ef]/60',
    border: 'border-[#006c49]/20',
    text: 'text-[#006c49]',
    icon: (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm3.22 5.47a.75.75 0 00-1.06-1.06L7 8.56 5.84 7.4a.75.75 0 10-1.06 1.06l1.75 1.75a.75.75 0 001.06 0l3.63-3.63z" />
      </svg>
    ),
  },
  info: {
    bg: 'bg-[#f2f3ff]',
    border: 'border-[#dae2fd]',
    text: 'text-[#131b2e]',
    icon: (
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm-.75 4a.75.75 0 011.5 0v.5a.75.75 0 01-1.5 0V5zM8 7.5a.75.75 0 01.75.75v2.75a.75.75 0 01-1.5 0V8.25A.75.75 0 018 7.5z" />
      </svg>
    ),
  },
};

export function AuthAlert({ variant, children, className, onDismiss }: AlertProps) {
  const v = variants[variant];
  return (
    <div
      className={cn(
        'flex items-start gap-2.5 px-3.5 py-3 rounded-xl border text-sm animate-fadeIn',
        v.bg,
        v.border,
        v.text,
        className
      )}
      role="alert"
      aria-live="polite"
    >
      {v.icon}
      <span className="flex-1 leading-relaxed">{children}</span>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="p-0.5 hover:opacity-70 transition-opacity shrink-0"
          aria-label="Dismiss"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="currentColor">
            <path d="M4.28 3.22a.75.75 0 00-1.06 1.06L6.94 8l-3.72 3.72a.75.75 0 101.06 1.06L8 9.06l3.72 3.72a.75.75 0 101.06-1.06L9.06 8l3.72-3.72a.75.75 0 00-1.06-1.06L8 6.94 4.28 3.22z" />
          </svg>
        </button>
      )}
    </div>
  );
}
