'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { getAnalyticsInstance, logPageView } from '@/lib/analytics';

export default function FirebaseAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isMounted = useRef(false);

  useEffect(() => {
    getAnalyticsInstance();
    isMounted.current = true;
  }, []);

  useEffect(() => {
    if (!isMounted.current) return;
    const url =
      pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
    logPageView(url);
  }, [pathname, searchParams]);

  return null;
}
