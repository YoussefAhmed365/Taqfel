'use client';

import { AnnouncementBar } from '../../../components/home/announcement-bar';
import { Navbar } from '../../../components/home/navbar';
import { Hero } from '../../../components/home/hero';
import { DashboardPreview } from '../../../components/home/dashboard-preview';
import { CredibilityStrip } from '../../../components/home/credibility-strip';
import { ValueProposition } from '../../../components/home/value-proposition';
import { ProductShowcase } from '../../../components/home/product-showcase';
import { OrganizationSection } from '../../../components/home/organization-section';
import { ExcelImportSection } from '../../../components/home/excel-import-section';
import { SecuritySection } from '../../../components/home/security-section';
import { GrowthSection } from '../../../components/home/growth-section';
import { PricingSection } from '../../../components/home/pricing-section';
import { FaqSection } from '../../../components/home/faq-section';
import { FinalCta } from '../../../components/home/final-cta';
import { Footer } from '../../../components/home/footer';

export default function LandingPage() {
    return (
        <div className="min-h-screen flex flex-col bg-[#faf8ff] text-[#131b2e]">
                {/* 1. Announcement Bar */}
                <AnnouncementBar />

                {/* 2. Navbar */}
                <Navbar />

                {/* Main Content Flow */}
                <main className="flex-1">
                    {/* 3. Hero */}
                    <Hero />

                    {/* 4. Hero Product Dashboard Preview */}
                    <DashboardPreview />

                    {/* 5. Credibility / Trust Strip */}
                    <CredibilityStrip />

                    {/* 6. Value Proposition */}
                    <ValueProposition />

                    {/* 7 & 8. Company Workspace & Employee Directory Showcases */}
                    <ProductShowcase />

                    {/* 9. Organization Structure (Company -> Branches -> Employees) */}
                    <OrganizationSection />

                    {/* 10. Excel Bulk Import */}
                    <ExcelImportSection />

                    {/* 11. Security / Trust */}
                    <SecuritySection />

                    {/* 12. Built to Grow (Today vs As Needs Grow) */}
                    <GrowthSection />

                    {/* 13. Pricing */}
                    <PricingSection />

                    {/* 14. FAQ */}
                    <FaqSection />

                    {/* 15. Final CTA */}
                    <FinalCta />
                </main>

                {/* 16. Footer */}
                <Footer />
        </div>
    );
}