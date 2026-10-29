'use client';

import { useState, useCallback } from 'react';
import { useAuthLanguage } from '../auth-language-context';
import { AuthHeading } from '../auth-shell';
import { AuthInput } from '../../ui/auth-input';
import { AuthButton } from '../../ui/auth-button';

interface BranchSetupProps {
  onSubmit: (branches: string[]) => void;
  onSkip: () => void;
}

export function BranchSetup({ onSubmit, onSkip }: BranchSetupProps) {
  const { t } = useAuthLanguage();
  const [branches, setBranches] = useState<string[]>(['']);

  const addBranch = useCallback(() => {
    setBranches((prev) => [...prev, '']);
  }, []);

  const updateBranch = useCallback((index: number, value: string) => {
    setBranches((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  }, []);

  const removeBranch = useCallback((index: number) => {
    setBranches((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const validBranches = branches.filter((b) => b.trim());

  return (
    <div className="space-y-6">
      <AuthHeading title={t.onboardingBranchSetupTitle} />

      <div className="space-y-3">
        {branches.map((branch, i) => (
          <div key={i} className="flex items-end gap-2">
            <div className="flex-1">
              <AuthInput
                label={i === 0 ? t.onboardingBranchName : ''}
                placeholder={t.onboardingBranchNamePlaceholder}
                value={branch}
                onChange={(e) => updateBranch(i, e.target.value)}
              />
            </div>
            {branches.length > 1 && (
              <button
                type="button"
                onClick={() => removeBranch(i)}
                className="h-11 w-11 flex items-center justify-center rounded-xl border border-outline-variant/50 text-outline hover:text-error hover:border-error/30 hover:bg-error-container/10 transition-all shrink-0"
                aria-label="Remove branch"
              >
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M4.28 3.22a.75.75 0 00-1.06 1.06L6.94 8l-3.72 3.72a.75.75 0 101.06 1.06L8 9.06l3.72 3.72a.75.75 0 101.06-1.06L9.06 8l3.72-3.72a.75.75 0 00-1.06-1.06L8 6.94 4.28 3.22z" />
                </svg>
              </button>
            )}
          </div>
        ))}

        {/* Add another branch */}
        <button
          type="button"
          onClick={addBranch}
          className="w-full flex items-center justify-center gap-2 p-3 rounded-xl border border-dashed border-outline-variant text-sm font-medium text-[#006c49] hover:bg-[#e6f7ef]/30 hover:border-[#006c49]/40 transition-all"
        >
          <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 1.5a.75.75 0 01.75.75v5h5a.75.75 0 010 1.5h-5v5a.75.75 0 01-1.5 0v-5h-5a.75.75 0 010-1.5h5v-5A.75.75 0 018 1.5z" />
          </svg>
          {t.onboardingAddAnotherBranch}
        </button>
      </div>

      <div className="space-y-3">
        <AuthButton
          onClick={() => validBranches.length > 0 && onSubmit(validBranches)}
          className="w-full"
          size="lg"
          disabled={validBranches.length === 0}
        >
          {t.onboardingContinue}
        </AuthButton>

        <div className="text-center">
          <button
            type="button"
            onClick={onSkip}
            className="text-sm text-on-surface-variant hover:text-[#006c49] font-medium hover:underline transition-colors"
          >
            {t.onboardingSkip}
          </button>
        </div>
      </div>
    </div>
  );
}
