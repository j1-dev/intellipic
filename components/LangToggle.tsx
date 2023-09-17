'use client';
import { Switch } from '@headlessui/react';
import { usePathname, useRouter } from 'next-intl/client';
import { useLocale } from 'next-intl';
import { useState } from 'react';
import ES from 'country-flag-icons/react/3x2/ES';
import US from 'country-flag-icons/react/3x2/US';

const LangToggle = () => {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const [enabled, setEnabled] = useState<boolean>(
    locale === 'es' ? true : false
  );

  function toggleLang() {
    setEnabled(!enabled);
    const l = locale === 'es' ? 'en' : 'es';
    router.replace(pathname, { locale: l });
  }

  return (
    <div className="inline-flex fixed left-3 bottom-3 z-50 bg-opacity-50 bg-gray-400 p-3 rounded-full">
      <US title="United States" className="w-7 mr-2" />
      <Switch
        onChange={toggleLang}
        className="bg-black dark:bg-white transition-all hover:shadow-lg relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        <span className="sr-only">Use setting</span>
        <span
          aria-hidden="true"
          className={`${enabled ? 'translate-x-9' : 'translate-x-0'}
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white dark:bg-black shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
      </Switch>
      <ES title="España" className="w-7 ml-2" />
    </div>
  );
};

export default LangToggle;
