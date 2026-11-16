'use client';

import { useLanguage } from '../../components/home/language-context';
import { Badge } from '../../components/ui/badge';
import { IconCircleCheck, IconClock } from '@tabler/icons-react';
import { motion } from 'motion/react';

export function GrowthSection() {
  const { lang, t } = useLanguage();

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
          {t.growthEyebrow}
        </Badge>
        <h2 className="text-2xl sm:text-4xl font-bold text-[#131b2e] tracking-tight mb-4">
          {t.growthHeadline}
        </h2>
        <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
          {t.growthSubtitle}
        </p>
      </motion.div>

      {/* Two-Stage Visual: Today (Foundation) vs As Needs Grow (Roadmap) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
        {/* Stage 1: Today - Strong Foundation */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -30% 0px', amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white border-2 border-[#006c49]/30 rounded-2xl p-6 sm:p-8 shadow-[0_4px_16px_-4px_rgba(0,108,73,0.06)] hover:shadow-md transition-all duration-300 relative flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <Badge variant="emerald" size="md" className="font-bold">
                <IconCircleCheck className="w-3.5 h-3.5" />
                <span>{t.todayBadge}</span>
              </Badge>
              <span className="text-xs text-[#006c49] font-bold font-mono">Stage 01</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-[#131b2e] mb-2">
              {t.todayStage}
            </h3>
            <p className="text-xs sm:text-sm text-on-surface-variant mb-6">
              {lang === 'ar'
                ? 'تنظيم هيكلي محكم لكافة كيانات الشركة وموظفيها وفروعها منذ اليوم الأول.'
                : 'Robust organizational structure for all entities, teams, and locations from day one.'}
            </p>

            <ul className="space-y-3">
              {t.todayItems.map((item: string) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-xs sm:text-sm text-[#131b2e] font-medium"
                >
                  <div className="w-5 h-5 rounded-full bg-[#e6f7ef] border border-primary-fixed/70 flex items-center justify-center text-[#006c49] shrink-0">
                    <IconCircleCheck className="w-3 h-3" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 pt-4 border-t border-surface-container-low flex items-center justify-between text-xs text-outline">
            <span className="font-semibold text-[#006c49]">
              {lang === 'ar' ? 'جاهز للاستخدام التشغيلي' : 'Operationally Ready'}
            </span>
            <span className="text-[11px] text-outline/80">Foundation Active</span>
          </div>
        </motion.div>

        {/* Stage 2: As Needs Grow - Roadmap Progression */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '0px 0px -30% 0px', amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#faf8ff] border border-surface-dim rounded-2xl p-6 sm:p-8 shadow-[0_1px_3px_0_rgba(19,27,46,0.03)] hover:shadow-md hover:border-outline-variant transition-all duration-300 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <Badge variant="lime" size="md" className="font-bold">
                <IconClock className="w-3.5 h-3.5" />
                <span>{t.futureBadge}</span>
              </Badge>
              <span className="text-xs text-secondary font-bold font-mono">Stage 02</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-[#131b2e] mb-2">
              {t.futureStage}
            </h3>
            <p className="text-xs sm:text-sm text-on-surface-variant mb-6">
              {lang === 'ar'
                ? 'وحدات تشغيلية موسعة تندمج بسلاسة فوق الأساس التنظيمي مع اتساع نطاق أعمالك.'
                : 'Advanced operational modules that integrate effortlessly atop your foundation as you scale.'}
            </p>

            <ul className="space-y-3">
              {t.futureItems.map((item: string) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-xs sm:text-sm text-on-surface-variant"
                >
                  <div className="w-5 h-5 rounded-full bg-surface-container-low/20 border border-surface-container-low/40 flex items-center justify-center text-secondary shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 pt-4 border-t border-surface-dim flex items-center justify-between text-xs text-outline">
            <span className="font-medium text-secondary">
              {lang === 'ar' ? 'توسع مدروس بلا تعقيد' : 'Structured Scalability'}
            </span>
            <span className="text-[11px] text-outline/80">Modular Roadmap</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
