import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export function useLocale() {
    const { i18n } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const { locale } = useParams<{ locale: string }>();

    const lang: 'ar' | 'en' = locale === 'ar' ? 'ar' : 'en';
    const dir = lang === 'ar' ? 'rtl' : 'ltr';

    const toggleLang = useCallback(() => {
        const nextLang = lang === 'ar' ? 'en' : 'ar';
        const pathWithoutLocale = location.pathname.replace(/^\/(?:ar|en)(?=\/|$)/, '');
        void i18n.changeLanguage(nextLang);
        navigate(`/${nextLang}${pathWithoutLocale || ''}`, { replace: true });
    }, [lang, i18n, location.pathname, navigate]);

    return { lang, dir, toggleLang, i18n };
}