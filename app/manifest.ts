import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Intellipic',
    short_name: 'Intellipic',
    description:
      'Intellipic es una aplicación de Inteligencia Artificial (IA) Generativa capaz de crear imágenes de la nada con cualquier concepto que tu le quieras enseñar',
    start_url: '/',
    display: 'standalone',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon'
      }
    ]
  };
}
