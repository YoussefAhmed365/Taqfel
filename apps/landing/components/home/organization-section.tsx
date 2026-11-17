'use client';

import { useLanguage } from '../../components/home/language-context';
import { Badge } from '../../components/ui/badge';
import { IconBuilding, IconGitBranch, IconUsers } from '@tabler/icons-react';
import { motion } from 'motion/react';

export function OrganizationSection() {
    const { lang, t } = useLanguage();

    return (
        <section id="organization" className="py-16 sm:py-24 bg-[#faf8ff] border-y border-surface-dim">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '0px 0px -30% 0px', amount: 0.25 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
                >
                    <Badge variant="emerald" size="sm" className="mb-3 font-semibold">
                        {t.orgEyebrow}
                    </Badge>
                    <h2 className="text-2xl sm:text-4xl font-bold text-[#131b2e] tracking-tight mb-4">
                        {t.orgHeadline}
                    </h2>
                    <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                        {t.orgDesc}
                    </p>
                </motion.div>

                {/* Visual Hierarchy Diagram: Company -> Branches -> Teams */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '0px 0px -30% 0px', amount: 0.2 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-4xl mx-auto"
                >
                    {/* Level 1: Root Company Node */}
                    <div className="flex flex-col items-center">
                        <div className="bg-white border-2 border-[#006c49] rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 max-w-md w-full text-center relative group">
                            <div className="w-10 h-10 rounded-xl bg-[#006c49] text-white mx-auto flex items-center justify-center font-bold text-base mb-2 transition-transform duration-300">
                                <IconBuilding className="w-5 h-5" />
                            </div>
                            <h3 className="text-sm sm:text-base font-bold text-[#131b2e]">
                                {lang === 'ar' ? 'شركة تقفيل للتقنية والخدمات ش.م.م' : 'Taqfel Tech & Services SAE'}
                            </h3>
                            <p className="text-xs text-outline mt-0.5">
                                {lang === 'ar' ? 'المقر الإداري الرئيسي • سجل تجاري موحد' : 'Headquarters • Corporate Entity'}
                            </p>
                            <div className="mt-3 pt-2.5 border-t border-surface-container-low flex items-center justify-center gap-3 text-[11px]">
                                <span className="text-[#006c49] font-bold">
                                    {lang === 'ar' ? '4 فروع تشغيلية' : '4 Operating Branches'}
                                </span>
                                <span className="text-outline-variant">•</span>
                                <span className="text-[#131b2e] font-bold">
                                    {lang === 'ar' ? '248 موظف' : '248 Employees'}
                                </span>
                                <span className="text-outline-variant">•</span>
                                <span className="text-secondary font-bold">
                                    {lang === 'ar' ? '12 مستخدم إداري' : '12 Admin Users'}
                                </span>
                            </div>
                        </div>

                        {/* Vertical connector to branches */}
                        <div className="w-0.5 h-8 bg-surface-dim my-1" />
                    </div>

                    {/* Level 2: Branches Row */}
                    <div className="relative pt-5">
                        {/* Horizontal connecting bar on desktop */}
                        <div className="hidden md:block absolute top-2 inset-s-12 inset-e-12 h-0.5 bg-surface-dim" />

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative">
                            {/* Branch 1 */}
                            <div className="bg-white border border-surface-dim rounded-xl p-4 shadow-[0_1px_3px_0_rgba(19,27,46,0.03)] hover:border-[#006c49] hover:-translate-y-0.5 hover:shadow-sm transition-all duration-300 text-start">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-7 h-7 rounded-lg bg-[#e6f7ef] text-[#006c49] flex items-center justify-center">
                                            <IconGitBranch className="w-3.5 h-3.5" />
                                        </div>
                                        <h4 className="text-xs font-bold text-[#131b2e]">{t.companyHQ}</h4>
                                    </div>
                                    <Badge variant="emerald" size="sm">
                                        142
                                    </Badge>
                                </div>
                                <p className="text-[11px] text-outline">
                                    {lang === 'ar' ? 'المعادي، القاهرة' : 'Maadi, Cairo'}
                                </p>
                                <div className="mt-3 pt-2 border-t border-surface-container-low text-[11px] text-on-surface-variant">
                                    <span>{lang === 'ar' ? 'المشرف: ' : 'Manager: '}</span>
                                    <strong className="text-[#131b2e]">
                                        {lang === 'ar' ? 'م. أحمد الشريف' : 'Eng. Ahmed El-Sherif'}
                                    </strong>
                                </div>
                            </div>

                            {/* Branch 2 */}
                            <div className="bg-white border border-surface-dim rounded-xl p-4 shadow-[0_1px_3px_0_rgba(19,27,46,0.03)] hover:border-[#006c49] hover:-translate-y-0.5 hover:shadow-sm transition-all duration-300 text-start">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-7 h-7 rounded-lg bg-[#e6f7ef] text-[#006c49] flex items-center justify-center">
                                            <IconGitBranch className="w-3.5 h-3.5" />
                                        </div>
                                        <h4 className="text-xs font-bold text-[#131b2e]">{t.branch1}</h4>
                                    </div>
                                    <Badge variant="emerald" size="sm">
                                        48
                                    </Badge>
                                </div>
                                <p className="text-[11px] text-outline">
                                    {lang === 'ar' ? 'سموحة، الإسكندرية' : 'Smouha, Alexandria'}
                                </p>
                                <div className="mt-3 pt-2 border-t border-surface-container-low text-[11px] text-on-surface-variant">
                                    <span>{lang === 'ar' ? 'المشرف: ' : 'Manager: '}</span>
                                    <strong className="text-[#131b2e]">
                                        {lang === 'ar' ? 'أ. كريم الديب' : 'Karim El-Deeb'}
                                    </strong>
                                </div>
                            </div>

                            {/* Branch 3 */}
                            <div className="bg-white border border-surface-dim rounded-xl p-4 shadow-[0_1px_3px_0_rgba(19,27,46,0.03)] hover:border-[#006c49] hover:-translate-y-0.5 hover:shadow-sm transition-all duration-300 text-start">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-7 h-7 rounded-lg bg-[#e6f7ef] text-[#006c49] flex items-center justify-center">
                                            <IconGitBranch className="w-3.5 h-3.5" />
                                        </div>
                                        <h4 className="text-xs font-bold text-[#131b2e]">{t.branch2} & {t.branch3}</h4>
                                    </div>
                                    <Badge variant="emerald" size="sm">
                                        58
                                    </Badge>
                                </div>
                                <p className="text-[11px] text-outline">
                                    {lang === 'ar' ? 'الجيزة والدلتا' : 'Giza & Delta'}
                                </p>
                                <div className="mt-3 pt-2 border-t border-surface-container-low text-[11px] text-on-surface-variant">
                                    <span>{lang === 'ar' ? 'المشرف: ' : 'Manager: '}</span>
                                    <strong className="text-[#131b2e]">
                                        {lang === 'ar' ? 'سارة عبد الرحمن' : 'Sara Abdelrahman'}
                                    </strong>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Level 3: Department / Teams Mapping */}
                    <div className="mt-6 pt-5 border-t border-surface-dim">
                        <p className="text-xs font-semibold text-on-surface-variant text-center mb-3">
                            {lang === 'ar'
                                ? 'ارتباط مباشر بكل فريق وظيفي وتوزيع للأفراد'
                                : 'Direct linkage to departmental teams and employee roles'}
                        </p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                            {[
                                { name: t.teamTech, count: lang === 'ar' ? '52 فرد' : '52 members' },
                                { name: t.teamOps, count: lang === 'ar' ? '86 فرد' : '86 members' },
                                { name: t.teamFinance, count: lang === 'ar' ? '46 فرد' : '46 members' },
                                { name: t.teamPeople, count: lang === 'ar' ? '64 فرد' : '64 members' },
                            ].map((team) => (
                                <div
                                    key={team.name}
                                    className="bg-white border border-surface-dim rounded-lg p-2.5 text-center text-xs"
                                >
                                    <IconUsers className="w-3.5 h-3.5 text-[#006c49] mx-auto mb-1" />
                                    <p className="font-semibold text-[#131b2e] truncate">{team.name}</p>
                                    <p className="text-[10px] text-outline mt-0.5">{team.count}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}