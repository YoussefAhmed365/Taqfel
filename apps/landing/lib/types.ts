export type Language = 'ar' | 'en';

export interface NavItem {
    key: string;
    label: string;
    href: string;
}

export interface MetricData {
    id: string;
    label: string;
    value: string | number;
    subtext: string;
    trend?: string;
    badge?: string;
    variant?: 'emerald' | 'lime' | 'slate';
}

export interface EmployeeDemo {
    id: string;
    name: string;
    role: string;
    department: string;
    branch: string;
    status: 'active' | 'leave' | 'review';
    joinedDate: string;
    avatarSeed: string;
}

export interface BranchDemo {
    id: string;
    name: string;
    city: string;
    employeeCount: number;
    manager: string;
    code: string;
}

export interface ValuePropItem {
    number: string;
    title: string;
    description: string;
}

export interface SecurityCardItem {
    id: string;
    title: string;
    description: string;
    iconName: string;
}

export interface PricingPlan {
    id: string;
    name: string;
    target: string;
    description: string;
    isPopular?: boolean;
    features: string[];
    ctaText: string;
}

export interface FaqItem {
    id: string;
    question: string;
    answer: string;
}