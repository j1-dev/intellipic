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
                <p className="mb-4">{t('')}</p>
            </li>
            <li>
                <h3 className="text-xl font-bold">{t('trainingStep2')}</h3>
                <p className="mb-4">{t('trainingStep3')}</p>
            </li>
            <li>
                <h3 className="text-xl font-bold">{t('trainingStep4')}</h3>
                <p className="mb-4">{t('trainingStep5')}</p>
            </li>
            </ul>
            <h2 className="text-4xl font-bold mb-4">{t('generatingImages')}</h2>
        </div>
        </div>
        );
};

export default Guide;