import { useTranslations } from 'next-intl';

const Terms = () => {
  const t = useTranslations();
  return (
    <div className="mx-auto max-w-screen-lg px-10 rounded-lg w-full bg-white text-black dark:bg-black dark:text-white transition-all my-4">
      <h1 className="font-bold text-5xl">{t('Tos.title')}</h1>

      <p className="my-3">{t('Tos.content')}</p>

      <h2 className="font-bold text-xl">{t('Tos.refundsTitle')}</h2>

      <p className="my-3">{t('Tos.refundsContent')}</p>

      <h2 className="font-bold text-xl">{t('Tos.photoUploadTitle')}</h2>

      <p className="my-3">{t('Tos.photoUploadContent')}</p>

      <h2 className="font-bold text-xl">
        {t('Tos.informationCollectionTitle')}
      </h2>

      <p className="my-3">{t('Tos.informationCollectionContent')}</p>

      <h3 className="font-semibold text-md">
        {t('Tos.legitimateReasonsTitle')}
      </h3>

      <p className="my-3">{t('Tos.legitimateReasonsContent')}</p>

      <h3 className="font-semibold text-md">
        {t('Tos.collectionAndUseTitle')}
      </h3>

      <p className="my-3">{t('Tos.collectionAndUseContent')}</p>

      <p className="my-3">{t('Tos.collectionActionsTitle')}</p>

      <ul className="list-inside list-disc pl-4">
        <li>{t('Tos.collectionActions1')}</li>
        <li>{t('Tos.collectionActions2')}</li>
        <li>{t('Tos.collectionActions3')}</li>
      </ul>

      <p className="my-3">{t('Tos.collectionPurposesTitle')}</p>

      <ul className="list-inside list-disc pl-4">
        <li>{t('Tos.collectionPurposesContent')}</li>
      </ul>

      <p className="my-3">{t('Tos.informationCombinationTitle')}</p>

      <p className="my-3">{t('Tos.informationCombinationContent')}</p>

      <h3 className="font-semibold text-md">
        {t('Tos.personalInformationSecurityTitle')}
      </h3>

      <p className="my-3">{t('Tos.personalInformationSecurityContent')}</p>

      <p className="my-3">{t('Tos.personalInformationSecurityNote')}</p>

      <p className="my-3">{t('Tos.personalInformationSecurityPassword')}</p>

      <h3 className="font-semibold text-md">
        {t('Tos.personalInformationDurationTitle')}
      </h3>

      <p className="my-3">{t('Tos.personalInformationDurationContent')}</p>

      <p className="my-3">{t('Tos.personalInformationDurationNote')}</p>

      <h2 className="font-bold text-xl">{t('Tos.childrenPrivacyTitle')}</h2>

      <p className="my-3">{t('Tos.childrenPrivacyContent')}</p>

      <h2 className="font-bold text-xl">
        {t('Tos.personalInformationDisclosureTitle')}
      </h2>

      <p className="my-3">{t('Tos.personalInformationDisclosureContent')}</p>

      <ul className="list-inside list-disc pl-4">
        <li>{t('Tos.personalInformationDisclosure1')}</li>
        <li>{t('Tos.personalInformationDisclosure2')}</li>
      </ul>

      <h2 className="font-bold text-xl">
        {t('Tos.internationalPersonalInformationTitle')}
      </h2>

      <p className="my-3">{t('Tos.internationalPersonalInformationContent')}</p>

      <h2 className="font-bold text-xl">{t('Tos.yourRightsTitle')}</h2>

      <p className="my-3">{t('Tos.yourRightsContent')}</p>

      <h2 className="font-bold text-xl">{t('Tos.cookieUsageTitle')}</h2>

      <p className="my-3">{t('Tos.cookieUsageContent')}</p>

      <h2 className="font-bold text-xl">{t('Tos.policyLimitsTitle')}</h2>

      <p className="my-3">{t('Tos.policyLimitsContent')}</p>

      <h2 className="font-bold text-xl">{t('Tos.policyChangesTitle')}</h2>

      <p className="my-3">{t('Tos.policyChangesContent')}</p>

      <h2 className="font-bold text-xl">{t('Tos.contactUsTitle')}</h2>

      <p className="my-3">
        {t('Tos.contactUsContent')}{' '}
        <a href="mailto:support@Intellipic.app">support@Intellipic.app</a>
      </p>
    </div>
  );
};

export default Terms;
