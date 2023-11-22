import { MetadataRoute } from 'next';

import image1 from '../public/icons/maskable_icon_x48.png';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'IntelliPic',
    short_name: 'IntelliPic',
    theme_color: '#000000',
    background_color: '#000000',
    description:
      'Intellipic es una aplicación de Inteligencia Artificial (IA) Generativa capaz de crear imágenes de la nada con cualquier concepto que tu le quieras enseñar',
    start_url: '/',
    display: 'standalone',
    icons: [
      {
        src: 'https://fuyhpknpcwdkcyntvzvk.supabase.co/storage/v1/object/public/icons/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
        purpose: 'any'
      },
      {
        src: 'https://fuyhpknpcwdkcyntvzvk.supabase.co/storage/v1/object/public/icons/maskable_icon_x48.png',
        sizes: '48x48',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: 'https://fuyhpknpcwdkcyntvzvk.supabase.co/storage/v1/object/public/icons/maskable_icon_x72.png',
        sizes: '72x72',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: 'https://fuyhpknpcwdkcyntvzvk.supabase.co/storage/v1/object/public/icons/maskable_icon_x96.png',
        sizes: '96x96',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: 'https://fuyhpknpcwdkcyntvzvk.supabase.co/storage/v1/object/public/icons/maskable_icon_x128.png',
        sizes: '128x128',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: 'https://fuyhpknpcwdkcyntvzvk.supabase.co/storage/v1/object/public/icons/maskable_icon_x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: 'https://fuyhpknpcwdkcyntvzvk.supabase.co/storage/v1/object/public/icons/maskable_icon_x384.png',
        sizes: '384x384',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: 'https://fuyhpknpcwdkcyntvzvk.supabase.co/storage/v1/object/public/icons/maskable_icon_x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: 'https://fuyhpknpcwdkcyntvzvk.supabase.co/storage/v1/object/public/icons/maskable-icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      }
    ]
  };
}
