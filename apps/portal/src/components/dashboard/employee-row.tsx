import { IconCircleCheck, IconClock } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { Badge } from '../ui/badge';
import type { EmployeeDemo } from '../../lib/types';

export function EmployeeRow({ employee }: { employee: EmployeeDemo }) {
	const { t } = useTranslation('common');
	return (
		<tr className="border-b border-surface-container-low hover:bg-surface-container-low/60 transition-colors text-xs">
			<td className="py-2.5 px-3">
				<div className="flex items-center gap-2.5">
					<div className="w-7 h-7 rounded-full bg-[#e6f7ef] border border-primary-fixed/70 flex items-center justify-center font-bold text-[#006c49] text-[11px]">
						{employee.avatarSeed}
					</div>
					<div>
						<p className="font-semibold text-[#131b2e] text-xs">{employee.name}</p>
						<p className="text-[10px] text-outline font-mono">{employee.id}</p>
					</div>
				</div>
			</td>
			<td className="py-2.5 px-3 text-on-surface-variant font-medium hidden sm:table-cell">
				{employee.role}
			</td>
			<td className="py-2.5 px-3 text-outline hidden md:table-cell">
				{employee.branch}
			</td>
			<td className="py-2.5 px-3 text-start">
				{employee.status === 'active' ? (
					<Badge variant="emerald" size="sm">
						<IconCircleCheck className="w-2.5 h-2.5" />
						{t('status.active')}
					</Badge>
				) : (
					<Badge variant="amber" size="sm">
						<IconClock className="w-2.5 h-2.5" />
						{t('status.leave')}
					</Badge>
				)}
			</td>
		</tr>
	);
}