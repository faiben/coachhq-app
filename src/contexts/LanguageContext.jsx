import { createContext, useContext, useState, useEffect } from 'react';
import i18n from '../config/i18n';

const LanguageContext = createContext(null);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

const RTL_LANGUAGES = ['ar'];

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('coachhq-lang') || 'fr';
  });

  const isRTL = RTL_LANGUAGES.includes(language);

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    localStorage.setItem('coachhq-lang', language);
    i18n.changeLanguage(language);
  }, [language, isRTL]);

  function setLanguage(lang) {
    setLanguageState(lang);
  }

  const value = {
    language,
    setLanguage,
    isRTL,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}
