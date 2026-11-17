import type { RegisteredCompany } from './auth/service';
import type { EmployeeDemo } from './types';

export type DashboardTranslationKey =
	| 'activeStaff'
	| 'registeredMembers'
	| 'complete'
	| 'operationalBranches'
	| 'activeLocations'
	| 'connected'
	| 'platformReadiness'
	| 'readyToOperate'
	| 'active'
	| 'headquarters'
	| 'adminName'
	| 'adminRole'
	| 'executiveManagement'
	| 'hrName'
	| 'hrRole'
	| 'humanResources'
	| 'operationsName'
	| 'operationsRole'
	| 'operations';

type Translate = (key: DashboardTranslationKey) => string;
export interface DashboardMetric {
	id: string;
	label: string;
	value: string;
	subtext: string;
	badgeText: string;
	variant: 'emerald' | 'lime';
}

function formatNumber(lang: 'ar' | 'en', value: number) {
	return new Intl.NumberFormat(lang === 'ar' ? 'ar-EG' : 'en-US').format(value);
}

function formatDate(lang: 'ar' | 'en', date: Date) {
	return new Intl.DateTimeFormat(lang === 'ar' ? 'ar-EG' : 'en-US', {
		dateStyle: 'medium',
	}).format(date);
}

export function getDashboardMetrics(
	lang: 'ar' | 'en',
	branchCount: number,
	t: Translate,
): DashboardMetric[] {
	return [
		{
			id: 'active_staff',
			label: t('activeStaff'),
			value: formatNumber(lang, 24),
			subtext: t('registeredMembers'),
			badgeText: t('complete'),
			variant: 'emerald',
		},
		{
			id: 'branches',
			label: t('operationalBranches'),
			value: formatNumber(lang, branchCount),
			subtext: t('activeLocations'),
			badgeText: t('connected'),
			variant: 'lime',
		},
		{
			id: 'system_status',
			label: t('platformReadiness'),
			value: '100%',
			subtext: t('readyToOperate'),
			badgeText: t('active'),
			variant: 'emerald',
		},
	];
}

export function getMockEmployees(
	lang: 'ar' | 'en',
	branches: string[],
	company?: RegisteredCompany | null,
	t?: Translate,
): EmployeeDemo[] {
	const translate = t ?? ((key: DashboardTranslationKey) => key);
	const defaultBranch = translate('headquarters');

	return [
		{
			id: '1',
			name: company?.fullName || translate('adminName'),
			role: translate('adminRole'),
			department: translate('executiveManagement'),
			branch: branches[0] || defaultBranch,
			status: 'active',
			joinedDate: formatDate(lang, new Date()),
			avatarSeed: 'admin',
		},
		{
			id: '2',
			name: translate('hrName'),
			role: translate('hrRole'),
			department: translate('humanResources'),
			branch: branches[0] || defaultBranch,
			status: 'active',
			joinedDate: formatDate(lang, new Date(2026, 8, 15)),
			avatarSeed: 'sarah',
		},
		{
			id: '3',
			name: translate('operationsName'),
			role: translate('operationsRole'),
			department: translate('operations'),
			branch: branches[1] || branches[0] || defaultBranch,
			status: 'active',
			joinedDate: formatDate(lang, new Date(2026, 8, 20)),
			avatarSeed: 'omar',
		},
	];
}