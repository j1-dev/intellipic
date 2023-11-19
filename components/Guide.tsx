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
import Separator from './Separator';
import GoodVsBad from './GoodVsBad';

const Guide = () => {
  const t = useTranslations('Guide');

  return (
    <div className="max-w-screen-lg mx-auto px-8">
      <div>
        <h1 className="text-6xl sm:text-9xl text-center font-bold mb-4">
          {t('guides')}
        </h1>
        <p>{t('guidesExplanation')}</p>
        <Separator />
        <h2 className="text-4xl font-bold my-4">{t('trainingModel')}</h2>
        <div>
          <h3 className="text-xl font-bold">{t('trainingStep1Title')}</h3>
          <p>{t('trainingStep1Description')}</p>
          <GoodVsBad />
        </div>
        <div>
          <h3 className="text-xl font-bold">{t('trainingStep2Title')}</h3>
          <p>{t('trainingStep2Description')}</p>
          <Image alt="" src={image2} className="px-3 sm:px-40" />
        </div>
        <div className="items-center">
          <h3 className="text-xl font-bold">{t('trainingStep3Title')}</h3>
          <p>{t('trainingStep3Description')}</p>
          <div className="px-40">
            <Image alt="" src={image3} className="w-full my-3" />
            <Image alt="" src={image4} className="w-full my-3" />
          </div>
        </div>
      </div>
      <Separator />

      <div className="mt-8">
        <h2 className="text-4xl font-bold mb-4">{t('generatingImages')}</h2>
        <div className="items-center">
          <p className="py-4">{t('generatingImageStep1')}</p>
          <Image alt="" src={image5} className="px-3 sm:px-36" />
        </div>
        <div>
          <h3 className="text-xl font-bold">
            {t('generatingImageOption1Title')}
          </h3>
          <p>{t('generatingImageOption1Description')}</p>
        </div>
      </div>

      <div className="mt-8">
        <p className="text-4xl font-bold mb-4">{t('PredefGuideEx')}</p>
        <div className="items-center">
          <h3 className="text-xl font-bold">{t('PredefGuideStep1')}</h3>
          <Image alt="" src={image6} className="px-3 sm:px-60 w-full" />
        </div>
        <div className="items-center">
          <h3 className="text-xl font-bold">{t('PredefGuideStep2')}</h3>
          <Image alt="" src={image7} className="px-3 sm:px-60 w-full" />
        </div>
        <div className="items-center">
          <h3 className="text-xl font-bold">{t('PredefGuideStep3')}</h3>
          <Image alt="" src={image8} className="px-3 sm:px-60 w-full" />
        </div>
      </div>
      <Separator />

      <div className="mt-8">
        <h3 className="text-xl font-bold">
          {t('generatingImageOption2Title')}
        </h3>
        <p>{t('generatingImageOption2Description')}</p>

        <Image alt="" src={image9} className="px-3 sm:px-60 w-full" />
        <div className="max-w-screen-lg mt-5">
          <h3 className="mb-4">{t('ManualGuide')}</h3>
          <div>
            <h3 className="text-xl font-bold">{t('ManualStep0Title')}</h3>
            <p>{t('ManualStep0Description')}</p>
          </div>
          <div>
            <h3 className="text-xl font-bold">{t('ManualStep1Title')}</h3>
            <p>{t('ManualStep1Description')}</p>
            <Image alt="" src={image10} className="px-3 sm:px-60 w-full" />
          </div>
          <div>
            <h3 className="text-xl font-bold">{t('ManualStep2Title')}</h3>
            <p>{t('ManualStep2Description')}</p>
            <Image alt="" src={image11} className="px-3 sm:px-60 w-full" />
          </div>
          <div>
            <h3 className="text-xl font-bold">{t('ManualStep3Title')}</h3>
            <p>{t('ManualStep3Description')}</p>
            <Image alt="" src={image12} className="px-3 sm:px-60 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guide;
