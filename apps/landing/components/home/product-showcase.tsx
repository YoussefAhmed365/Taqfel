'use client';

import React, { useState } from 'react';
import { useLanguage } from '../../components/home/language-context';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import {
  IconArrowUpRight,
  IconSearch,
  IconFilter,
  IconCheck,
  IconFileSpreadsheet,
} from '@tabler/icons-react';
import { MockupEmployeeRow } from './mockup-primitives';
import { motion } from 'motion/react';

export function ProductShowcase() {
  const { lang, t, employees, branches } = useLanguage();
  const [employeeSearch, setEmployeeSearch] = useState('');
  const selectedBranch = 'all';

  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(employeeSearch.toLowerCase()) ||
      emp.role.toLowerCase().includes(employeeSearch.toLowerCase());
    const matchesBranch =
      selectedBranch === 'all' ? true : emp.branch.includes(selectedBranch);
    return matchesSearch && matchesBranch;
  });

  return (
    <section id="platform" className="py-16 sm:py-24 space-y-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 7. COMPANY WORKSPACE SHOWCASE (Split: Text on Start, Product UI on End) */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -30% 0px', amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center"
      >
        {/* Editorial Text Side */}
        <div className="lg:col-span-5 space-y-5">
          <Badge variant="emerald" size="sm">
            {t.workspaceEyebrow}
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#131b2e] tracking-tight leading-snug">
            {t.workspaceHeadline}
          </h2>
          <p className="text-base text-on-surface-variant leading-relaxed">
            {t.workspaceDesc}
          </p>

          <div className="space-y-3 pt-2">
            {t.workspacePoints.map((point: string) => (
              <div key={point} className="flex items-center gap-2.5 text-sm text-[#131b2e]">
                <div className="w-5 h-5 rounded-full bg-[#e6f7ef] border border-primary-fixed/70 flex items-center justify-center text-[#006c49] shrink-0">
                  <IconCheck className="w-3 h-3 stroke-[2.5]" />
                </div>
                <span>{point}</span>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <Button
              variant="outline"
              size="md"
              className="text-xs font-semibold"
              onClick={() => {
                const el = document.getElementById('organization');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>{lang === 'ar' ? 'استعراض الهيكل المؤسسي' : 'View Structure'}</span>
              <IconArrowUpRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>

        {/* Product UI Side: Realistic Company Overview Interface */}
        <div className="lg:col-span-7">
          <div className="bg-white border border-surface-dim rounded-2xl shadow-[0_10px_30px_-5px_rgba(19,27,46,0.04)] overflow-hidden">
            {/* Header Strip */}
            <div className="bg-[#faf8ff] border-b border-surface-dim px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#006c49] text-white flex items-center justify-center font-bold text-lg shadow-xs">
                  L
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[#131b2e]">
                    {lang === 'ar' ? 'شركة تقفيل للتقنية والخدمات' : 'Taqfel Tech & Services LLC'}
                  </h3>
                  <p className="text-xs text-outline">
                    {lang === 'ar' ? 'سجل تجاري: 104928 • القاهرة، مصر' : 'CR: 104928 • Cairo, Egypt'}
                  </p>
                </div>
              </div>
              <Badge variant="emerald" size="sm">
                {lang === 'ar' ? 'مؤسسة معتمدة' : 'Verified Entity'}
              </Badge>
            </div>

            {/* Quick Metrics Grid */}
            <div className="p-3 sm:p-5 grid grid-cols-3 gap-2 sm:gap-3 border-b border-surface-container-low bg-white">
              <div className="p-2 sm:p-3 bg-surface-container-low/70 border border-surface-dim rounded-xl text-start">
                <p className="text-[10px] sm:text-[11px] text-outline truncate">{lang === 'ar' ? 'إجمالي الفروع' : 'Total Branches'}</p>
                <p className="text-base sm:text-xl font-bold text-[#131b2e] tabular-nums mt-0.5">
                  {lang === 'ar' ? '4 فروع' : '4 Branches'}
                </p>
                <span className="text-[9px] sm:text-[10px] text-[#006c49] block truncate">
                  {lang === 'ar' ? 'جميعها نشطة' : 'All active'}
                </span>
              </div>
              <div className="p-2 sm:p-3 bg-surface-container-low/70 border border-surface-dim rounded-xl text-start">
                <p className="text-[10px] sm:text-[11px] text-outline truncate">{lang === 'ar' ? 'فريق العمل' : 'Workforce'}</p>
                <p className="text-base sm:text-xl font-bold text-[#131b2e] tabular-nums mt-0.5">
                  {lang === 'ar' ? '248 موظف' : '248 Employees'}
                </p>
                <span className="text-[9px] sm:text-[10px] text-[#006c49] block truncate">
                  {lang === 'ar' ? 'محدث لحظياً' : 'Live synced'}
                </span>
              </div>
              <div className="p-2 sm:p-3 bg-surface-container-low/70 border border-surface-dim rounded-xl text-start">
                <p className="text-[10px] sm:text-[11px] text-outline truncate">{lang === 'ar' ? 'المستخدمون' : 'Active Admins'}</p>
                <p className="text-base sm:text-xl font-bold text-[#131b2e] tabular-nums mt-0.5">
                  {lang === 'ar' ? '12 مستخدم' : '12 Users'}
                </p>
                <span className="text-[9px] sm:text-[10px] text-on-surface-variant block truncate">
                  {lang === 'ar' ? 'صلاحيات دقيقة' : 'Scoped access'}
                </span>
              </div>
            </div>

            {/* Branch Summary List inside Company Card */}
            <div className="p-3.5 sm:p-5 space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-[#131b2e]">
                <span>{lang === 'ar' ? 'الفروع التشغيلية الرئيسية' : 'Operating Branches'}</span>
                <span className="text-[11px] text-[#006c49] cursor-pointer hover:underline">
                  {lang === 'ar' ? '+ إضافة فرع جديد' : '+ Add New Branch'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {branches.slice(0, 4).map((b) => (
                  <div
                    key={b.id}
                    className="p-3 rounded-xl border border-surface-dim bg-[#faf8ff]/60 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-xs font-bold text-[#131b2e]">{b.name}</p>
                      <p className="text-[11px] text-outline">
                        {b.city} • {lang === 'ar' ? 'المشرف: ' : 'Manager: '}{b.manager}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-[#006c49] bg-white border border-surface-dim px-2 py-0.5 rounded-md tabular-nums">
                      {b.employeeCount}
                    </span>
                  </div>
                ))}
              </div>

              {/* Quick Actions Bar */}
              <div className="pt-3 border-t border-surface-container-low flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
                <span className="text-outline">{lang === 'ar' ? 'إجراءات سريعة:' : 'Quick actions:'}</span>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-1 rounded-lg bg-surface-container-low text-on-surface-variant border border-surface-dim font-medium text-[11px] sm:text-xs">
                    {lang === 'ar' ? 'تصدير تقرير المنشأة' : 'Export Entity Report'}
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-[#e6f7ef] text-[#006c49] border border-primary-fixed/70 font-medium text-[11px] sm:text-xs">
                    {lang === 'ar' ? 'تحديث السجلات' : 'Sync Records'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 8. EMPLOYEE / TEAM SHOWCASE (Reversed: Product UI on Start, Text on End) */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -30% 0px', amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center pt-8"
      >
        {/* Product UI Side: Employee Management Table */}
        <div className="lg:col-span-7 order-2 lg:order-1">
          <div className="bg-white border border-surface-dim rounded-2xl shadow-[0_10px_30px_-5px_rgba(19,27,46,0.04)] overflow-hidden">
            {/* Table Header & Controls */}
            <div className="p-4 sm:p-5 border-b border-surface-dim bg-[#faf8ff]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[#131b2e]">
                    {lang === 'ar' ? 'سجل الموظفين المركزي' : 'Central Employee Roster'}
                  </h3>
                  <p className="text-xs text-outline">
                    {lang === 'ar'
                      ? 'عرض وتصفية ملفات الموظفين عبر جميع الفروع'
                      : 'Filter and inspect employee profiles across all branches'}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[#006c49] bg-white border border-primary-fixed/70 px-2.5 py-1 rounded-lg shadow-xs">
                    {lang === 'ar' ? '248 موظف مسجل' : '248 Registered Employees'}
                  </span>
                </div>
              </div>

              {/* Table Toolbar */}
              <div className="flex items-center gap-2 pt-1">
                <div className="relative flex-1">
                  <IconSearch className="w-3.5 h-3.5 absolute top-1/2 -translate-y-1/2 inset-s-3 text-outline" />
                  <input
                    type="text"
                    value={employeeSearch}
                    onChange={(e) => setEmployeeSearch(e.target.value)}
                    placeholder={lang === 'ar' ? 'ابحث بالاسم أو المسمى...' : 'Search by name or title...'}
                    className="w-full text-xs bg-white border border-outline-variant rounded-lg ps-8 pe-3 py-1.5 focus:outline-none focus:border-[#006c49] focus:ring-2 focus:ring-[#006c49]/15"
                  />
                </div>
                <div className="flex items-center gap-1.5 text-xs text-on-surface-variant bg-white border border-outline-variant px-2.5 py-1.5 rounded-lg shrink-0">
                  <IconFilter className="w-3 h-3 text-outline" />
                  <span>{lang === 'ar' ? 'جميع الفروع' : 'All Branches'}</span>
                </div>
              </div>
            </div>

            {/* Table Rows */}
            <div className="overflow-x-auto">
              <table className="w-full text-start">
                <thead>
                  <tr className="bg-surface-container-low/70 border-b border-surface-dim text-[11px] font-semibold text-outline uppercase">
                    <th className="py-2.5 px-4 text-start">{lang === 'ar' ? 'الموظف' : 'Employee'}</th>
                    <th className="py-2.5 px-4 text-start hidden sm:table-cell">{lang === 'ar' ? 'المسمى الوظيفي' : 'Job Title'}</th>
                    <th className="py-2.5 px-4 text-start hidden md:table-cell">{lang === 'ar' ? 'الفرع' : 'Branch'}</th>
                    <th className="py-2.5 px-4 text-start">{lang === 'ar' ? 'الحالة' : 'Status'}</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.map((emp) => (
                    <MockupEmployeeRow key={emp.id} employee={emp} />
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer Pagination Strip */}
            <div className="px-4 py-2.5 bg-surface-container-low/70 border-t border-surface-dim flex items-center justify-between text-xs text-outline">
              <span>{lang === 'ar' ? 'عرض 5 من أصل 248 سجل' : 'Showing 5 of 248 records'}</span>
              <div className="flex items-center gap-1 font-medium">
                <span className="px-2 py-0.5 rounded bg-white border border-surface-dim text-[#131b2e]">
                  1
                </span>
                <span className="px-2 py-0.5 rounded hover:bg-white text-outline">2</span>
                <span className="px-2 py-0.5 rounded hover:bg-white text-outline">3</span>
                <span>...</span>
                <span className="px-2 py-0.5 rounded hover:bg-white text-outline">25</span>
              </div>
            </div>
          </div>
        </div>

        {/* Editorial Text Side */}
        <div className="lg:col-span-5 space-y-5 order-1 lg:order-2">
          <Badge variant="emerald" size="sm">
            {t.teamEyebrow}
          </Badge>
          <h2 className="text-2xl sm:text-4xl font-bold text-[#131b2e] tracking-tight leading-snug">
            {t.teamHeadline}
          </h2>
          <p className="text-base text-on-surface-variant leading-relaxed">
            {t.teamDesc}
          </p>

          <div className="space-y-3 pt-2">
            {t.teamPoints.map((point: string) => (
              <div key={point} className="flex items-center gap-2.5 text-sm text-[#131b2e]">
                <div className="w-5 h-5 rounded-full bg-[#e6f7ef] border border-primary-fixed/70 flex items-center justify-center text-[#006c49] shrink-0">
                  <IconCheck className="w-3 h-3 stroke-[2.5]" />
                </div>
                <span>{point}</span>
              </div>
            ))}
          </div>

          <div className="pt-4">
            <Button
              variant="outline"
              size="md"
              className="text-xs font-semibold"
              onClick={() => {
                const el = document.getElementById('excel-import');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span>{lang === 'ar' ? 'استيراد الموظفين دفعة واحدة' : 'Bulk Import Employees'}</span>
              <IconFileSpreadsheet className="w-3.5 h-3.5 text-[#006c49]" />
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
