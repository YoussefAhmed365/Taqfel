'use client';

import { useAuthLanguage } from './auth-language-context';
import Link from 'next/link';

export function AuthHeader() {
  const { t, toggleLang } = useAuthLanguage();

  return (
    <header className="w-full border-b border-outline-variant/30 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-[#006c49] text-white flex items-center justify-center font-bold text-sm shadow-xs transition-transform group-hover:scale-105">
              L
            </div>
            <div className="flex flex-col text-start">
              <span className="text-sm sm:text-base font-bold text-[#131b2e] tracking-tight leading-none">
                {t.brandName}
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase font-semibold text-[#006c49] tracking-widest mt-0.5">
                {t.brandSubtitle}
              </span>
            </div>
          </Link>

          {/* Right side: lang switcher + help */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={toggleLang}
              type="button"
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-on-surface-variant hover:text-[#131b2e] hover:bg-surface-container-low rounded-lg transition-colors border border-outline-variant/50"
              aria-label="Switch Language"
            >
              <svg className="w-3.5 h-3.5 text-[#006c49]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20" />
                <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
              </svg>
              <span className="hidden sm:inline">{t.switchLang}</span>
              <span className="sm:hidden">{t.switchLangShort}</span>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
