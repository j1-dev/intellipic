import { useTranslations } from 'next-intl';
import Image from 'next/image';
import image1 from '@/public/Images/Guide/image1.png';
import image2 from '@/public/Images/Guide/image2.png';
import image3 from '@/public/Images/Guide/image3.png';
import image4 from '@/public/Images/Guide/image4.png';
import image5 from '@/public/Images/Guide/image5.png';
import image6 from '@/public/Images/Guide/image6.png';
import image7 from '@/public/Images/Guide/image7.png';
import image8 from '@/public/Images/Guide/image8.png';
import image9 from '@/public/Images/Guide/image9.png';
import image10 from '@/public/Images/Guide/image10.png';
import image11 from '@/public/Images/Guide/image11.png';
import image12 from '@/public/Images/Guide/image12.png';

const Guide = () => {
  const t = useTranslations('guide');

  return (
    <div className="max-w-screen-lg mx-auto px-4">
      <div className="mt-8">
        <h2 className="text-4xl font-bold mb-4">{t('trainingModel')}</h2>
        <ul className="space-y-6">
          <li className="flex items-center">
            <h3 className="text-xl font-bold">{t('trainingStep1')}</h3>
            <Image alt="" src={image1} className="ml-4 group-hover:opacity-75 transition-all" />
          </li>
          <li className="flex items-center">
            <h3 className="text-xl font-bold">{t('trainingStep2')}</h3>
            <Image alt="" src={image2} className="ml-4 group-hover:opacity-75 transition-all" />
          </li>
          <li className="flex items-center">
            <h3 className="text-xl font-bold">{t('trainingStep3')}</h3>
            <div className="flex ml-4 space-x-2">
              <Image alt="" src={image3} className="w-40 h-auto group-hover:opacity-75 transition-all" />
              <Image alt="" src={image4} className="group-hover:opacity-75 transition-all" />
            </div>
          </li>
        </ul>
      </div>

      <div className="mt-8">
        <h2 className="text-4xl font-bold mb-4">{t('generatingImages')}</h2>
        <ul className="space-y-6">
          <li className="items-center">
            <h3 className="text-xl font-bold py-4 px-4">{t('generatingImageStep1')}</h3>
            <Image alt="" src={image5} className="ml-4 group-hover:opacity-75 transition-all" />
          </li>
          <li className="flex items-center">
            <h3 className="text-xl font-bold">{t('generatingImageStep2')}</h3>
          </li>
          <li className="flex items-center">
            <h3 className="text-xl font-bold">{t('generatingImageStep3')}</h3>
          </li>
        </ul>
      </div>

      <div className="mt-8">
        <h2 className="text-4xl font-bold mb-4">{t('PredefGuideEx')}</h2>
        <ul className="space-y-6">
          <li className="flex items-center">
            <h3 className="text-xl font-bold">{t('PredefGuideStep1')}</h3>
            <Image alt="" src={image6} className="ml-4 group-hover:opacity-75 transition-all" />
          </li>
          <li className="flex items-center">
            <h3 className="text-xl font-bold">{t('PredefGuideStep2')}</h3>
            <Image alt="" src={image7} className="ml-4 group-hover:opacity-75 transition-all" />
          </li>
          <li className="flex items-center">
            <h3 className="text-xl font-bold">{t('PredefGuideStep3')}</h3>
            <Image alt="" src={image8} className="ml-4 group-hover:opacity-75 transition-all" />
          </li>
        </ul>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">{t('generatingImageStep3')}</h2>
        <Image alt="" src={image9} className="group-hover:opacity-75 transition-all" />
        <div className="max-w-screen-lg mt-5">
          <h3 className="text-4xl font-bold mb-4">{t('ManualGuide')}</h3>
          <ul className="space-y-6">
            <li className="flex items-center">
              <h3 className="text-xl font-bold">{t('ManualStep0')}</h3>
          </li>
          <li className="flex items-center">
            <h3 className="text-xl font-bold">{t('ManualStep1')}</h3>
            <Image alt="" src={image10} className="ml-4 group-hover:opacity-75 transition-all" />
          </li>
          <li className="flex items-center">
            <h3 className="text-xl font-bold">{t('ManualStep2')}</h3>
            <Image alt="" src={image11} className="ml-4 group-hover:opacity-75 transition-all" />
          </li>
          <li className="flex items-center">
            <h3 className="text-xl font-bold">{t('ManualStep3')}</h3>
            <Image alt="" src={image12} className="ml-4 group-hover:opacity-75 transition-all" />
          </li>
        </ul>
      </div>
      </div>
    </div>
  );
  
};

export default Guide;
