'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useLanguage } from '../../components/home/language-context';
import { motion } from 'motion/react';
import {
  MockupAppShell,
  MockupMetricTile,
  MockupEmployeeRow,
  MockupBranchItem,
} from './mockup-primitives';
import { IconPhoto } from '@tabler/icons-react';
import { Badge } from '../../components/ui/badge';

const DESIGN_WIDTH = 1040;
const FALLBACK_HEIGHT = 650;

export function DashboardPreview() {
  const { lang, dir, metrics, employees, branches } = useLanguage();
  const [activeTab, setActiveTab] = useState<'overview' | 'employees' | 'branches'>('overview');

  // Mobile scale-as-image architecture
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [contentHeight, setContentHeight] = useState<number>(FALLBACK_HEIGHT);
  const [mobileMode, setMobileMode] = useState<'image' | 'scroll'>('image');

  const updateMeasurements = useCallback(() => {
    if (containerRef.current) {
      const width = containerRef.current.offsetWidth;
      setContainerWidth(width);
    }
    if (contentRef.current) {
      const height = contentRef.current.offsetHeight;
      if (height > 0) {
        setContentHeight(height);
      }
    }
  }, []);

  useEffect(() => {
    updateMeasurements();
    const handleResize = () => updateMeasurements();
    window.addEventListener('resize', handleResize);

    const observer = new ResizeObserver(() => {
      updateMeasurements();
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, [updateMeasurements]);

  const isMobile = containerWidth > 0 && containerWidth < 768;
  const scale = isMobile ? Math.min(1, containerWidth / DESIGN_WIDTH) : 1;
  const scaledWrapperHeight = isMobile && mobileMode === 'image' ? Math.ceil(contentHeight * scale) : undefined;

  return (
    <section className="relative px-3 sm:px-6 lg:px-8 pb-12 sm:pb-24 max-w-7xl mx-auto">
      {/* Decorative Outer Frame with light border and soft depth */}
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -25% 0px', amount: 0.15 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative rounded-2xl sm:rounded-3xl p-1 sm:p-2.5 bg-linear-to-b from-surface-dim/80 via-white/50 to-surface-dim/40 shadow-[0_12px_36px_-10px_rgba(19,27,46,0.06),0_2px_8px_-2px_rgba(19,27,46,0.03)] border border-surface-dim overflow-hidden"
      >
        {/* Mobile Viewport Scaler Wrapper */}
        <div
          style={{
            height: scaledWrapperHeight ? `${scaledWrapperHeight}px` : 'auto',
          }}
          className={`w-full relative transition-all duration-300 ${isMobile && mobileMode === 'image'
            ? 'overflow-hidden select-none pointer-events-none'
            : isMobile && mobileMode === 'scroll'
              ? 'overflow-x-auto scrollbar-thin'
              : 'overflow-visible'
            }`}
        >
          <div
            ref={contentRef}
            style={
              isMobile && mobileMode === 'image'
                ? {
                  width: `${DESIGN_WIDTH}px`,
                  transform: `scale(${scale})`,
                  transformOrigin: dir === 'rtl' ? 'top right' : 'top left',
                }
                : isMobile && mobileMode === 'scroll'
                  ? {
                    width: `${DESIGN_WIDTH}px`,
                  }
                  : {
                    width: '100%',
                  }
            }
            className="transition-transform duration-200"
          >
            <MockupAppShell
              activeNav="dashboard"
              companyName={lang === 'ar' ? 'شركة تقفيل للتقنية والخدمات ش.م.م' : 'Taqfel Tech & Services SAE'}
            >
              {/* Dashboard Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-surface-dim">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-bold text-[#131b2e] tracking-tight">
                      {lang === 'ar' ? 'نظرة عامة على المؤسسة' : 'Organization Overview'}
                    </h3>
                    <Badge variant="lime" size="sm">
                      {lang === 'ar' ? 'مساحة العمل التشغيلية' : 'Operational Hub'}
                    </Badge>
                  </div>
                  <p className="text-xs text-outline mt-0.5">
                    {lang === 'ar'
                      ? 'ملخص الفروع والموظفين والمستخدمين المعتمدين'
                      : 'Consolidated summary of branches, team heads, and active users'}
                  </p>
                </div>

                {/* Quick interactive view filters */}
                <div className="flex items-center gap-2">
                  <div className="flex bg-surface-container-low p-0.5 rounded-lg border border-surface-dim text-xs font-medium">
                    <button
                      type="button"
                      onClick={() => setActiveTab('overview')}
                      className={`px-3 py-1 rounded-md transition-all ${activeTab === 'overview'
                        ? 'bg-white text-[#006c49] font-bold shadow-xs'
                        : 'text-on-surface-variant hover:text-[#131b2e]'
                        }`}
                    >
                      {lang === 'ar' ? 'الرئيسية' : 'Overview'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('employees')}
                      className={`px-3 py-1 rounded-md transition-all ${activeTab === 'employees'
                        ? 'bg-white text-[#006c49] font-bold shadow-xs'
                        : 'text-on-surface-variant hover:text-[#131b2e]'
                        }`}
                    >
                      {lang === 'ar' ? 'الموظفون (248)' : 'Employees (248)'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('branches')}
                      className={`px-3 py-1 rounded-md transition-all ${activeTab === 'branches'
                        ? 'bg-white text-[#006c49] font-bold shadow-xs'
                        : 'text-on-surface-variant hover:text-[#131b2e]'
                        }`}
                    >
                      {lang === 'ar' ? 'الفروع (4)' : 'Branches (4)'}
                    </button>
                  </div>
                </div>
              </div>

              {/* 4 Standard Metric Tiles */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-5">
                {metrics.map((m) => (
                  <MockupMetricTile
                    key={m.id}
                    label={m.label}
                    value={m.value}
                    subtext={m.subtext}
                    trend={m.trend}
                    badgeText={m.badge}
                    variant={m.variant}
                  />
                ))}
              </div>

              {/* Center Split: Distribution Chart & Branch Map / Team Ledger */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* Left 2 Cols: Visual Headcount by Branch & Department */}
                <div className="lg:col-span-2 bg-white border border-surface-dim rounded-xl p-4 shadow-[0_1px_3px_0_rgba(19,27,46,0.03)]">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#131b2e]">
                        {lang === 'ar' ? 'توزيع الموظفين حسب الفروع' : 'Headcount Distribution by Branch'}
                      </h4>
                      <p className="text-[11px] text-outline">
                        {lang === 'ar'
                          ? 'مقارنة حجم القوى العاملة عبر الفروع الـ 4'
                          : 'Workforce capacity across the 4 operational locations'}
                      </p>
                    </div>
                    <span className="text-[11px] font-semibold text-[#006c49] bg-[#e6f7ef] border border-primary-fixed/70 px-2 py-0.5 rounded-full">
                      {lang === 'ar' ? 'إجمالي 248 موظف' : 'Total 248 Staff'}
                    </span>
                  </div>

                  {/* Graphical Distribution Bars */}
                  <div className="space-y-3.5 pt-1">
                    {branches.map((b, idx) => {
                      const percentage = Math.round((b.employeeCount / 248) * 100);
                      const colors = [
                        'bg-[#006c49]',
                        'bg-[#10b981]',
                        'bg-secondary',
                        'bg-surface-container-low',
                      ];
                      return (
                        <div key={b.id} className="space-y-1">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-semibold text-[#131b2e]">{b.name}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-[#131b2e] tabular-nums">
                                {b.employeeCount} {lang === 'ar' ? 'موظف' : 'staff'}
                              </span>
                              <span className="text-[11px] text-outline font-mono tabular-nums">
                                ({percentage}%)
                              </span>
                            </div>
                          </div>
                          <div className="h-2 w-full bg-surface-container-low rounded-full overflow-hidden flex">
                            <motion.div
                              className={`h-full rounded-full ${colors[idx % colors.length]}`}
                              initial={{ width: 0 }}
                              whileInView={{ width: `${percentage}%` }}
                              viewport={{ once: true, margin: '0px 0px -20% 0px' }}
                              transition={{ duration: 0.8, delay: 0.15 + idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Department Tag Matrix */}
                  <div className="mt-5 pt-3.5 border-t border-surface-container-low flex items-center justify-between flex-wrap gap-2 text-[11px] text-on-surface-variant">
                    <span className="font-medium text-[#131b2e]">
                      {lang === 'ar' ? 'الأقسام الرئيسية:' : 'Key Divisions:'}
                    </span>
                    <span className="bg-[#faf8ff] px-2 py-0.5 rounded border border-surface-dim">
                      {lang === 'ar' ? 'العمليات (86)' : 'Operations (86)'}
                    </span>
                    <span className="bg-[#faf8ff] px-2 py-0.5 rounded border border-surface-dim">
                      {lang === 'ar' ? 'المبيعات والتسويق (64)' : 'Sales & Marketing (64)'}
                    </span>
                    <span className="bg-[#faf8ff] px-2 py-0.5 rounded border border-surface-dim">
                      {lang === 'ar' ? 'التقنية والمنتج (52)' : 'Engineering & Product (52)'}
                    </span>
                    <span className="bg-[#faf8ff] px-2 py-0.5 rounded border border-surface-dim">
                      {lang === 'ar' ? 'المالية وشؤون الأفراد (46)' : 'Finance & HR (46)'}
                    </span>
                  </div>
                </div>

                {/* Right Col: Quick Status & Recent Operational Updates */}
                <div className="bg-white border border-surface-dim rounded-xl p-4 shadow-[0_1px_3px_0_rgba(19,27,46,0.03)] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-xs sm:text-sm font-bold text-[#131b2e]">
                        {lang === 'ar' ? 'الفروع التشغيلية' : 'Operational Branches'}
                      </h4>
                      <Badge variant="emerald" size="sm">
                        {lang === 'ar' ? '4 نشطة' : '4 Active'}
                      </Badge>
                    </div>

                    <div className="space-y-2 mb-3">
                      {branches.slice(0, 3).map((branch) => (
                        <MockupBranchItem key={branch.id} branch={branch} />
                      ))}
                    </div>
                  </div>

                  {/* Action callout within preview */}
                  <div className="mt-2 pt-3 border-t border-surface-container-low bg-[#f4fce3]/70 border rounded-lg p-2.5 flex items-center justify-between">
                    <div className="text-[11px]">
                      <p className="font-bold text-[#131b2e]">
                        {lang === 'ar' ? 'استيراد السجلات متاح' : 'Bulk Import Ready'}
                      </p>
                      <p className="text-secondary">
                        {lang === 'ar' ? 'جاهز لاستقبال ملفات Excel' : 'Ready for Excel bulk sheets'}
                      </p>
                    </div>
                    <span className="text-[11px] font-semibold text-[#006c49] bg-white border border-primary-fixed/70 px-2 py-1 rounded-md shadow-xs">
                      .xlsx
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Table Strip: Employee Sample Directory */}
              <div className="mt-4 bg-white border border-surface-dim rounded-xl overflow-hidden shadow-[0_1px_3px_0_rgba(19,27,46,0.03)]">
                <div className="px-4 py-2.5 bg-surface-container-low/70 border-b border-surface-dim flex items-center justify-between">
                  <span className="text-xs font-bold text-[#131b2e]">
                    {lang === 'ar' ? 'عينة من سجل الموظفين الحديث' : 'Recent Employee Directory Sample'}
                  </span>
                  <span className="text-[11px] text-outline">
                    {lang === 'ar' ? 'عرض 4 من أصل 248 سجل' : 'Showing 4 of 248 demo records'}
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-start">
                    <thead>
                      <tr className="border-b border-surface-dim text-[11px] font-semibold text-outline uppercase">
                        <th className="py-2 px-3 text-start">
                          {lang === 'ar' ? 'الموظف' : 'Employee'}
                        </th>
                        <th className="py-2 px-3 text-start hidden sm:table-cell">
                          {lang === 'ar' ? 'المسمى الوظيفي' : 'Role'}
                        </th>
                        <th className="py-2 px-3 text-start hidden md:table-cell">
                          {lang === 'ar' ? 'الفرع' : 'Branch'}
                        </th>
                        <th className="py-2 px-3 text-start">
                          {lang === 'ar' ? 'الحالة' : 'Status'}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {employees.slice(0, 4).map((emp) => (
                        <MockupEmployeeRow key={emp.id} employee={emp} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </MockupAppShell>
          </div>
        </div>

        {/* Mobile Control Strip & Snapshot Tag */}
        {isMobile && (
          <div className="flex items-center justify-between px-3 py-2 bg-white/95 border-t border-surface-dim text-[11px] text-outline mt-1 rounded-b-xl">
            <div className="flex items-center gap-1.5 font-medium text-[#006c49]">
              <IconPhoto className="w-3.5 h-3.5" />
              <span>
                {lang === 'ar' ? 'معاينة الواجهة الرسمية' : 'Official Interface Preview'}
              </span>
            </div>

            {/* Mobile View Toggle */}
            <div className="flex items-center bg-surface-container-low rounded-lg p-0.5 border border-surface-dim">
              <button
                type="button"
                onClick={() => setMobileMode('image')}
                className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-all ${mobileMode === 'image'
                  ? 'bg-white text-[#006c49] shadow-2xs'
                  : 'text-outline'
                  }`}
              >
                {lang === 'ar' ? 'ملائمة كصورة' : 'Fit as Image'}
              </button>
              <button
                type="button"
                onClick={() => setMobileMode('scroll')}
                className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-all ${mobileMode === 'scroll'
                  ? 'bg-white text-[#006c49] shadow-2xs'
                  : 'text-outline'
                  }`}
              >
                {lang === 'ar' ? 'تمرير كامل' : 'Full Scroll'}
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
}
