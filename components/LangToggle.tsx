'use client';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { Menu } from '@headlessui/react';
import { useLocale } from 'next-intl';
import { Transition } from '@headlessui/react'; // Import Transition
import { useState, useEffect } from 'react';

const LangToggle = () => {
  const [show, setShow] = useState(false);
  const locales = ['en', 'de'] as const;
  const { useRouter, usePathname } = createSharedPathnamesNavigation({
    locales
  });
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    function close() {
      setShow(false);
    }
    // Function to handle clicks outside the menu items box
    const handleClickOutside = (event: any) => {
      if (
        show &&
        !event.target.closest('.menu-items-box') &&
        !event.target.closest('.menu-button')
      ) {
        close();
      }
    };

    // Add event listener
    document.addEventListener('click', handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [show]);

  return (
    <Menu as="div" className="inline-block -translate-y-2 xs:translate-y-0">
      <Menu.Button
        onClick={() => {
          setShow(!show);
        }}
        className={`px-3 menu-button inline-flex justify-center rounded-md py-2 text-sm font-medium card focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
      >
        {locale === 'es' ? 'Idioma' : 'Language'}
      </Menu.Button>
      <Transition // Add Transition component here
        show={show} // You can control when to show/hide the menu
        enter="transition-opacity duration-300" // Enter transition classes
        enterFrom="opacity-0" // Initial state
        enterTo="opacity-100" // Final state
        leave="transition-opacity duration-300" // Leave transition classes
        leaveFrom="opacity-100" // Initial state when leaving
        leaveTo="opacity-0" // Final state when leaving
      >
        <Menu.Items className="menu-items-box -top-2 inset-y-0 left-1/2 transform -translate-x-1/2 -translate-y-full  absolute inline-block border bg-white dark:bg-black border-black dark:border-white px-2 rounded-md h-[106px]">
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
      </Transition>
    </Menu>
  );
};

export default LangToggle;
