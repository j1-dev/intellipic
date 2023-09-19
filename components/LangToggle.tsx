'use client';
import { usePathname, useRouter } from 'next-intl/client';
import { useLocale } from 'next-intl';
import { useState } from 'react';
import { Menu } from '@headlessui/react';

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
    <Menu as="div" className="absolute inline-block text-left right-40">
      <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
        Idoma
      </Menu.Button>
      <Menu.Items className="absolute top-0 lef-0 block -translate-x-12 -translate-y-6">
        <Menu.Item>
          {({ active }) => (
            <div className="bg-[url('https://cdn.ipregistry.co/flags/twemoji/es.png')] bg-contain w-10 h-10">
              {}
            </div>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <div className="bg-[url('https://cdn.ipregistry.co/flags/twemoji/gb.png')] bg-contain w-10 h-10">
              {}
            </div>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};

export default LangToggle;
