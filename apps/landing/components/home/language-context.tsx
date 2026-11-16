'use client';

import React from 'react';
import { useLocale, useMessages } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import {
  Language,
  MetricData,
  EmployeeDemo,
  BranchDemo,
  ValuePropItem,
  SecurityCardItem,
  PricingPlan,
  FaqItem,
} from '../../lib/types';
import type enMessages from '../../messages/en.json';

type HomeMessages = typeof enMessages;

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function useLanguage() {
  const locale = useLocale() as Language;
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  const router = useRouter();
  const pathname = usePathname();
  const messages = useMessages() as HomeMessages;

  const setLang = (newLang: Language) => {
    router.replace(pathname, { locale: newLang });
  };

  const toggleLang = () => {
    setLang(locale === 'ar' ? 'en' : 'ar');
  };

  return {
    lang: locale,
    dir,
    setLang,
    toggleLang,
    t: messages.UI_TEXT,
    metrics: (messages.DEMO_METRICS || []) as MetricData[],
    employees: (messages.DEMO_EMPLOYEES || []) as EmployeeDemo[],
    branches: (messages.DEMO_BRANCHES || []) as BranchDemo[],
    valueProps: (messages.VALUE_PROPOSITIONS || []) as ValuePropItem[],
    securityCards: (messages.SECURITY_CARDS || []) as SecurityCardItem[],
    pricingPlans: (messages.PRICING_PLANS || []) as PricingPlan[],
    faqs: (messages.FAQ_ITEMS || []) as FaqItem[],
  };
}
