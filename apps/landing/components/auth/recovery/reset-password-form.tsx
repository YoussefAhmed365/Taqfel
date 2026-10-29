'use client';

import { useState, useCallback, type FormEvent } from 'react';
import { useAuthLanguage } from '../auth-language-context';
import { AuthShell, AuthHeading } from '../auth-shell';
import { PasswordInput } from '../../ui/password-input';
import { AuthButton } from '../../ui/auth-button';
import { AuthAlert } from '../../ui/auth-alert';
import { validateResetPasswordForm, checkPasswordStrength } from '../../../lib/auth/validation';
import { authService } from '../../../lib/auth/service';

type ResetState = 'form' | 'loading' | 'success' | 'expired' | 'invalid';

interface ResetPasswordFormProps {
  token: string;
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const { t, lang } = useAuthLanguage();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [state, setState] = useState<ResetState>('form');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const strength = checkPasswordStrength(password, lang);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setFieldErrors({});

      const result = validateResetPasswordForm({ password, confirmPassword }, lang);
      if (!result.valid) {
        const errors: Record<string, string> = {};
        result.errors.forEach((err) => (errors[err.field] = err.message));
        setFieldErrors(errors);
        return;
      }

      setState('loading');
      try {
        const response = await authService.resetPassword(token, password);
        if (response.success) {
          setState('success');
        } else if (response.errorCode === 'TOKEN_EXPIRED') {
          setState('expired');
        } else {
          setState('invalid');
        }
      } catch {
        setState('invalid');
      }
    },
    [password, confirmPassword, lang, token]
  );

  // --- SUCCESS ---
  if (state === 'success') {
    return (
      <AuthShell width="narrow">
        <div className="text-center space-y-5">
          <div className="mx-auto w-16 h-16 rounded-full bg-[#e6f7ef] flex items-center justify-center">
            <svg className="w-8 h-8 text-[#006c49]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <AuthHeading title={t.resetSuccessTitle} subtitle={t.resetSuccessSubtitle} />
          <AuthButton
            onClick={() => window.location.href = `/${lang}/login`}
            className="w-full"
            size="lg"
          >
            {t.resetSuccessLogin}
          </AuthButton>
        </div>
      </AuthShell>
    );
  }

  // --- EXPIRED ---
  if (state === 'expired') {
    return (
      <AuthShell width="narrow">
        <div className="text-center space-y-5">
          <div className="mx-auto w-16 h-16 rounded-full bg-error-container/30 flex items-center justify-center">
            <svg className="w-8 h-8 text-error" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <AuthHeading title={t.resetExpiredTitle} subtitle={t.resetExpiredSubtitle} />
          <AuthButton
            onClick={() => window.location.href = `/${lang}/forgot-password`}
            className="w-full"
            size="lg"
          >
            {t.resetExpiredAction}
          </AuthButton>
        </div>
      </AuthShell>
    );
  }

  // --- INVALID ---
  if (state === 'invalid') {
    return (
      <AuthShell width="narrow">
        <div className="text-center space-y-5">
          <div className="mx-auto w-16 h-16 rounded-full bg-error-container/30 flex items-center justify-center">
            <svg className="w-8 h-8 text-error" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <AuthHeading title={t.resetInvalidTitle} subtitle={t.resetInvalidSubtitle} />
          <AuthButton
            onClick={() => window.location.href = `/${lang}/forgot-password`}
            className="w-full"
            size="lg"
          >
            {t.resetInvalidAction}
          </AuthButton>
        </div>
      </AuthShell>
    );
  }

  // --- FORM ---
  return (
    <AuthShell width="narrow">
      <AuthHeading title={t.resetTitle} subtitle={t.resetSubtitle} />

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <PasswordInput
          label={t.resetNewPassword}
          placeholder={t.resetNewPasswordPlaceholder}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={fieldErrors.password}
          autoComplete="new-password"
          dir="ltr"
          showStrength
          strengthScore={strength.score}
          strengthLabel={strength.label}
          strengthChecks={strength.checks}
          required
        />

        <PasswordInput
          label={t.resetConfirmPassword}
          placeholder={t.resetConfirmPlaceholder}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={fieldErrors.confirmPassword}
          autoComplete="new-password"
          dir="ltr"
          required
        />

        <AuthButton
          type="submit"
          loading={state === 'loading'}
          loadingText={t.resetSubmitting}
          className="w-full"
          size="lg"
        >
          {t.resetSubmit}
        </AuthButton>
      </form>
    </AuthShell>
  );
}
