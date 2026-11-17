'use client';

import { cn } from '../../lib/utils';
import { useAuthLanguage } from './auth-language-context';

interface AuthProgressProps {
    currentStep: number; // 0-indexed
    totalSteps?: number;
}

export function AuthProgress({ currentStep, totalSteps = 5 }: AuthProgressProps) {
    const { t } = useAuthLanguage();

    const steps = [
        { number: '01', label: t.stepCompany },
        { number: '02', label: t.stepAccount },
        { number: '03', label: t.stepVerify },
        { number: '04', label: t.stepSetup },
        { number: '05', label: t.stepReady },
    ].slice(0, totalSteps);

    return (
        <div className="flex items-center justify-center gap-1 sm:gap-2">
            {steps.map((step, i) => {
                const isActive = i === currentStep;
                const isCompleted = i < currentStep;

                return (
                    <div key={step.number} className="flex items-center md:items-start">
                        <div className="flex flex-col items-center gap-1.5 w-[56.44px]">
                            {/* Step indicator */}
                            <div
                                className={cn(
                                    'flex items-center justify-center w-6 h-6 rounded-full text-[10px] font-bold transition-all duration-300',
                                    isCompleted
                                        ? 'bg-[#006c49] text-white'
                                        : isActive
                                            ? 'bg-[#e6f7ef] text-[#006c49] border border-[#006c49]/30'
                                            : 'bg-surface-container-low text-outline border border-outline-variant/40'
                                )}
                            >
                                {isCompleted ? (
                                    <svg className="w-3 h-3" viewBox="0 0 16 16" fill="currentColor">
                                        <path d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z" />
                                    </svg>
                                ) : (
                                    step.number
                                )}
                            </div>

                            {/* Step label — hidden on small screens */}
                            <span
                                className={cn(
                                    'hidden sm:inline text-xs font-medium transition-colors duration-200',
                                    isActive
                                        ? 'text-[#006c49]'
                                        : isCompleted
                                            ? 'text-[#131b2e]'
                                            : 'text-outline'
                                )}
                            >
                                {step.label}
                            </span>
                        </div>

                        {/* Connector line */}
                        {i < steps.length - 1 && (
                            <div
                                className={cn(
                                    'w-4 sm:w-8 h-px translate-y-0 md:translate-y-3 transition-colors duration-300',
                                    i < currentStep ? 'bg-[#006c49]' : 'bg-outline-variant/50'
                                )}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}