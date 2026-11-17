'use client';

import React, { createContext, useContext, useCallback } from 'react';
import { useLocale, useMessages } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import type enMessages from '../../messages/en.json';
import type { Language } from '../../lib/types';

type AuthTranslations = typeof enMessages.AUTH;

interface AuthLanguageContextType {
    lang: 'ar' | 'en';
    dir: 'rtl' | 'ltr';
    t: AuthTranslations;
    toggleLang: () => void;
    setLang: (lang: 'ar' | 'en') => void;
}

const AuthLanguageContext = createContext<AuthLanguageContextType | null>(null);

export function AuthLanguageProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const lang = useLocale() as Language;
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    const router = useRouter();
    const pathname = usePathname();
    const messages = useMessages() as typeof enMessages;
    const t = messages.AUTH;

    const setLang = useCallback((newLang: Language) => {
        router.replace(pathname, { locale: newLang });
    }, [pathname, router]);

    const toggleLang = useCallback(() => {
        setLang(lang === 'ar' ? 'en' : 'ar');
    }, [lang, setLang]);

    return (
        <AuthLanguageContext.Provider value={{ lang, dir, t, toggleLang, setLang }}>
            {children}
        </AuthLanguageContext.Provider>
    );
}

export function useAuthLanguage() {
    const ctx = useContext(AuthLanguageContext);
    if (!ctx) {
        throw new Error('useAuthLanguage must be used within AuthLanguageProvider');
    }
    return ctx;
}