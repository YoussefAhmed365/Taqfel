import { createContext } from 'react';

export type Lang = 'ar' | 'en';
export type Dir = 'rtl' | 'ltr';

export interface LanguageContextType {
  lang: Lang;
  dir: Dir;
  toggleLang: () => void;
  setLang: (lang: Lang) => void;
}

export const LanguageContext = createContext<LanguageContextType | null>(null);