import { useTranslations } from 'next-intl';

const Guide = () => {
    const t = useTranslations('guide');

    return (
    <div>
        <h2 className="text-4xl font-bold mb-4">{t('trainingModel')}</h2>
        <div className="max-w-screen-lg mt-5">
            <ul>
            <li>
                <h3 className="text-xl font-bold">{t('trainingStep1')}</h3>
            </li>
            <li>
                <h3 className="text-xl font-bold">{t('trainingStep2')}</h3>
            </li>
            <li>
                <h3 className="text-xl font-bold">{t('trainingStep3')}</h3>
            </li>
            </ul>
          
        </div>
        <h2 className="text-4xl font-bold mb-4">{t('generatingImages')}</h2>
        <ul>
            <li>
                <h3 className="text-xl font-bold">{t('trainingStep1')}</h3>
            </li>
            <li>
                <h3 className="text-xl font-bold">{t('trainingStep2')}</h3>
            </li>
            <li>
                <h3 className="text-xl font-bold">{t('trainingStep3')}</h3>
            </li>
            </ul>
        </div>
        );
};

export default Guide;