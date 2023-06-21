import Image from 'next/image';
import { useState } from 'react';
import {toast} from 'react-hot-toast';

export default function Prompts() {
  function handlecopy() {
    navigator.clipboard.writeText("Retrato en primer plano de @mi como un vikingo, ultra realista,arte conceptual, detalles intrincados, poderoso y feroz, altamente detallado, hiperrealista, renderizado con Octane, 8K, motor Unreal. Arte de Artgerm, Greg Rutkowski, Charlie Bowater, Magali Villeneuve y Alphonse Mucha, con la hora dorada, cuernos y trenzas en el pelo, capa y casco forrados de piel, hacha en mano, mirando hacia la cámara.")

    toast.success(
      "Copiado con éxito"
    )
  }


  return (
   <div className="w-full items-center">
    <div className="Vikingo my-1" onClick={handlecopy} >
    <div className="float-right">
          <Image
            src="https://photoshot.app/prompts/sacha/viking.png"
            alt=""
            width={200}
            height={200}
            className="object-cover rounded-full"
          />
        </div>
      <a
        href="#"
        className="block p-9 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      > 
      
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Instrucciones para crear un Avatar Vikingo
        </h5>
       
        <h6 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">
          Conviértete en un vikingo con nuestra guía de IA gratuita
        </h6>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Retrato en primer plano de @mi como un vikingo, ultra realista, arte
          conceptual, detalles intrincados, poderoso y feroz, altamente
          detallado, hiperrealista, renderizado con Octane, 8K, motor Unreal.
          Arte de Artgerm, Greg Rutkowski, Charlie Bowater, Magali Villeneuve
          y Alphonse Mucha, con la hora dorada, cuernos y trenzas en el pelo,
          capa y casco forrados de piel, hacha en mano, mirando hacia la
          cámara.
        </p>
      </a>
    </div>
 
      <div className="Astronauta my-1">
      <div className="float-right">
            <Image
              src="https://photoshot.app/prompts/sacha/astronaut.png"
              alt=""
              width={200}
              height={200}
              className="object-cover rounded-full"
            />
          </div>
     <a
          href="#"
          className="block p-9 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Instrucciones para crear un Astronauta
          </h5>
          
          <h6 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">
            Conviértete en un astronauta con nuestra guía de IA gratuita
          </h6>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Retrato detallado de cerca de @mi como astronauta, futurista,
            altamente detallado, ultra realista, arte conceptual, texturas
            intrincadas, fondo interestelar, viaje espacial, arte por Alphonse
            Mucha, Ryan Kittleson, Greg Rutkowski, Leesha Hannigan, Stephan
            Martiniere, Stanley Artgerm Lau.
          </p>
        </a>
      </div>
      <div className="Mago my-1">
      <div className="float-right">
            <Image
              src="https://photoshot.app/prompts/romy/wizard.png"
              alt=""
              width={200}
              height={200}
              className="object-cover rounded-full"
            />
          </div>
        <a
          href="#"
          className="block p-9 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
         
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Instrucciones para crear un Mago
          </h5>
          
          <h6 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">
            Conviértete en Mago con nuestra sugerencia gratuita de IA.
          </h6>
          
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Retrato detallado de cerca de @mi como un mago, con un concepto de
            arte fantástico, con detalles e texturas intrincadas, mágico,
            colorido, arte por wlop, greg rutkowski, charlie bowater, magali
            villeneuve, alphonse mucha, surrealista, @me mirando hacia el
            horizonte, sosteniendo un bastón, con fuego y estrellas en el fondo.
          </p>
        </a>
      </div>
      <div className="Hobbit1 my-1">
      <div className="float-right">
            <Image
              src="https://photoshot.app/prompts/romy/hobbit.png"
              alt=""
              width={200}
              height={200}
              className="object-cover rounded-full"
            />
          </div>
        <a
          href="#"
          className="block p-9 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Instrucciones para crear un Hobbit
          </h5>
        
          <h6 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">
            Conviértete en Hobbit con nuestra sugerencia gratuita de IA.
          </h6>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Retrato detallado de cerca de @mi como un Hobbit, pequeño, con
            grandes ojos marrones, ropa verde y marrón, rasgos faciales
            detallados, pies pequeños, cabello ondulado, concepto de arte
            fantástico, tendencia en ArtStation, altamente detallado, arte de
            John Howe, Alan Lee y Weta Workshop, colores terrosos, mirando a la
            cámara.
          </p>
        </a>
      </div>
      <div className="Payaso my-1">

      <div className="float-right">
            <Image
              src="https://photoshot.app/prompts/sacha/clown.png"
              alt=""
              width={200}
              height={200}
              className="object-cover rounded-full"
            />
          </div>
        <a
          href="#"
          className="block p-9 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Instrucciones para crear un Payaso
          </h5>
          
          <h6 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">
            Conviértete en Payaso con nuestra sugerencia gratuita de IA.
          </h6>
          
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Retrato detallado de cerca de @mi como un payaso, altamente
            detallado, surrealista, rostro inexpresivo, colores brillantes,
            iluminación contrastante, fondo abstracto, arte de wlop, Greg
            Rutkowski, Charlie Bowater, Magali Villeneuve, Alphonse Mucha,
            estilo caricaturesco, inspirado en cómics.
          </p>
          
        </a>
      </div>
      <div className="Mago my-1">
      <div className="float-right">
            <Image
              src="https://photoshot.app/prompts/romy/hobbit.png"
              alt=""
              width={200}
              height={200}
              className="object-cover rounded-full"
            />
          </div>
        <a
          href="#"
          className="block p-9 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Instrucciones para crear un Hobbit
          </h5>
         
          <h6 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">
            Conviértete en Hobbit con nuestra sugerencia gratuita de IA.
          </h6>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Retrato detallado de cerca de @Yo como un Hobbit, pequeño, con
            grandes ojos marrones, ropa verde y marrón, rasgos faciales
            detallados, pies pequeños, cabello ondulado, concepto de arte
            fantástico, tendencia en ArtStation, altamente detallado, arte de
            John Howe, Alan Lee y Weta Workshop, colores terrosos, mirando a la
            cámara.
          </p>
        </a>
      </div>
      <div className="Mago my-1">
      <div className="float-right">
            <Image
              src="https://photoshot.app/prompts/romy/wizard.png"
              alt=""
              width={200}
              height={200}
              className="object-cover rounded-full"
            />
          </div>
        <a
          href="#"
          className="block p-9 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Instrucciones para crear un Mago
          </h5>
         
          <h6 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">
            Conviértete en Mago con nuestra sugerencia gratuita de IA.
          </h6>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Retrato detallado de cerca de @mi como un mago, con un concepto de
            arte fantástico, con detalles e texturas intrincadas, mágico,
            colorido, arte por wlop, greg rutkowski, charlie bowater, magali
            villeneuve, alphonse mucha, surrealista, @me mirando hacia el
            horizonte, sosteniendo un bastón, con fuego y estrellas en el fondo.
          </p>
        </a>
      </div>
      <div className="Hobbit4 my-1">
      <div className="float-right">
            <Image
              src="https://photoshot.app/prompts/romy/hobbit.png"
              alt=""
              width={200}
              height={200}
              className="object-fit: cover rounded-full"
              float-right
            />
          </div>  
        <a
          href="#"
          className="block p-9 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Instrucciones para crear un Hobbit
          </h5>
         
          <h6 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">
            Conviértete en Hobbit con nuestra sugerencia gratuita de IA.
          </h6>
          
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Retrato detallado de cerca de @mi como un Hobbit, pequeño, con
            grandes ojos marrones, ropa verde y marrón, rasgos faciales
             detallados, pies pequeños, cabello ondulado, concepto de arte
            fantástico, tendencia en ArtStation, altamente detallado, arte de
           John Howe, Alan Lee y Weta Workshop, colores terrosos, mirando a la
            cámara.
          </p>
      </a>
     </div>
    </div>
  );

        }
