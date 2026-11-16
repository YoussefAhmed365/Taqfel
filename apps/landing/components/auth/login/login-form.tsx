'use client';

import { useState, useCallback, type FormEvent } from 'react';
import { useAuthLanguage } from '../auth-language-context';
import { AuthShell, AuthHeading } from '../auth-shell';
import { AuthInput } from '../../ui/auth-input';
import { PasswordInput } from '../../ui/password-input';
import { AuthButton } from '../../ui/auth-button';
import { AuthAlert } from '../../ui/auth-alert';
import { validateLoginForm } from '../../../lib/auth/validation';
import { authService, type AuthErrorCode } from '../../../lib/auth/service';
import { useRouter } from 'next/navigation';

type LoginState =
  | 'idle'
  | 'loading'
  | 'success'
  | 'error';

export function LoginForm() {
  const { t, lang } = useAuthLanguage();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginState, setLoginState] = useState<LoginState>('idle');
  const [errorCode, setErrorCode] = useState<AuthErrorCode | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const getErrorMessage = (code: AuthErrorCode | null): string => {
    switch (code) {
      case 'INVALID_CREDENTIALS':
        return t.loginInvalidCredentials;
      case 'ACCOUNT_LOCKED':
        return t.loginAccountLocked;
      case 'RATE_LIMITED':
        return t.loginRateLimited;
      case 'EMAIL_NOT_VERIFIED':
        return t.loginEmailNotVerified;
      default:
        return t.loginUnexpectedError;
    }
  };

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setFieldErrors({});
      setErrorCode(null);

      const result = validateLoginForm({ email, password }, lang);
      if (!result.valid) {
        const errors: Record<string, string> = {};
        result.errors.forEach((err) => (errors[err.field] = err.message));
        setFieldErrors(errors);
        return;
      }

      setLoginState('loading');

      try {
        const response = await authService.login({ email, password });
        if (response.success) {
          setLoginState('success');
          // In production: store interim session token and redirect to 2FA
          router.push(`/${lang}/two-factor`);
        } else {
          setLoginState('error');
          setErrorCode(response.errorCode || 'UNKNOWN_ERROR');
        }
      } catch {
        setLoginState('error');
        setErrorCode('UNKNOWN_ERROR');
      }
    },
    [email, password, lang, router]
  );

  return (
    <AuthShell width="narrow">
      <AuthHeading title={t.loginTitle} subtitle={t.loginSubtitle} />

      {/* Form-level error */}
      {loginState === 'error' && errorCode && (
        <div className="mb-5">
          <AuthAlert variant="error" onDismiss={() => { setLoginState('idle'); setErrorCode(null); }}>
            {getErrorMessage(errorCode)}
          </AuthAlert>
          {errorCode === 'EMAIL_NOT_VERIFIED' && (
            <button
              type="button"
              className="mt-2 text-xs text-[#006c49] hover:text-on-primary-fixed-variant font-medium hover:underline transition-colors"
            >
              {t.loginResendVerification}
            </button>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <AuthInput
          label={t.loginEmail}
          type="email"
          placeholder={t.loginEmailPlaceholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={fieldErrors.email}
          autoComplete="email"
          dir="ltr"
          required
        />

        <div className="space-y-1.5">
          <PasswordInput
            label={t.loginPassword}
            placeholder={t.loginPasswordPlaceholder}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={fieldErrors.password}
            autoComplete="current-password"
            dir="ltr"
            required
          />
          <div className="flex justify-end">
            <a
              href={`/${lang}/forgot-password`}
              className="text-xs text-[#006c49] hover:text-on-primary-fixed-variant font-medium hover:underline transition-colors"
            >
              {t.loginForgotPassword}
            </a>
          </div>
        </div>

        {/* Quick Demo Fill Helper */}
        <div className="pt-1">
          <button
            type="button"
            onClick={() => {
              setEmail('admin@company.com');
              setPassword('P@ssword123!');
              setFieldErrors({});
            }}
            className="w-full py-1.5 px-3 rounded-lg bg-[#e6f7ef] text-[#006c49] text-xs font-semibold hover:bg-[#d0f0e2] transition-colors border border-[#006c49]/20 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>💡</span>
            <span>{lang === 'ar' ? 'ملء بيانات حساب تجريبي جاهز (Demo Login)' : 'Fill Demo Account Credentials'}</span>
          </button>
        </div>

        <AuthButton
          type="submit"
          loading={loginState === 'loading'}
          loadingText={t.loginLoading}
          className="w-full"
          size="lg"
        >
          {t.loginSubmit}
        </AuthButton>
      </form>

      {/* Create company link */}
      <div className="mt-6 pt-5 border-t border-outline-variant/30 text-center">
        <p className="text-sm text-on-surface-variant">
          {t.loginNoAccount}{' '}
          <a
            href={`/${lang}/signup`}
            className="font-semibold text-[#006c49] hover:text-on-primary-fixed-variant hover:underline transition-colors"
          >
            {t.loginCreateCompany}
          </a>
        </p>
      </div>
    </AuthShell>
  );
}
