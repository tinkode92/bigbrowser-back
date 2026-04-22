import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'fr'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  pathnames: {
    '/': '/',
    '/privacy-policy': {
      en: '/privacy-policy',
      fr: '/politique-de-confidentialite',
    },
    '/refund-policy': {
      en: '/refund-policy',
      fr: '/politique-de-remboursement',
    },
    '/terms-and-conditions': {
      en: '/terms-and-conditions',
      fr: '/conditions-generales',
    },
    '/thankyou': {
      en: '/thankyou',
      fr: '/merci',
    },
  },
});
