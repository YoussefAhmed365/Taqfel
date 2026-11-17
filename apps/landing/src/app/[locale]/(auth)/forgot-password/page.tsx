'use client';

import { AuthLanguageProvider } from '../../../../../components/auth/auth-language-context';
import { ForgotPasswordForm } from '../../../../../components/auth/recovery/forgot-password-form';

export default function ForgotPasswordPage() {
    return (
        <AuthLanguageProvider>
            <ForgotPasswordForm />
        </AuthLanguageProvider>
    );
}