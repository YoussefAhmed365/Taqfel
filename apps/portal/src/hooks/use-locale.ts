import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

export function useLocale() {
    const { i18n } = useTranslation();
    const [searchParams, setSearchParams] = useSearchParams();

    const lang = (i18n.resolvedLanguage?.startsWith('ar') ? 'ar' : 'en') as 'ar' | 'en';
    const dir = lang === 'ar' ? 'rtl' : 'ltr';

    const toggleLang = useCallback(() => {
        const nextLang = lang === 'ar' ? 'en' : 'ar';
        i18n.changeLanguage(nextLang);

        // تحديث معامل lang في الرابط إذا كان موجوداً حتى لا يطغى عند عمل Refresh
        if (searchParams.has('lang')) {
            const nextParams = new URLSearchParams(searchParams);
            nextParams.set('lang', nextLang);
            setSearchParams(nextParams, { replace: true });
        }
    }, [lang, i18n, searchParams, setSearchParams]);

    return { lang, dir, toggleLang, i18n };
}