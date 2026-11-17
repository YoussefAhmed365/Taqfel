'use client';

import React, { useState } from 'react';
import { useLanguage } from '../../components/home/language-context';
import { Button } from '../../components/ui/button';
import { IconGlobe, IconMenu, IconX } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function Navbar() {
    const { lang, toggleLang, t } = useLanguage();
    const router = useRouter();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        { label: t.navHome, href: '#' },
        { label: t.navPlatform, href: '#platform' },
        { label: t.navPricing, href: '#pricing' },
        { label: t.navFaq, href: '#faq' },
    ];

    return (
        <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-surface-dim/70 transition-all">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <nav aria-label="Main Navigation" className="flex items-center justify-between h-16 sm:h-18">
                    {/* Brand Logo */}
                    <div className="flex items-center gap-3">
                        <a href="#" className="flex items-center gap-2.5 group">
                            <div className="w-9 h-9 rounded-xl bg-[#006c49] text-white flex items-center justify-center font-bold shadow-xs transition-transform group-hover:scale-105">
                                <span className="text-base tracking-tighter">T</span>
                            </div>
                            <div className="flex flex-col text-start">
                                <span className="text-base sm:text-lg font-bold text-[#131b2e] tracking-tight leading-none">
                                    {t.brandName}
                                </span>
                                <span className="text-[10px] uppercase font-semibold text-[#006c49] tracking-widest mt-0.5">
                                    {t.brandSubtitle}
                                </span>
                            </div>
                        </a>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center gap-7 lg:gap-8 text-sm font-medium text-on-surface-variant">
                        {navLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="hover:text-[#006c49] transition-colors py-1 relative hover:after:w-full after:w-0 after:h-0.5 after:bg-[#006c49] after:absolute after:bottom-0 after:inset-s-0 after:transition-all"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* Right Action Elements: Lang Switcher, Login, CTA */}
                    <div className="hidden md:flex items-center gap-3">
                        {/* Language Switcher */}
                        <button
                            onClick={toggleLang}
                            type="button"
                            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-on-surface-variant hover:text-[#131b2e] hover:bg-surface-container-low rounded-lg transition-colors border border-surface-dim"
                            aria-label="Switch Language / تبديل اللغة"
                        >
                            <IconGlobe className="w-3.5 h-3.5 text-[#006c49]" />
                            <span>{lang === 'ar' ? 'English' : 'العربية'}</span>
                        </button>

                        {/* Login Link */}
                        <Link
                            href={`/${lang}/login`}
                            className="text-xs font-semibold text-on-surface-variant hover:text-[#131b2e] px-3 py-2 rounded-lg hover:bg-surface-container-low transition-colors"
                        >
                            {t.navLogin}
                        </Link>

                        {/* Primary CTA */}
                        <Button
                            size="sm"
                            variant="primary"
                            className="font-semibold text-xs px-4"
                            onClick={() => {
                                router.push(`/${lang}/signup`);
                            }}
                        >
                            {t.ctaPrimary}
                        </Button>
                    </div>

                    {/* Mobile Menu Trigger */}
                    <div className="flex items-center gap-2 md:hidden">
                        <button
                            onClick={toggleLang}
                            type="button"
                            className="flex items-center gap-1 px-2 py-1 text-xs font-semibold text-on-surface-variant border border-surface-dim rounded-lg"
                            aria-label="Switch Language"
                        >
                            <IconGlobe className="w-3.5 h-3.5 text-[#006c49]" />
                            <span>{lang === 'ar' ? 'EN' : 'عربي'}</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 text-on-surface-variant hover:text-[#131b2e] rounded-lg border border-surface-dim hover:bg-surface-container-low"
                            aria-label="Open Navigation Menu"
                        >
                            {mobileMenuOpen ? <IconX className="w-5 h-5" /> : <IconMenu className="w-5 h-5" />}
                        </button>
                    </div>
                </nav>
            </div>

            {/* Mobile Drawer Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden border-b border-surface-dim bg-white px-4 py-4 space-y-3 transition-all animate-fadeIn">
                    <div className="space-y-1">
                        {navLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="block px-3 py-2 text-sm font-medium text-[#131b2e] hover:bg-surface-container-low hover:text-[#006c49] rounded-lg"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                    <div className="pt-3 border-t border-surface-dim flex flex-col gap-2">
                        <Link
                            href={`/${lang}/login`}
                            className="text-center py-2 text-sm font-semibold text-on-surface-variant hover:bg-surface-container-low rounded-lg"
                        >
                            {t.navLogin}
                        </Link>
                        <Button
                            variant="primary"
                            className="w-full"
                            onClick={() => {
                                setMobileMenuOpen(false);
                                router.push(`/${lang}/signup`);
                            }}
                        >
                            {t.ctaPrimary}
                        </Button>
                    </div>
                </div>
            )}
        </header>
    );
}