'use client';

import * as React from 'react';
import { useState, useCallback } from 'react';
import { cn } from '../../lib/utils';
import { AuthInput, type AuthInputProps } from './auth-input';
import { useAuthLanguage } from '../auth/auth-language-context';

interface PasswordInputProps extends Omit<AuthInputProps, 'endAdornment' | 'type'> {
  showStrength?: boolean;
  strengthScore?: number;
  strengthLabel?: string;
  strengthChecks?: { label: string; passed: boolean }[];
}

export function PasswordInput({
  showStrength,
  strengthScore = 0,
  strengthLabel,
  strengthChecks,
  ...props
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);
  const { t } = useAuthLanguage();

  const toggle = useCallback(() => setVisible((v) => !v), []);

  const strengthColors = [
    'bg-[#ba1a1a]',    // 0–1: red
    'bg-[#ba1a1a]',
    'bg-[#e8a800]',    // 2: amber
    'bg-[#006c49]',    // 3: green
    'bg-[#006c49]',    // 4: green
  ];

  return (
    <div className="space-y-2">
      <AuthInput
        {...props}
        type={visible ? 'text' : 'password'}
        endAdornment={
          <button
            type="button"
            onClick={toggle}
            className="text-outline hover:text-[#131b2e] transition-colors p-0.5 rounded focus:outline-none focus:ring-2 focus:ring-[#006c49]/20"
            aria-label={visible ? t.signupPasswordHide : t.signupPasswordShow}
          >
            {visible ? (
              <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3.98 8.223A10.477 10.477 0 001.934 12c1.292 4.338 5.31 7.5 10.066 7.5.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        }
      />

      {showStrength && (props as any).value && (
        <div className="space-y-2 animate-fadeIn">
          {/* Strength bar */}
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={cn(
                  'h-1 flex-1 rounded-full transition-all duration-300',
                  i < strengthScore
                    ? strengthColors[Math.min(strengthScore, 4)]
                    : 'bg-outline-variant/40'
                )}
              />
            ))}
          </div>
          {strengthLabel && (
            <p className={cn(
              'text-xs font-medium transition-colors',
              strengthScore <= 1 ? 'text-error' : strengthScore <= 2 ? 'text-[#e8a800]' : 'text-[#006c49]'
            )}>
              {strengthLabel}
            </p>
          )}

          {/* Requirement checks */}
          {strengthChecks && (
            <div className="grid grid-cols-2 gap-x-3 gap-y-1">
              {strengthChecks.map((check) => (
                <div
                  key={check.label}
                  className="flex items-center gap-1.5 text-xs"
                >
                  {check.passed ? (
                    <svg className="w-3.5 h-3.5 text-[#006c49] shrink-0" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm3.22 5.47a.75.75 0 00-1.06-1.06L7 8.56 5.84 7.4a.75.75 0 10-1.06 1.06l1.75 1.75a.75.75 0 001.06 0l3.63-3.63z" />
                    </svg>
                  ) : (
                    <svg className="w-3.5 h-3.5 text-outline-variant shrink-0" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 12.5a5.5 5.5 0 110-11 5.5 5.5 0 010 11z" />
                    </svg>
                  )}
                  <span className={check.passed ? 'text-[#006c49]' : 'text-outline'}>
                    {check.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
