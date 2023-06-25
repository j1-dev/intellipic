'use client';
import Link from 'next/link';
import Morph from './components/Morph';
import { FaInstagram, FaGithub, FaDiscord, FaLinkedin } from 'react-icons/fa';
import { FiInfo } from 'react-icons/fi';

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
          <h1 className="text-3xl font-bold">Intellipic</h1>
          <button className=" bg-white text-black border-black hover:bg-black hover:text-white dark:bg-black dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black border rounded py-2 px-4 transition-all ml-auto ">
            <Link href="/login">Log In</Link>
          </button>
          <button className=" bg-blue-600 text-white border-blue-600 hover:bg-white hover:text-black border rounded py-2 px-4 transition-all ml-1">
            <Link href="/register">Sign Up</Link>
          </button>
        </nav>
      </header>

      <section className="bg-white dark:bg-black py-16 transition-all border-t-[1px] border-b-[1px] border-black dark:border-white">
        <div className="max-w-screen-lg mx-auto px-8">
          <Morph texts={['IntelliPic', ' Remake', 'Yourself']} />
          <div className="text-center">
            <p className="text-lg mb-8">
              Unleash your creativity with Intellipic. Upload any picture, train
              a neural network, and transform it into an incredible artwork with
              various styles. ✨🎨
            </p>
            <button className=" bg-white text-black border-black hover:bg-black hover:text-white dark:bg-black dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black border rounded py-2 px-4 transition-all">
              <Link href="/register">Get Started</Link>
            </button>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-screen-lg mx-auto px-8">
          <h2 className="text-2xl font-bold mb-4">Features ✨</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div className="border feature-card bg-white dark:bg-black dark:border-white border-black p-6 rounded-lg transition-all duration-300 transform hover:scale-105">
              <h3 className="text-xl font-bold mb-2">Picture Upload 📷</h3>
              <p>
                Seamlessly upload your favorite pictures of any subject you
                desire.
              </p>
            </div>
            <div className="border feature-card bg-white dark:bg-black dark:border-white border-black p-6 rounded-lg transition-all duration-300 transform hover:scale-105">
              <h3 className="text-xl font-bold mb-2">
                Neural Network Training 🧠
              </h3>
              <p>
                Utilize cutting-edge neural network technology to learn from the
                uploaded pictures and understand the unique characteristics of
                the subject.
              </p>
            </div>
            <div className="border feature-card bg-white dark:bg-black dark:border-white border-black p-6 rounded-lg transition-all duration-300 transform hover:scale-105">
              <h3 className="text-xl font-bold mb-2">Style Selection 🌈</h3>
              <p>
                Choose from a vast collection of styles to apply to your images,
                allowing you to create stunning visual combinations.
              </p>
            </div>
            <div className="border feature-card bg-white dark:bg-black dark:border-white border-black p-6 rounded-lg transition-all duration-300 transform hover:scale-105">
              <h3 className="text-xl font-bold mb-2">Image Generation ⚡️</h3>
              <p>
                Watch in awe as Intellipic generates stunning new images,
                blending the subject with your chosen style in real-time.
              </p>
            </div>
            <div className="border feature-card bg-white dark:bg-black dark:border-white border-black p-6 rounded-lg transition-all duration-300 transform hover:scale-105">
              <h3 className="text-xl font-bold mb-2">Endless Creativity 🔁</h3>
              <p>
                With Intellipic, there are no limits to your imagination. Keep
                experimenting, training, and generating to discover captivating
                results.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-screen-lg mx-auto px-8">
          <h2 className="text-2xl font-bold mb-4">Examples 📸</h2>
          <div className="carousel">
            {/* Add your carousel component or image gallery here */}
          </div>
        </div>
      </section>

      {/* Prices Section */}
      <section className="py-16">
        <div className="max-w-screen-lg mx-auto px-8">
          <h2 className="text-2xl font-bold mb-4">Prices 💰</h2>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Training a Model (2x2) */}
            <div className="border border-black dark:border-white bg-white dark:bg-black p-6 rounded-lg col-span-2 row-span-2 transition-all duration-300 transform hover:scale-105 ">
              <h3 className="text-xl font-bold mb-2">Training a Model</h3>
              <p className="leading-7">€3 per model</p>
              <p className="leading-7">This includes:</p>
              <ul className="list-disc list-inside ">
                <li className="leading-7">Creating a model</li>
                <li className="leading-7">Generating 15 images</li>
              </ul>
            </div>

            {/* Generating 10 Images (1x1) */}
            <div className="border border-black dark:border-white bg-white dark:bg-black p-6 rounded-lg transition-all duration-300 transform hover:scale-105">
              <h3 className="text-xl font-bold mb-2">Generating 10 Images</h3>
              <p>€1</p>
            </div>

            {/* Generating 25 Images (1x1) */}
            <div className="border border-black dark:border-white bg-white dark:bg-black p-6 rounded-lg transition-all duration-300 transform hover:scale-105">
              <h3 className="text-xl font-bold mb-2">Generating 25 Images</h3>
              <p>€2</p>
            </div>

            {/* Generating 50 Images (1x1) */}
            <div className="border border-black dark:border-white bg-white dark:bg-black p-6 rounded-lg transition-all duration-300 transform hover:scale-105">
              <h3 className="text-xl font-bold mb-2">Generating 50 Images</h3>
              <p>€3</p>
            </div>

            {/* Generating 100 Images (1x1) */}
            <div className="border border-black dark:border-white bg-white dark:bg-black p-6 rounded-lg transition-all duration-300 transform hover:scale-105">
              <h3 className="text-xl font-bold mb-2">Generating 100 Images</h3>
              <p>€7.5</p>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section className="py-16">
        <div className="max-w-screen-lg mx-auto px-8">
          <h2 className="text-2xl font-bold mb-4">Privacy and Security 🔒</h2>
          <p className="text-lg font-semibold mb-8">
            At Intellipic, we prioritize your privacy and security. To ensure
            that your images are protected, we delete all uploaded images and
            generated artwork after 24 hours. This prevents any malicious use or
            unauthorized access to your data. You can use Intellipic with
            confidence, knowing that your privacy is our top priority.
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
                <FaInstagram size={24} />
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-900 dark:text-white hover:text-black dark:hover:text-gray-400"
              >
                <FaGithub size={24} />
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-900 dark:text-white hover:text-black dark:hover:text-gray-400"
              >
                <FaDiscord size={24} />
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-900 dark:text-white hover:text-black dark:hover:text-gray-400"
              >
                <FaLinkedin size={24} />
              </a>
            </li>
          </ul>
          <p className="text-sm text-gray-500 dark:text-gray-400 float-left ">
            This project is licensed under the MIT License.
          </p>
        </div>
      </footer>
    </div>
  );
}
