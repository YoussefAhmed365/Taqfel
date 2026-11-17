import { useState, useEffect } from 'react';
import {
	IconBuilding,
	IconUsers,
	IconGitBranch,
	IconRefresh,
	IconLogout,
	IconMaximize,
	IconMinimize,
	IconLanguage,
	IconCircleCheck,
} from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../hooks/use-locale';
import { AppShell, type NavId } from '../components/layout/app-shell';
import { MetricTile } from '../components/dashboard/metric-tile';
import { EmployeeRow } from '../components/dashboard/employee-row';
import { Badge } from '../components/ui/badge';
import { authService, type RegisteredCompany } from '../lib/auth/service';
import {
	getDashboardMetrics,
	getMockEmployees,
	type DashboardTranslationKey,
} from '../lib/dashboard-data';


const LANDING_URL = import.meta.env.VITE_LANDING_URL || 'http://localhost:3000';

export default function DashboardPage() {
	const { lang, toggleLang } = useLocale();
	const { t } = useTranslation('dashboard');
	const { t: commonT } = useTranslation('common');
	const translate = (key: DashboardTranslationKey): string => t(key);
	const [activeTab, setActiveTab] = useState<'overview' | 'employees' | 'branches'>('overview');
	const [company] = useState<RegisteredCompany | null>(() => {
		return authService.getRegisteredCompany();
	});
	const [isFullscreen, setIsFullscreen] = useState(false);

	useEffect(() => {
		const handleFullscreenChange = () => {
			setIsFullscreen(!!document.fullscreenElement);
		};
		document.addEventListener('fullscreenchange', handleFullscreenChange);
		return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
	}, []);

	const toggleBrowserFullscreen = () => {
		if (!document.fullscreenElement) {
			document.documentElement.requestFullscreen().catch(() => { });
		} else {
			document.exitFullscreen().catch(() => { });
		}
	};

	const handleRestartDemo = () => {
		authService.logout();
		window.location.href = `${LANDING_URL}/${lang}/signup`;
	};

	const handleLogout = () => {
		authService.logout();
		window.location.href = `${LANDING_URL}/${lang}/login`;
	};

	const companyName = company?.companyName || t('defaults.companyName');
	const branchesList = (company?.branches && company.branches.length > 0)
		? company.branches
		: [
			t('defaults.branches.headquarters'),
			t('defaults.branches.alexandria'),
			t('defaults.branches.giza'),
		];

	const mockMetrics = getDashboardMetrics(lang, branchesList.length, translate);
	const mockEmployees = getMockEmployees(lang, branchesList, company, translate);

	const headerActions = (
		<div className="flex items-center gap-1 sm:gap-2">
			<button
				type="button"
				onClick={toggleLang}
				title={commonT('actions.switchLanguage')}
				className="p-1.5 text-outline hover:text-[#131b2e] hover:bg-surface-container-low rounded-lg transition-colors flex items-center justify-center cursor-pointer"
			>
				<IconLanguage className="w-4 h-4" />
			</button>
			<button
				type="button"
				onClick={toggleBrowserFullscreen}
				title={isFullscreen ? commonT('actions.exitFullscreen') : commonT('actions.fullscreen')}
				className="p-1.5 text-outline hover:text-[#131b2e] hover:bg-surface-container-low rounded-lg transition-colors flex items-center justify-center cursor-pointer"
			>
				{isFullscreen ? <IconMinimize className="w-4 h-4" /> : <IconMaximize className="w-4 h-4" />}
			</button>
			<button
				type="button"
				onClick={handleRestartDemo}
				title={commonT('actions.resetDemo')}
				className="px-2.5 py-1 text-xs font-medium text-outline hover:text-[#006c49] hover:bg-[#e6f7ef] rounded-lg transition-colors flex items-center gap-1.5 border border-surface-dim cursor-pointer"
			>
				<IconRefresh className="w-3.5 h-3.5" />
				<span className="hidden sm:inline">{commonT('actions.resetDemo')}</span>
			</button>
			<button
				type="button"
				onClick={handleLogout}
				title={commonT('actions.logout')}
				className="px-2.5 py-1 text-xs font-medium text-outline hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1.5 border border-surface-dim cursor-pointer"
			>
				<IconLogout className="w-3.5 h-3.5" />
				<span className="hidden sm:inline">{commonT('actions.logout')}</span>
			</button>
		</div>
	);

	return (
		<AppShell
			activeNav={activeTab === 'overview' ? 'dashboard' : activeTab === 'employees' ? 'employees' : 'branches'}
			onNavClick={(id: NavId) => {
				if (id === 'dashboard') setActiveTab('overview');
				else if (id === 'employees') setActiveTab('employees');
				else if (id === 'branches') setActiveTab('branches');
			}}
			companyName={companyName}
			user={{
				name: company?.fullName || t('defaults.adminName'),
				role: t('defaults.adminRole'),
				avatarSeed: (company?.fullName ? company.fullName.slice(0, 2) : t('defaults.avatar')),
			}}
			actions={headerActions}
		>
			<div className="max-w-7xl mx-auto space-y-6 pb-12">
				{/* Navigation Tabs */}
				<div className="flex items-center gap-2 border-b border-surface-dim pb-3">
					<button
						type="button"
						onClick={() => setActiveTab('overview')}
						className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${activeTab === 'overview'
							? 'bg-[#006c49] text-white shadow-xs'
							: 'text-on-surface-variant hover:bg-[#e6f7ef] hover:text-[#006c49]'
							}`}
					>
						<IconBuilding className="w-3.5 h-3.5" />
						<span>{t('tabs.overview')}</span>
					</button>
					<button
						type="button"
						onClick={() => setActiveTab('employees')}
						className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${activeTab === 'employees'
							? 'bg-[#006c49] text-white shadow-xs'
							: 'text-on-surface-variant hover:bg-[#e6f7ef] hover:text-[#006c49]'
							}`}
					>
						<IconUsers className="w-3.5 h-3.5" />
						<span>{t('tabs.employees')}</span>
					</button>
					<button
						type="button"
						onClick={() => setActiveTab('branches')}
						className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${activeTab === 'branches'
							? 'bg-[#006c49] text-white shadow-xs'
							: 'text-on-surface-variant hover:bg-[#e6f7ef] hover:text-[#006c49]'
							}`}
					>
						<IconGitBranch className="w-3.5 h-3.5" />
						<span>{t('tabs.branches')}</span>
					</button>
				</div>

				{/* Tab 1: Overview */}
				{activeTab === 'overview' && (
					<div className="space-y-6 animate-fadeIn">
						{/* Metric Tiles */}
						<div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
							{mockMetrics.map((m) => (
								<MetricTile
									key={m.id}
									label={m.label}
									value={m.value}
									subtext={m.subtext}
									badgeText={m.badgeText}
									variant={m.variant}
								/>
							))}
						</div>

						{/* Quick Info Grid */}
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
							{/* Setup Summary Card */}
							<div className="p-4 sm:p-5 rounded-xl border border-surface-dim bg-white space-y-3.5 shadow-2xs">
								<h3 className="text-xs font-bold uppercase tracking-wider text-outline">
									{t('organization.details')}
								</h3>
								<div className="space-y-2.5 text-xs">
									<div className="flex justify-between py-1.5 border-b border-surface-container-low">
										<span className="text-on-surface-variant">{t('organization.companyName')}:</span>
										<span className="font-semibold text-[#131b2e]">{companyName}</span>
									</div>
									<div className="flex justify-between py-1.5 border-b border-surface-container-low">
										<span className="text-on-surface-variant">{t('organization.adminName')}:</span>
										<span className="font-semibold text-[#131b2e]">{company?.fullName || t('defaults.adminName')}</span>
									</div>
									<div className="flex justify-between py-1.5 border-b border-surface-container-low">
										<span className="text-on-surface-variant">{t('organization.adminEmail')}:</span>
										<span dir="ltr" className="font-semibold text-[#006c49]">{company?.email || 'admin@company.com'}</span>
									</div>
									<div className="flex justify-between py-1.5">
										<span className="text-on-surface-variant">{t('organization.structure')}:</span>
										<span className="font-semibold text-[#131b2e]">
											{company?.structure === 'single'
												? t('organization.single')
												: t('organization.multiple', { count: branchesList.length })}
										</span>
									</div>
								</div>
							</div>

							{/* Operational Readiness Card */}
							<div className="p-4 sm:p-5 rounded-xl border border-surface-dim bg-white space-y-3.5 shadow-2xs">
								<h3 className="text-xs font-bold uppercase tracking-wider text-outline">
									{t('status.activation')}
								</h3>
								<div className="space-y-3">
									<div className="flex items-center gap-2.5 text-xs text-[#131b2e]">
										<IconCircleCheck className="w-5 h-5 rounded-full bg-[#e6f7ef] text-[#006c49] shrink-0" aria-hidden="true" />
										<span>{t('status.accountCreated')}</span>
									</div>
									<div className="flex items-center gap-2.5 text-xs text-[#131b2e]">
										<IconCircleCheck className="w-5 h-5 rounded-full bg-[#e6f7ef] text-[#006c49] shrink-0" aria-hidden="true" />
										<span>{t('status.emailVerified')}</span>
									</div>
									<div className="flex items-center gap-2.5 text-xs text-[#131b2e]">
										<IconCircleCheck className="w-5 h-5 rounded-full bg-[#e6f7ef] text-[#006c49] shrink-0" aria-hidden="true" />
										<span>{t('status.structureInitialized')}</span>
									</div>
									<div className="flex items-center gap-2.5 text-xs text-[#131b2e]">
										<IconCircleCheck className="w-5 h-5 rounded-full bg-[#f4fce3] text-[#4d7c0f] shrink-0" aria-hidden="true" />
										<span>{t('status.apiReady')}</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}

				{/* Tab 2: Employees */}
				{activeTab === 'employees' && (
					<div className="space-y-4 animate-fadeIn">
						<div className="flex items-center justify-between">
							<h3 className="text-sm font-bold text-[#131b2e]">
								{t('employees.title')}
							</h3>
							<Badge variant="emerald" size="sm">
								{mockEmployees.length} {t('employees.count')}
							</Badge>
						</div>
						<div className="bg-white rounded-xl border border-surface-dim overflow-hidden shadow-2xs">
							<div className="overflow-x-auto">
								<table className="w-full text-start">
									<thead>
										<tr className="bg-surface-container-low/60 border-b border-surface-dim text-outline text-[11px] font-semibold">
											<th className="py-2.5 px-3 text-start">{t('employees.employee')}</th>
											<th className="py-2.5 px-3 text-start hidden sm:table-cell">{t('employees.role')}</th>
											<th className="py-2.5 px-3 text-start hidden md:table-cell">{t('employees.branch')}</th>
											<th className="py-2.5 px-3 text-start">{t('employees.status')}</th>
										</tr>
									</thead>
									<tbody>
										{mockEmployees.map((emp) => (
											<EmployeeRow key={emp.id} employee={emp} />
										))}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				)}

				{/* Tab 3: Branches */}
				{activeTab === 'branches' && (
					<div className="space-y-4 animate-fadeIn">
						<div className="flex items-center justify-between">
							<h3 className="text-sm font-bold text-[#131b2e]">
								{t('branches.title')}
							</h3>
							<Badge variant="emerald" size="sm">
								{branchesList.length} {t('branches.count')}
							</Badge>
						</div>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
							{branchesList.map((branchName, idx) => (
								<div
									key={idx}
									className="p-4 rounded-xl border border-surface-dim bg-white flex items-center justify-between gap-3 shadow-2xs hover:border-outline-variant transition-all"
								>
									<div className="flex items-center gap-3">
										<div className="w-9 h-9 rounded-lg bg-[#e6f7ef] text-[#006c49] flex items-center justify-center font-bold text-xs">
											{idx + 1}
										</div>
										<div>
											<h4 className="text-xs font-bold text-[#131b2e]">{branchName}</h4>
											<p className="text-[11px] text-outline">
												{t('branches.active')}
											</p>
										</div>
									</div>
									<Badge variant="emerald" size="sm">
										{commonT('status.active')}
									</Badge>
								</div>
							))}
						</div>
					</div>
				)}
			</div>
		</AppShell>
	);
}