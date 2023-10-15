import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';

function UnderDevelopmentMessage() {
  const t = useTranslations('Home.nav');
  const [isMessageVisible, setMessageVisible] = useState<boolean>(
    localStorage.getItem('showWarning') === 'true'
  );

  useEffect(() => {
    localStorage.setItem('showWarning', isMessageVisible.toString());
  }, [isMessageVisible]);

  const closeMessage = () => {
    setMessageVisible(false);
  };

  return (
    isMessageVisible && (
      <div className="bg-yellow-200 text-yellow-800 p-4 fixed bottom-0 left-0 right-0 z-50">
        <div className="container mx-auto flex items-center justify-between">
          <p>{t('beta')}</p>
          <button
            onClick={closeMessage}
            className="bg-yellow-600 text-white px-3 py-1 rounded"
          >
            <p> {t('accept')}</p>
          </button>
        </div>
      </div>
    )
  );
}

export default UnderDevelopmentMessage;
