'use client';
import Link from 'next/link';
import Morph from './components/Morph';
import { FaInstagram, FaGithub, FaDiscord, FaLinkedin } from 'react-icons/fa';
import { FiInfo } from 'react-icons/fi';
import Carousel from './components/Carousel';
import Image from 'next/image';
import Logo from './core/resources/logo';


const slides = [
  "https://i.ibb.co/ncrXc2V/1.png",
  "https://i.ibb.co/B3s7v4h/2.png",
  "https://i.ibb.co/XXR8kzF/3.png",
  "https://i.ibb.co/yg7BSdM/4.png",
]

/**
 * @TODO: Document everything
 *
 * @returns home page
 */
export default async function Home() {
  return (
    <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen transition-all">
      <header className="py-8">
        <nav className="max-w-screen-lg mx-auto flex justify-between items-center px-8">
          <Logo />
          <h1 className=" absolute left-80 text-3xl font-bold hidden xs:block">IntelliPic</h1>
          <button className=" bg-white text-black border-black hover:bg-black hover:text-white dark:bg-black dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black border rounded py-2 px-3 transition-all ml-0 xs:ml-auto float-left xs:float-none">
            <Link href="/login">Inicia sesión</Link>
          </button>
          <button className=" bg-blue-600 text-white border-blue-600 hover:bg-white hover:text-black border rounded py-2 px-4 transition-all ml-1">
            <Link href="/register">Regístrate</Link>
          </button>
        </nav>
      </header>

      <section className="bg-white dark:bg-black py-16 transition-all border-t-[1px] border-b-[1px] border-black dark:border-white">
        <div className="max-w-screen-lg mx-auto px-8">
          <Morph texts={['IntelliPic', ' Remake', 'Yourself']} />
          <div className="text-center">
            <p className="text-lg mb-8">
            Desata tu creatividad con Intellipic. Sube cualquier imagen, entrena una red neuronal y transfórmala en una increíble obra de arte con varios estilos. ✨🎨
            </p>
            <button className=" bg-white text-black border-black hover:bg-black hover:text-white dark:bg-black dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black border rounded py-2 px-4 transition-all">
              <Link href="/register">Comenzar</Link>
            </button>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-screen-lg mx-auto px-8">
          <h2 className="text-2xl font-bold mb-4">Características ✨</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="border feature-card bg-white dark:bg-black dark:border-white border-black p-6 rounded-lg transition-all duration-300 transform hover:scale-105">
              <h3 className="text-xl font-bold mb-2">Subir imagen 📷</h3>
              <p>
              Sube sin problemas tus imágenes favoritas de cualquier tema que desees.
              </p>
            </div>
            <div className="border feature-card bg-white dark:bg-black dark:border-white border-black p-6 rounded-lg transition-all duration-300 transform hover:scale-105">
              <h3 className="text-xl font-bold mb-2">
              Entrenamiento de la red neuronal🧠
              </h3>
              <p>
              Utiliza tecnología de vanguardia de redes neuronales para aprender de las imágenes subidas y comprender las características únicas del sujeto.
              </p>
            </div>
            <div className="border feature-card bg-white dark:bg-black dark:border-white border-black p-6 rounded-lg transition-all duration-300 transform hover:scale-105">
              <h3 className="text-xl font-bold mb-2">Selección de estilo 🌈</h3>
              <p>
              Elige entre una amplia colección de estilos para aplicar a tus imágenes, lo que te permitirá crear combinaciones visuales impresionantes.
              </p>
            </div>
            <div className="border feature-card bg-white dark:bg-black dark:border-white border-black p-6 rounded-lg transition-all duration-300 transform hover:scale-105">
              <h3 className="text-xl font-bold mb-2">Generación de imágenes⚡️</h3>
              <p>
              Observa con asombro cómo Intellipic genera nuevas imágenes impresionantes, fusionando el sujeto con el estilo elegido en tiempo real.
              </p>
            </div>
            <div className="border feature-card bg-white dark:bg-black dark:border-white border-black p-6 rounded-lg transition-all duration-300 transform hover:scale-105">
              <h3 className="text-xl font-bold mb-2">Creatividad infinita 🔁</h3>
              <p>
              Con Intellipic, no hay límites para tu imaginación. Sigue experimentando, entrenando y generando para descubrir resultados cautivadores.
              </p>
            </div>
            <div className="border feature-card bg-white dark:bg-black dark:border-white border-black p-6 rounded-lg transition-all duration-300 transform hover:scale-105">
              <h3 className="text-xl font-bold mb-2">El trabajo impulsado por IA tiene costos asociados. 💡</h3>
              <p>
              Desata el potencial de la generación de imágenes mediante IA. Debido a los recursos sustanciales necesarios para el entrenamiento, no es factible proporcionar este servicio de forma gratuita. Tu inversión impulsa la innovación y garantiza resultados de la más alta calidad.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-screen-lg mx-auto px-8">
          <h2 className="text-2xl font-bold mb-4">Ejemplos📸</h2>
          <div className="carousel">
            <Carousel autoSlide={true} autoSlideInterval={10000}>
              {slides.map((s: string)  => (
                <Image src={s} alt='slide' width="500" height="500" key={s} />
               ))}
            </Carousel>
          </div>
        </div>
      </section>

      {/* Prices Section */}
      <section className="py-16">
        <div className="max-w-screen-lg mx-auto px-8">
          <h2 className="text-2xl font-bold mb-4">Precios 💰</h2>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Training a Model (2x2) */}
            <div className="border border-black dark:border-white bg-white dark:bg-black p-6 rounded-lg col-span-2 row-span-2 transition-all duration-300 transform hover:scale-105 ">
              <h3 className="text-xl font-bold mb-2">Entrenar un modelo</h3>
              <p className="leading-7">€3 por modelo</p>
              <p className="leading-7">Esto Incluye:</p>
              <ul className="list-disc list-inside ">
                <li className="leading-7">Crear un modelo</li>
                <li className="leading-7">Generar 15 imágenes</li>
              </ul>
            </div>

            {/* Generating 10 Images (1x1) */}
            <div className="border border-black dark:border-white bg-white dark:bg-black p-6 rounded-lg transition-all duration-300 transform hover:scale-105">
              <h3 className="text-xl font-bold mb-2">Generar 10 imágenes</h3>
              <p>€1</p>
            </div>

            {/* Generating 25 Images (1x1) */}
            <div className="border border-black dark:border-white bg-white dark:bg-black p-6 rounded-lg transition-all duration-300 transform hover:scale-105">
              <h3 className="text-xl font-bold mb-2">Generar 25 imágenes</h3>
              <p>€2</p>
            </div>

            {/* Generating 50 Images (1x1) */}
            <div className="border border-black dark:border-white bg-white dark:bg-black p-6 rounded-lg transition-all duration-300 transform hover:scale-105">
              <h3 className="text-xl font-bold mb-2">Generar 50 imágenes</h3>
              <p>€3</p>
            </div>

            {/* Generating 100 Images (1x1) */}
            <div className="border border-black dark:border-white bg-white dark:bg-black p-6 rounded-lg transition-all duration-300 transform hover:scale-105">
              <h3 className="text-xl font-bold mb-2">Generar 100 imágenes</h3>
              <p>€7.5</p>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section className="py-16">
        <div className="max-w-screen-lg mx-auto px-8">
          <h2 className="text-2xl font-bold mb-4">Privacidad y Seguridad 🔒</h2>
          <p className="text-lg font-semibold mb-8">
          En Intellipic, priorizamos tu privacidad y seguridad.
           Para asegurarnos de que tus imágenes estén protegidas, 
          eliminamos todas las imágenes subidas y las obras de arte generadas después de 24 horas.
           Esto evita cualquier uso malicioso o acceso no autorizado a tus datos. Puedes utilizar Intellipic con confianza,
          sabiendo que tu privacidad es nuestra máxima prioridad.
          </p>
        </div>
      </section>

      <footer className="py-8 text-center bg-white dark:bg-black transition-all">
        <div className="max-w-screen-lg mx-auto px-8">
          <ul className="flex justify-start space-x-4 my-3">
            <li>
              <a
                href="#"
                className="text-gray-900 dark:text-white hover:text-black dark:hover:text-gray-400"
              >
                <FiInfo className="inline-block mr-1" />
                FAQs
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-900 dark:text-white hover:text-black dark:hover:text-gray-400"
              >
                Terms
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-900 dark:text-white hover:text-black dark:hover:text-gray-400"
              >
                Contact
              </a>
            </li>
          </ul>
          <ul className="flex justify-start lg:justify-end my-3">
            <li>
              <a
                href="#"
                className="text-gray-900 dark:text-white hover:text-black dark:hover:text-gray-400"
              >
                <FaInstagram size={24} className='mx-3'/>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-900 dark:text-white hover:text-black dark:hover:text-gray-400"
              >
                <FaGithub size={24} className='mx-3'/>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-900 dark:text-white hover:text-black dark:hover:text-gray-400"
              >
                <FaDiscord size={24} className='mx-3'/>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-900 dark:text-white hover:text-black dark:hover:text-gray-400"
              >
                <FaLinkedin size={24} className='mx-3'/>
              </a>
            </li>
          </ul>
          <p className="text-sm text-gray-500 dark:text-gray-400 my-7 ">
            This project is licensed under the MIT License.
          </p>
        </div>
      </footer>
    </div>
  );
}
