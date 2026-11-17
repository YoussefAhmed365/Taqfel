'use client';

import { useLanguage } from '../../components/home/language-context';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { IconCheck, IconSparkles } from '@tabler/icons-react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';

export function PricingSection() {
    const { lang, t, pricingPlans } = useLanguage();
    const router = useRouter();

    return (
        <section id="pricing" className="py-16 sm:py-24 bg-[#faf8ff] border-t border-surface-dim">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '0px 0px -30% 0px', amount: 0.25 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
                >
                    <h2 className="text-2xl sm:text-4xl font-bold text-[#131b2e] tracking-tight mb-4">
                        {t.pricingHeadline}
                    </h2>
                    <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                        {t.pricingSubtitle}
                    </p>
                </motion.div>

                {/* 3 Pricing Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto items-stretch">
                    {pricingPlans.map((plan, index) => {
                        const isPopular = plan.isPopular;
                        return (
                            <motion.div
                                key={plan.id}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: isPopular ? -4 : 0 }}
                                viewport={{ once: true, margin: '0px 0px -30% 0px', amount: 0.2 }}
                                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative ${isPopular
                                    ? 'bg-white border-2 border-primary-fixed shadow-[0_12px_32px_-8px_rgba(0,108,73,0.14)] hover:shadow-[0_20px_40px_-10px_rgba(0,108,73,0.18)] hover:-translate-y-2'
                                    : 'bg-white border border-surface-dim shadow-[0_1px_3px_0_rgba(19,27,46,0.03)] hover:border-[#006c49]/50 hover:-translate-y-1.5 hover:shadow-[0_14px_28px_-6px_rgba(19,27,46,0.07)]'
                                    }`}
                            >
                                {isPopular && (
                                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                                        <Badge
                                            variant="lime"
                                            size="sm"
                                            className="font-bold shadow-xs px-4 bg-white text-primary border-2 border-primary-fixed gap-1.5 w-fit"
                                        >
                                            <IconSparkles size={24} className="text-primary" />
                                            <span>{t.popularBadge}</span>
                                        </Badge>
                                    </div>
                                )}

                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-xl sm:text-2xl font-bold text-[#131b2e]">
                                            {plan.name}
                                        </h3>
                                        <span className="text-xs font-semibold text-[#006c49] bg-[#e6f7ef] border border-primary-fixed/70 px-2.5 py-0.5 rounded-full">
                                            {plan.target}
                                        </span>
                                    </div>

                                    <p className="text-xs sm:text-sm text-on-surface-variant mb-6 leading-relaxed">
                                        {plan.description}
                                    </p>

                                    <div className="space-y-3 pt-4 border-t border-surface-container-low">
                                        <p className="text-xs font-bold text-[#131b2e]">
                                            {lang === 'ar' ? 'ما تشمله الباقة:' : 'Plan highlights:'}
                                        </p>
                                        {plan.features.map((feature) => (
                                            <div
                                                key={feature}
                                                className="flex items-start gap-2.5 text-xs sm:text-sm text-[#131b2e]"
                                            >
                                                <div className="w-4 h-4 rounded-full bg-[#e6f7ef] border border-primary-fixed/70 flex items-center justify-center text-[#006c49] shrink-0 mt-0.5">
                                                    <IconCheck className="w-2.5 h-2.5 stroke-[2.5]" />
                                                </div>
                                                <span>{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-8 pt-6 border-t border-surface-container-low">
                                    <Button
                                        variant={isPopular ? 'primary' : 'secondary'}
                                        size="md"
                                        className="w-full font-semibold"
                                        onClick={() => {
                                            router.push(`/${lang}/signup`);
                                        }}
                                    >
                                        {plan.ctaText}
                                    </Button>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}