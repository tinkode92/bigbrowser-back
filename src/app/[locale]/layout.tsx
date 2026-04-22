import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import localFont from 'next/font/local';
import { Suspense } from 'react';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import '../globals.css';
import Providers from '@/components/shared/Providers';
import FirebaseAnalytics from '@/components/shared/FirebaseAnalytics';
import FloatingWhatsApp from '@/components/shared/FloatingWhatsApp';
import MetaPixel from '@/components/shared/MetaPixel';
import CalEmbed from '@/components/shared/CalEmbed';

const boink = localFont({
  src: '../../../public/fonts/Boink.otf',
  variable: '--font-boink',
});

const oxva = localFont({
  src: '../../../public/fonts/Oxva.otf',
  variable: '--font-oxva',
});

const neueMontreal = localFont({
  src: [
    {
      path: '../../../public/fonts/neue-montreal/NeueMontreal-Light.otf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/neue-montreal/NeueMontreal-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/neue-montreal/NeueMontreal-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/neue-montreal/NeueMontreal-Bold.otf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-neue-montreal',
});

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = messages.metadata;

  return {
    metadataBase: new URL('https://www.bigbrowser.co'),
    title: t.title,
    description: t.description,
    openGraph: {
      type: 'website',
      title: t.title,
      description: t.description,
      images: [
        {
          url: '/images/preview-image.png',
          width: 1200,
          height: 630,
          alt: t.ogAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.title,
      description: t.description,
      images: ['/images/preview-image.png'],
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth">
      <body
        className={`${boink.variable} ${oxva.variable} ${roboto.variable} ${neueMontreal.variable} font-boink antialiased`}
      >
        <MetaPixel />
        <CalEmbed />
        <Suspense fallback={null}>
          <FirebaseAnalytics />
        </Suspense>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            {children}
            <FloatingWhatsApp />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
