'use client';
import supabase from '@/app/core/clients/supabase';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { BsArrowReturnLeft } from 'react-icons/bs';
import { useRouter } from 'next/navigation';
import { validatePassword } from '@/app/core/utils/validate';

type passwordRequirements = {
  length: boolean;
  uppercase: boolean;
  lowercase: boolean;
  number: boolean;
};

export default function RecoveryPage() {
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState();
  const t = useTranslations('Reset');
  const router = useRouter();

  const handlePasswordChange = (e: any) => {
    setPassword(e.target?.value);
  };

  const handleConfirmationChange = (e: any) => {
    setConfirmation(e.target?.value);
  };

  const handleResetPassword = (e: any) => {
    e.preventDefault();
    if (validatePassword(password) && password === confirmation) {
      supabase.auth.updateUser({ password: password });
      toast.success(t('passwordRestablished'));
      router.push('login');
    } else if (!validatePassword(password)) {
      toast.error(t('InvalidPassword'));
    } else {
      toast.error(t('noMatch'));
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
      <div className="flex-col max-w-screen-xs text-center mx-auto lg:mt-28 md:mt-16 sm:mt-8 mt-6">
        <h1 className="text-8xl font-bold font-sans max-w-screen-sm m-auto h-28">
          Reset
        </h1>
        <div className="max-w-screen-xs border border-black dark:border-white rounded-lg m-auto py-6">
          <form
            onSubmit={handleResetPassword}
            className="text-left flex-col grid px-3 py-2"
          >
            <label htmlFor="password" className="text-3xl font-semibold p-3">
              {t('setPassword')}
            </label>
            <input
              type="password"
              id="password"
              onChange={handlePasswordChange}
              className="m-3 text-xl dark:bg-black px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-black focus:dark:border-white transition-all"
            />

            <label
              htmlFor="confirmation"
              className="text-3xl font-semibold p-3"
            >
              {t('setConfirmation')}
            </label>
            <input
              type="password"
              id="confirmation"
              onChange={handleConfirmationChange}
              className="m-3 text-xl dark:bg-black px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-black focus:dark:border-white transition-all"
            />
            <button
              className="mx-20 mt-3 bg-green-600 text-white border-green-600 hover:text-black dark:text-white dark:border-white hover:bg-white dark:hover:text-white dark:hover:bg-black border rounded transition-all p-3 m-3"
              type="submit"
            >
              {t('submit')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
