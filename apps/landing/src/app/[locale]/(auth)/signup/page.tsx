'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { AuthLanguageProvider, useAuthLanguage } from '../../../../../components/auth/auth-language-context';
import { AuthShell, AuthHeading } from '../../../../../components/auth/auth-shell';
import { AuthProgress } from '../../../../../components/auth/auth-progress';
import { CompanyForm } from '../../../../../components/auth/signup/company-form';
import { AdminForm } from '../../../../../components/auth/signup/admin-form';
import { authService } from '../../../../../lib/auth/service';
import type { CompanyFormData, AccountFormData } from '../../../../../lib/auth/validation';

function SignupFlow() {
    const { t, lang } = useAuthLanguage();
    const router = useRouter();

    const [step, setStep] = useState<'company' | 'account'>('company');
    const [companyData, setCompanyData] = useState<CompanyFormData | null>(null);

    const handleCompanySubmit = useCallback((data: CompanyFormData) => {
        setCompanyData(data);
        setStep('account');
    }, []);

    const handleAccountSubmit = useCallback(
        async (data: AccountFormData) => {
            if (!companyData) return;

            const response = await authService.signup({
                companyName: companyData.companyName,
                fullName: companyData.fullName,
                email: companyData.email,
                phone: companyData.phone,
                password: data.password,
            });

            if (response.success) {
                // Redirect to email verification
                router.push(`/${lang}/verify-email?email=${encodeURIComponent(companyData.email)}`);
            }
        },
        [companyData, lang, router]
    );

    const handleBack = useCallback(() => {
        setStep('company');
    }, []);

    const currentStepIndex = step === 'company' ? 0 : 1;

    return (
        <AuthShell width="medium">
            {/* Progress indicator */}
            <div className="mb-8">
                <AuthProgress currentStep={currentStepIndex} />
            </div>

            {/* Step content */}
            {step === 'company' && (
                <div className="animate-fadeIn">
                    <AuthHeading
                        title={t.signupCompanyTitle}
                        subtitle={t.signupCompanySubtitle}
                    />
                    <CompanyForm
                        initialData={companyData || undefined}
                        onSubmit={handleCompanySubmit}
                    />
                </div>
            )}

            {step === 'account' && companyData && (
                <div className="animate-fadeIn">
                    <AuthHeading
                        title={t.signupAccountTitle}
                        subtitle={t.signupAccountSubtitle}
                    />
                    <AdminForm
                        email={companyData.email}
                        onSubmit={handleAccountSubmit}
                        onBack={handleBack}
                    />
                </div>
            )}
        </AuthShell>
    );
}

export default function SignupPage() {
    return (
        <AuthLanguageProvider>
            <SignupFlow />
        </AuthLanguageProvider>
    );
}