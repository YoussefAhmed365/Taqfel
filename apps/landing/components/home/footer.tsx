'use client';

import { useLanguage } from '../../components/home/language-context';
import { IconGlobe } from '@tabler/icons-react';

export function Footer() {
    const { lang, toggleLang, t } = useLanguage();

    return (
        <footer className="bg-white border-t border-surface-dim pt-14 pb-10 text-xs text-outline">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-surface-container-low">
                    {/* Brand Info */}
                    <div className="md:col-span-5 space-y-3">
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-[#006c49] text-white flex items-center justify-center font-bold text-sm">
                                L
                            </div>
                            <div className="flex flex-col text-start">
                                <span className="text-base font-bold text-[#131b2e] leading-none">
                                    {t.brandName}
                                </span>
                                <span className="text-[10px] uppercase font-semibold text-[#006c49] tracking-widest mt-0.5">
                                    {t.brandSubtitle}
                                </span>
                            </div>
                        </div>
                        <p className="text-xs text-on-surface-variant leading-relaxed max-w-sm">
                            {t.footerDesc}
                        </p>
                    </div>

                    {/* Column: Platform */}
                    <div className="md:col-span-2 space-y-2.5">
                        <p className="font-bold text-[#131b2e]">{t.footerColPlatform}</p>
                        <ul className="space-y-2">
                            <li>
                                <a href="#platform" className="hover:text-[#006c49] transition-colors">
                                    {lang === 'ar' ? 'مساحة العمل' : 'Workspace'}
                                </a>
                            </li>
                            <li>
                                <a href="#platform" className="hover:text-[#006c49] transition-colors">
                                    {lang === 'ar' ? 'سجل الموظفين' : 'Employee Directory'}
                                </a>
                            </li>
                            <li>
                                <a href="#organization" className="hover:text-[#006c49] transition-colors">
                                    {lang === 'ar' ? 'الهيكل المؤسسي' : 'Organization Tree'}
                                </a>
                            </li>
                            <li>
                                <a href="#excel-import" className="hover:text-[#006c49] transition-colors">
                                    {lang === 'ar' ? 'استيراد Excel' : 'Excel Import'}
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Column: Pricing & Help */}
                    <div className="md:col-span-2 space-y-2.5">
                        <p className="font-bold text-[#131b2e]">{t.footerColCompany}</p>
                        <ul className="space-y-2">
                            <li>
                                <a href="#pricing" className="hover:text-[#006c49] transition-colors">
                                    {t.navPricing}
                                </a>
                            </li>
                            <li>
                                <a href="#faq" className="hover:text-[#006c49] transition-colors">
                                    {t.navFaq}
                                </a>
                            </li>
                            <li>
                                <a href="#contact" className="hover:text-[#006c49] transition-colors">
                                    {t.footerContact}
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Column: Legal & Privacy */}
                    <div className="md:col-span-3 space-y-2.5">
                        <p className="font-bold text-[#131b2e]">{t.footerColLegal}</p>
                        <ul className="space-y-2">
                            <li>
                                <a href="#privacy" className="hover:text-[#006c49] transition-colors">
                                    {t.footerPrivacy}
                                </a>
                            </li>
                            <li>
                                <a href="#terms" className="hover:text-[#006c49] transition-colors">
                                    {t.footerTerms}
                                </a>
                            </li>
                            <li>
                                <a href="#security" className="hover:text-[#006c49] transition-colors">
                                    {t.footerSecurity}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar: Copyright & Language Switcher */}
                <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-[11px] text-outline">
                        {t.footerCopyright}
                    </p>

                    <button
                        onClick={toggleLang}
                        type="button"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-surface-dim hover:bg-[#faf8ff] text-on-surface-variant font-medium transition-colors"
                    >
                        <IconGlobe className="w-3.5 h-3.5 text-[#006c49]" />
                        <span>{lang === 'ar' ? 'English (Switch to LTR)' : 'العربية (التبديل إلى RTL)'}</span>
                    </button>
                </div>
            </div>
        </footer>
    );
}