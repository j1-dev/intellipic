import './globals.css';
import dynamic from 'next/dynamic';
import localFont from 'next/font/local';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { Metadata, ResolvingMetadata, Viewport } from 'next/types';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '../core/utils/ThemeContext';
import { Suspense } from 'react';
import Script from 'next/script';
import { Pixel } from '@/components/Pixel';
const SupabaseProvider = dynamic(() => import('./supabase-provider'));
const Footer = dynamic(() => import('@/components/Footer'));

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'es' }];
}

export async function generateMetadata(
  { params }: { params: { locale: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  if (params.locale === 'es') {
    return {
      metadataBase: new URL('https://intellipic.es'),
      title: 'IntelliPic, El Estudio de IA Fácil de Usar',
      description:
        'Intellipic es una aplicación de Inteligencia Artificial (IA) Generativa capaz de crear imágenes de la nada con cualquier concepto que tu le quieras enseñar',
      generator: 'IntelliPic',
      applicationName: 'IntelliPic',
      referrer: 'origin-when-cross-origin',
      keywords: [
        'IntelliPic',
        'Stable Diffusion',
        'SDXL',
        'Inteligencia Artificial',
        'IA'
      ],
      authors: [{ name: 'Juan García' }, { name: 'David Sedeño' }],
      formatDetection: {
        email: false,
        address: false,
        telephone: false
      },
      robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
          index: true,
          follow: true,
          noimageindex: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1
        }
      },
      openGraph: {
        type: 'website',
        title: 'IntelliPic',
        description:
          'Intellipic es una aplicación de Inteligencia Artificial (IA) Generativa capaz de crear imágenes de la nada con cualquier concepto que tu le quieras enseñar'
      },
      appleWebApp: {
        title: 'IntelliPic',
        statusBarStyle: 'black-translucent',
        startupImage: [
          'public/icons/maskable_icon_x192.png',
          {
            url: 'public/icons/maskable_icon_x192.png',
            media: '(device-width: 768px) and (device-height: 1024px)'
          }
        ]
      },
      icons: {
        icon: 'https://fuyhpknpcwdkcyntvzvk.supabase.co/storage/v1/object/public/icons/favicon.ico'
      }
    };
  } else {
    return {
      metadataBase: new URL('https://intellipic.es'),
      title: 'IntelliPic, The Easy to Use AI Studio',
      description:
        'Intellipic is a cutting-edge Generative Artificial Intelligence (AI) application capable of creating images from scratch based on any concept you wish to teach it.',
      generator: 'IntelliPic',
      applicationName: 'IntelliPic',
      referrer: 'origin-when-cross-origin',
      keywords: [
        'IntelliPic',
        'Stable Diffusion',
        'SDXL',
        'Inteligencia Artificial',
        'AI'
      ],
      authors: [{ name: 'Juan García' }, { name: 'David Sedeño' }],
      formatDetection: {
        email: false,
        address: false,
        telephone: false
      },
      robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
          index: true,
          follow: true,
          noimageindex: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1
        }
      },
      openGraph: {
        type: 'website',
        title: 'IntelliPic',
        description:
          'Intellipic is a cutting-edge Generative Artificial Intelligence (AI) application capable of creating images from scratch based on any concept you wish to teach it.'
      },
      appleWebApp: {
        title: 'IntelliPic',
        statusBarStyle: 'black-translucent',
        startupImage: [
          'public/icons/maskable_icon_x192.png',
          {
            url: 'public/icons/maskable_icon_x192.png',
            media: '(device-width: 768px) and (device-height: 1024px)'
          }
        ]
      },
      icons: {
        icon: 'https://fuyhpknpcwdkcyntvzvk.supabase.co/storage/v1/object/public/icons/favicon.ico'
      }
    };
  }
}

export const viewport: Viewport = {
  themeColor: '#000000'
};

const font = localFont({
  // src: './core/fonts/SFProDisplay-Regular.ttf',
  src: [
    {
      path: '../core/fonts/SFProDisplay-Regular.ttf',
      weight: '400',
      style: 'normal'
    },
    // {
    //   path: '../core/fonts/SFProDisplay-Medium.ttf',
    //   weight: '500',
    //   style: 'normal'
    // },
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
    }
    // {
    //   path: '../core/fonts/SFProDisplay-Black.ttf',
    //   weight: '900',
    //   style: 'normal'
    // }
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
      <head>
        <meta name="pwa-demo" content="pwa-demo" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="pwa-demo" />
        <meta name="description" content="pwa-demo" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#2B5797" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />
        <link
          href="https://fuyhpknpcwdkcyntvzvk.supabase.co/storage/v1/object/public/splashscreens/iphone5_splash.png"
          media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="https://fuyhpknpcwdkcyntvzvk.supabase.co/storage/v1/object/public/splashscreens/iphone6_splash.png"
          media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="https://fuyhpknpcwdkcyntvzvk.supabase.co/storage/v1/object/public/splashscreens/iphoneplus_splash.png"
          media="(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)"
          rel="apple-touch-startup-image"
        />
        <link
          href="https://fuyhpknpcwdkcyntvzvk.supabase.co/storage/v1/object/public/splashscreens/iphonex_splash.png"
          media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)"
          rel="apple-touch-startup-image"
        />
        <link
          href="https://fuyhpknpcwdkcyntvzvk.supabase.co/storage/v1/object/public/splashscreens/iphonexr_splash.png"
          media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="https://fuyhpknpcwdkcyntvzvk.supabase.co/storage/v1/object/public/splashscreens/iphonexsmax_splash.png"
          media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)"
          rel="apple-touch-startup-image"
        />
        <link
          href="https://fuyhpknpcwdkcyntvzvk.supabase.co/storage/v1/object/public/splashscreens/ipad_splash.png"
          media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="https://fuyhpknpcwdkcyntvzvk.supabase.co/storage/v1/object/public/splashscreens/ipadpro1_splash.png"
          media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="https://fuyhpknpcwdkcyntvzvk.supabase.co/storage/v1/object/public/splashscreens/ipadpro3_splash.png"
          media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <link
          href="https://fuyhpknpcwdkcyntvzvk.supabase.co/storage/v1/object/public/splashscreens/ipadpro2_splash.png"
          media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)"
          rel="apple-touch-startup-image"
        />
        <Script
          id="fb-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '739289764388996');
          fbq('track', 'PageView');
          `
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            className="none"
            src="https://www.facebook.com/tr?id=739289764388996&ev=PageView&noscript=1"
          />
        </noscript>
      </head>
      <body className="flex flex-col min-h-screen duration-75">
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
          <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        ) : null}
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
          timeZone="Europe/Madrid"
        >
          <SupabaseProvider>
            <ThemeProvider>
              <Toaster position="bottom-right" reverseOrder={false} />
              <main className="flex-grow">{children}</main>
              <Suspense fallback={null}>
                <Pixel />
              </Suspense>
              <Footer />
            </ThemeProvider>
          </SupabaseProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
