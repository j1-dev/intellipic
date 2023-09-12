'use client';
import 'tailwindcss/tailwind.css';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { HiLogout } from 'react-icons/hi';
import Logo from '../app/core/resources/logo';

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [windowWidth, setWindowWidth] = useState<number | undefined>(undefined);
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize(); // Get initial window width

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const sub = async () => {
      await supabase.auth.getUser().then((u) => setUser(u.data.user));
    };
    sub();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push('/');
  };

  return (
    <div className="fixed w-full font-sans text-center bg-white dark:bg-black border-b-[1px] border-black dark:border-white shadow-sm transition-all z-50">
      {typeof window !== 'undefined' && windowWidth && windowWidth > 479 && (
        <header className="absolute left-4">
          <Link href={`/dashboard/${user?.id}`}>
            <Logo />
          </Link>
        </header>
      )}
      {typeof window !== 'undefined' && windowWidth && (
        <ul className="flex px-4 xs:px-0 justify-start xs:justify-center items-center  h-20">
          <li
            className="list-none lg:mx-2 mx-0  my-2 relative group grow xs:grow-0"
            key={Math.random()}
          >
            <Link
              href={`/dashboard/${user?.id}`}
              className="font-bold lg:text-2xl md:text-xl xs:text-base py-2 lg:px-7 px-4 text-black dark:text-white no-underline text-xl relative transition-all duration-350 ease-in-out"
            >
              {windowWidth > 479 ? 'Modelos' : '🤖'}
              <span className="absolute top-0 right-0 h-0 w-0 border-t border-r border-black dark:border-white opacity-0 group-hover:opacity-100 group-hover:h-[14px] group-hover:w-[14px] transition-all duration-350 ease-in-out transform -translate-x-full -translate-y-1/2"></span>
              <span className="absolute bottom-0 left-0 h-0 w-0 border-b border-l border-black dark:border-white opacity-0 group-hover:opacity-100 group-hover:h-[14px] group-hover:w-[14px] transition-all duration-350 ease-in-out transform translate-x-full translate-y-1/2"></span>
            </Link>
          </li>
          <li
            className="list-none lg:mx-2 mx-0 my-2 relative group grow xs:grow-0"
            key={Math.random()}
          >
            <Link
              href="/dashboard/examples"
              className="font-bold lg:text-2xl md:text-xl xs:text-base py-2 lg:px-7 px-4 text-black dark:text-white no-underline text-xl relative transition-all duration-350 ease-in-out"
            >
              {windowWidth > 479 ? 'Ejemplos' : '🔍'}
              <span className="absolute top-0 right-0 h-0 w-0 border-t border-r border-black dark:border-white opacity-0 group-hover:opacity-100 group-hover:h-[14px] group-hover:w-[14px] transition-all duration-350 ease-in-out transform -translate-x-full -translate-y-1/2"></span>
              <span className="absolute bottom-0 left-0 h-0 w-0 border-b border-l border-black dark:border-white opacity-0 group-hover:opacity-100 group-hover:h-[14px] group-hover:w-[14px] transition-all duration-350 ease-in-out transform translate-x-full translate-y-1/2"></span>
            </Link>
          </li>
          <li
            className="list-none lg:mx-2 mx-0 my-2 relative group grow xs:grow-0"
            key={Math.random()}
          >
            <Link
              href="/dashboard/shop"
              className="font-bold lg:text-2xl md:text-xl xs:text-base py-2 lg:px-7 px-4 text-black dark:text-white no-underline text-xl relative transition-all duration-350 ease-in-out"
            >
              {windowWidth > 479 ? 'Tienda' : '💰'}
              <span className="absolute top-0 right-0 h-0 w-0 border-t border-r border-black dark:border-white opacity-0 group-hover:opacity-100 group-hover:h-[14px] group-hover:w-[14px] transition-all duration-350 ease-in-out transform -translate-x-full -translate-y-1/2"></span>
              <span className="absolute bottom-0 left-0 h-0 w-0 border-b border-l border-black dark:border-white opacity-0 group-hover:opacity-100 group-hover:h-[14px] group-hover:w-[14px] transition-all duration-350 ease-in-out transform translate-x-full translate-y-1/2"></span>
            </Link>
          </li>
          <li
            className="list-none lg:mx-2 mx-0 my-2 relative group grow xs:grow-0"
            key={Math.random()}
          >
            <Link
              href={`/dashboard/tips`}
              className="font-bold lg:text-2xl md:text-xl xs:text-base py-2 lg:px-7 px-4 text-black dark:text-white no-underline text-xl relative transition-all duration-350 ease-in-out"
            >
              {windowWidth > 479 ? 'FAQs' : '📖'}
              <span className="absolute top-0 right-0 h-0 w-0 border-t border-r border-black dark:border-white opacity-0 group-hover:opacity-100 group-hover:h-[14px] group-hover:w-[14px] transition-all duration-350 ease-in-out transform -translate-x-full -translate-y-1/2"></span>
              <span className="absolute bottom-0 left-0 h-0 w-0 border-b border-l border-black dark:border-white opacity-0 group-hover:opacity-100 group-hover:h-[14px] group-hover:w-[14px] transition-all duration-350 ease-in-out transform translate-x-full translate-y-1/2"></span>
            </Link>
          </li>
          <li className="xs:absolute xs:right-4 xs:top-5 grow xs:grow-0 group xs:group ">
            <div className="max-w-screen-lg mx-auto flex justify-between items-center">
              <button
                onClick={handleLogout}
                className=" bg-white text-black border-black hover:bg-black hover:text-white dark:bg-black dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black border rounded py-2 px-4 transition-all"
              >
                {windowWidth > 768 ? 'Cerrar Sesión' : <HiLogout />}
              </button>
            </div>
          </li>
        </ul>
      )}
    </div>
  );
}
