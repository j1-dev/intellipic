'use client';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { BsArrowReturnLeft } from 'react-icons/bs';
import { useRouter } from 'next/navigation';
import { validatePassword } from '@/app/core/utils/validate';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

type passwordRequirements = {
  length: boolean;
  uppercase: boolean;
  lowercase: boolean;
  number: boolean;
};

export default function RecoveryPage() {
  const supabase = createClientComponentClient();
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState();
  const [validPassword, setValidPassword] = useState<boolean>(false);
  const t = useTranslations('Reset');
  const router = useRouter();

  const handlePasswordChange = (e: any) => {
    setValidPassword(validatePassword(e.target?.value));
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
      <div className="block max-w-screen-xs mx-auto lg:mt-28 md:mt-16 sm:mt-8 mt-6 px-8">
        <h1 className="text-5xl font-bold font-sans max-w-screen-sm m-auto my-5">
          Reset
        </h1>
        <form
          onSubmit={handleResetPassword}
          className="max-w-screen-sm p-4 bg-white dark:bg-black rounded-lg border border-black dark:border-white transition-all"
        >
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block font-semibold text-2xl text-black dark:text-white mb-2"
            >
              {t('setPassword')}
            </label>
            <label
              htmlFor="password"
              className="block text-sm text-black dark:text-white mb-2"
            >
              {t('passwordRequirements')}
            </label>
            <input
              type="password"
              id="password"
              onChange={handlePasswordChange}
              className="dark:bg-black w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-black focus:dark:border-white transition-all"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="confirmation"
              className="block font-semibold text-2xl text-black dark:text-white mb-2"
            >
              {t('setConfirmation')}
            </label>
            <input
              type="password"
              id="confirmation"
              onChange={handleConfirmationChange}
              className="dark:bg-black w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-black focus:dark:border-white transition-all"
            />
          </div>
          <button
            className="w-full my-5 disabled:dark:bg-black disabled:dark:text-white disabled:dark:border-white disabled:bg-white disabled:text-black border disabled:border-black bg-black text-white dark:bg-white dark:text-black py-2 px-4 mb-2 rounded-lg focus:outline-black focus:dark:outline-white  transition-all"
            type="submit"
            disabled={password !== confirmation || !validPassword}
          >
            {t('submit')}
          </button>
        </form>
      </div>
    </div>
  );
}
