import React from 'react';
import { useTranslations } from 'next-intl';
import { BsCheckCircleFill, BsXCircleFill } from 'react-icons/bs';
import Image from 'next/image';
import good1 from '@/public/Images/goodvsbad/good_1.jpg';
import good2 from '@/public/Images/goodvsbad/good_2.jpg';
import good3 from '@/public/Images/goodvsbad/good_3.jpg';
import good4 from '@/public/Images/goodvsbad/good_4.jpg';
import bad1 from '@/public/Images/goodvsbad/bad_1.jpg';
import bad2 from '@/public/Images/goodvsbad/bad_2.jpg';
import bad3 from '@/public/Images/goodvsbad/bad_3.jpg';
import bad4 from '@/public/Images/goodvsbad/bad_4.jpg';

const GoodVsBad = () => {
  const t = useTranslations('Home.GoodVsBad');
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold mb-4">{t('GoodVsBadTitle')}</h1>
      <span className="text-lg font-semibold my-3">
        {t('GoodPhotoExamples')} ✅
      </span>
      <span className="my-2">{t('GoodPhotoDef')}</span>
      <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-4 lg:gap-x-8 xl:grid-cols-4 xl:gap-x-8 ">
        <div className="relative">
          <div className="group w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-8 xl:aspect-h-8">
            <Image
              src={good1}
              alt="good1"
              className="group-hover:opacity-75  transition-all"
            />
          </div>
          <BsCheckCircleFill
            size={30}
            color="#1FFF10"
            className="absolute bottom-2 right-2"
          />
        </div>
        <div className="relative">
          <div className="group w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-8 xl:aspect-h-8">
            <Image
              src={good2}
              alt="good2"
              className="group-hover:opacity-75  transition-all"
            />
          </div>
          <BsCheckCircleFill
            size={30}
            color="#1FFF10"
            className="absolute bottom-2 right-2"
          />
        </div>
        <div className="relative">
          <div className="group w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-8 xl:aspect-h-8">
            <Image
              src={good3}
              alt="good3"
              className="group-hover:opacity-75  transition-all"
            />
          </div>
          <BsCheckCircleFill
            size={30}
            color="#1FFF10"
            className="absolute bottom-2 right-2"
          />
        </div>
        <div className="relative">
          <div className="group w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-8 xl:aspect-h-8">
            <Image
              src={good4}
              alt="good4"
              className="group-hover:opacity-75  transition-all"
            />
          </div>
          <BsCheckCircleFill
            size={30}
            color="#1FFF10"
            className="absolute bottom-2 right-2"
          />
        </div>
      </div>

      <span className="text-lg font-semibold my-3 mt-5">
        {t('BadPhotoExamples')} ❎
      </span>
      <span className="my-2">{t('BadPhotoDef')}</span>
      <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-4 lg:gap-x-8 xl:grid-cols-4 xl:gap-x-8 ">
        <div className="relative">
          <div className="group w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-8 xl:aspect-h-8">
            <Image
              src={bad1}
              alt="good1"
              className="group-hover:opacity-75  transition-all"
            />
          </div>
          <BsXCircleFill
            size={30}
            color="#FF1221"
            className="absolute bottom-2 right-2"
          />
        </div>
        <div className="relative">
          <div className="group w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-8 xl:aspect-h-8">
            <Image
              src={bad2}
              alt="good2"
              className="group-hover:opacity-75  transition-all"
            />
          </div>
          <BsXCircleFill
            size={30}
            color="#FF1221"
            className="absolute bottom-2 right-2"
          />
        </div>
        <div className="relative">
          <div className="group w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-8 xl:aspect-h-8">
            <Image
              src={bad3}
              alt="good3"
              className="group-hover:opacity-75  transition-all"
            />
          </div>
          <BsXCircleFill
            size={30}
            color="#FF1221"
            className="absolute bottom-2 right-2"
          />
        </div>
        <div className="relative">
          <div className="group w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-8 xl:aspect-h-8">
            <Image
              src={bad4}
              alt="good4"
              className="group-hover:opacity-75  transition-all"
            />
          </div>
          <BsXCircleFill
            size={30}
            color="#FF1221"
            className="absolute bottom-2 right-2"
          />
        </div>
      </div>
    </div>
  );
};

export default GoodVsBad;
