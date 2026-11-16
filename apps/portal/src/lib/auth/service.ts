/**
 * Auth Service Boundary (Portal-side)
 * 
 * Reads mock state from localStorage shared with the landing app.
 * When the real backend is connected, replace these with API calls.
 */

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
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export const authService = {
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
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  },
};
