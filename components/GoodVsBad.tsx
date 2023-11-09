import React from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const GoodVsBad = () => {
  const t = useTranslations('Home.GoodVsBad');
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold mb-4">{t('GoodVsBadTitle')}</h1>
      <span className="text-lg font-semibold">{t('GoodPhotoExamples')}</span>
      <span>{t('GoodPhotoDef')}</span>
      <div className="grid grid-cols-3 grid-rows-2">
        <div>a</div>
        <div>a</div>
        <div>a</div>
        <div>a</div>
        <div>a</div>
        <div>a</div>
      </div>

      <span className="text-lg font-semibold">{t('BadPhotoExamples')}</span>
      <span>{t('BadPhotoDef')}</span>
      <div className="grid grid-cols-3 grid-rows-2">
        <div>a</div>
        <div>a</div>
        <div>a</div>
        <div>a</div>
        <div>a</div>
        <div>a</div>
      </div>
    </div>
  );
};

export default GoodVsBad;
