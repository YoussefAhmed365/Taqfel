'use client';

import { useLanguage } from '../../components/home/language-context';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { IconArrowLeft, IconArrowRight, IconCircleCheck } from '@tabler/icons-react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';

export function Hero() {
  const { t, dir, lang } = useLanguage();
  const router = useRouter();

  return (
    <section className="relative pt-12 pb-10 sm:pt-16 sm:pb-14 lg:pt-20 lg:pb-16 overflow-hidden">
      {/* Subtle organic light background accents */}
      <div className="absolute top-0 inset-s-1/2 -translate-x-1/2 w-full max-w-7xl h-96 pointer-events-none -z-10 opacity-60">
        <div className="absolute top-10 inset-s-1/4 w-72 h-72 bg-[#e6f7ef] rounded-full blur-3xl" />
        <div className="absolute top-14 inset-e-1/4 w-64 h-64 bg-[#f4fce3] rounded-full blur-3xl opacity-70" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow Pill with subtle radar pulse beacon */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center justify-center mb-5"
        >
          <Badge
            variant="emerald"
            size="md"
            className="px-3.5 py-1 text-xs font-semibold text-[#006c49] bg-[#e6f7ef] border border-primary-fixed/70 shadow-xs gap-2"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#006c49] opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#006c49]" />
            </span>
            <span>{t.heroEyebrow}</span>
          </Badge>
        </motion.div>

        {/* Single Dominant H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="text-3xl sm:text-5xl lg:text-6xl font-bold text-[#131b2e] tracking-tight leading-[1.2] sm:leading-[1.18] mb-6 whitespace-pre-line"
        >
          {t.heroH1}
        </motion.h1>

        {/* Supporting concise paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto text-base sm:text-lg lg:text-xl text-on-surface-variant leading-relaxed mb-8"
        >
          {t.heroDescription}
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6"
        >
          <Button
            size="lg"
            variant="primary"
            className="w-full sm:w-auto font-semibold px-7 shadow-xs hover:shadow-md transition-all duration-200"
            onClick={() => {
              router.push(`/${lang}/signup`);
            }}
          >
            <span>{t.ctaPrimary}</span>
            {dir === 'rtl' ? (
              <IconArrowLeft className="w-4 h-4" />
            ) : (
              <IconArrowRight className="w-4 h-4" />
            )}
          </Button>

          <Button
            size="lg"
            variant="secondary"
            className="w-full sm:w-auto font-medium px-6 text-[#131b2e] hover:bg-surface-container-low transition-all duration-200"
            onClick={() => {
              const el = document.getElementById('platform');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span>{t.ctaExplore}</span>
          </Button>
        </motion.div>

        {/* Supporting Microcopy */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.32 }}
          className="flex items-center justify-center gap-2 text-xs text-outline flex-wrap"
        >
          <IconCircleCheck className="w-3.5 h-3.5 text-[#006c49]" />
          <span>{t.heroMicrocopy}</span>
        </motion.div>
      </div>
    </section>
  );
}
