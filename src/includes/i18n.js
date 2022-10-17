import { createI18n } from 'vue-i18n';
import en from '@/locales/en.json';
import th from '@/locales/th.json';

export default createI18n({
  locale: 'th',
  fallbackLocale: 'en',
  messages: {
    en,
    th,
  },
});
