'use client';

import { AuthLanguageProvider } from '../../../../../components/auth/auth-language-context';
import { LoginForm } from '../../../../../components/auth/login/login-form';

export default function LoginPage() {
    return (
        <AuthLanguageProvider>
            <LoginForm />
        </AuthLanguageProvider>
    );
}