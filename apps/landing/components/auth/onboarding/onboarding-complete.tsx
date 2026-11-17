'use client';

import { useAuthLanguage } from '../auth-language-context';
import { AuthHeading } from '../auth-shell';
import { AuthButton } from '../../ui/auth-button';
import { authService } from '../../../lib/auth/service';

interface OnboardingCompleteProps {
    onGoToDashboard: () => void;
}

export function OnboardingComplete({ onGoToDashboard }: OnboardingCompleteProps) {
    const { t, lang } = useAuthLanguage();
    const company = authService.getRegisteredCompany();

    return (
        <div className="text-center space-y-6">
            {/* Subtle success visual */}
            <div className="mx-auto w-20 h-20 rounded-2xl bg-[#e6f7ef] flex items-center justify-center">
                <svg className="w-10 h-10 text-[#006c49]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>

            <div className="space-y-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#006c49] bg-[#e6f7ef] border border-[#006c49]/20 px-3.5 py-1 rounded-full shadow-xs">
                    <span>🏢</span>
                    <span>{company?.companyName || (lang === 'ar' ? 'المنشأة' : 'Organization')}</span>
                </span>
                <AuthHeading
                    title={t.onboardingCompleteTitle}
                    subtitle={t.onboardingCompleteSubtitle}
                />
            </div>

            <AuthButton onClick={onGoToDashboard} className="w-full" size="lg">
                {t.onboardingGoToDashboard}
                <svg className="w-4 h-4 rtl:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </AuthButton>
        </div>
    );
}