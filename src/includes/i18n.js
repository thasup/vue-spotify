import { createI18n } from 'vue-i18n';
import en from '@/locales/en.json';
import th from '@/locales/th.json';

export default createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    th,
  },
  numberFormats: {
    en: {
      currency: {
        style: 'currency',
        currency: 'USD',
      },
    },
    th: {
      currency: {
        style: 'currency',
        currency: 'THB',
      },
    },
  },
});
