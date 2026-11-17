import * as React from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'accent' | 'secondary' | 'ghost' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
        const baseStyles =
            'inline-flex items-center justify-center font-medium transition-all duration-200 select-none focus:outline-none focus:ring-3 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.99] cursor-pointer';

        const variantStyles = {
            primary:
                'bg-[#006c49] text-white hover:bg-[#005236] active:bg-on-primary-container shadow-xs focus:ring-[#006c49]/25 border border-transparent',
            accent:
                'bg-surface-container-low text-[#131b2e] font-semibold hover:bg-[#91db2a] shadow-xs focus:ring-surface-container-low/30 border border-transparent',
            secondary:
                'bg-white text-[#131b2e] border border-surface-dim hover:bg-surface-container-low hover:text-[#131b2e] hover:border-outline-variant shadow-xs focus:ring-outline/20',
            ghost:
                'bg-transparent text-on-surface-variant hover:bg-surface-container-low hover:text-[#131b2e] focus:ring-outline/15',
            outline:
                'bg-transparent text-[#006c49] border border-[#006c49]/35 hover:bg-[#faf8ff] hover:border-[#006c49] focus:ring-[#006c49]/20',
        };

        const sizeStyles = {
            sm: 'text-xs h-8 px-3 rounded-lg gap-1.5',
            md: 'text-sm h-10 px-4 rounded-lg gap-2',
            lg: 'text-base h-11 px-5 rounded-xl gap-2.5',
        };

        return (
            <button
                ref={ref}
                className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
                {...props}
            />
        );
    }
);

Button.displayName = 'Button';