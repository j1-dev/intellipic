'use client';
import { useTranslations } from 'next-intl';

const Terms = () => {
  const t = useTranslations('Tos');
  return (
    <div className="mx-auto max-w-screen-lg px-10 rounded-lg w-full bg-white text-black dark:bg-black dark:text-white transition-all my-4">
      <h1 className="font-bold text-5xl">{t('title')}</h1>

      <p className="my-3">{t(' content')}</p>

      <h2 className="font-bold text-xl">{t('refundsTitle')}</h2>

      <p className="my-3">{t('refundsContent')}</p>

      <h2 className="font-bold text-xl">{t('photoUploadTitle')}</h2>

      <p className="my-3">{t('photoUploadContent')}</p>

      <h2 className="font-bold text-xl">{t('informationCollectionTitle')}</h2>

      <p className="my-3">{t('informationCollectionContent')}</p>

      <h3 className="font-semibold text-md">{t('legitimateReasonsTitle')}</h3>

      <p className="my-3">{t('legitimateReasonsContent')}</p>

      <h3 className="font-semibold text-md">{t('collectionAndUseTitle')}</h3>

      <p className="my-3">{t('collectionAndUseContent')}</p>

      <p className="my-3">{t('collectionActionsTitle')}</p>

      <ul className="list-inside list-disc pl-4">
        <li>{t('collectionActions1')}</li>
        <li>{t('collectionActions2')}</li>
        <li>{t('collectionActions3')}</li>
      </ul>

      <p className="my-3">{t('collectionPurposesTitle')}</p>

      <ul className="list-inside list-disc pl-4">
        <li>{t('collectionPurposesContent')}</li>
      </ul>

      <p className="my-3">{t('informationCombinationTitle')}</p>

      <p className="my-3">{t('informationCombinationContent')}</p>

      <h3 className="font-semibold text-md">
        {t('personalInformationSecurityTitle')}
      </h3>

      <p className="my-3">{t('personalInformationSecurityContent')}</p>

      <p className="my-3">{t('personalInformationSecurityNote')}</p>

      <p className="my-3">{t('personalInformationSecurityPassword')}</p>

      <h3 className="font-semibold text-md">
        {t('personalInformationDurationTitle')}
      </h3>

      <p className="my-3">{t('personalInformationDurationContent')}</p>

      <p className="my-3">{t('personalInformationDurationNote')}</p>

      <h2 className="font-bold text-xl">{t('childrenPrivacyTitle')}</h2>

      <p className="my-3">{t('childrenPrivacyContent')}</p>

      <h2 className="font-bold text-xl">
        {t('personalInformationDisclosureTitle')}
      </h2>

      <p className="my-3">{t('personalInformationDisclosureContent')}</p>

      <ul className="list-inside list-disc pl-4">
        <li>{t('personalInformationDisclosure1')}</li>
        <li>{t('personalInformationDisclosure2')}</li>
      </ul>

      <h2 className="font-bold text-xl">
        {t('internationalPersonalInformationTitle')}
      </h2>

      <p className="my-3">{t('internationalPersonalInformationContent')}</p>

      <h2 className="font-bold text-xl">{t('yourRightsTitle')}</h2>

      <p className="my-3">{t('yourRightsContent')}</p>

      <h2 className="font-bold text-xl">{t('cookieUsageTitle')}</h2>

      <p className="my-3">{t('cookieUsageContent')}</p>

      <h2 className="font-bold text-xl">{t('policyLimitsTitle')}</h2>

      <p className="my-3">{t('policyLimitsContent')}</p>

      <h2 className="font-bold text-xl">{t('policyChangesTitle')}</h2>

      <p className="my-3">{t('policyChangesContent')}</p>

      <h2 className="font-bold text-xl">{t('contactUsTitle')}</h2>

      <p className="my-3">
        {t('contactUsContent')}{' '}
        <a href="mailto:support@Intellipic.app">support@Intellipic.app</a>
      </p>
    </div>
  );
};

export default Terms;
