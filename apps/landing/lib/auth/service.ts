/**
 * Auth Service Boundary
 * 
 * This module provides the service interface for all authentication operations.
 * Currently uses mock implementations that simulate network latency.
 * Replace with real API calls when the backend is connected.
 */

export interface SignupPayload {
  companyName: string;
  fullName: string;
  email: string;
  phone: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  error?: string;
  errorCode?: AuthErrorCode;
  data?: Record<string, unknown>;
}

export type AuthErrorCode =
  | 'INVALID_CREDENTIALS'
  | 'EMAIL_NOT_VERIFIED'
  | 'ACCOUNT_LOCKED'
  | 'RATE_LIMITED'
  | 'EMAIL_EXISTS'
  | 'INVALID_TOKEN'
  | 'TOKEN_EXPIRED'
  | 'WEAK_PASSWORD'
  | 'UNKNOWN_ERROR';

// Simulate network delay
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export interface RegisteredCompany {
  companyName: string;
  fullName: string;
  email: string;
  phone: string;
  verified: boolean;
  structure?: 'single' | 'branches';
  branches?: string[];
  teamMethod?: 'manual' | 'excel' | 'skipped';
}

const STORAGE_KEY = 'Taqfel_auth_mock_state';

function getStoredState(): RegisteredCompany | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveStoredState(data: Partial<RegisteredCompany>) {
  if (typeof window === 'undefined') return;
  try {
    const current = getStoredState() || {
      companyName: 'شركة تقفيل المحدودة',
      fullName: 'أحمد محمود',
      email: 'admin@company.com',
      phone: '+20 100 123 4567',
      verified: false,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...current, ...data }));
  } catch {}
}

export const authService = {
  /**
   * Register a new company and admin account.
   */
  async signup(payload: SignupPayload): Promise<AuthResponse> {
    await delay(1000);
    // Store in mock storage for client MVP persistence
    saveStoredState({
      companyName: payload.companyName,
      fullName: payload.fullName,
      email: payload.email,
      phone: payload.phone,
      verified: false,
    });

    return {
      success: true,
      message: 'Account created successfully',
      data: {
        companyId: 'mock-company-' + Date.now(),
        userId: 'mock-user-' + Date.now(),
        email: payload.email,
      },
    };
  },

  /**
   * Authenticate an existing user.
   */
  async login(payload: LoginPayload): Promise<AuthResponse> {
    await delay(800);
    const existing = getStoredState();
    saveStoredState({
      email: payload.email || existing?.email || 'admin@company.com',
    });

    return {
      success: true,
      message: 'Login successful',
      data: {
        userId: 'mock-user-123',
        role: 'company_admin',
        requiresTwoFactor: true,
      },
    };
  },

  /**
   * Verify the user's email address using a token.
   */
  async verifyEmail(token: string): Promise<AuthResponse> {
    await delay(800);
    if (token === 'expired') {
      return { success: false, errorCode: 'TOKEN_EXPIRED', error: 'Token expired' };
    }
    if (token === 'invalid') {
      return { success: false, errorCode: 'INVALID_TOKEN', error: 'Invalid token' };
    }
    // Mark as verified in mock storage
    saveStoredState({ verified: true });
    return { success: true, message: 'Email verified' };
  },

  /**
   * Resend verification email.
   */
  async resendVerification(email: string): Promise<AuthResponse> {
    void email;
    await delay(600);
    return { success: true, message: 'Verification email sent' };
  },

  /**
   * Request a password reset link.
   */
  async requestPasswordReset(email: string): Promise<AuthResponse> {
    void email;
    await delay(800);
    return { success: true, message: 'If an account exists, a reset link has been sent' };
  },

  /**
   * Reset the password using a token.
   */
  async resetPassword(token: string, newPassword: string): Promise<AuthResponse> {
    void newPassword;
    await delay(800);
    if (token === 'expired') {
      return { success: false, errorCode: 'TOKEN_EXPIRED', error: 'Token expired' };
    }
    if (token === 'invalid') {
      return { success: false, errorCode: 'INVALID_TOKEN', error: 'Invalid token' };
    }
    return { success: true, message: 'Password reset successfully' };
  },

  /**
   * Verify a two-factor authentication code.
   */
  async verifyTwoFactor(code: string): Promise<AuthResponse> {
    await delay(600);
    if (code.length !== 6 || !/^\d{6}$/.test(code)) {
      return { success: false, error: 'Invalid code format' };
    }
    return { success: true, message: 'Two-factor verified' };
  },

  /**
   * Save onboarding choices (company structure, etc.).
   */
  async saveOnboarding(data: {
    structure: 'single' | 'branches';
    branches?: string[];
    teamMethod?: 'manual' | 'excel' | 'skipped';
  }): Promise<AuthResponse> {
    await delay(600);
    saveStoredState({
      structure: data.structure,
      branches: data.branches,
      teamMethod: data.teamMethod,
    });
    return { success: true, message: 'Onboarding complete' };
  },

  /**
   * Get the current mock registered company for MVP display.
   */
  getRegisteredCompany(): RegisteredCompany {
    const stored = getStoredState();
    if (stored) return stored;
    return {
      companyName: 'شركة النور للحلول البرمجية ش.م.م',
      fullName: 'أحمد محمود العوضي',
      email: 'admin@alnoor-tech.com',
      phone: '+20 100 234 5678',
      verified: true,
      structure: 'branches',
      branches: ['المقر الرئيسي - القاهرة', 'فرع الإسكندرية', 'فرع الجيزة'],
      teamMethod: 'excel',
    };
  },

  /**
   * Reset/Logout demo session.
   */
  logout() {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {}
    }
  }
};
