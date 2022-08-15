import { jpJSON } from '@/i18n/translations/jp';
import { koJSON } from '@/i18n/translations/ko';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import { enJSON } from './translations/en';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ko: { translation: koJSON },
      en: { translation: enJSON },
      jp: { translation: jpJSON },
    },
    keySeparator: false,
    lng: 'ko',
    fallbackLng: 'ko',
    react: {
      useSuspense: true,
    },
    interpolation: {
      escapeValue: false,
    },
  });

export { i18n };
