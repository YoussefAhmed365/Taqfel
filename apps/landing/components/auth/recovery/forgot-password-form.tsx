'use client';

import { useState, useCallback, type FormEvent } from 'react';
import { useAuthLanguage } from '../auth-language-context';
import { AuthShell, AuthHeading } from '../auth-shell';
import { AuthInput } from '../../ui/auth-input';
import { AuthButton } from '../../ui/auth-button';
import { validateEmailOnly } from '../../../lib/auth/validation';
import { authService } from '../../../lib/auth/service';

export function ForgotPasswordForm() {
  const { t, lang } = useAuthLanguage();

  const [email, setEmail] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setFieldErrors({});

      const result = validateEmailOnly(email, lang);
      if (!result.valid) {
        const errors: Record<string, string> = {};
        result.errors.forEach((err) => (errors[err.field] = err.message));
        setFieldErrors(errors);
        return;
      }

      setLoading(true);
      await authService.requestPasswordReset(email);
      setLoading(false);
      setSent(true);
    },
    [email, lang]
  );

  // --- SENT STATE ---
  if (sent) {
    return (
      <AuthShell width="narrow">
        <div className="text-center space-y-5">
          <div className="mx-auto w-16 h-16 rounded-full bg-[#e6f7ef] flex items-center justify-center">
            <svg className="w-8 h-8 text-[#006c49]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <AuthHeading
            title={t.forgotSuccessTitle}
            subtitle={t.forgotSuccessSubtitle}
          />

          {/* MVP Demo Link to Reset Password */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                window.location.href = `/${lang}/reset-password?token=valid`;
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-[#006c49] text-white text-xs font-semibold hover:bg-on-primary-fixed-variant transition-colors shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>{lang === 'ar' ? 'محاكاة: فتح رابط إعادة تعيين كلمة المرور' : 'Simulate: Open Reset Password Link'}</span>
              <span className="rtl:rotate-180">➔</span>
            </button>
          </div>

          <div>
            <a
              href={`/${lang}/login`}
              className="inline-flex items-center gap-1.5 text-sm text-[#006c49] hover:text-on-primary-fixed-variant font-semibold hover:underline transition-colors"
            >
              {t.forgotBackToLogin}
            </a>
          </div>
        </div>
      </AuthShell>
    );
  }

  // --- DEFAULT STATE ---
  return (
    <AuthShell width="narrow">
      <AuthHeading title={t.forgotTitle} subtitle={t.forgotSubtitle} />

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <AuthInput
          label={t.forgotEmail}
          type="email"
          placeholder={t.forgotEmailPlaceholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={fieldErrors.email}
          autoComplete="email"
          dir="ltr"
          required
        />

        <AuthButton
          type="submit"
          loading={loading}
          loadingText={t.forgotSending}
          className="w-full"
          size="lg"
        >
          {t.forgotSubmit}
        </AuthButton>
      </form>

      <div className="mt-6 text-center">
        <a
          href={`/${lang}/login`}
          className="text-sm text-on-surface-variant hover:text-[#006c49] font-medium hover:underline transition-colors"
        >
          {t.forgotBackToLogin}
        </a>
      </div>
    </AuthShell>
  );
}
