'use client';

import { AuthLanguageProvider } from '../../../../../components/auth/auth-language-context';
import { TwoFactorForm } from '../../../../../components/auth/two-factor/two-factor-form';

export default function TwoFactorPage() {
    return (
        <AuthLanguageProvider>
            <TwoFactorForm />
        </AuthLanguageProvider>
    );
}