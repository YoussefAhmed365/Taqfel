'use client';

import { useState } from 'react';
import { cn } from '../../../lib/utils';
import { useAuthLanguage } from '../auth-language-context';
import { AuthHeading } from '../auth-shell';
import { AuthButton } from '../../ui/auth-button';

type CompanyStructure = 'single' | 'branches';

interface CompanyStructureProps {
  onSelect: (structure: CompanyStructure) => void;
}

export function CompanyStructureStep({ onSelect }: CompanyStructureProps) {
  const { t } = useAuthLanguage();
  const [selected, setSelected] = useState<CompanyStructure | null>(null);

  return (
    <div className="space-y-6">
      <AuthHeading
        title={t.onboardingStructureTitle}
        subtitle={t.onboardingStructureSubtitle}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Option A: Single location */}
        <button
          type="button"
          onClick={() => setSelected('single')}
          className={cn(
            'relative group text-start p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer',
            'hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#006c49]/20',
            selected === 'single'
              ? 'border-[#006c49] bg-[#e6f7ef]/40 shadow-sm'
              : 'border-outline-variant/50 bg-white hover:border-[#006c49]/40 hover:bg-[#faf8ff]'
          )}
          aria-pressed={selected === 'single'}
        >
          {/* Selection indicator */}
          {selected === 'single' && (
            <div className="absolute top-3 inset-e-3">
              <div className="w-5 h-5 rounded-full bg-[#006c49] flex items-center justify-center">
                <svg className="w-3 h-3 text-white" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
                </svg>
              </div>
            </div>
          )}

          {/* Icon */}
          <div className={cn(
            'w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors',
            selected === 'single' ? 'bg-[#006c49] text-white' : 'bg-[#e6f7ef] text-[#006c49]'
          )}>
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <h3 className="text-sm font-bold text-[#131b2e] mb-1">
            {t.onboardingSingleTitle}
          </h3>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            {t.onboardingSingleDesc}
          </p>
        </button>

        {/* Option B: Multiple branches */}
        <button
          type="button"
          onClick={() => setSelected('branches')}
          className={cn(
            'relative group text-start p-5 rounded-2xl border-2 transition-all duration-200 cursor-pointer',
            'hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#006c49]/20',
            selected === 'branches'
              ? 'border-[#006c49] bg-[#e6f7ef]/40 shadow-sm'
              : 'border-outline-variant/50 bg-white hover:border-[#006c49]/40 hover:bg-[#faf8ff]'
          )}
          aria-pressed={selected === 'branches'}
        >
          {selected === 'branches' && (
            <div className="absolute top-3 inset-e-3">
              <div className="w-5 h-5 rounded-full bg-[#006c49] flex items-center justify-center">
                <svg className="w-3 h-3 text-white" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
                </svg>
              </div>
            </div>
          )}

          <div className={cn(
            'w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-colors',
            selected === 'branches' ? 'bg-[#006c49] text-white' : 'bg-[#e6f7ef] text-[#006c49]'
          )}>
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3H21m-3.75 3H21" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <h3 className="text-sm font-bold text-[#131b2e] mb-1">
            {t.onboardingBranchesTitle}
          </h3>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            {t.onboardingBranchesDesc}
          </p>
        </button>
      </div>

      <AuthButton
        onClick={() => selected && onSelect(selected)}
        className="w-full"
        size="lg"
        disabled={!selected}
      >
        {t.onboardingContinue}
      </AuthButton>
    </div>
  );
}
