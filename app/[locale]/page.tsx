'use client';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import UnderDevelopmentMessage from '@/components/BetaMessage';
import Separator from '@/components/Separator';
const Link = dynamic(() => import('next/link'));
const Morph = dynamic(() => import('@/components/Morph'));
const Logo = dynamic(() => import('@/app/core/resources/logo'));
const HomeExamples = dynamic<{}>(() =>
  import('@/components/HomeExamples').then((c) => c.HomeExamples)
);
const GoodVsBad = dynamic<{}>(() => import('@/components/GoodVsBad'));

export default function Home() {
  const t = useTranslations('Home');
  return (
    <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen transition-all">
      <UnderDevelopmentMessage />
      <header className="py-8">
        <nav className="max-w-screen-lg mx-auto flex justify-between items-center px-8">
          <Logo />
          <h1 className="text-2xl sm:text-3xl font-bold hidden xs:block m-0">
            IntelliPic
          </h1>
          <Link
            href="/login"
            className=" bg-white text-black border-black hover:bg-black hover:text-white dark:bg-black dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black border rounded py-2 px-1 xs:px-3 transition-all ml-auto float-none z-50"
          >
            {t('nav.login')}
          </Link>
          <Link
            href="/register"
            className=" bg-blue-600 text-white border-blue-600 hover:bg-white hover:text-black border rounded py-2 px-4 transition-all ml-1"
          >
            {t('nav.signup')}
          </Link>
        </nav>
      </header>

      <section className="bg-white dark:bg-black py-16 transition-all border-t-[1px] border-b-[1px] border-black dark:border-white">
        <div className="max-w-screen-lg mx-auto px-12">
          <Morph
            texts={[t('header.morph1'), t('header.morph2'), t('header.morph3')]}
          />
          <div className="text-center">
            <p className="text-lg mb-8">{t('header.description')}</p>
            <Link
              href="/register"
              className=" bg-blue-600 text-white border-white hover:bg-black hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-black border rounded-md py-3 px-4 transition-all"
            >
              {t('header.cta')}
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-screen-lg mx-auto px-12">
        <section className="py-16">
          <div>
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
              {/* 
            <div className="card p-6">
              <h3 className="text-xl font-bold mb-2">
                {t('features.feature4.title')}
              </h3>
              <p>{t('features.feature4.description')}</p>
            </div>
            <div className="card p-6">
              <h3 className="text-xl font-bold mb-2">
                {t('features.feature5.title')}
              </h3>
              <p>{t('features.feature5.description')}</p>
            </div>
            <div className="card p-6">
              <h3 className="text-xl font-bold mb-2">
                {t('features.feature6.title')}
              </h3>
              <p>{t('features.feature6.description')}</p>
            </div>
             */}
            </div>
          </div>
        </section>

        <Separator />

        <section className="py-5">
          <div className="max-w-screen-lg mx-auto">
            <GoodVsBad />
          </div>
        </section>

        <Separator />

        <section className="py-5">
          <div className="max-w-screen-lg mx-auto">
            <h2 className="text-2xl font-bold mb-4">{t('examples.title')}</h2>
          </div>
          <div className="max-w-screen-lg mx-auto">
            <HomeExamples />
          </div>
        </section>

        <Separator />

        <section className="py-16">
          <div className="max-w-screen-lg mx-auto">
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
                  <li className="leading-7">
                    {t('prices.trainModel.include1')}
                  </li>
                  <li className="leading-7">
                    {t('prices.trainModel.include2')}
                  </li>
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

        <Separator />

        <section className="py-16">
          <div className="max-w-screen-lg mx-auto">
            <h2 className="text-2xl font-bold mb-4">{t('privacy.title')}</h2>
            <p className="text-lg font-semibold mb-8">
              {t('privacy.description')}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
