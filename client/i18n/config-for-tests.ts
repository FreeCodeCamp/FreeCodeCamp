import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// eslint-disable-next-line @typescript-eslint/no-floating-promises
i18n.use(initReactI18next).init({
  debug: true,
  defaultNS: 'translations',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  },
  lng: 'en',
  ns: ['translations'],
  resources: { en: { translations: {} } }
});

export default i18n;
