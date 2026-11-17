'use client';

import { useLanguage } from '../../components/home/language-context';
import { Badge } from '../../components/ui/badge';
import { motion } from 'motion/react';

export function ValueProposition() {
    const { lang, t, valueProps } = useLanguage();

    return (
        <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -30% 0px', amount: 0.25 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
            >
                <Badge variant="emerald" size="sm" className="mb-3 font-semibold">
                    {t.valuePropEyebrow}
                </Badge>
                <h2 className="text-2xl sm:text-4xl font-bold text-[#131b2e] tracking-tight mb-4">
                    {t.valuePropHeadline}
                </h2>
                <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                    {t.valuePropSubtitle}
                </p>
            </motion.div>

            {/* Four Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {valueProps.map((item, index) => (
                    <motion.div
                        key={item.number}
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '0px 0px -30% 0px', amount: 0.2 }}
                        transition={{ duration: 0.45, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                        className="group bg-white border border-surface-dim rounded-2xl p-6 shadow-[0_1px_3px_0_rgba(19,27,46,0.03)] hover:border-[#006c49]/50 hover:-translate-y-1 hover:shadow-[0_12px_24px_-4px_rgba(19,27,46,0.06)] transition-all duration-300 flex flex-col justify-between"
                    >
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <span className="text-2xl sm:text-3xl font-extrabold font-mono text-[#006c49] bg-[#e6f7ef] border border-primary-fixed/70 px-3 py-1 rounded-xl group-hover:bg-[#006c49] group-hover:text-white transition-colors duration-300">
                                    {item.number}
                                </span>
                                <span className="w-2 h-2 rounded-full bg-surface-dim group-hover:bg-surface-container-low group-hover:scale-150 transition-all duration-300" />
                            </div>
                            <h3 className="text-lg sm:text-xl font-bold text-[#131b2e] mb-2.5">
                                {item.title}
                            </h3>
                            <p className="text-sm text-on-surface-variant leading-relaxed">
                                {item.description}
                            </p>
                        </div>

                        <div className="mt-6 pt-4 border-t border-surface-container-low flex items-center justify-between text-xs text-outline">
                            <span className="font-medium text-[#006c49]">
                                {item.number === '01'
                                    ? (lang === 'ar' ? 'بساطة تشغيلية' : 'Operational Simplicity')
                                    : item.number === '02'
                                        ? (lang === 'ar' ? 'شفافية كاملة' : 'Full Clarity')
                                        : item.number === '03'
                                            ? (lang === 'ar' ? 'مرونة تنظيمية' : 'Structural Agility')
                                            : (lang === 'ar' ? 'توسع مستدام' : 'Scalable Growth')}
                            </span>
                            <span className="text-[10px] text-outline/80">Taqfel HR Precision</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}