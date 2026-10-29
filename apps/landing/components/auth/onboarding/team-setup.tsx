'use client';

import { useAuthLanguage } from '../auth-language-context';
import { AuthHeading } from '../auth-shell';
import { AuthButton } from '../../ui/auth-button';

interface TeamSetupProps {
  onSelectOption?: (method: 'manual' | 'excel') => void;
  onSkip: () => void;
}

export function TeamSetup({ onSelectOption, onSkip }: TeamSetupProps) {
  const { t, lang } = useAuthLanguage();

  const handleSelect = (method: 'manual' | 'excel') => {
    if (onSelectOption) {
      onSelectOption(method);
    } else {
      onSkip();
    }
  };

  return (
    <div className="space-y-6">
      <AuthHeading
        title={t.onboardingTeamTitle}
        subtitle={
          lang === 'ar'
            ? 'خطوة اختيارية، يمكنك البدء الآن أو إضافتهم لاحقاً من لوحة التحكم'
            : 'Optional step. You can start now or add your team later from the dashboard'
        }
      />

      <div className="space-y-3">
        {/* Add employees option */}
        <button
          type="button"
          onClick={() => handleSelect('manual')}
          className="w-full flex items-center gap-4 p-4 rounded-xl border border-outline-variant/50 bg-white hover:border-[#006c49]/50 hover:bg-[#faf8ff] transition-all group text-start cursor-pointer shadow-xs hover:shadow-sm"
        >
          <div className="w-10 h-10 rounded-xl bg-[#e6f7ef] text-[#006c49] flex items-center justify-center shrink-0 group-hover:bg-[#006c49] group-hover:text-white transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-[#131b2e] group-hover:text-[#006c49] transition-colors">{t.onboardingAddEmployee}</h3>
            <p className="text-xs text-outline mt-0.5">
              {lang === 'ar' ? 'إدخال بيانات الموظفين وتعيين المسميات الوظيفية' : 'Enter records manually and assign roles'}
            </p>
          </div>
          <span className="text-xs text-[#006c49] font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
            <span>{lang === 'ar' ? 'اختيار' : 'Select'}</span>
            <span className="rtl:rotate-180">➔</span>
          </span>
        </button>

        {/* Import from Excel option */}
        <button
          type="button"
          onClick={() => handleSelect('excel')}
          className="w-full flex items-center gap-4 p-4 rounded-xl border border-outline-variant/50 bg-white hover:border-secondary/50 hover:bg-[#faf8ff] transition-all group text-start cursor-pointer shadow-xs hover:shadow-sm"
        >
          <div className="w-10 h-10 rounded-xl bg-[#f4fce3] text-secondary flex items-center justify-center shrink-0 group-hover:bg-secondary group-hover:text-white transition-colors">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-[#131b2e] group-hover:text-secondary transition-colors">{t.onboardingImportExcel}</h3>
            <p className="text-xs text-outline mt-0.5">
              {lang === 'ar' ? 'رفع ملف Excel وتوزيع الحقول تلقائياً' : 'Upload spreadsheet and auto-map fields'}
            </p>
          </div>
          <span className="text-xs text-secondary font-semibold opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
            <span>{lang === 'ar' ? 'اختيار' : 'Select'}</span>
            <span className="rtl:rotate-180">➔</span>
          </span>
        </button>
      </div>

      {/* Skip */}
      <div className="text-center pt-2">
        <button
          type="button"
          onClick={onSkip}
          className="text-sm text-on-surface-variant hover:text-[#006c49] font-medium hover:underline transition-colors"
        >
          {t.onboardingSkip}
        </button>
      </div>
    </div>
  );
}
