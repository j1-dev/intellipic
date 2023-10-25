import './globals.css';
import dynamic from 'next/dynamic';
import localFont from 'next/font/local';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { Metadata, ResolvingMetadata } from 'next/types';
import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from '../core/utils/ThemeContext';
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
      }
    };
  }
}

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
    // {
    //   path: '../core/fonts/SFProDisplay-Semibold.ttf',
    //   weight: '600',
    //   style: 'normal'
    // },
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
      <body className="flex flex-col min-h-screen">
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
          <GoogleAnalytics ga_id={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        ) : null}
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SupabaseProvider>
            <ThemeProvider>
              <Toaster position="bottom-right" reverseOrder={false} />
              <main className="flex-grow">{children}</main>
              <Footer />
            </ThemeProvider>
          </SupabaseProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
