'use client';

import { useMemo, useSyncExternalStore } from 'react';

function getLocale(): string {
  if (typeof navigator === 'undefined') return 'en';
  return navigator.language || 'en';
}

function subscribeLocale(): () => void {
  return () => {};
}

function isFrenchLocale(locale: string): boolean {
  return locale.startsWith('fr');
}

export interface CurrencyFormatter {
  formatPrice: (amount: number) => string;

  formatAddonPrice: (amount: number) => string;

  symbol: string;
}

export function useCurrency(): CurrencyFormatter {
  const locale = useSyncExternalStore(subscribeLocale, getLocale, () => 'en');

  return useMemo(() => {
    const isFr = isFrenchLocale(locale);
    const currency = isFr ? 'EUR' : 'USD';
    const displayLocale = isFr ? 'fr-FR' : 'en-US';

    const formatter = new Intl.NumberFormat(displayLocale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

    const formatPrice = (amount: number): string => formatter.format(amount);

    const formatAddonPrice = (amount: number): string =>
      `+${formatter.format(amount)}`;

    const symbol = isFr ? '€' : '$';

    return { formatPrice, formatAddonPrice, symbol };
  }, [locale]);
}
