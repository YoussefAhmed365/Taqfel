'use client';

import React from 'react';
import { AuthHeader } from './auth-header';
import { AuthFooter } from './auth-footer';

interface AuthShellProps {
    children: React.ReactNode;
    /** Width constraint: 'narrow' (login/2FA), 'medium' (signup steps), 'wide' (onboarding) */
    width?: 'narrow' | 'medium' | 'wide';
}

const widthClasses = {
    narrow: 'max-w-md',
    medium: 'max-w-lg',
    wide: 'max-w-2xl',
};

export function AuthShell({ children, width = 'medium' }: AuthShellProps) {
    return (
        <div className="min-h-screen flex flex-col bg-[#faf8ff]">
            <AuthHeader />

            <main className="flex-1 flex items-start sm:items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
                {/* Subtle background accents matching the landing page hero */}
                <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
                    <div className="absolute top-1/4 inset-s-1/4 w-96 h-96 bg-[#e6f7ef] rounded-full blur-3xl opacity-30" />
                    <div className="absolute bottom-1/4 inset-e-1/4 w-80 h-80 bg-[#f4fce3] rounded-full blur-3xl opacity-20" />
                </div>

                <div className={`w-full ${widthClasses[width]}`}>
                    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_1px_3px_0_rgba(15,23,42,0.04),0_1px_2px_-1px_rgba(15,23,42,0.03)] p-6 sm:p-8 md:p-10">
                        {children}
                    </div>
                </div>
            </main>

            <AuthFooter />
        </div>
    );
}

/**
 * Auth page heading — consistent title + subtitle across all auth pages.
 */
export function AuthHeading({
    title,
    subtitle,
    className,
}: {
    title: string;
    subtitle?: string;
    className?: string;
}) {
    return (
        <div className={`text-center mb-6 sm:mb-8 ${className || ''}`}>
            <h1 className="text-xl sm:text-2xl font-bold text-[#131b2e] tracking-tight mb-2">
                {title}
            </h1>
            {subtitle && (
                <p className="text-sm text-on-surface-variant leading-relaxed max-w-sm mx-auto">
                    {subtitle}
                </p>
            )}
        </div>
    );
}