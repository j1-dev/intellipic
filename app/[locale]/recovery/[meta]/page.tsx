'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BsArrowReturnLeft } from 'react-icons/bs';

//TODO: Figure out how to make reseting password safe
export default function RegisterPage() {
  const [session, setSession] = useState<any>(null);

  if (!session) {
    return (
      <div>
        <header className="py-8">
          <nav className="max-w-screen-lg mx-auto flex justify-between items-center px-8">
            <Link className="inline-flex" href="/">
              <BsArrowReturnLeft size={40} />
              <h1 className="text-4xl font-bold mx-4 -translate-y-1">
                Intellipic
              </h1>
            </Link>
          </nav>
        </header>
        <div className="flex-col max-w-screen-sm mx-auto lg:mt-28 md:mt-16 sm:mt-8 mt-6"></div>
      </div>
    );
  } else {
  }
}
