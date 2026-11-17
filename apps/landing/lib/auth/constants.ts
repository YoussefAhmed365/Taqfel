export const AUTH_BRAND = {
    name: 'Taqfel HR',
    subtitle: 'Enterprise',
    domain: 'Taqfelhr.eg',
};

export const AUTH_STEPS = [
    { id: 'company', number: '01', labelAr: 'الشركة', labelEn: 'Company' },
    { id: 'account', number: '02', labelAr: 'الحساب', labelEn: 'Account' },
    { id: 'verify', number: '03', labelAr: 'التحقق', labelEn: 'Verify' },
    { id: 'setup', number: '04', labelAr: 'الإعداد', labelEn: 'Setup' },
    { id: 'ready', number: '05', labelAr: 'جاهز', labelEn: 'Ready' },
] as const;

export const PASSWORD_RULES = {
    minLength: 8,
    maxLength: 128,
    requireUppercase: true,
    requireLowercase: true,
    requireNumber: true,
    requireSpecial: true,
};

export const VALIDATION_PATTERNS = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^(\+?\d{1,4}[\s-]?)?\(?\d{1,4}\)?[\s-]?\d{1,4}[\s-]?\d{1,9}$/,
    companyName: /^[\u0600-\u06FFa-zA-Z0-9\s\-_.&,()]{2,100}$/,
};

export const RESEND_COOLDOWN_SECONDS = 60;
export const MAX_RESEND_ATTEMPTS = 5;
export const VERIFICATION_TOKEN_EXPIRY_MINUTES = 30;