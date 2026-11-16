'use client';

import { useLanguage } from '../../components/home/language-context';
import { IconStack, IconSparkles, IconKey, IconTrendingUp } from '@tabler/icons-react';
import { motion } from 'motion/react';

type CredibilityItem = {
  id: string;
  title: string;
  desc: string;
};

export function CredibilityStrip() {
  const { t } = useLanguage();

  const iconMap = [IconStack, IconSparkles, IconKey, IconTrendingUp];

  return (
    <section className="border-y border-surface-dim/70 bg-[#faf8ff] py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -28% 0px', amount: 0.25 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-8"
        >
          <p className="text-sm sm:text-base font-semibold text-[#131b2e] tracking-tight">
            {t.credibilityTitle}
          </p>
        </motion.div>

        {/* 4 Clean Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          {t.credibilityItems.map((item: CredibilityItem, index: number) => {
            const Icon = iconMap[index % iconMap.length];
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -28% 0px', amount: 0.2 }}
                transition={{ duration: 0.4, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white border border-surface-dim rounded-xl p-3.5 sm:p-5 flex flex-col sm:flex-row items-start gap-2.5 sm:gap-3.5 shadow-[0_1px_2px_0_rgba(15,23,42,0.03)] hover:border-[#006c49]/40 hover:-translate-y-0.5 hover:shadow-xs transition-all duration-200"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#e6f7ef] border border-primary-fixed/70 text-[#006c49] flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#131b2e] leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-outline mt-0.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
