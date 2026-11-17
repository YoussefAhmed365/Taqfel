import { cn } from '../../lib/utils';
import type { HTMLAttributes, ReactNode } from 'react';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
	variant?: 'emerald' | 'lime' | 'amber' | 'slate' | 'neutral';
	size?: 'sm' | 'md';
	children?: ReactNode;
}

export function Badge({
	className,
	variant = 'emerald',
	size = 'md',
	children,
	...props
}: BadgeProps) {
	const baseStyles =
		'inline-flex items-center font-medium rounded-full tracking-wide transition-colors';

	const sizeStyles = {
		sm: 'text-[11px] px-2 py-0.5 gap-1',
		md: 'text-xs px-2.5 py-1 gap-1.5',
	};

	const variantStyles = {
		emerald: 'bg-[#e6f7ef] text-[#006c49] border border-primary-fixed/70',
		lime: 'bg-[#f4fce3] text-secondary border border-surface-container-low/70',
		amber: 'bg-[#ffdad7]/35 text-[#a43a3a] border border-[#ffdad7]',
		slate: 'bg-surface-container-low text-on-surface-variant border border-surface-dim',
		neutral: 'bg-white text-on-surface-variant border border-surface-dim shadow-xs',
	};

	return (
		<span
			className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
			{...props}
		>
			{children}
		</span>
	);
}