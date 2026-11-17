import * as React from 'react';
import { cn } from '../../lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    level?: 0 | 1 | 2;
}

export function Card({ className, level = 1, children, ...props }: CardProps) {
    const levelStyles = {
        0: 'bg-white border border-[#E2E8F0]/80',
        1: 'bg-white border border-[#E2E8F0] shadow-[0_1px_3px_0_rgba(15,23,42,0.04),0_1px_2px_-1px_rgba(15,23,42,0.03)]',
        2: 'bg-white border border-[#CBD5E1] shadow-[0_10px_15px_-3px_rgba(15,23,42,0.06),0_4px_6px_-4px_rgba(15,23,42,0.03)]',
    };

    return (
        <div
            className={cn('rounded-2xl transition-all duration-200', levelStyles[level], className)}
            {...props}
        >
            {children}
        </div>
    );
}