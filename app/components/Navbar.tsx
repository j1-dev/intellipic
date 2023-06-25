'use client';
import 'tailwindcss/tailwind.css';
import React from 'react';
import { supabase } from '../supabaseClient';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { HiLogout } from 'react-icons/hi';

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [screenSize, setScreenSize] = useState<any>(getCurrentDimension());
  const router = useRouter();

  useEffect(() => {
    const sub = async () => {
      await supabase.auth.getUser().then((u) => setUser(u.data.user));
    };
    sub();
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const updateDimension = () => {
        setScreenSize(getCurrentDimension());
      };
      window.addEventListener('resize', updateDimension);

      return () => {
        window.removeEventListener('resize', updateDimension);
      };
    }
  }, [screenSize]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push('/');
  };

  function getCurrentDimension() {
    if (typeof window !== 'undefined') {
      console.log(screenSize);
      return {
        width: window.innerWidth,
        height: window.innerHeight
      };
    } else {
      return {
        width: 1000,
        height: 1000
      };
    }
  }

  return (
    <div className="relative font-sans text-center bg-white dark:bg-black border-b-[1px] border-black dark:border-white shadow-sm transition-all ">
      {/* <ul className="flex justify-end items-center h-20 px-8">
        <li className="list-none">
          <button
            onClick={handleLogout}
            className="absolute top-10 right-10 bg-white text-black border-black hover:bg-black hover:text-white dark:bg-black dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black border rounded py-2 px-4 transition-all font-bold"
          >
            Log Out
          </button>
        </li>
      </ul> */}
      <ul className="flex justify-center items-center h-20">
        <li
          className="list-none lg:mx-2 mx-0  my-2 relative group"
          key={Math.random()}
        >
          <Link
            href={`/dashboard/${user?.id}`}
            className="font-bold lg:text-2xl md:text-xl xs:text-base py-2 lg:px-7 px-4 text-black dark:text-white no-underline text-xl relative transition-all duration-350 ease-in-out"
          >
            {screenSize.width >= 450 ? 'Modelos' : '🤖'}
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
            className="font-bold lg:text-2xl md:text-xl xs:text-base py-2 lg:px-7 px-4 text-black dark:text-white no-underline text-xl relative transition-all duration-350 ease-in-out"
          >
            {screenSize.width >= 450 ? 'Entrenar' : '🦾'}
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
            className="font-bold lg:text-2xl md:text-xl xs:text-base py-2 lg:px-7 px-4 text-black dark:text-white no-underline text-xl relative transition-all duration-350 ease-in-out"
          >
            {screenSize.width >= 450 ? 'Ejemplos' : '🔍'}
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
            className="font-bold lg:text-2xl md:text-xl xs:text-base py-2 lg:px-7 px-4 text-black dark:text-white no-underline text-xl relative transition-all duration-350 ease-in-out"
          >
            {screenSize.width >= 450 ? 'Tienda' : '💰'}
            <span className="absolute top-0 right-0 h-0 w-0 border-t border-r border-black dark:border-white opacity-0 group-hover:opacity-100 group-hover:h-[14px] group-hover:w-[14px] transition-all duration-350 ease-in-out transform -translate-x-full -translate-y-1/2"></span>
            <span className="absolute bottom-0 left-0 h-0 w-0 border-b border-l border-black dark:border-white opacity-0 group-hover:opacity-100 group-hover:h-[14px] group-hover:w-[14px] transition-all duration-350 ease-in-out transform translate-x-full translate-y-1/2"></span>
          </Link>
        </li>
        <li
          className="list-none lg:mx-2 mx-0 my-2 relative group"
          key={Math.random()}
        >
          <button
            onClick={handleLogout}
            className=" bg-white text-black border-black hover:bg-black hover:text-white dark:bg-black dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black border rounded py-2 px-4 transition-all"
          >
            {screenSize.width >= 450 ? 'Logout' : <HiLogout />}
          </button>
        </li>
      </ul>
    </div>
  );
}
