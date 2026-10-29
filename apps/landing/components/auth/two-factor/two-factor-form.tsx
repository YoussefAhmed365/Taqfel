'use client';

import { useState, useCallback, useRef, type KeyboardEvent, type ClipboardEvent } from 'react';
import { useAuthLanguage } from '../auth-language-context';
import { AuthShell, AuthHeading } from '../auth-shell';
import { AuthButton } from '../../ui/auth-button';
import { AuthAlert } from '../../ui/auth-alert';
import { authService } from '../../../lib/auth/service';

export function TwoFactorForm() {
  const { t, lang } = useAuthLanguage();

  const [digits, setDigits] = useState<string[]>(Array(6).fill(''));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const code = digits.join('');

  const setDigit = useCallback((index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    setDigits((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
    setError(null);
    // Auto-advance
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  }, []);

  const handleKeyDown = useCallback(
    (index: number, e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace' && !digits[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    },
    [digits]
  );

  const handlePaste = useCallback((e: ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;
    const newDigits = Array(6).fill('');
    for (let i = 0; i < pasted.length; i++) {
      newDigits[i] = pasted[i];
    }
    setDigits(newDigits);
    setError(null);
    // Focus the next empty or last input
    const focusIndex = Math.min(pasted.length, 5);
    inputRefs.current[focusIndex]?.focus();
  }, []);

  const handleSubmit = useCallback(async () => {
    if (code.length !== 6) return;
    setLoading(true);
    setError(null);

    try {
      const response = await authService.verifyTwoFactor(code);
      if (response.success) {
        window.location.href = `${process.env.NEXT_PUBLIC_PORTAL_URL || 'http://localhost:5174'}?lang=${lang}`;
      } else {
        setError(t.twoFactorInvalidCode);
        setDigits(Array(6).fill(''));
        inputRefs.current[0]?.focus();
      }
    } catch {
      setError(t.loginUnexpectedError);
    } finally {
      setLoading(false);
    }
  }, [code, t, lang]);

  const handleResend = useCallback(async () => {
    // Mock: just clear state
    setDigits(Array(6).fill(''));
    setError(null);
    inputRefs.current[0]?.focus();
  }, []);

  return (
    <AuthShell width="narrow">
      {/* Security shield icon */}
      <div className="text-center mb-6">
        <div className="mx-auto w-14 h-14 rounded-full bg-[#e6f7ef] flex items-center justify-center mb-4">
          <svg className="w-7 h-7 text-[#006c49]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <AuthHeading title={t.twoFactorTitle} subtitle={t.twoFactorSubtitle} />
      </div>

      {error && (
        <div className="mb-5">
          <AuthAlert variant="error" onDismiss={() => setError(null)}>
            {error}
          </AuthAlert>
        </div>
      )}

      {/* OTP input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-[#131b2e] mb-3 text-center">
          {t.twoFactorCode}
        </label>
        <div
          className="flex justify-center gap-2 sm:gap-3"
          dir="ltr"
          onPaste={handlePaste}
        >
          {digits.map((digit, i) => (
            <input
              key={i}
              ref={(el) => { inputRefs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => setDigit(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className="w-11 h-13 sm:w-12 sm:h-14 text-center text-lg font-bold text-[#131b2e] bg-white border border-outline-variant rounded-xl transition-all duration-200 outline-none focus:ring-2 focus:ring-[#006c49]/20 focus:border-[#006c49] hover:border-outline"
              aria-label={`Digit ${i + 1}`}
              autoComplete={i === 0 ? 'one-time-code' : 'off'}
            />
          ))}
        </div>

        {/* Quick Demo OTP Helper */}
        <div className="pt-3 text-center">
          <button
            type="button"
            onClick={() => {
              setDigits(['1', '2', '3', '4', '5', '6']);
              setError(null);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#e6f7ef] text-[#006c49] text-xs font-semibold hover:bg-[#d0f0e2] transition-colors border border-[#006c49]/20 cursor-pointer"
          >
            <span>💡</span>
            <span>{lang === 'ar' ? 'رمز تجريبي سريع: 123456' : 'Demo OTP: 123456'}</span>
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <AuthButton
          onClick={handleSubmit}
          loading={loading}
          loadingText={t.twoFactorVerifying}
          className="w-full"
          size="lg"
          disabled={code.length !== 6}
        >
          {t.twoFactorVerify}
        </AuthButton>

        <div className="flex items-center justify-center gap-4 text-sm">
          <button
            type="button"
            onClick={handleResend}
            className="text-on-surface-variant hover:text-[#006c49] font-medium hover:underline transition-colors"
          >
            {t.twoFactorResend}
          </button>
          <span className="text-outline-variant">·</span>
          <button
            type="button"
            className="text-on-surface-variant hover:text-[#006c49] font-medium hover:underline transition-colors"
          >
            {t.twoFactorAlternative}
          </button>
        </div>
      </div>
    </AuthShell>
  );
}
