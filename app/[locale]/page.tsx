import Image from 'next/image';
import Link from 'next/link';
import { FaDiscord, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FiInfo } from 'react-icons/fi';
import Morph from '@/components/Morph';
import Logo from '@/app/core/resources/logo';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('Home');
  return (
    <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen transition-all">
      <header className="py-8">
        <nav className="max-w-screen-lg mx-auto flex justify-between items-center px-8">
          <Logo />
          <h1 className="text-2xl sm:text-3xl font-bold hidden xs:block m-0">
            Intellipic
          </h1>
          <button className=" bg-white text-black border-black hover:bg-black hover:text-white dark:bg-black dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black border rounded py-2 px-1 xs:px-3 transition-all ml-auto float-none z-50">
            <Link href="/login">{t('nav.login')}</Link>
          </button>
          <button className=" bg-blue-600 text-white border-blue-600 hover:bg-white hover:text-black border rounded py-2 px-4 transition-all ml-1">
            <Link href="/register">{t('nav.signup')}</Link>
          </button>
        </nav>
      </header>

      <section className="bg-white dark:bg-black py-16 transition-all border-t-[1px] border-b-[1px] border-black dark:border-white">
        <div className="max-w-screen-lg mx-auto px-8">
          <Morph
            texts={[t('header.morph1'), t('header.morph2'), t('header.morph3')]}
          />
          <div className="text-center">
            <p className="text-lg mb-8">{t('header.description')}</p>
            <button className=" bg-white text-black border-black hover:bg-black hover:text-white dark:bg-black dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black border rounded py-2 px-4 transition-all">
              <Link href="/register">{t('header.cta')}</Link>
            </button>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-screen-lg mx-auto px-8">
          <h2 className="text-2xl font-bold mb-4">{t('features.title')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card p-6">
              <h3 className="text-xl font-bold mb-2">
                {t('features.feature1.title')}
              </h3>
              <p>{t('features.feature1.description')}</p>
            </div>
            {/* Feature 2 */}
            <div className="card p-6">
              <h3 className="text-xl font-bold mb-2">
                {t('features.feature2.title')}
              </h3>
              <p>{t('features.feature2.description')}</p>
            </div>
            {/* Feature 3 */}
            <div className="card p-6">
              <h3 className="text-xl font-bold mb-2">
                {t('features.feature3.title')}
              </h3>
              <p>{t('features.feature3.description')}</p>
            </div>
            {/* Feature 4 */}
            <div className="card p-6">
              <h3 className="text-xl font-bold mb-2">
                {t('features.feature4.title')}
              </h3>
              <p>{t('features.feature4.description')}</p>
            </div>
            {/* Feature 5 */}
            <div className="card p-6">
              <h3 className="text-xl font-bold mb-2">
                {t('features.feature5.title')}
              </h3>
              <p>{t('features.feature5.description')}</p>
            </div>
            {/* Feature 6 */}
            <div className="card p-6">
              <h3 className="text-xl font-bold mb-2">
                {t('features.feature6.title')}
              </h3>
              <p>{t('features.feature6.description')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5">
        <div className="max-w-screen-lg mx-auto px-8 ">
          <h2 className="text-2xl font-bold mb-4">{t('examples.title')}</h2>
        </div>
        <div className="max-w-screen-lg mx-auto px-8">
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 ">
            {/* Example 1 */}
            <a href="#" className="group">
              <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                <Image
                  alt=""
                  src="/Images/Elon.png"
                  layout="fill"
                  objectFit="cover"
                  className="group-hover:opacity-75  transition-all"
                />
              </div>
            </a>
            {/* Example 2 */}
            <a href="#" className="group">
              <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                <Image
                  alt=""
                  src="/Images/Messi3.png"
                  layout="fill"
                  objectFit="cover"
                  className="group-hover:opacity-75 transition-all"
                />
              </div>
            </a>
            {/* Example 3 */}
            <a href="#" className="group">
              <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                <Image
                  alt=""
                  src="/Images/dvid1.png"
                  layout="fill"
                  objectFit="cover"
                  className="group-hover:opacity-75 transition-all"
                />
              </div>
            </a>
            {/* Example 4 */}
            <a href="#" className="group">
              <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                <Image
                  alt=""
                  src="/Images/dua1.png"
                  layout="fill"
                  objectFit="cover"
                  className="group-hover:opacity-75 transition-all"
                />
              </div>
            </a>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-screen-lg mx-auto px-8">
          <h2 className="text-2xl font-bold mb-4">{t('prices.title')}</h2>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Training a Model */}
            <div className="card p-6 col-span-2 row-span-2">
              <h3 className="text-xl font-bold mb-2">
                {t('prices.trainModel.title')}
              </h3>
              <p className="leading-7">{t('prices.trainModel.price')}</p>
              <p className="leading-7">{t('prices.trainModel.includes')}</p>
              <ul className="list-disc list-inside ">
                <li className="leading-7">{t('prices.trainModel.include1')}</li>
                <li className="leading-7">{t('prices.trainModel.include2')}</li>
              </ul>
            </div>

            {/* Generating 10 Images */}
            <div className="card p-6">
              <h3 className="text-xl font-bold mb-2">
                {t('prices.generate10.title')}
              </h3>
              <p>{t('prices.generate10.price')}</p>
            </div>

            {/* Generating 25 Images */}
            <div className="card p-6">
              <h3 className="text-xl font-bold mb-2">
                {t('prices.generate25.title')}
              </h3>
              <p>{t('prices.generate25.price')}</p>
            </div>

            {/* Generating 50 Images */}
            <div className="card p-6">
              <h3 className="text-xl font-bold mb-2">
                {t('prices.generate40.title')}
              </h3>
              <p>{t('prices.generate40.price')}</p>
            </div>

            {/* Generating 100 Images */}
            <div className="card p-6">
              <h3 className="text-xl font-bold mb-2">
                {t('prices.generate100.title')}
              </h3>
              <p>{t('prices.generate100.price')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-screen-lg mx-auto px-8">
          <h2 className="text-2xl font-bold mb-4">{t('privacy.title')}</h2>
          <p className="text-lg font-semibold mb-8">
            {t('privacy.description')}
          </p>
        </div>
      </section>

      <footer className="py-8 text-center bg-white dark:bg-black transition-all">
        <div className="max-w-screen-lg mx-auto px-8">
          <ul className="flex justify-start space-x-4 my-3">
            <li>
              <Link
                href="/faq"
                className="text-gray-900 dark:text-white hover:text-black dark:hover:text-gray-400"
              >
                <FiInfo className="inline-block mr-1" />
                FAQs
              </Link>
            </li>
            <li>
              <Link
                href="/tos"
                className="text-gray-900 dark:text-white hover:text-black dark:hover:text-gray-400"
              >
                Terms
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-gray-900 dark:text-white hover:text-black dark:hover:text-gray-400"
              >
                Contact
              </Link>
            </li>
          </ul>
          <ul className="flex justify-start lg:justify-end my-3">
            <li>
              <Link
                href="#"
                className="text-gray-900 dark:text-white hover:text-black dark:hover:text-gray-400"
              >
                <FaInstagram size={24} className="mx-3" />
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-gray-900 dark:text-white hover:text-black dark:hover:text-gray-400"
              >
                <FaGithub size={24} className="mx-3" />
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-gray-900 dark:text-white hover:text-black dark:hover:text-gray-400"
              >
                <FaDiscord size={24} className="mx-3" />
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="text-gray-900 dark:text-white hover:text-black dark:hover:text-gray-400"
              >
                <FaLinkedin size={24} className="mx-3" />
              </Link>
            </li>
          </ul>
          <p className="text-sm text-gray-500 dark:text-gray-400 my-7 ">
            {t('footer.license')}
          </p>
        </div>
      </footer>
    </div>
  );
}
