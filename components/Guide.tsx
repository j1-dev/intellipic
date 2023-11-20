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
import Link from 'next/link';
import { FaDiscord } from 'react-icons/fa';

const Guide = () => {
  const t = useTranslations('Guide');

  return (
    <div className="max-w-screen-lg mx-auto px-6">
      <div>
        <h1 className="text-6xl sm:text-9xl text-center font-bold mb-4">
          {t('guides')}
        </h1>
        <p>{t('guidesExplanation')}</p>
        <Separator />

        <div className="rounded-lg border border-black dark:border-white transition-all p-4">
          <h2 className="text-4xl  font-bold mb-4">{t('trainingModel')}</h2>

          <div>
            <h3 className="text-xl font-bold mb-2">
              {t('trainingStep1Title')}
            </h3>
            <p className="mb-4">{t('trainingStep1Description')}</p>
            <GoodVsBad />
          </div>
          <div>
            <h3 className="text-xl font-bold mt-4 mb-2">
              {t('trainingStep2Title')}
            </h3>
            <p className="mb-4">{t('trainingStep2Description')}</p>
            <div className="rounded-xl overflow-hidden px-3 sm:px-36 mb-4">
              <Image
                alt=""
                src={image2}
                className="rounded-xl border border-black "
              />
            </div>
          </div>
          <div className="items-center">
            <h3 className="text-xl font-bold mb-2">
              {t('trainingStep3Title')}
            </h3>
            <p>{t('trainingStep3Description')}</p>
            <div className="px-3 sm:px-40">
              <div className="rounded-xl overflow-hidden ">
                <Image alt="" src={image3} className="rounded-xl w-full my-3" />
              </div>
              <div className="rounded-xl overflow-hidden ">
                <Image alt="" src={image4} className="rounded-xl w-full my-3" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="rounded-lg  border border-black dark:border-white transition-all p-4">
          <h2 className="text-4xl font-bold ">{t('generatingImages')}</h2>
          <div className="items-center">
            <p className="py-4">{t('generatingImageStep1')}</p>
            <div className="rounded-xl overflow-hidden px-3 sm:px-36">
              <Image alt="" src={image5} className="rounded-xl  " />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="rounded-lg border border-black dark:border-white transition-all p-4">
          <div>
            <h3 className="text-3xl font-bold pb-4">
              {t('generatingImageOption1Title')}
            </h3>
            <p>{t('generatingImageOption1Description')}</p>
          </div>
          <p className="text-2xl font-bold my-4">{t('PredefGuideEx')}</p>
          <div className="items-center">
            <h3 className="text-xl font-bold mb-4">{t('PredefGuideStep1')}</h3>
            <div className="rounded-xl overflow-hidden px-3 sm:px-60 ">
              <Image alt="" src={image6} className="mb-4 rounded-xl w-full" />
            </div>
          </div>
          <div className="items-center">
            <h3 className="text-xl font-bold mb-4">{t('PredefGuideStep2')}</h3>
            <div className="rounded-xl overflow-hidden px-3 sm:px-60 ">
              <Image alt="" src={image7} className="mb-4 rounded-xl w-full" />
            </div>
          </div>
          <div className="items-center">
            <h3 className="text-xl font-bold mb-4">{t('PredefGuideStep3')}</h3>
            <div className="rounded-xl overflow-hidden px-3 sm:px-60 ">
              <Image alt="" src={image8} className="mb-4 rounded-xl w-full" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="rounded-lg border border-black dark:border-white transition-all p-4">
          <h3 className="text-3xl font-bold mb-4">
            {t('generatingImageOption2Title')}
          </h3>
          <p className="mb-4">{t('generatingImageOption2Description')}</p>

          <div className="rounded-xl overflow-hidden px-3 sm:px-60 ">
            <Image alt="" src={image8} className="mb-4 rounded-xl w-full" />
          </div>
          <div className="max-w-screen-lg mt-5">
            <h3 className="mb-4">{t('ManualGuide')}</h3>
            <div>
              <h3 className="text-xl font-bold">{t('ManualStep0Title')}</h3>
              <p className="mb-4">{t('ManualStep0Description')}</p>
            </div>
            <div>
              <h3 className="text-xl font-bold">{t('ManualStep1Title')}</h3>
              <p className="mb-4">{t('ManualStep1Description')}</p>
              <div className="rounded-xl overflow-hidden px-3 sm:px-60 ">
                <Image alt="" src={image8} className="mb-4 rounded-xl w-full" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold">{t('ManualStep2Title')}</h3>
              <p className="mb-4">{t('ManualStep2Description')}</p>
              <div className="rounded-xl overflow-hidden px-3 sm:px-60 ">
                <Image alt="" src={image8} className="mb-4 rounded-xl w-full" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold">{t('ManualStep3Title')}</h3>
              <p className="mb-4">{t('ManualStep3Description')}</p>
              <div className="rounded-xl overflow-hidden px-3 sm:px-60 ">
                <Image alt="" src={image8} className="mb-4 rounded-xl w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <div className="rounded-lg border border-black dark:border-white transition-all p-4 text-center">
          <span className="text-3xl font-bold">{t('joinGithub')}</span>
          <Link
            href="https://discord.gg/Su2bVkSMTA"
            className="flex justify-center items-center "
          >
            <div className="bg-[#5865F2] hover:bg-[#3a41aa] rounded-xl p-3 mt-4 mb-2 transition-all hover:scale-105">
              <FaDiscord size={100} color="#FFFFFF" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Guide;
