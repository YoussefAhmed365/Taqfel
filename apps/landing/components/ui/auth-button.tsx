'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';

export interface AuthButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    loading?: boolean;
    loadingText?: string;
}

export const AuthButton = React.forwardRef<HTMLButtonElement, AuthButtonProps>(
    ({ className, variant = 'primary', size = 'md', loading, loadingText, children, disabled, ...props }, ref) => {
        const baseStyles =
            'inline-flex items-center justify-center font-semibold transition-all duration-200 select-none focus:outline-none focus:ring-3 active:scale-[0.99] cursor-pointer gap-2 rounded-xl';

        const variantStyles = {
            primary:
                'bg-[#006c49] text-white hover:bg-[#005236] active:bg-[#00422b] shadow-sm focus:ring-[#006c49]/25 border border-transparent disabled:opacity-50 disabled:pointer-events-none',
            secondary:
                'bg-white text-[#131b2e] border border-[#bbcabf] hover:bg-[#f2f3ff] hover:border-[#6c7a71] shadow-xs focus:ring-[#6c7a71]/20 disabled:opacity-50 disabled:pointer-events-none',
            ghost:
                'bg-transparent text-[#3c4a42] hover:bg-[#f2f3ff] hover:text-[#131b2e] focus:ring-[#6c7a71]/15 disabled:opacity-50 disabled:pointer-events-none',
            outline:
                'bg-transparent text-[#006c49] border border-[#006c49]/30 hover:bg-[#e6f7ef] hover:border-[#006c49] focus:ring-[#006c49]/20 disabled:opacity-50 disabled:pointer-events-none',
        };

        const sizeStyles = {
            sm: 'text-xs h-9 px-3.5',
            md: 'text-sm h-11 px-5',
            lg: 'text-base h-12 px-6',
        };

        return (
            <button
                ref={ref}
                className={cn(
                    baseStyles,
                    variantStyles[variant],
                    sizeStyles[size],
                    className
                )}
                disabled={disabled || loading}
                {...props}
            >
                {loading ? (
                    <>
                        <svg
                            className="animate-spin w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <circle
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="3"
                                className="opacity-25"
                            />
                            <path
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                className="opacity-75"
                            />
                        </svg>
                        {loadingText || children}
                    </>
                ) : (
                    children
                )}
            </button>
        );
    }
);

AuthButton.displayName = 'AuthButton';