import './globals.css';
import SupabaseProvider from './supabase-provider';
import { Toaster } from 'react-hot-toast';
import localFont from 'next/font/local';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import Footer from '@/components/Footer';
import Script from 'next/script';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'de' }];
}

export const metadata = {
  title: 'IntelliPic',
  description: 'IntelliPic app to make custom AI Portrait models'
};

const font = localFont({
  // src: './core/fonts/SFProDisplay-Regular.ttf',
  src: [
    {
      path: '../core/fonts/SFProDisplay-Regular.ttf',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../core/fonts/SFProDisplay-Medium.ttf',
      weight: '500',
      style: 'normal'
    },
    {
      path: '../core/fonts/SFProDisplay-Semibold.ttf',
      weight: '600',
      style: 'normal'
    },
    {
      path: '../core/fonts/SFProDisplay-Bold.ttf',
      weight: '700',
      style: 'normal'
    },
    {
      path: '../core/fonts/SFProDisplay-Heavy.ttf',
      weight: '800',
      style: 'normal'
    },
    {
      path: '../core/fonts/SFProDisplay-Black.ttf',
      weight: '900',
      style: 'normal'
    }
  ],
  display: 'swap',
  variable: '--font-sans'
});

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: any };
}) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
  return (
    <html lang={locale} className={font.className}>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-V08S01HJ70"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-V08S01HJ70', {
            page_path: window.location.pathname,
          });
        `
        }}
      />
      <body className="flex flex-col min-h-screen">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SupabaseProvider>
            <Toaster position="bottom-right" reverseOrder={false} />
            <main className="flex-grow">{children}</main>
            <Footer />
          </SupabaseProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
