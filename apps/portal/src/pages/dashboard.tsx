import { useState, useEffect, useCallback } from 'react';
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
import { useSearchParams } from 'react-router-dom';


const LANDING_URL = import.meta.env.VITE_LANDING_URL || 'http://localhost:3000';

export default function DashboardPage() {
  const { lang, toggleLang } = useLocale();
  const { t } = useTranslation('dashboard');
  const translate = (key: DashboardTranslationKey): string => t(key);
  const [searchParams, setSearchParams] = useSearchParams();
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

  const companyName = company?.companyName || (lang === 'ar' ? 'شركة تقفيل للحلول البرمجية' : 'Taqfel Tech Solutions');
  const branchesList = (company?.branches && company.branches.length > 0)
    ? company.branches
    : (lang === 'ar' ? ['المقر الرئيسي - القاهرة', 'فرع الإسكندرية', 'فرع الجيزة'] : ['HQ - Cairo', 'Alexandria Branch', 'Giza Branch']);

  const mockMetrics = getDashboardMetrics(lang, branchesList.length, translate);
  const mockEmployees = getMockEmployees(lang, branchesList, company, translate);

  const handleToggleLang = useCallback(() => {
    const nextLang = lang === 'ar' ? 'en' : 'ar';
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('lang', nextLang);
    setSearchParams(nextParams);
    toggleLang();
  }, [lang, searchParams, setSearchParams, toggleLang]);

  const headerActions = (
    <div className="flex items-center gap-1 sm:gap-2">
      <button
        type="button"
        onClick={handleToggleLang}
        title={lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
        className="p-1.5 text-outline hover:text-[#131b2e] hover:bg-surface-container-low rounded-lg transition-colors flex items-center justify-center cursor-pointer"
      >
        <IconLanguage className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={toggleBrowserFullscreen}
        title={isFullscreen ? (lang === 'ar' ? 'إنهاء ملء الشاشة' : 'Exit Fullscreen') : (lang === 'ar' ? 'ملء الشاشة' : 'Fullscreen')}
        className="p-1.5 text-outline hover:text-[#131b2e] hover:bg-surface-container-low rounded-lg transition-colors flex items-center justify-center cursor-pointer"
      >
        {isFullscreen ? <IconMinimize className="w-4 h-4" /> : <IconMaximize className="w-4 h-4" />}
      </button>
      <button
        type="button"
        onClick={handleRestartDemo}
        title={lang === 'ar' ? 'إعادة ضبط بيانات العرض' : 'Restart Demo'}
        className="px-2.5 py-1 text-xs font-medium text-outline hover:text-[#006c49] hover:bg-[#e6f7ef] rounded-lg transition-colors flex items-center gap-1.5 border border-surface-dim cursor-pointer"
      >
        <IconRefresh className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">{lang === 'ar' ? 'إعادة الديمو' : 'Reset Demo'}</span>
      </button>
      <button
        type="button"
        onClick={handleLogout}
        title={lang === 'ar' ? 'تسجيل الخروج' : 'Logout'}
        className="px-2.5 py-1 text-xs font-medium text-outline hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1.5 border border-surface-dim cursor-pointer"
      >
        <IconLogout className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">{lang === 'ar' ? 'خروج' : 'Logout'}</span>
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
        name: company?.fullName || (lang === 'ar' ? 'أحمد محمود العوضي' : 'Ahmed Mahmoud'),
        role: lang === 'ar' ? 'مدير المنشأة' : 'Company Administrator',
        avatarSeed: (company?.fullName ? company.fullName.slice(0, 2) : (lang === 'ar' ? 'أم' : 'AM')),
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
            <span>{lang === 'ar' ? 'نظرة عامة' : 'Overview'}</span>
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
            <span>{lang === 'ar' ? 'سجل الموظفين' : 'Employees'}</span>
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
            <span>{lang === 'ar' ? 'الفروع التشغيلية' : 'Branches'}</span>
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
                  {lang === 'ar' ? 'تفاصيل المنشأة المسجلة' : 'Registered Organization Details'}
                </h3>
                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-surface-container-low">
                    <span className="text-on-surface-variant">{lang === 'ar' ? 'اسم المنشأة' : 'Company Name'}:</span>
                    <span className="font-semibold text-[#131b2e]">{companyName}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-surface-container-low">
                    <span className="text-on-surface-variant">{lang === 'ar' ? 'مدير الحساب' : 'Admin Name'}:</span>
                    <span className="font-semibold text-[#131b2e]">{company?.fullName || (lang === 'ar' ? 'أحمد محمود' : 'Ahmed Mahmoud')}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-surface-container-low">
                    <span className="text-on-surface-variant">{lang === 'ar' ? 'البريد الإلكتروني' : 'Admin Email'}:</span>
                    <span dir="ltr" className="font-semibold text-[#006c49]">{company?.email || 'admin@company.com'}</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-on-surface-variant">{lang === 'ar' ? 'الهيكل الإداري' : 'Company Structure'}:</span>
                    <span className="font-semibold text-[#131b2e]">
                      {company?.structure === 'single'
                        ? (lang === 'ar' ? 'مقر واحد فقط' : 'Single Location')
                        : (lang === 'ar' ? `فروع متعددة (${branchesList.length})` : `Multi-Branch (${branchesList.length})`)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Operational Readiness Card */}
              <div className="p-4 sm:p-5 rounded-xl border border-surface-dim bg-white space-y-3.5 shadow-2xs">
                <h3 className="text-xs font-bold uppercase tracking-wider text-outline">
                  {lang === 'ar' ? 'حالة التفعيل والجاهزية' : 'Activation Status'}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5 text-xs text-[#131b2e]">
                    <IconCircleCheck className="w-5 h-5 rounded-full bg-[#e6f7ef] text-[#006c49] shrink-0" aria-hidden="true" />
                    <span>{lang === 'ar' ? 'تم إنشاء حساب المسؤول بنجاح' : 'Admin account created successfully'}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-[#131b2e]">
                    <IconCircleCheck className="w-5 h-5 rounded-full bg-[#e6f7ef] text-[#006c49] shrink-0" aria-hidden="true" />
                    <span>{lang === 'ar' ? 'تم تأكيد البريد الإلكتروني رسمياً' : 'Official email verified'}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-[#131b2e]">
                    <IconCircleCheck className="w-5 h-5 rounded-full bg-[#e6f7ef] text-[#006c49] shrink-0" aria-hidden="true" />
                    <span>{lang === 'ar' ? 'تم اعتماد الهيكل التنظيمي والفروع' : 'Structure and branches initialized'}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs text-[#131b2e]">
                    <IconCircleCheck className="w-5 h-5 rounded-full bg-[#f4fce3] text-[#4d7c0f] shrink-0" aria-hidden="true" />
                    <span>{lang === 'ar' ? 'المنظومة بانتظار اتصال واجهة برمجة التطبيقات (API)' : 'Ready for API backend integration'}</span>
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
                {lang === 'ar' ? 'قائمة أعضاء الفريق والمشرفين' : 'Team Members & Staff'}
              </h3>
              <Badge variant="emerald" size="sm">
                {mockEmployees.length} {lang === 'ar' ? 'أعضاء' : 'Members'}
              </Badge>
            </div>
            <div className="bg-white rounded-xl border border-surface-dim overflow-hidden shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-start">
                  <thead>
                    <tr className="bg-surface-container-low/60 border-b border-surface-dim text-outline text-[11px] font-semibold">
                      <th className="py-2.5 px-3 text-start">{lang === 'ar' ? 'الموظف' : 'Employee'}</th>
                      <th className="py-2.5 px-3 text-start hidden sm:table-cell">{lang === 'ar' ? 'الدور الوظيفي' : 'Role'}</th>
                      <th className="py-2.5 px-3 text-start hidden md:table-cell">{lang === 'ar' ? 'الفرع' : 'Branch'}</th>
                      <th className="py-2.5 px-3 text-start">{lang === 'ar' ? 'الحالة' : 'Status'}</th>
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
                {lang === 'ar' ? 'الفروع والمقرات التابعة' : 'Branches & Locations'}
              </h3>
              <Badge variant="emerald" size="sm">
                {branchesList.length} {lang === 'ar' ? 'فروع' : 'Branches'}
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
                        {lang === 'ar' ? 'فرع تشغيلي نشط' : 'Active operational branch'}
                      </p>
                    </div>
                  </div>
                  <Badge variant="emerald" size="sm">
                    {lang === 'ar' ? 'نشط' : 'Active'}
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
