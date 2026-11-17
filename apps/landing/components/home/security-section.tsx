'use client';

import { useLanguage } from '../../components/home/language-context';
import { Badge } from '../../components/ui/badge';
import { IconShieldCheck, IconLock, IconBuilding, IconFileCheck } from '@tabler/icons-react';
import { motion } from 'motion/react';

export function SecuritySection() {
    const { lang, t, securityCards } = useLanguage();

    const iconComponents = {
        ShieldCheck: IconShieldCheck,
        LockKeyhole: IconLock,
        Building2: IconBuilding,
        FileCheck2: IconFileCheck,
        IconShieldCheck: IconShieldCheck,
        IconLockKeyhole: IconLock,
        IconBuilding2: IconBuilding,
        IconFileCheck2: IconFileCheck,
    };

    return (
        <section className="py-16 sm:py-24 bg-[#faf8ff] border-t border-surface-dim">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '0px 0px -30% 0px', amount: 0.25 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
                >
                    <Badge variant="emerald" size="sm" className="mb-3 font-semibold">
                        {t.securityEyebrow}
                    </Badge>
                    <h2 className="text-2xl sm:text-4xl font-bold text-[#131b2e] tracking-tight mb-4">
                        {t.securityHeadline}
                    </h2>
                    <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                        {t.securitySubtitle}
                    </p>
                </motion.div>

                {/* 4 Concise Trust Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {securityCards.map((card, index) => {
                        const Icon =
                            iconComponents[card.iconName as keyof typeof iconComponents] || IconShieldCheck;
                        return (
                            <motion.div
                                key={card.id}
                                initial={{ opacity: 0, y: 14 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '0px 0px -30% 0px', amount: 0.2 }}
                                transition={{ duration: 0.45, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                                className="group bg-white border border-surface-dim rounded-2xl p-6 shadow-[0_1px_3px_0_rgba(19,27,46,0.03)] hover:border-[#006c49]/40 hover:-translate-y-1 hover:shadow-[0_12px_24px_-4px_rgba(19,27,46,0.06)] transition-all duration-300 flex flex-col justify-between"
                            >
                                <div>
                                    <div className="w-10 h-10 rounded-xl bg-[#e6f7ef] border border-primary-fixed/70 text-[#006c49] flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-105">
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-base font-bold text-[#131b2e] mb-2">
                                        {card.title}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                                        {card.description}
                                    </p>
                                </div>

                                <div className="mt-5 pt-3.5 border-t border-surface-container-low flex items-center gap-1.5 text-[11px] text-[#006c49] font-medium">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#006c49]" />
                                    <span>{lang === 'ar' ? 'معتمد للمؤسسات' : 'Enterprise Verified'}</span>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}