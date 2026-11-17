'use client';

import { useLanguage } from '../../components/home/language-context';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import {
    IconFileSpreadsheet,
    IconCircleCheck,
    IconAlertCircle,
    IconCloudUpload,
    IconArrowRight,
    IconArrowLeft,
    IconCheck,
} from '@tabler/icons-react';
import { motion } from 'motion/react';

export function ExcelImportSection() {
    const { lang, t, dir } = useLanguage();

    return (
        <section id="excel-import" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -30% 0px', amount: 0.2 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center"
            >
                {/* Editorial Text Side */}
                <div className="lg:col-span-6 space-y-5">
                    <Badge variant="emerald" size="sm">
                        {t.importEyebrow}
                    </Badge>
                    <h2 className="text-2xl sm:text-4xl font-bold text-[#131b2e] tracking-tight leading-snug">
                        {t.importHeadline}
                    </h2>
                    <p className="text-base text-on-surface-variant leading-relaxed">
                        {t.importDesc}
                    </p>

                    <div className="space-y-3 pt-2">
                        {[
                            lang === 'ar'
                                ? 'قالب جاهز بصيغة .xlsx لتسهيل إعداد البيانات'
                                : 'Ready-to-use .xlsx template for quick data preparation',
                            lang === 'ar'
                                ? 'فحص فوري وتلقائي للحقول المكررة والناقصة'
                                : 'Immediate structural validation for duplicates and missing fields',
                            lang === 'ar'
                                ? 'إمكانية مراجعة وتصحيح الملاحظات قبل الاعتماد النهائي'
                                : 'Inline review and resolution of flagged entries before commit',
                        ].map((text) => (
                            <div key={text} className="flex items-center gap-2.5 text-sm text-[#131b2e]">
                                <div className="w-5 h-5 rounded-full bg-[#e6f7ef] border border-primary-fixed/70 flex items-center justify-center text-[#006c49] shrink-0">
                                    <IconCheck className="w-3 h-3 stroke-[2.5]" />
                                </div>
                                <span>{text}</span>
                            </div>
                        ))}
                    </div>

                    <div className="pt-4 flex items-center gap-3">
                        <Button
                            variant="primary"
                            size="md"
                            className="text-xs font-semibold"
                            onClick={() => {
                                const el = document.getElementById('pricing');
                                el?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            <span>{t.ctaPrimary}</span>
                            {dir === 'rtl' ? (
                                <IconArrowLeft className="w-3.5 h-3.5" />
                            ) : (
                                <IconArrowRight className="w-3.5 h-3.5" />
                            )}
                        </Button>
                    </div>
                </div>

                {/* Realistic Mini Import Interface Card */}
                <div className="lg:col-span-6">
                    <div className="bg-white border border-surface-dim rounded-2xl shadow-[0_10px_25px_-5px_rgba(19,27,46,0.04)] p-6 sm:p-7">
                        {/* File Header */}
                        <div className="flex items-center justify-between pb-4 border-b border-surface-dim">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-[#e6f7ef] border border-primary-fixed/70 text-[#006c49] flex items-center justify-center">
                                    <IconFileSpreadsheet className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-[#131b2e] font-mono">
                                        {t.importFileName}
                                    </h4>
                                    <p className="text-xs text-outline">{t.importFileSize} • Excel Spreadsheet</p>
                                </div>
                            </div>
                            <Badge variant="emerald" size="sm">
                                <IconCircleCheck className="w-3 h-3" />
                                <span>{t.importReadyStatus}</span>
                            </Badge>
                        </div>

                        {/* Validation Breakdown Summary */}
                        <div className="py-5 space-y-3">
                            <div className="flex items-center justify-between text-xs">
                                <span className="text-on-surface-variant font-medium">{t.importTotal}</span>
                                <span className="font-bold text-[#131b2e] tabular-nums">100%</span>
                            </div>
                            <div className="w-full bg-surface-container-low h-2 rounded-full overflow-hidden flex">
                                <motion.div
                                    className="bg-[#006c49] h-full rounded-s-full"
                                    initial={{ width: 0 }}
                                    whileInView={{ width: '98.8%' }}
                                    viewport={{ once: true, margin: '0px 0px -25% 0px' }}
                                    transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                />
                                <motion.div
                                    className="bg-error h-full rounded-e-full"
                                    initial={{ width: 0 }}
                                    whileInView={{ width: '1.2%' }}
                                    viewport={{ once: true, margin: '0px 0px -25% 0px' }}
                                    transition={{ duration: 0.4, delay: 1.1, ease: 'easeOut' }}
                                />
                            </div>

                            {/* Status details */}
                            <div className="grid grid-cols-2 gap-3 pt-2">
                                <div className="p-3 rounded-xl bg-[#e6f7ef] border border-primary-fixed/70">
                                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#006c49] mb-0.5">
                                        <IconCircleCheck className="w-3.5 h-3.5" />
                                        <span>{lang === 'ar' ? '245 سجل' : '245 records'}</span>
                                    </div>
                                    <p className="text-[11px] text-on-primary-container">
                                        {lang === 'ar' ? 'جاهز للاستيراد المباشر' : 'Verified and ready'}
                                    </p>
                                </div>

                                <div className="p-3 rounded-xl bg-error-container/40 border border-error-container">
                                    <div className="flex items-center gap-1.5 text-xs font-bold text-error mb-0.5">
                                        <IconAlertCircle className="w-3.5 h-3.5" />
                                        <span>{lang === 'ar' ? '3 سجلات' : '3 records'}</span>
                                    </div>
                                    <p className="text-[11px] text-on-error-container">
                                        {lang === 'ar' ? 'تحتاج إلى مراجعة' : 'Requires field check'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Sample Flagged row for realism */}
                        <div className="bg-[#faf8ff] border border-surface-dim rounded-xl p-3 text-xs mb-4">
                            <div className="flex items-center justify-between text-[11px] text-outline mb-1">
                                <span>{lang === 'ar' ? 'تنبيه تدقيق: الصف 14' : 'Audit Notice: Row 14'}</span>
                                <span className="text-error font-medium">
                                    {lang === 'ar' ? 'الرقم القومي / المسمى' : 'National ID / Title'}
                                </span>
                            </div>
                            <p className="font-semibold text-[#131b2e]">
                                {lang === 'ar'
                                    ? 'أحمد سمير فهمي — فرع الإسكندرية (تم تصحيح التعيين تلقائيًا)'
                                    : 'Ahmed Samir Fahmy — Alexandria Branch (Auto-assigned title)'}
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-3 pt-2">
                            <Button variant="primary" size="md" className="flex-1 font-semibold text-xs">
                                <IconCloudUpload className="w-4 h-4" />
                                <span>{t.importButtonAction}</span>
                            </Button>
                            <Button variant="secondary" size="md" className="text-xs">
                                <span>{t.importReviewAction}</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}