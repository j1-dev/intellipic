import React from 'react';

const TipsMain = ({ toggle }: { toggle: boolean }) => {
  return (
    <main className="max-w-screen-lg mt-5">
      {toggle && (
        <div>
          <ul>
            <li>
              <h1>1 Elección de las Imágenes:</h1>
              <span>
                Reúne unas 8 a 12 fotos nítidas del sujeto, asegurándote de que
                el sujeto se distinga claramente del fondo. Si es una persona o
                un animal, que salga todo el sujeto o al menos la cara.
              </span>
            </li>
            <li>
              <h1>2 Variedad de las Imágenes:</h1>
              <span>
                Incluye diferentes ángulos, luces y poses en las fotos. Eso
                enriquecerá la comprensión del modelo.
              </span>
            </li>
            <li>
              <h1>3 Nombre/tipo del sujeto:</h1>
              <span>
                Asigna un nombre único al modelo que lo asocie con el sujeto a
                entrenar. Asegúrate de que sea exclusivo y no se pueda
                relacionar con ningún otro concepto.
              </span>
              <br />
              <span>
                Además, debes de especificar el tipo de sujeto al que pertenece.
                Si estás entrenando con imágenes de tu gato, asegúrate de
                etiquetarlo correctamente como <b>gato</b>. Esto permitirá que
                la IA compare las características de tu gato con otras imágenes
                de gatos similares.
              </span>
            </li>
          </ul>
        </div>
      )}
      {!toggle && (
        <div>
          <ul>
            <li>
              <h1>1 Frases Estructuradas:</h1>
              <span>
                Utiliza frases como <b>Una [foto/dibujo/pintura] de @me</b> para
                especificar claramente el sujeto.
              </span>
            </li>
            <li>
              <h1>2 Estilos Definidos:</h1>
              <span>
                Indica los estilos deseados usando{' '}
                <b>
                  [en el estilo de..., como..., cinematográfico, elegante,
                  fantástico, triste, etc.]
                </b>{' '}
                para obtener resultados precisos.
              </span>
            </li>
            <li>
              <h1>3 Sencillez es Clave:</h1>
              <span>
                Opta por frases simples y concretas para dar instrucciones
                claras al AI.
              </span>
            </li>
          </ul>
        </div>
      )}
    </main>
  );
};

export default TipsMain;
