import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';
import { defaultLanguage } from '@/shared/constants';
import ru from './messages/ru.json';
import en from './messages/en.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: defaultLanguage,
    resources: {
      ru: {
        translation: ru,
      },
      en: {
        translation: en,
      },
    },
  });

export default i18n;
