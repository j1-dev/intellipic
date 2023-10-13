'use client';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BsArrowReturnLeft } from 'react-icons/bs';

export default function RecoveryPage() {
  const [session, setSession] = useState<any>(null);
  const locale = useLocale();
  const t = useTranslations('Recovery');

  //TODO: finish this function
  const handleResetPassword = () => {};

  if (!session) {
    return (
      <div>
        <header className="py-8">
          <nav className="max-w-screen-lg mx-auto flex justify-between items-center px-8">
            <Link className="inline-flex" href="/login">
              <BsArrowReturnLeft size={40} />
              <h1 className="text-4xl font-bold mx-4 -translate-y-1">
                Intellipic
              </h1>
            </Link>
          </nav>
        </header>
        <div className="flex-col max-w-screen-sm mx-auto lg:mt-28 md:mt-16 sm:mt-8 mt-6">
          <div className="text-center">
            <h1 className="text-8xl font-bold font-sans max-w-screen-sm m-auto h-28">
              {locale === 'es' ? 'Recuperar' : 'Recovery'}
            </h1>
            <div className="max-w-screen-xs border border-black dark:border-white rounded-lg m-auto">
              <form onSubmit={handleResetPassword}>
                <label htmlFor="email">{t('setEmail')}</label>
                <input type="text" id="email" />
                <button type="submit"></button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
  }
}
