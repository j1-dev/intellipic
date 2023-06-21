'use client';
import Morph from './components/Morph';
import { supabase } from './supabaseClient';
import Link from 'next/link';

/**
 * @TODO: Add these things
 * - Add a carousel component or image gallery
 * - Relocate the dark mode toggle
 * - Add better footer
 * - Add prices section
 */

export default async function Home() {
  // const handleLogout = async () => {
  //   const { error } = await supabase.auth.signOut();
  // };

  return (
    <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen transition-all">
      <header className="py-8">
        <nav className="max-w-screen-lg mx-auto flex justify-between items-center px-8">
          <h1 className="text-3xl font-bold">Intellipic</h1>
          <button className=" bg-white text-black border-black hover:bg-black hover:text-white dark:bg-black dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black border rounded py-2 px-4 transition-all">
            <a href="/login">Sign Up</a>
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
              <a href="/register">Get Started</a>
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

      <footer className="py-4 text-center">
        <p className="text-sm">
          This project is licensed under the MIT License.
        </p>
      </footer>
    </div>
  );
}
