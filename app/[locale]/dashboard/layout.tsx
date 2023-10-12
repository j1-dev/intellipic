import Navbar from '@/components/Navbar';

export const metadata = {
  title: 'IntelliPic',
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
    'AI',
    'IA'
  ],
  authors: [{ name: 'Juan García' }, { name: 'David Sedeño' }],
  colorScheme: 'dark',
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
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      <div className="pt-20">{children}</div>
    </div>
  );
}
