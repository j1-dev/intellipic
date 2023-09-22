'use client';
import { usePathname, useRouter } from 'next-intl/client';
import { Menu } from '@headlessui/react';
import { useLocale } from 'next-intl';

const LangToggle = () => {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();

  return (
    <Menu as="div" className="inline-block -translate-y-2 xs:translate-y-0">
      <Menu.Button className="inline-flex w-full justify-center rounded-md  px-4 py-2 text-sm font-medium card focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
        {locale === 'es' ? 'Idioma' : 'Language'}
      </Menu.Button>
      <Menu.Items className="absolute top-0 lef-0 inline-block -translate-y-20  -translate-x-[84px] border bg-white dark:bg-black border-black dark:border-white px-2 rounded-md">
        <Menu.Item>
          {({ active }) => (
            <button
              className="bg-[url('https://cdn.ipregistry.co/flags/twemoji/es.png')] bg-contain w-10 h-10 hover:scale-105 transition-all mt-2"
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
              className="bg-[url('https://cdn.ipregistry.co/flags/twemoji/gb.png')] bg-contain w-10 h-10 hover:scale-105 transition-all mb-2"
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
