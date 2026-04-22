import {
  Analytics,
  getAnalytics,
  isSupported,
  logEvent as firebaseLogEvent,
} from 'firebase/analytics';
import app from './firebase';

let analyticsInstance: Analytics | null = null;

export async function getAnalyticsInstance(): Promise<Analytics | null> {
  if (analyticsInstance) return analyticsInstance;

  const supported = await isSupported();
  if (!supported) return null;

  analyticsInstance = getAnalytics(app);
  return analyticsInstance;
}

export async function logEvent(
  eventName: string,
  eventParams?: Record<string, unknown>,
): Promise<void> {
  const analytics = await getAnalyticsInstance();
  if (!analytics) return;

  firebaseLogEvent(analytics, eventName, eventParams);
}

export async function logPageView(url: string): Promise<void> {
  await logEvent('page_view', { page_path: url });
}
