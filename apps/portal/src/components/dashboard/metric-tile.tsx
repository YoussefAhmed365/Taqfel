import { IconTrendingUp } from '@tabler/icons-react';
import { Badge } from '../ui/badge';

export interface MetricTileProps {
	label: string;
	value: string | number;
	subtext: string;
	trend?: string;
	badgeText?: string;
	variant?: 'emerald' | 'lime' | 'slate';
}

export function MetricTile({
	label,
	value,
	subtext,
	trend,
	badgeText,
	variant = 'emerald',
}: MetricTileProps) {
	return (
		<div className="bg-white border border-surface-dim rounded-xl p-3.5 sm:p-4 shadow-[0_1px_3px_0_rgba(19,27,46,0.03)] hover:border-outline-variant transition-all">
			<div className="flex items-center justify-between gap-2 mb-1.5">
				<span className="text-xs font-medium text-on-surface-variant">{label}</span>
				{badgeText && (
					<Badge
						variant={variant === 'emerald' ? 'emerald' : variant === 'lime' ? 'lime' : 'slate'}
						size="sm"
					>
						{badgeText}
					</Badge>
				)}
			</div>
			<div className="flex items-baseline gap-2 mb-1">
				<span className="text-2xl sm:text-3xl font-bold text-[#131b2e] tracking-tight tabular-nums">
					{value}
				</span>
			</div>
			<div className="flex items-center justify-between text-[11px] text-outline pt-1 border-t border-surface-container-low">
				<span className="truncate">{subtext}</span>
				{trend && (
					<span className="text-[#006c49] font-semibold text-[11px] shrink-0 flex items-center gap-0.5">
						<IconTrendingUp className="w-3 h-3" />
						{trend}
					</span>
				)}
			</div>
		</div>
	);
}