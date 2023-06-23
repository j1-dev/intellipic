import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

export default function Prompts() {
  function handleCopy(text: string) {
    return function (event: React.MouseEvent<HTMLAnchorElement>) {
      event.preventDefault(); // Prevent default navigation behavior

      navigator.clipboard.writeText(text).then(() => {
        toast.success('Copiado con éxito');
      });
    };
  }
  const promptCard1 = {
    img: 'https://photoshot.app/prompts/sacha/viking.png',
    text1: 'Instrucciones para crear un Avatar Vikingo',
    text2: 'Conviértete en un vikingo con nuestra guía de IA gratuita',
    text3:
      'Retrato en primer plano de @Yo como un vikingo, ultra realista, arte conceptual, detalles intrincados, poderoso y feroz, altamente detallado, hiperrealista, renderizado con Octane, 8K, motor Unreal. Arte de Artgerm, Greg Rutkowski, Charlie Bowater, Magali Villeneuve y Alphonse Mucha, con la hora dorada, cuernos y trenzas en el pelo, capa y casco forrados de piel, hacha en mano, mirando hacia la cámara'
  };

  const promptCard2 = {
    img: 'https://photoshot.app/prompts/sacha/superhero.png',
    text1: 'Instrucciones para crear un Superhéroe',
    text2: 'Desata tus poderes con nuestra guía de IA gratuita',
    text3:
      'Retrato en primer plano de @Yo como un superhéroe, increíblemente poderoso, con un traje de alta tecnología y colores vibrantes. Pose heroica, expresión determinada, rodeado de energía y efectos especiales. Arte inspirado en los cómics de Marvel y DC, con estilo de Jim Lee, Alex Ross y Todd McFarlane.'
  };
  const promptCard3 = {
    img: 'https://photoshot.app/prompts/sacha/astronaut.png',
    text1: 'Instrucciones para crear un Astronauta',
    text2: 'Conviértete en un astronauta con nuestra guía de IA gratuita',
    text3:
      ' Retrato detallado de cerca de @mi como astronauta, futurista, altamente detallado, ultra realista, arte conceptual, texturas intrincadas, fondo interestelar, viaje espacial, arte por Alphonse Mucha, Ryan Kittleson, Greg Rutkowski, Leesha Hannigan, Stephan Martiniere, Stanley Artgerm Lau.'
  };
  const promptCard4 = {
    img: 'https://photoshot.app/prompts/romy/wizard.png',
    text1: 'Instrucciones para crear un Mago',
    text2: 'Conviértete en Mago con nuestra sugerencia gratuita de IA.',
    text3:
      ' Retrato detallado de cerca de @mi como un mago, con un concepto de arte fantástico, con detalles e texturas intrincadas, mágico, colorido, arte por wlop, greg rutkowski, charlie bowater, magali villeneuve, alphonse mucha, surrealista, mirando hacia el horizonte, sosteniendo un bastón, con fuego y estrellas en el fondo.'
  };
  const promptCard5 = {
    img: 'https://photoshot.app/prompts/romy/hobbit.png',
    text1: 'Instrucciones para crear un Hobbit',
    text2: 'Conviértete en Hobbit con nuestra sugerencia gratuita de IA.',
    text3:
      ' Retrato detallado de cerca de @mi como un Hobbit, pequeño, con grandes ojos marrones, ropa verde y marrón, rasgos faciales detallados, pies pequeños, cabello ondulado, concepto de arte fantástico, tendencia en ArtStation, altamente detallado, arte de John Howe, Alan Lee y Weta Workshop, colores terrosos, mirando a la cámara.'
  };
  const promptCard6 = {
    img: 'https://photoshot.app/prompts/sacha/clown.png',
    text1: 'Instrucciones para crear un Payaso',
    text2: 'Conviértete en Payaso con nuestra sugerencia gratuita de IA.',
    text3:
      ' Retrato detallado de cerca de @mi como un payaso, altamente detallado, surrealista, rostro inexpresivo, colores brillantes, iluminación contrastante, fondo abstracto, arte de wlop, Greg Rutkowski, Charlie Bowater, Magali Villeneuve, Alphonse Mucha, estilo caricaturesco, inspirado en cómics.'
  };
  // const promptCard = {
  //   img: '',
  //   text1: '',
  //   text2: '',
  //   text3: '',
  // };

  return (
    <div>
      <div className="w-full items-center">
        <div
          className="Vikingo my-1"
          onClick={() => handleCopy(promptCard1.text3)}
        >
          <div className="float-right">
            <Image
              src={promptCard1.img}
              alt=""
              width={200}
              height={200}
              className="object-cover rounded-full"
            />
          </div>
          <a
            href="#"
            onClick={handleCopy(promptCard1.text3)}
            className="block p-9 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {promptCard1.text1}
            </h5>

            <h6 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">
              {promptCard1.text2}
            </h6>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {promptCard1.text3}
            </p>
          </a>
        </div>
        <div
          className="Superhero my-1"
          onClick={() => handleCopy(promptCard2.text3)}
        >
          <div className="float-right">
            <Image
              src={promptCard2.img}
              alt=""
              width={200}
              height={200}
              className="object-cover rounded-full"
            />
          </div>
          <a
            href="#"
            onClick={handleCopy(promptCard2.text3)}
            className="block p-9 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {promptCard2.text1}
            </h5>

            <h6 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">
              {promptCard2.text2}
            </h6>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {promptCard2.text3}
            </p>
          </a>
        </div>
      </div>
      <div
        className="Astronauta my-1"
        onClick={() => handleCopy(promptCard3.text3)}
      >
        <div className="float-right">
          <Image
            src={promptCard3.img}
            alt=""
            width={200}
            height={200}
            className="object-cover rounded-full"
          />
        </div>
        <a
          href="#"
          onClick={handleCopy(promptCard3.text3)}
          className="block p-9 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {promptCard3.text1}
          </h5>

          <h6 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">
            {promptCard3.text2}
          </h6>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {promptCard3.text3}
          </p>
        </a>
      </div>
      <div className="Mago my-1" onClick={() => handleCopy(promptCard4.text3)}>
        <div className="float-right">
          <Image
            src={promptCard4.img}
            alt=""
            width={200}
            height={200}
            className="object-cover rounded-full"
          />
        </div>
        <a
          href="#"
          onClick={handleCopy(promptCard4.text3)}
          className="block p-9 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {promptCard4.text1}
          </h5>

          <h6 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">
            {promptCard4.text2}
          </h6>

          <p className="font-normal text-gray-700 dark:text-gray-400">
            {promptCard4.text3}
          </p>
        </a>
      </div>
      <div
        className="Hobbit1 my-1"
        onClick={() => handleCopy(promptCard5.text3)}
      >
        <div className="float-right">
          <Image
            src={promptCard5.img}
            alt=""
            width={200}
            height={200}
            className="object-cover rounded-full"
          />
        </div>
        <a
          href="#"
          onClick={handleCopy(promptCard5.text3)}
          className="block p-9 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {promptCard5.text1}
          </h5>

          <h6 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">
            {promptCard5.text2}
          </h6>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {promptCard5.text3}
          </p>
        </a>
      </div>
      <div
        className="Payaso my-1"
        onClick={() => handleCopy(promptCard6.text3)}
      >
        <div className="float-right">
          <Image
            src={promptCard6.img}
            alt=""
            width={200}
            height={200}
            className="object-cover rounded-full"
          />
        </div>
        <a
          href="#"
          onClick={handleCopy(promptCard6.text3)}
          className="block p-9 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {promptCard6.text1}
          </h5>

          <h6 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">
            {promptCard6.text2}
          </h6>

          <p className="font-normal text-gray-700 dark:text-gray-400">
            {promptCard6.text3}
          </p>
        </a>
      </div>
    </div>
  );
}
