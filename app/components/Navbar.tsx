'use client';
import 'tailwindcss/tailwind.css';
import React from 'react';
import { supabase } from '../supabaseClient';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const sub = async () => {
      await supabase.auth.getUser().then((u) => setUser(u.data.user));
    };
    sub();
  }, []);

  return (
    <div className="font-sans text-center bg-white dark:bg-black border-b-[1px] border-black dark:border-white shadow-sm transition-all">
      <ul className="flex justify-center items-center h-20">
        <li className="list-none mx-2 my-2 relative group" key={Math.random()}>
          <Link
            href={`/dashboard/${user?.id}`}
            className="font-bold lg:text-2xl md:text-xl xs:text-lg py-2 lg:px-7 px-4 text-black dark:text-white no-underline text-xl relative group-hover:text-gray-500 transition-all duration-350 ease-in-out"
          >
            Modelos
            <span className="absolute top-0 right-0 h-0 w-0 border-t border-r border-black dark:border-white opacity-0 group-hover:opacity-100 group-hover:h-[14px] group-hover:w-[14px] transition-all duration-350 ease-in-out transform -translate-x-full -translate-y-1/2"></span>
            <span className="absolute bottom-0 left-0 h-0 w-0 border-b border-l border-black dark:border-white opacity-0 group-hover:opacity-100 group-hover:h-[14px] group-hover:w-[14px] transition-all duration-350 ease-in-out transform translate-x-full translate-y-1/2"></span>
          </Link>
        </li>
        <li className="list-none mx-2 my-2 relative group" key={Math.random()}>
          <Link
            href={`/dashboard/${user?.id}/train`}
            className="font-bold lg:text-2xl md:text-xl xs:text-lg py-2 lg:px-7 px-4 text-black dark:text-white no-underline text-xl relative group-hover:text-gray-500 transition-all duration-350 ease-in-out"
          >
            Entrenar
            <span className="absolute top-0 right-0 h-0 w-0 border-t border-r border-black dark:border-white opacity-0 group-hover:opacity-100 group-hover:h-[14px] group-hover:w-[14px] transition-all duration-350 ease-in-out transform -translate-x-full -translate-y-1/2"></span>
            <span className="absolute bottom-0 left-0 h-0 w-0 border-b border-l border-black dark:border-white opacity-0 group-hover:opacity-100 group-hover:h-[14px] group-hover:w-[14px] transition-all duration-350 ease-in-out transform translate-x-full translate-y-1/2"></span>
          </Link>
        </li>
        <li className="list-none mx-2 my-2 relative group" key={Math.random()}>
          <Link
            href="/dashboard/examples"
            className="font-bold lg:text-2xl md:text-xl xs:text-lg py-2 lg:px-7 px-4 text-black dark:text-white no-underline text-xl relative group-hover:text-gray-500 transition-all duration-350 ease-in-out"
          >
            Ejemplos
            <span className="absolute top-0 right-0 h-0 w-0 border-t border-r border-black dark:border-white opacity-0 group-hover:opacity-100 group-hover:h-[14px] group-hover:w-[14px] transition-all duration-350 ease-in-out transform -translate-x-full -translate-y-1/2"></span>
            <span className="absolute bottom-0 left-0 h-0 w-0 border-b border-l border-black dark:border-white opacity-0 group-hover:opacity-100 group-hover:h-[14px] group-hover:w-[14px] transition-all duration-350 ease-in-out transform translate-x-full translate-y-1/2"></span>
          </Link>
        </li>
        <li className="list-none mx-2 my-2 relative group" key={Math.random()}>
          <Link
            href="/dashboard/shop"
            className="font-bold lg:text-2xl md:text-xl xs:text-lg py-2 lg:px-7 px-4 text-black dark:text-white no-underline text-xl relative group-hover:text-gray-500 transition-all duration-350 ease-in-out"
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
