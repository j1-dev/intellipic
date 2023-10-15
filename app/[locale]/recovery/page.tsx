'use client';
import supabase from '@/app/core/clients/supabase';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { BsArrowReturnLeft } from 'react-icons/bs';

export default function RecoveryPage() {
  const [email, setEmail] = useState<any>(null);
  const locale = useLocale();
  const t = useTranslations('Recovery');

  const handleEmailChange = (e: any) => {
    setEmail(e.target?.value);
  };

  function ValidateEmail(input: string) {
    var validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (input.match(validRegex)) {
      return true;
    } else {
      return false;
    }
  }

  //TODO: finish this function
  const handleSendPasswordReset = async (e: any) => {
    e.preventDefault();
    if (ValidateEmail(email)) {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email);
      console.log(data);
      if (!error) {
        toast.success(t('correctEmail'));
      } else {
        toast.error(error.message);
      }
    } else {
      toast.error(t('wrongEmailFormat'));
    }
  };

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
          <div className="max-w-screen-xs border border-black dark:border-white rounded-lg m-auto py-6">
            <form
              onSubmit={handleSendPasswordReset}
              className="text-left flex-col grid px-3 py-2"
            >
              <label htmlFor="email" className="text-4xl font-semibold p-3">
                {t('setEmail')}
              </label>
              <input
                type="text"
                id="email"
                onChange={handleEmailChange}
                className="m-3 border-b-[1px] border-gray-300 focus:border-gray-500 outline-0 transition-all "
              />
              <button
                className="w-max bg-green-600 text-white border-green-600 hover:text-black dark:text-white dark:border-white hover:bg-white dark:hover:text-white dark:hover:bg-black border rounded transition-all p-3 m-3"
                type="submit"
              >
                {t('submit')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}