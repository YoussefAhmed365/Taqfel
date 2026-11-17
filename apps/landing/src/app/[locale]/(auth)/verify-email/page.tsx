'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { AuthLanguageProvider } from '../../../../../components/auth/auth-language-context';
import { EmailVerification } from '../../../../../components/auth/verification/email-verification';

function VerifyEmailContent() {
    const params = useParams();
    const router = useRouter();
    const searchParams = useSearchParams();
    const locale = (params?.locale as string) || 'ar';
    const email = searchParams.get('email') || '';
    const token = searchParams.get('token') || undefined;

    return (
        <AuthLanguageProvider>
            <EmailVerification
                email={email}
                token={token}
                onContinue={() => {
                    router.push(`/${locale}/onboarding`);
                }}
            />
        </AuthLanguageProvider>
    );
}

export default function VerifyEmailPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-[#faf8ff]">
                <div className="animate-spin w-6 h-6 border-2 border-[#006c49] border-t-transparent rounded-full" />
            </div>
        }>
            <VerifyEmailContent />
        </Suspense>
    );
}