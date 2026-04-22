'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    Cal: {
      (...args: unknown[]): void;
      loaded?: boolean;
      ns: Record<string, (...args: unknown[]) => void>;
      q: unknown[];
    };
  }
}

const CalEmbed = () => {
  useEffect(() => {
    (function (C: typeof window, A: string, L: string) {
      const p = (a: { q: unknown[] }, ar: unknown) => {
        a.q.push(ar);
      };
      const d = C.document;
      C.Cal =
        C.Cal ||
        (function (...ar: unknown[]) {
          const cal = C.Cal;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement('script')).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api = (...args: unknown[]) => {
              p(api as unknown as { q: unknown[] }, args);
            };
            (api as unknown as { q: unknown[] }).q = [];
            const namespace = ar[1] as string;
            if (typeof namespace === 'string') {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace] as unknown as { q: unknown[] }, ar);
              p(cal as unknown as { q: unknown[] }, [
                'initNamespace',
                namespace,
              ]);
            } else {
              p(cal as unknown as { q: unknown[] }, ar);
            }
            return;
          }
          p(cal as unknown as { q: unknown[] }, ar);
        } as typeof window.Cal);
    })(window, 'https://app.cal.com/embed/embed.js', 'init');

    window.Cal('init', 'call-with-bigbrowser', {
      origin: 'https://app.cal.com',
    });

    window.Cal.ns['call-with-bigbrowser']('ui', {
      hideEventTypeDetails: false,
      layout: 'month_view',
    });

    window.Cal.ns['call-with-bigbrowser']('on', {
      action: 'bookingSuccessful',
      callback: () => {
        if (typeof window.fbq === 'function') {
          window.fbq('track', 'Schedule');
        }
      },
    });
  }, []);

  return null;
};

export default CalEmbed;
