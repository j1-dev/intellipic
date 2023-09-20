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
    <Menu as="div">
      <Menu.Button className="inline-flex w-full justify-center rounded-md  px-4 py-2 text-sm font-medium card focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
        Idoma
      </Menu.Button>
      <Menu.Items className="absolute top-0 lef-0 block -translate-y-9  -translate-x-8 border bg-white dark:bg-black border-black dark:border-white px-3 rounded-md">
        <Menu.Item>
          {({ active }) => (
            <button
              className="bg-[url('https://cdn.ipregistry.co/flags/twemoji/es.png')] bg-contain w-10 h-10 hover:scale-105 transition-all m-2"
              onClick={() => {
                router.replace(pathname, { locale: 'es' });
              }}
            >
              {}
            </button>
          )}
        </Menu.Item>
        <Menu.Item>
          {({ active }) => (
            <button
              className="bg-[url('https://cdn.ipregistry.co/flags/twemoji/gb.png')] bg-contain w-10 h-10 hover:scale-105 transition-all m-2"
              onClick={() => {
                router.replace(pathname, { locale: 'en' });
              }}
            >
              {}
            </button>
          )}
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};

export default LangToggle;
