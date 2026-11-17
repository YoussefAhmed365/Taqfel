'use client';

import { useAuthLanguage } from './auth-language-context';

export function AuthFooter() {
    const { t } = useAuthLanguage();

    return (
        <footer className="w-full py-5 text-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-center gap-4 text-[11px] text-outline">
                    <a href="#" className="hover:text-[#006c49] transition-colors">
                        {t.footerPrivacy}
                    </a>
                    <span className="text-outline-variant">·</span>
                    <a href="#" className="hover:text-[#006c49] transition-colors">
                        {t.footerTerms}
                    </a>
                    <span className="text-outline-variant">·</span>
                    <span>{t.footerCopyright}</span>
                </div>
            </div>
        </footer>
    );
}