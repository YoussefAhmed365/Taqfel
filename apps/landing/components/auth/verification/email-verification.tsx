'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { useAuthLanguage } from '../auth-language-context';
import { AuthShell, AuthHeading } from '../auth-shell';
import { AuthButton } from '../../ui/auth-button';
import { AuthAlert } from '../../ui/auth-alert';
import { authService } from '../../../lib/auth/service';
import { RESEND_COOLDOWN_SECONDS, MAX_RESEND_ATTEMPTS } from '../../../lib/auth/constants';
import { useRouter } from 'next/navigation';

type VerificationState = 'pending' | 'verified' | 'expired' | 'invalid';

interface EmailVerificationProps {
  email: string;
  /** If a token is present in URL, check it immediately */
  token?: string;
  onContinue?: () => void;
}

export function EmailVerification({ email, token, onContinue }: EmailVerificationProps) {
  const { t, lang } = useAuthLanguage();

  const [state, setState] = useState<VerificationState>(token ? 'pending' : 'pending');
  const [resendCount, setResendCount] = useState(0);
  const [cooldown, setCooldown] = useState(0);
  const [resendSuccess, setResendSuccess] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const router = useRouter();

  // Verify token on mount if present
  useEffect(() => {
    if (!token) return;
    (async () => {
      const result = await authService.verifyEmail(token);
      if (result.success) {
        setState('verified');
      } else if (result.errorCode === 'TOKEN_EXPIRED') {
        setState('expired');
      } else {
        setState('invalid');
      }
    })();
  }, [token]);

  // Cooldown timer
  useEffect(() => {
    if (cooldown <= 0) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      setCooldown((c) => {
        if (c <= 1) {
          const timer = timerRef.current;
          if (timer) clearInterval(timer);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [cooldown]);

  const handleResend = useCallback(async () => {
    if (cooldown > 0 || resendCount >= MAX_RESEND_ATTEMPTS) return;

    setResendSuccess(false);
    await authService.resendVerification(email);
    setResendCount((c) => c + 1);
    setCooldown(RESEND_COOLDOWN_SECONDS);
    setResendSuccess(true);
  }, [email, cooldown, resendCount]);

  const effectiveEmail = email || authService.getRegisteredCompany()?.email || 'admin@company.com';

  // --- VERIFIED STATE ---
  if (state === 'verified') {
    return (
      <AuthShell width="narrow">
        <div className="text-center space-y-4">
          {/* Success icon */}
          <div className="mx-auto w-16 h-16 rounded-full bg-[#e6f7ef] flex items-center justify-center">
            <svg className="w-8 h-8 text-[#006c49]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <AuthHeading title={t.verifySuccessTitle} subtitle={t.verifySuccessSubtitle} />
          <AuthButton onClick={onContinue} className="w-full" size="lg">
            {t.verifySuccessContinue}
          </AuthButton>

          {/* Quick Demo switcher */}
          <div className="pt-4 border-t border-outline-variant/30">
            <button
              type="button"
              onClick={() => setState('pending')}
              className="text-xs text-outline hover:text-[#006c49] transition-colors"
            >
              {lang === 'ar' ? '← العودة لحالة انتظار التأكيد' : '← Back to Pending State'}
            </button>
          </div>
        </div>
      </AuthShell>
    );
  }

  // --- EXPIRED STATE ---
  if (state === 'expired') {
    return (
      <AuthShell width="narrow">
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-error-container/30 flex items-center justify-center">
            <svg className="w-8 h-8 text-error" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <AuthHeading title={t.verifyExpiredTitle} subtitle={t.verifyExpiredSubtitle} />
          <AuthButton onClick={handleResend} className="w-full" size="lg">
            {t.verifyExpiredResend}
          </AuthButton>
          
          <div className="pt-2 flex items-center justify-center gap-3 text-xs">
            <button
              type="button"
              onClick={() => setState('verified')}
              className="text-[#006c49] font-medium hover:underline"
            >
              {lang === 'ar' ? 'تجربة التأكيد الناجح' : 'Test Successful Verification'}
            </button>
            <span className="text-outline-variant">·</span>
            <a
              href={`/${lang}/login`}
              className="text-on-surface-variant hover:text-[#006c49] font-medium hover:underline transition-colors"
            >
              {t.verifyBackToLogin}
            </a>
          </div>
        </div>
      </AuthShell>
    );
  }

  // --- INVALID STATE ---
  if (state === 'invalid') {
    return (
      <AuthShell width="narrow">
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-error-container/30 flex items-center justify-center">
            <svg className="w-8 h-8 text-error" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <AuthHeading title={t.verifyInvalidTitle} subtitle={t.verifyInvalidSubtitle} />
          <AuthButton onClick={handleResend} className="w-full" size="lg">
            {t.verifyInvalidResend}
          </AuthButton>
          
          <div className="pt-2 flex items-center justify-center gap-3 text-xs">
            <button
              type="button"
              onClick={() => setState('verified')}
              className="text-[#006c49] font-medium hover:underline"
            >
              {lang === 'ar' ? 'تجربة التأكيد الناجح' : 'Test Successful Verification'}
            </button>
            <span className="text-outline-variant">·</span>
            <a
              href={`/${lang}/login`}
              className="text-on-surface-variant hover:text-[#006c49] font-medium hover:underline transition-colors"
            >
              {t.verifyBackToLogin}
            </a>
          </div>
        </div>
      </AuthShell>
    );
  }

  // --- PENDING STATE ---
  return (
    <AuthShell width="narrow">
      <div className="text-center space-y-5">
        {/* Mail icon */}
        <div className="mx-auto w-16 h-16 rounded-full bg-[#e6f7ef] flex items-center justify-center">
          <svg className="w-8 h-8 text-[#006c49]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <AuthHeading title={t.verifyTitle} subtitle={t.verifySubtitle} />

        {/* Email display */}
        <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container-low border border-[#dae2fd] text-sm font-medium text-[#131b2e]">
          <span>{t.verifySentTo}:</span>
          <span dir="ltr" className="text-[#006c49]">{effectiveEmail}</span>
        </div>

        {/* Resend success */}
        {resendSuccess && (
          <AuthAlert variant="success">
            {t.verifyResendSuccess}
          </AuthAlert>
        )}

        {/* Rate limit */}
        {resendCount >= MAX_RESEND_ATTEMPTS && (
          <AuthAlert variant="warning">
            {t.verifyTooManyAttempts}
          </AuthAlert>
        )}

        {/* Actions */}
        <div className="space-y-3">
          <AuthButton
            onClick={handleResend}
            variant="secondary"
            className="w-full"
            disabled={cooldown > 0 || resendCount >= MAX_RESEND_ATTEMPTS}
          >
            {cooldown > 0 ? (
              <span>
                {t.verifyResendCooldown} {cooldown} {t.verifySeconds}
              </span>
            ) : (
              t.verifyResend
            )}
          </AuthButton>

          <div className="flex items-center justify-center gap-4 text-sm">
            <button
              type="button"
              onClick={() => {
                router.push(`/${lang}/signup`);
              }}
              className="text-on-surface-variant hover:text-[#006c49] font-medium hover:underline transition-colors"
            >
              {t.verifyChangeEmail}
            </button>
            <span className="text-outline-variant">·</span>
            <a
              href={`/${lang}/login`}
              className="text-on-surface-variant hover:text-[#006c49] font-medium hover:underline transition-colors"
            >
              {t.verifyBackToLogin}
            </a>
          </div>
        </div>

        {/* Interactive MVP Demo Panel for Client Presentation */}
        <div className="mt-6 pt-5 border-t border-outline-variant/30">
          <div className="p-3.5 rounded-xl bg-linear-to-br from-[#e6f7ef]/60 to-[#f4fce3]/40 border border-[#006c49]/20 text-start space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#006c49] flex items-center gap-1.5">
                <span>✨</span>
                <span>{lang === 'ar' ? 'عرض تجريبي للعميل (Client Demo)' : 'Client Demo Controls'}</span>
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#006c49] text-white">
                MVP Flow
              </span>
            </div>
            <p className="text-[11px] text-on-surface-variant leading-relaxed">
              {lang === 'ar'
                ? 'لمحاكاة فتح رابط التأكيد المرسل إلى البريد دون انتظار، اضغط على الزر أدناه:'
                : 'To simulate clicking the verification link received in the email, click below:'}
            </p>
            <button
              type="button"
              onClick={async () => {
                await authService.verifyEmail('valid');
                setState('verified');
              }}
              className="w-full py-2 px-3 rounded-lg bg-[#006c49] text-white text-xs font-bold hover:bg-on-primary-fixed-variant transition-colors shadow-xs flex items-center justify-center gap-2"
            >
              <span>{lang === 'ar' ? 'محاكاة تأكيد البريد الإلكتروني (متابعة التدفق)' : 'Simulate Email Verification (Proceed)'}</span>
              <span className="rtl:rotate-180">➔</span>
            </button>
            <div className="flex items-center justify-center gap-2 pt-1 text-[11px]">
              <button
                type="button"
                onClick={() => setState('expired')}
                className="text-outline hover:text-error hover:underline"
              >
                {lang === 'ar' ? 'تجربة رابط منتهي' : 'Test Expired Token'}
              </button>
              <span className="text-outline-variant">·</span>
              <button
                type="button"
                onClick={() => setState('invalid')}
                className="text-outline hover:text-error hover:underline"
              >
                {lang === 'ar' ? 'تجربة رابط غير صالح' : 'Test Invalid Token'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </AuthShell>
  );
}
