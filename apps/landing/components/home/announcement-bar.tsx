'use client';

import { useLanguage } from '../../components/home/language-context';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';

export function AnnouncementBar() {
    const { t, dir } = useLanguage();

    return (
        <div className="bg-[#faf8ff] border-b border-surface-dim text-xs text-on-surface-variant py-2 px-4 transition-colors">
            <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-center font-medium">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#006c49]" />
                <span>{t.announcement}</span>
                <a
                    href="#platform"
                    className="inline-flex items-center gap-1 text-[#006c49] hover:text-on-primary-container font-semibold underline underline-offset-4 ms-1 transition-colors"
                >
                    <span>{dir === 'rtl' ? 'اكتشف المزيد' : 'Learn more'}</span>
                    {dir === 'rtl' ? (
                        <IconArrowLeft className="w-3 h-3" />
                    ) : (
                        <IconArrowRight className="w-3 h-3" />
                    )}
                </a>
            </div>
        </div>
    );
}