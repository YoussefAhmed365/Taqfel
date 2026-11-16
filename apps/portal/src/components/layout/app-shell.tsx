import {
  IconUsers,
  IconBuilding,
  IconGitBranch,
  IconShield,
  IconFileSpreadsheet,
  IconSettings,
  IconBell,
  IconSearch,
} from '@tabler/icons-react';
import { useLanguage } from '../../context/language/index';
import type { ReactNode } from 'react';

export type NavId = 'dashboard' | 'employees' | 'branches' | 'roles' | 'import' | 'settings';

export interface AppShellUser {
  name: string;
  role?: string;
  avatarSeed?: string;
}

export interface AppShellProps {
  children: ReactNode;
  activeNav?: NavId;
  companyName?: string;
  onNavClick?: (id: NavId) => void;
  user?: AppShellUser;
  actions?: ReactNode;
  className?: string;
}

export function AppShell({
  children,
  activeNav = 'dashboard',
  companyName,
  onNavClick,
  user,
  actions,
  className = '',
}: AppShellProps) {
  const { lang, dir } = useLanguage();

  const effectiveCompanyName =
    companyName ||
    (lang === 'ar' ? 'شركة تقفيل للتقنية والخدمات ش.م.م' : 'Taqfel Tech & Services SAE');

  const navItems = [
    { id: 'dashboard' as const, label: lang === 'ar' ? 'لوحة المعلومات' : 'Dashboard', icon: IconBuilding },
    { id: 'employees' as const, label: lang === 'ar' ? 'سجل الموظفين' : 'Employees', icon: IconUsers },
    { id: 'branches' as const, label: lang === 'ar' ? 'الفروع التشغيلية' : 'Branches', icon: IconGitBranch },
    { id: 'roles' as const, label: lang === 'ar' ? 'المستخدمون والصلاحيات' : 'Roles & Access', icon: IconShield },
    { id: 'import' as const, label: lang === 'ar' ? 'استيراد البيانات' : 'Data Import', icon: IconFileSpreadsheet },
    { id: 'settings' as const, label: lang === 'ar' ? 'إعدادات المنشأة' : 'Settings', icon: IconSettings },
  ];

  const displayName = user?.name || (lang === 'ar' ? 'أحمد الشريف' : 'Ahmed El-Sherif');
  const displayRole = user?.role || (lang === 'ar' ? 'المدير العام' : 'General Admin');
  const displayAvatar = user?.avatarSeed || (lang === 'ar' ? 'أش' : 'AS');

  return (
    <div
      dir={dir}
      className={`w-full text-[#131b2e] select-none text-start font-sans h-screen min-h-screen bg-[#faf8ff] flex flex-col overflow-hidden ${className}`}
    >
      {/* Top Header Bar */}
      <header className="bg-white border-b border-surface-dim px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-4 shrink-0 shadow-2xs">
        {/* System Identifier */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#006c49] shadow-2xs" />
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-bold text-[#131b2e] tracking-tight truncate max-w-44 sm:max-w-xs">
                {effectiveCompanyName}
              </span>
              <span className="text-[10px] text-outline font-medium hidden sm:inline">
                {lang === 'ar' ? 'منظومة إدارة الموارد البشرية' : 'HR Management Platform'}
              </span>
            </div>
          </div>
        </div>

        {/* Global Search & Top Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden md:flex items-center gap-2 bg-surface-container-low border border-surface-dim rounded-lg px-2.5 py-1 text-xs text-outline w-44 lg:w-56">
            <IconSearch className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">
              {lang === 'ar' ? 'بحث عن موظف، فرع، أو قسم...' : 'Search employee, branch...'}
            </span>
          </div>

          {actions}

          <div className="p-1.5 text-outline hover:text-[#131b2e] hover:bg-surface-container-low rounded-lg transition-colors relative cursor-pointer">
            <IconBell className="w-4 h-4" />
            <span className="absolute top-1 inset-e-1 w-1.5 h-1.5 bg-[#006c49] rounded-full ring-2 ring-white" />
          </div>

          <div className="flex items-center gap-2 border-s border-surface-dim ps-2.5">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#e6f7ef] border border-primary-fixed/70 flex items-center justify-center text-xs font-bold text-[#006c49] shadow-2xs">
              {displayAvatar}
            </div>
            <div className="hidden lg:block text-start leading-tight">
              <p className="text-xs font-semibold text-[#131b2e] truncate max-w-36">
                {displayName}
              </p>
              <p className="text-[10px] text-outline">
                {displayRole}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Shell: Sidebar + Canvas */}
      <div className="flex bg-[#faf8ff] flex-1 min-h-0 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-14 sm:w-48 lg:w-56 bg-white border-e border-surface-dim flex flex-col justify-between shrink-0 py-3 overflow-y-auto">
          <div className="space-y-1 px-2">
            <div className="px-2 py-1.5 mb-2 hidden sm:block">
              <span className="text-[11px] font-semibold text-outline tracking-wider uppercase">
                {lang === 'ar' ? 'المساحة الإدارية' : 'Workspace'}
              </span>
            </div>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.id === activeNav;
              const isClickable = !!onNavClick;
              return (
                <button
                  key={item.id}
                  type="button"
                  disabled={!isClickable}
                  onClick={() => onNavClick?.(item.id)}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium transition-all text-start ${isActive
                      ? 'bg-[#e6f7ef] text-[#006c49] font-semibold border border-primary-fixed/70 shadow-2xs'
                      : isClickable
                        ? 'text-on-surface-variant hover:bg-surface-container-low hover:text-[#131b2e] cursor-pointer'
                        : 'text-on-surface-variant'
                    }`}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#006c49]' : 'text-outline'
                      }`}
                  />
                  <span className="hidden sm:inline truncate">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Sidebar Status Pill */}
          <div className="px-2 pt-2 border-t border-surface-dim hidden sm:block">
            <div className="bg-surface-container-low border border-surface-dim rounded-lg p-2.5 text-[11px]">
              <div className="flex items-center justify-between text-[#131b2e] mb-1 font-medium">
                <span>{lang === 'ar' ? 'حالة السجلات' : 'Record Health'}</span>
                <span className="text-[#006c49] font-bold tabular-nums">98.4%</span>
              </div>
              <div className="w-full bg-surface-dim h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#006c49] h-full rounded-full w-[98.4%]" />
              </div>
              <p className="text-[10px] text-outline mt-1.5">
                {lang === 'ar' ? '248 سجل نشط ومحدث' : '248 active verified profiles'}
              </p>
            </div>
          </div>
        </aside>

        {/* Workspace Canvas */}
        <main className="flex-1 p-3.5 sm:p-5 lg:p-6 relative overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
