'use client';

import { useLanguage } from '../../components/home/language-context';
import { Button } from '../../components/ui/button';
import { IconArrowLeft, IconArrowRight, IconCircleCheck } from '@tabler/icons-react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';

export function FinalCta() {
  const { lang, t, dir } = useLanguage();
  const router = useRouter();

  return (
    <section id="final-cta" className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 14 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -25% 0px', amount: 0.2 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-3xl bg-linear-to-br from-[#e6f7ef] via-surface-container-low/10 to-[#e6f7ef] border border-primary-fixed/70 p-8 sm:p-12 lg:p-16 text-center shadow-[0_10px_30px_-5px_rgba(0,108,73,0.06)] overflow-hidden"
      >
        {/* Subtle decorative glows */}
        <div className="absolute top-0 inset-s-1/4 w-60 h-60 bg-primary-fixed/25 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 inset-e-1/4 w-60 h-60 bg-surface-container-low/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative max-w-2xl mx-auto space-y-5">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#006c49] bg-white/80 border border-primary-fixed/70 px-3 py-1 rounded-full shadow-xs">
            <IconCircleCheck className="w-3.5 h-3.5" />
            <span>
              {lang === 'ar' ? 'تنظيم مؤسسي سلس وسريع' : 'Seamless Organizational Structure'}
            </span>
          </span>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#131b2e] tracking-tight leading-tight">
            {t.finalCtaHeadline}
          </h2>

          <p className="text-sm sm:text-base text-on-surface-variant max-w-xl mx-auto leading-relaxed">
            {t.finalCtaDesc}
          </p>

          <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              size="lg"
              variant="primary"
              className="w-full sm:w-auto font-semibold px-8 shadow-xs hover:shadow-md transition-all duration-200"
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
          </div>
        </div>
      </motion.div>
    </section>
  );
}
