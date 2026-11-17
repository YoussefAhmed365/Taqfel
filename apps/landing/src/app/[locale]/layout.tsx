import type { Metadata, Viewport } from 'next';
import { IBM_Plex_Sans_Arabic, Plus_Jakarta_Sans } from 'next/font/google';
import '../globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Language } from '../../../lib/types';

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
    subsets: ['arabic'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-arabic',
    display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    variable: '--font-sans',
    display: 'swap',
});

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
};

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'META' });

    return {
        title: t('title'),
        description: t('description'),
    };
}

export default async function RootLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const locale = (await params).locale;

    if (!routing.locales.includes(locale as Language)) {
        notFound();
    }

    const messages = await getMessages();
    const dir = locale === 'ar' ? 'rtl' : 'ltr';

    return (
        <html
            lang={locale}
            dir={dir}
            data-scroll-behavior="smooth"
            className={`${ibmPlexArabic.variable} ${plusJakartaSans.variable}`}
        >
            <body suppressHydrationWarning className="min-h-screen bg-[#faf8ff] text-[#131b2e] antialiased selection:bg-primary-fixed/30 selection:text-[#006c49]">
                <NextIntlClientProvider messages={messages}>
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}