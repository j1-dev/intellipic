'use client';
import supabase from '@/app/core/clients/supabase';
import { validateEmail } from '@/app/core/utils/validate';
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

  //TODO: finish this function
  const handleSendPasswordReset = async (e: any) => {
    e.preventDefault();
    if (validateEmail(email)) {
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

      <div className="block max-w-screen-xs mx-auto lg:mt-28 md:mt-16 sm:mt-8 mt-6 px-8">
        <h1 className="text-5xl font-bold font-sans max-w-screen-sm m-auto my-5">
          {locale === 'es' ? 'Recuperar' : 'Recovery'}
        </h1>
        <form
          onSubmit={handleSendPasswordReset}
          className="max-w-screen-sm p-4 bg-white dark:bg-black rounded-lg border border-black dark:border-white transition-all"
        >
          <label
            htmlFor="email"
            className="block font-semibold text-2xl text-black dark:text-white mb-2"
          >
            {t('setEmail')}
          </label>
          <input
            type="text"
            id="email"
            onChange={handleEmailChange}
            className="dark:bg-black w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-black focus:dark:border-white transition-all"
          />
          <button
            className="w-full my-8 disabled:dark:bg-black disabled:dark:text-white disabled:dark:border-white disabled:bg-white disabled:text-black border disabled:border-black bg-black text-white dark:bg-white dark:text-black py-2 px-4 mb-2 rounded-lg focus:outline-black focus:dark:outline-white  transition-all"
            type="submit"
          >
            {t('submit')}
          </button>
        </form>
      </div>
    </div>
  );
}
