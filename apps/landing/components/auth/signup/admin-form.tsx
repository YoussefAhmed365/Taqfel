'use client';

import { useState, useCallback, type FormEvent } from 'react';
import { useAuthLanguage } from '../auth-language-context';
import { PasswordInput } from '../../ui/password-input';
import { AuthButton } from '../../ui/auth-button';
import { AuthAlert } from '../../ui/auth-alert';
import {
  validateAccountForm,
  checkPasswordStrength,
  type AccountFormData,
} from '../../../lib/auth/validation';

interface AdminFormProps {
  email: string;
  onSubmit: (data: AccountFormData) => Promise<void>;
  onBack: () => void;
}

export function AdminForm({ email, onSubmit, onBack }: AdminFormProps) {
  const { t, lang, dir } = useAuthLanguage();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const strength = checkPasswordStrength(password, lang);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setFieldErrors({});
      setSubmitError(null);

      const data: AccountFormData = { password, confirmPassword };
      const result = validateAccountForm(data, lang);

      if (!result.valid) {
        const errors: Record<string, string> = {};
        result.errors.forEach((err) => (errors[err.field] = err.message));
        setFieldErrors(errors);
        return;
      }

      setSubmitting(true);
      try {
        await onSubmit(data);
      } catch {
        setSubmitError(t.loginUnexpectedError);
      } finally {
        setSubmitting(false);
      }
    },
    [password, confirmPassword, lang, onSubmit, t]
  );

  return (
    <div className="space-y-5">
      {/* Show selected email */}
      <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-[#dae2fd] text-sm">
        <svg className="w-4 h-4 text-[#006c49] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-[#131b2e] font-medium" dir="ltr">{email}</span>
      </div>

      {submitError && (
        <AuthAlert variant="error" onDismiss={() => setSubmitError(null)}>
          {submitError}
        </AuthAlert>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <PasswordInput
          label={t.signupPassword}
          placeholder={t.signupPasswordPlaceholder}
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
          label={t.signupConfirmPassword}
          placeholder={t.signupConfirmPasswordPlaceholder}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={fieldErrors.confirmPassword}
          autoComplete="new-password"
          dir="ltr"
          required
        />

        {/* Quick Demo Password Fill */}
        <div className="pt-1">
          <button
            type="button"
            onClick={() => {
              setPassword('Password123!');
              setConfirmPassword('Password123!');
              setFieldErrors({});
            }}
            className="w-full py-1.5 px-3 rounded-lg bg-[#e6f7ef] text-[#006c49] text-xs font-semibold hover:bg-[#d0f0e2] transition-colors border border-[#006c49]/20 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>💡</span>
            <span>{lang === 'ar' ? 'ملء كلمة مرور تجريبية متوافقة' : 'Fill Demo Compliant Password'}</span>
          </button>
        </div>

        <AuthButton
          type="submit"
          loading={submitting}
          loadingText={t.signupCreating}
          className="w-full"
          size="lg"
        >
          {t.signupCreateAccount}
        </AuthButton>
      </form>

      {/* Privacy note */}
      <div className="flex items-center justify-center gap-1.5 text-[11px] text-outline">
        <svg className="w-3 h-3 shrink-0" viewBox="0 0 16 16" fill="currentColor">
          <path d="M8 1a4 4 0 00-4 4v2H3a1 1 0 00-1 1v6a1 1 0 001 1h10a1 1 0 001-1V8a1 1 0 00-1-1h-1V5a4 4 0 00-4-4zm2.5 6h-5V5a2.5 2.5 0 015 0v2z" />
        </svg>
        <span>{t.signupPrivacyNote}</span>
      </div>

      {/* Back button */}
      <div className="text-center">
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-on-surface-variant hover:text-[#131b2e] font-medium hover:underline transition-colors"
        >
          {t.signupBack}
        </button>
      </div>
    </div>
  );
}
