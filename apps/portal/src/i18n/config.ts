import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import arCommon from './locales/ar/common.json';
import arDashboard from './locales/ar/dashboard.json';
import enCommon from './locales/en/common.json';
import enDashboard from './locales/en/dashboard.json';

export const resources = {
    ar: {
        common: arCommon,
        dashboard: arDashboard,
    },
    en: {
        common: enCommon,
        dashboard: enDashboard,
    },
} as const;

export const defaultNS = 'common';

function applyDocumentDirection(lng: string) {
    const isArabic = lng.startsWith('ar');
    const dir = isArabic ? 'rtl' : 'ltr';
    const normalizedLang = isArabic ? 'ar' : 'en';

    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', normalizedLang);
    document.title = isArabic
        ? 'تقفيل | لوحة إدارة الموارد البشرية'
        : 'Taqfel HR Dashboard';
}

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        defaultNS,
        ns: ['common', 'dashboard'],
        fallbackLng: 'en',
        supportedLngs: ['ar', 'en'],
        nonExplicitSupportedLngs: true,
        detection: {
            // الأولوية للرابط القادم من Landing Page ثم التخزين المحلي
            order: ['querystring', 'localStorage', 'navigator'],
            lookupQuerystring: 'lang',
            lookupLocalStorage: 'portal_lang',
            caches: ['localStorage'],
        },
        interpolation: {
            escapeValue: false, // React يحمي من XSS تلقائياً
        },
    });

// تطبيق الاتجاه عند التشغيل الأولي وعند كل تغيير للغة
applyDocumentDirection(i18n.resolvedLanguage || 'en');
i18n.on('languageChanged', applyDocumentDirection);

export default i18n;