import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import ar from '../locales/ar/translation.json';
import fr from '../locales/fr/translation.json';
import en from '../locales/en/translation.json';

const resources = {
  ar: { translation: ar },
  fr: { translation: fr },
  en: { translation: en },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('coachhq-lang') || 'fr',
  fallbackLng: 'fr',
  debug: false,

  interpolation: {
    escapeValue: false,
  },

  react: {
    useSuspense: false,
  },
});

export default i18n;
