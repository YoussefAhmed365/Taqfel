import { PASSWORD_RULES, VALIDATION_PATTERNS } from './constants';

export interface ValidationError {
    field: string;
    message: string;
}

export interface ValidationResult {
    valid: boolean;
    errors: ValidationError[];
}

// --- Company form ---
export interface CompanyFormData {
    companyName: string;
    email: string;
    phone: string;
    fullName: string;
}

export function validateCompanyForm(
    data: CompanyFormData,
    lang: 'ar' | 'en'
): ValidationResult {
    const errors: ValidationError[] = [];
    const t = lang === 'ar' ? arMessages : enMessages;

    if (!data.companyName.trim()) {
        errors.push({ field: 'companyName', message: t.required });
    } else if (!VALIDATION_PATTERNS.companyName.test(data.companyName)) {
        errors.push({ field: 'companyName', message: t.invalidCompanyName });
    }

    if (!data.fullName.trim()) {
        errors.push({ field: 'fullName', message: t.required });
    }

    if (!data.email.trim()) {
        errors.push({ field: 'email', message: t.required });
    } else if (!VALIDATION_PATTERNS.email.test(data.email)) {
        errors.push({ field: 'email', message: t.invalidEmail });
    }

    if (!data.phone.trim()) {
        errors.push({ field: 'phone', message: t.required });
    } else if (!VALIDATION_PATTERNS.phone.test(data.phone)) {
        errors.push({ field: 'phone', message: t.invalidPhone });
    }

    return { valid: errors.length === 0, errors };
}

// --- Account form ---
export interface AccountFormData {
    password: string;
    confirmPassword: string;
}

export interface PasswordStrength {
    score: number; // 0–4
    label: string;
    checks: { label: string; passed: boolean }[];
}

export function checkPasswordStrength(
    password: string,
    lang: 'ar' | 'en'
): PasswordStrength {
    const t = lang === 'ar' ? arMessages : enMessages;
    const checks = [
        {
            label: t.pwMinLength,
            passed: password.length >= PASSWORD_RULES.minLength,
        },
        { label: t.pwUppercase, passed: /[A-Z]/.test(password) },
        { label: t.pwLowercase, passed: /[a-z]/.test(password) },
        { label: t.pwNumber, passed: /\d/.test(password) },
        {
            label: t.pwSpecial,
            passed: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
        },
    ];
    const score = checks.filter((c) => c.passed).length;
    const labels = [t.pwVeryWeak, t.pwWeak, t.pwFair, t.pwGood, t.pwStrong];
    return { score, label: labels[Math.min(score, 4)] ?? '', checks };
}

export function validateAccountForm(
    data: AccountFormData,
    lang: 'ar' | 'en'
): ValidationResult {
    const errors: ValidationError[] = [];
    const t = lang === 'ar' ? arMessages : enMessages;
    const strength = checkPasswordStrength(data.password, lang);

    if (!data.password) {
        errors.push({ field: 'password', message: t.required });
    } else if (strength.score < 3) {
        errors.push({ field: 'password', message: t.weakPassword });
    }

    if (!data.confirmPassword) {
        errors.push({ field: 'confirmPassword', message: t.required });
    } else if (data.password !== data.confirmPassword) {
        errors.push({ field: 'confirmPassword', message: t.passwordMismatch });
    }

    return { valid: errors.length === 0, errors };
}

// --- Login form ---
export interface LoginFormData {
    email: string;
    password: string;
}

export function validateLoginForm(
    data: LoginFormData,
    lang: 'ar' | 'en'
): ValidationResult {
    const errors: ValidationError[] = [];
    const t = lang === 'ar' ? arMessages : enMessages;

    if (!data.email.trim()) {
        errors.push({ field: 'email', message: t.required });
    } else if (!VALIDATION_PATTERNS.email.test(data.email)) {
        errors.push({ field: 'email', message: t.invalidEmail });
    }

    if (!data.password) {
        errors.push({ field: 'password', message: t.required });
    }

    return { valid: errors.length === 0, errors };
}

// --- Forgot Password ---
export function validateEmailOnly(
    email: string,
    lang: 'ar' | 'en'
): ValidationResult {
    const errors: ValidationError[] = [];
    const t = lang === 'ar' ? arMessages : enMessages;

    if (!email.trim()) {
        errors.push({ field: 'email', message: t.required });
    } else if (!VALIDATION_PATTERNS.email.test(email)) {
        errors.push({ field: 'email', message: t.invalidEmail });
    }

    return { valid: errors.length === 0, errors };
}

// --- Reset Password ---
export interface ResetPasswordFormData {
    password: string;
    confirmPassword: string;
}

export function validateResetPasswordForm(
    data: ResetPasswordFormData,
    lang: 'ar' | 'en'
): ValidationResult {
    return validateAccountForm(data, lang);
}

// Validation messages
const arMessages = {
    required: 'هذا الحقل مطلوب',
    invalidEmail: 'البريد الإلكتروني غير صالح',
    invalidPhone: 'رقم الهاتف غير صالح',
    invalidCompanyName: 'اسم الشركة غير صالح',
    weakPassword: 'كلمة المرور ضعيفة جدًا',
    passwordMismatch: 'كلمتا المرور غير متطابقتين',
    pwMinLength: '٨ أحرف على الأقل',
    pwUppercase: 'حرف كبير واحد',
    pwLowercase: 'حرف صغير واحد',
    pwNumber: 'رقم واحد',
    pwSpecial: 'رمز خاص واحد',
    pwVeryWeak: 'ضعيفة جدًا',
    pwWeak: 'ضعيفة',
    pwFair: 'مقبولة',
    pwGood: 'جيدة',
    pwStrong: 'قوية',
};

const enMessages = {
    required: 'This field is required',
    invalidEmail: 'Invalid email address',
    invalidPhone: 'Invalid phone number',
    invalidCompanyName: 'Invalid company name',
    weakPassword: 'Password is too weak',
    passwordMismatch: 'Passwords do not match',
    pwMinLength: 'At least 8 characters',
    pwUppercase: 'One uppercase letter',
    pwLowercase: 'One lowercase letter',
    pwNumber: 'One number',
    pwSpecial: 'One special character',
    pwVeryWeak: 'Very weak',
    pwWeak: 'Weak',
    pwFair: 'Fair',
    pwGood: 'Good',
    pwStrong: 'Strong',
};