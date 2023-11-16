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
    <div>
        <h2 className="text-4xl font-bold mb-4">{t('trainingModel')}</h2>
            <div className="max-w-screen-lg mt-5">
                <ul>
                    <li>
                        <h3 className="text-xl font-bold">{t('trainingStep1')}</h3>
                        <Image alt="" src={image1} className="group-hover:opacity-75  transition-all"/>
                    </li>
                    <li>
                        <h3 className="text-xl font-bold">{t('trainingStep2')}</h3>
                        <Image alt="" src={image2} className="group-hover:opacity-75  transition-all"/>
                    </li>
                    <li>
                        <h3 className="text-xl font-bold">{t('trainingStep3')}</h3>
                        <div className='flex'>
                        <Image alt="" src={image3} className="group-hover:opacity-75  transition-all"/>
                        <Image alt="" src={image4} className="group-hover:opacity-75  transition-all"/>
                        </div>
                    </li>
                </ul>
          
        </div>
        <h2 className="text-4xl font-bold mb-4">{t('generatingImages')}</h2>
            <div className="max-w-screen-lg mt-5">
                <ul>
                    <li>
                        <h3 className="text-xl font-bold">{t('generatingImageStep1')}</h3>
                        <Image alt="" src={image5} className="group-hover:opacity-75  transition-all"/>
                    </li>
                    <li>
                        <h3 className="text-xl font-bold">{t('generatingImageStep2')}</h3>
                    </li>
                    <li>
                        <h3 className="text-xl font-bold">{t('generatingImageStep3')}</h3>
                    </li>
                </ul>
            </div>
        <h2 className="text-4xl font-bold mb-4">{t('PredefGuideEx')}</h2>
            <div className="max-w-screen-lg mt-5">
                <ul>
                    <li>
                        <h3 className="text-xl font-bold">{t('PredefGuideStep1')}</h3>
                        <Image alt="" src={image6} className="group-hover:opacity-75  transition-all"/>
                    </li>
                    <li>
                        <h3 className="text-xl font-bold">{t('PredefGuideStep2')}</h3>
                        <Image alt="" src={image7} className="group-hover:opacity-75  transition-all"/>
                    </li>
                    <li>
                        <h3 className="text-xl font-bold">{t('PredefGuideStep3')}</h3>
                        <Image alt="" src={image8} className="group-hover:opacity-75  transition-all"/>
                    </li>
                </ul>
            </div>
            
            <h3 className="text-4xl font-bold mb-4">{t('generatingImageStep3')}</h3>
             <Image alt="" src={image9} className="group-hover:opacity-75  transition-all"/>
                <div className="max-w-screen-lg mt-5">
                <h3 className="text-4xl font-bold mb-4">{t('ManualGuide')}</h3>
                    <ul>
                        <li>
                            <h3 className="text-xl font-bold">{t('ManualStep0')}</h3>
                        </li>
                        <li>
                            <h3 className="text-xl font-bold">{t('ManualStep1')}</h3>
                            <Image alt="" src={image10} className="group-hover:opacity-75  transition-all"/>
                        </li>
                        <li>
                            <h3 className="text-xl font-bold">{t('ManualStep2')}</h3>
                            <Image alt="" src={image11} className="group-hover:opacity-75  transition-all"/>
                        </li>
                        <li>
                            <h3 className="text-xl font-bold">{t('ManualStep3')}</h3>
                            <Image alt="" src={image12} className="group-hover:opacity-75  transition-all"/>
                        </li>
                    </ul>
                </div>
        </div>
        );
};

export default Guide;