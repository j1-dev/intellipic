import { useTranslations } from 'next-intl';

const FaqMain = () => {
  const t = useTranslations('Faq');

  return (
    <div>
      <h2 className="text-4xl font-bold mb-4">{t('questionsTitle')}</h2>
      <div className="max-w-screen-lg mt-5">
        <ul>
          <li>
            <h3 className="text-xl font-bold">{t('question1.question')}</h3>
            <p className="mb-4">{t('question1.answer')}</p>
          </li>
          <li>
            <h3 className="text-xl font-bold">{t('question2.question')}</h3>
            <p className="mb-4">{t('question2.answer')}</p>
          </li>
          <li>
            <h3 className="text-xl font-bold">{t('question3.question')}</h3>
            <p className="mb-4">{t('question3.answer')}</p>
          </li>
          <li>
            <h3 className="text-xl font-bold">{t('question4.question')}</h3>
            <p className="mb-4">{t('question4.answer')}</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FaqMain;
