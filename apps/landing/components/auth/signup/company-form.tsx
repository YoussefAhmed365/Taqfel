'use client';

import { useState, useCallback, type FormEvent } from 'react';
import { useAuthLanguage } from '../auth-language-context';
import { AuthInput } from '../../ui/auth-input';
import { AuthButton } from '../../ui/auth-button';
import { validateCompanyForm, type CompanyFormData } from '../../../lib/auth/validation';

interface CompanyFormProps {
    initialData?: Partial<CompanyFormData>;
    onSubmit: (data: CompanyFormData) => void;
}

export function CompanyForm({ initialData, onSubmit }: CompanyFormProps) {
    const { t, lang } = useAuthLanguage();

    const [companyName, setCompanyName] = useState(initialData?.companyName || '');
    const [fullName, setFullName] = useState(initialData?.fullName || '');
    const [email, setEmail] = useState(initialData?.email || '');
    const [phone, setPhone] = useState(initialData?.phone || '');
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    const handleSubmit = useCallback(
        (e: FormEvent) => {
            e.preventDefault();
            setFieldErrors({});

            const data: CompanyFormData = { companyName, fullName, email, phone };
            const result = validateCompanyForm(data, lang);

            if (!result.valid) {
                const errors: Record<string, string> = {};
                result.errors.forEach((err) => (errors[err.field] = err.message));
                setFieldErrors(errors);
                return;
            }

            onSubmit(data);
        },
        [companyName, fullName, email, phone, lang, onSubmit]
    );

    return (
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
            <AuthInput
                label={t.signupCompanyName}
                type="text"
                placeholder={t.signupCompanyNamePlaceholder}
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                error={fieldErrors.companyName}
                autoComplete="organization"
                required
            />

            <AuthInput
                label={t.signupFullName}
                type="text"
                placeholder={t.signupFullNamePlaceholder}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                error={fieldErrors.fullName}
                autoComplete="name"
                required
            />

            <AuthInput
                label={t.signupEmail}
                type="email"
                placeholder={t.signupEmailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={fieldErrors.email}
                autoComplete="email"
                dir="ltr"
                required
            />

            <AuthInput
                label={t.signupPhone}
                type="tel"
                placeholder={t.signupPhonePlaceholder}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                error={fieldErrors.phone}
                autoComplete="tel"
                dir="ltr"
                required
            />

            {/* Quick Demo Pre-fill */}
            <div className="pt-1">
                <button
                    type="button"
                    onClick={() => {
                        setCompanyName('شركة الفنار للاستشارات');
                        setFullName('م. طارق كمال');
                        setEmail('tarek@alfanar.eg');
                        setPhone('01012345678');
                        setFieldErrors({});
                    }}
                    className="w-full py-1.5 px-3 rounded-lg bg-[#e6f7ef] text-[#006c49] text-xs font-semibold hover:bg-[#d0f0e2] transition-colors border border-[#006c49]/20 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                    <span>💡</span>
                    <span>{lang === 'ar' ? 'ملء بيانات شركة تجريبية سريعة' : 'Fill Demo Company Data'}</span>
                </button>
            </div>

            <AuthButton type="submit" className="w-full" size="lg">
                {t.signupContinue}
            </AuthButton>

            {/* Already have an account */}
            <p className="text-center text-sm text-on-surface-variant">
                {t.signupHaveAccount}{' '}
                <a
                    href={`/${lang}/login`}
                    className="font-semibold text-[#006c49] hover:text-on-primary-fixed-variant hover:underline transition-colors"
                >
                    {t.signupLogin}
                </a>
            </p>
        </form>
    );
}