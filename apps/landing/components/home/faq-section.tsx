'use client';

import React, { useState } from 'react';
import { useLanguage } from '../../components/home/language-context';
import { Badge } from '../../components/ui/badge';
import { IconChevronDown } from '@tabler/icons-react';
import { motion, AnimatePresence } from 'motion/react';

export function FaqSection() {
    const { t, faqs } = useLanguage();
    const [openId, setOpenId] = useState<string | null>('faq-1');

    const toggle = (id: string) => {
        setOpenId((prev) => (prev === id ? null : id));
    };

    return (
        <section id="faq" className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -30% 0px', amount: 0.25 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-center mb-12 sm:mb-16"
            >
                <Badge variant="emerald" size="sm" className="mb-3 font-semibold">
                    {t.faqEyebrow}
                </Badge>
                <h2 className="text-2xl sm:text-4xl font-bold text-[#131b2e] tracking-tight mb-4">
                    {t.faqHeadline}
                </h2>
                <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                    {t.faqSubtitle}
                </p>
            </motion.div>

            {/* Minimalist Accordion */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -30% 0px', amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-3"
            >
                {faqs.map((faq) => {
                    const isOpen = openId === faq.id;
                    return (
                        <div
                            key={faq.id}
                            className={`rounded-xl border transition-all duration-200 overflow-hidden ${isOpen
                                ? 'bg-white border-[#006c49]/40 shadow-xs'
                                : 'bg-white border-surface-dim hover:border-outline-variant'
                                }`}
                        >
                            <button
                                type="button"
                                onClick={() => toggle(faq.id)}
                                aria-expanded={isOpen}
                                aria-controls={`faq-answer-${faq.id}`}
                                className="w-full text-start py-4 px-5 sm:px-6 flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-[#131b2e] cursor-pointer select-none"
                            >
                                <span>{faq.question}</span>
                                <span
                                    className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform duration-250 ${isOpen
                                        ? 'bg-[#e6f7ef] text-[#006c49] rotate-180'
                                        : 'bg-surface-container-low text-outline'
                                        }`}
                                >
                                    <IconChevronDown className="w-4 h-4" />
                                </span>
                            </button>

                            <AnimatePresence initial={false}>
                                {isOpen && (
                                    <motion.div
                                        id={`faq-answer-${faq.id}`}
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                                        className="overflow-hidden border-t border-surface-container-low"
                                    >
                                        <div className="px-5 sm:px-6 pb-5 pt-2 text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                                            <p>{faq.answer}</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    );
                })}
            </motion.div>
        </section>
    );
}