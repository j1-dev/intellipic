'use client';
import 'tailwindcss/tailwind.css';
import React from 'react';
import { supabase } from '../supabaseClient';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

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
    <div className="font-sans text-center bg-white dark:bg-black border-b-[1px] border-black dark:border-white shadow-sm transition-all ">
      <ul className="flex justify-end items-center h-20 px-8">
        <li className="list-none">
          <button
            onClick={handleLogout}
            className="bg-white text-black border-black hover:bg-black hover:text-white dark:bg-black dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black border rounded py-2 px-4 transition-all font-bold"
          >
            Log Out
          </button>
        </li>
      </ul>
      <ul className="flex justify-center items-center h-20">
        <li
          className="list-none lg:mx-2 mx-0  my-2 relative group"
          key={Math.random()}
        >
          <Link
            href={`/dashboard/${user?.id}`}
            className="font-bold lg:text-2xl md:text-xl xs:text-lg py-2 lg:px-7 px-4 text-black dark:text-white no-underline text-xl relative transition-all duration-350 ease-in-out"
          >
            Modelos
            <span className="absolute top-0 right-0 h-0 w-0 border-t border-r border-black dark:border-white opacity-0 group-hover:opacity-100 group-hover:h-[14px] group-hover:w-[14px] transition-all duration-350 ease-in-out transform -translate-x-full -translate-y-1/2"></span>
            <span className="absolute bottom-0 left-0 h-0 w-0 border-b border-l border-black dark:border-white opacity-0 group-hover:opacity-100 group-hover:h-[14px] group-hover:w-[14px] transition-all duration-350 ease-in-out transform translate-x-full translate-y-1/2"></span>
          </Link>
        </li>
        <li
          className="list-none lg:mx-2 mx-0 my-2 relative group"
          key={Math.random()}
        >
          <Link
            href={`/dashboard/${user?.id}/train`}
            className="font-bold lg:text-2xl md:text-xl xs:text-lg py-2 lg:px-7 px-4 text-black dark:text-white no-underline text-xl relative transition-all duration-350 ease-in-out"
          >
            Entrenar
            <span className="absolute top-0 right-0 h-0 w-0 border-t border-r border-black dark:border-white opacity-0 group-hover:opacity-100 group-hover:h-[14px] group-hover:w-[14px] transition-all duration-350 ease-in-out transform -translate-x-full -translate-y-1/2"></span>
            <span className="absolute bottom-0 left-0 h-0 w-0 border-b border-l border-black dark:border-white opacity-0 group-hover:opacity-100 group-hover:h-[14px] group-hover:w-[14px] transition-all duration-350 ease-in-out transform translate-x-full translate-y-1/2"></span>
          </Link>
        </li>
        <li
          className="list-none lg:mx-2 mx-0 my-2 relative group"
          key={Math.random()}
        >
          <Link
            href="/dashboard/examples"
            className="font-bold lg:text-2xl md:text-xl xs:text-lg py-2 lg:px-7 px-4 text-black dark:text-white no-underline text-xl relative transition-all duration-350 ease-in-out"
          >
            Ejemplos
            <span className="absolute top-0 right-0 h-0 w-0 border-t border-r border-black dark:border-white opacity-0 group-hover:opacity-100 group-hover:h-[14px] group-hover:w-[14px] transition-all duration-350 ease-in-out transform -translate-x-full -translate-y-1/2"></span>
            <span className="absolute bottom-0 left-0 h-0 w-0 border-b border-l border-black dark:border-white opacity-0 group-hover:opacity-100 group-hover:h-[14px] group-hover:w-[14px] transition-all duration-350 ease-in-out transform translate-x-full translate-y-1/2"></span>
          </Link>
        </li>
        <li
          className="list-none lg:mx-2 mx-0 my-2 relative group"
          key={Math.random()}
        >
          <Link
            href="/dashboard/shop"
            className="font-bold lg:text-2xl md:text-xl xs:text-lg py-2 lg:px-7 px-4 text-black dark:text-white no-underline text-xl relative transition-all duration-350 ease-in-out"
          >
            Tienda
            <span className="absolute top-0 right-0 h-0 w-0 border-t border-r border-black dark:border-white opacity-0 group-hover:opacity-100 group-hover:h-[14px] group-hover:w-[14px] transition-all duration-350 ease-in-out transform -translate-x-full -translate-y-1/2"></span>
            <span className="absolute bottom-0 left-0 h-0 w-0 border-b border-l border-black dark:border-white opacity-0 group-hover:opacity-100 group-hover:h-[14px] group-hover:w-[14px] transition-all duration-350 ease-in-out transform translate-x-full translate-y-1/2"></span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
