import PromptCard from './PromptCard';

export default function Prompts() {
  const promptInfo = [
    {
      img: 'https://photoshot.app/prompts/sacha/viking.png',
      text1: 'Instrucciones para crear un Avatar Vikingo',
      text2: 'Conviértete en un vikingo con nuestra guía de IA gratuita',
      text3:
        'Retrato en primer plano de @me como un vikingo, ultra realista, arte conceptual, detalles intrincados, poderoso y feroz, altamente detallado, hiperrealista, renderizado con Octane, 8K, motor Unreal. Arte de Artgerm, Greg Rutkowski, Charlie Bowater, Magali Villeneuve y Alphonse Mucha, con la hora dorada, cuernos y trenzas en el pelo, capa y casco forrados de piel, hacha en mano, mirando hacia la cámara'
    },
    {
      img: 'https://photoshot.app/prompts/sacha/superhero.png',
      text1: 'Instrucciones para crear un Superhéroe',
      text2: 'Desata tus poderes con nuestra guía de IA gratuita',
      text3:
        'Retrato en primer plano de @me como un superhéroe, increíblemente poderoso, con un traje de alta tecnología y colores vibrantes. Pose heroica, expresión determinada, rodeado de energía y efectos especiales. Arte inspirado en los cómics de Marvel y DC, con estilo de Jim Lee, Alex Ross y Todd McFarlane.'
    },
    {
      img: 'https://photoshot.app/prompts/sacha/astronaut.png',
      text1: 'Instrucciones para crear un Astronauta',
      text2: 'Conviértete en un astronauta con nuestra guía de IA gratuita',
      text3:
        ' Retrato detallado de cerca de @me como astronauta, futurista, altamente detallado, ultra realista, arte conceptual, texturas intrincadas, fondo interestelar, viaje espacial, arte por Alphonse Mucha, Ryan Kittleson, Greg Rutkowski, Leesha Hannigan, Stephan Martiniere, Stanley Artgerm Lau.'
    },
    {
      img: 'https://photoshot.app/prompts/romy/wizard.png',
      text1: 'Instrucciones para crear un Mago',
      text2: 'Conviértete en Mago con nuestra sugerencia gratuita de IA.',
      text3:
        ' Retrato detallado de cerca de @me como un mago, con un concepto de arte fantástico, con detalles e texturas intrincadas, mágico, colorido, arte por wlop, greg rutkowski, charlie bowater, magali villeneuve, alphonse mucha, surrealista, mirando hacia el horizonte, sosteniendo un bastón, con fuego y estrellas en el fondo.'
    },
    {
      img: 'https://photoshot.app/prompts/romy/hobbit.png',
      text1: 'Instrucciones para crear un Hobbit',
      text2: 'Conviértete en Hobbit con nuestra sugerencia gratuita de IA.',
      text3:
        ' Retrato detallado de cerca de @me como un Hobbit, pequeño, con grandes ojos marrones, ropa verde y marrón, rasgos faciales detallados, pies pequeños, cabello ondulado, concepto de arte fantástico, tendencia en ArtStation, altamente detallado, arte de John Howe, Alan Lee y Weta Workshop, colores terrosos, mirando a la cámara.'
    },
    {
      img: 'https://photoshot.app/prompts/sacha/clown.png',
      text1: 'Instrucciones para crear un Payaso',
      text2: 'Conviértete en Payaso con nuestra sugerencia gratuita de IA.',
      text3:
        ' Retrato detallado de cerca de @me como un payaso, altamente detallado, surrealista, rostro inexpresivo, colores brillantes, iluminación contrastante, fondo abstracto, arte de wlop, Greg Rutkowski, Charlie Bowater, Magali Villeneuve, Alphonse Mucha, estilo caricaturesco, inspirado en cómics.'
    }
  ];

  return (
    <div>
      <div className="w-full items-center">
        {promptInfo.map((prompt) => {
          return <PromptCard props={prompt} key={Math.random()} />;
        })}
      </div>
    </div>
  );
}
