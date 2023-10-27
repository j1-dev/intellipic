'use client';
import React, { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { AuthError } from '@supabase/supabase-js';
import type { UserResponse } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { useTranslations } from 'next-intl';
import { validateEmail, validatePassword } from '@/app/core/utils/validate';

function Register() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmation, setConfirmation] = useState<string>('');
  const [tos, setTos] = useState<boolean>(false);
  const [validEmail, setValidEmail] = useState<boolean>(false);
  const [validPassword, setValidPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const supabase = createClientComponentClient();
  const tr = useTranslations('Signup');

  const handleEmailChange = (e: any) => {
    setValidEmail(validateEmail(e.target?.value));
    setEmail(e.target?.value);
    console.log(validateEmail(e.target?.value));
  };

  const handlePasswordChange = (e: any) => {
    setValidPassword(validatePassword(e.target?.value));
    setPassword(e.target?.value);
    console.log(validatePassword(e.target?.value));
  };

  const handleConfirmationChange = (e: any) => {
    setConfirmation(e.target?.value);
  };

  const passwordsMatch = () => {
    return password === confirmation;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (
      validateEmail(email) &&
      validatePassword(password) &&
      passwordsMatch()
    ) {
      setLoading(true);
      await supabase.auth
        .signUp({
          email: email,
          password: password
        })
        .catch((error) => {
          toast.error(error.message);
        })
        .then(async (data) => {
          const resData = data as UserResponse;
          // const { error } = await supabase.from('user-data').insert({
          //   id: resData?.data?.user?.id,
          //   dataset: null,
          //   run_id: null,
          //   model_tokens: null,
          //   image_tokens: null,
          //   last_payment_id: null,
          //   last_payment_status: null
          // });
          // await fetch(`/api/ai/${resData?.data?.user?.id}/nu`);
          // console.log(resData?.data?.user?.id);
          toast.success(tr('verifyEmail'));
          setLoading(false);
        });
    } else if (!validateEmail(email)) {
      toast.error(tr('wrongEmailFormat'));
    } else {
      toast.error(tr('wrongPasswordFormat'));
    }
  };

  return (
    <div className="block max-w-screen-xs m-auto items-center justify-center mt-10">
      <h1 className="text-5xl my-5 font-bold font-sans max-w-screen-xs ">
        {tr('register')}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-screen-sm p-4 bg-white dark:bg-black rounded-lg border border-black dark:border-white transition-all"
      >
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block font-semibold text-2xl text-black dark:text-white mb-2"
          >
            {tr('emailLabel')}
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
            className="dark:bg-black w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-black focus:dark:border-white transition-all"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block font-semibold text-2xl text-black dark:text-white"
          >
            {tr('passwordLabel')}
          </label>
          <label
            htmlFor="password"
            className="block text-sm text-black dark:text-white mb-2"
          >
            {tr('passwordRequirements')}
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
            className="dark:bg-black w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-black focus:dark:border-white transition-all"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="confirmation"
            className="block font-semibold text-2xl text-black dark:text-white mb-2"
          >
            {tr('confirmPassword')}
          </label>
          <input
            type="password"
            id="confirmation"
            value={confirmation}
            onChange={handleConfirmationChange}
            required
            className="dark:bg-black w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-black focus:dark:border-white transition-all"
          />
        </div>

        <div>
          <input
            className="mb-4 mr-1"
            type="checkbox"
            name="tos"
            id="tos"
            checked={tos}
            onChange={() => setTos(!tos)}
          />{' '}
          <label htmlFor="tos">
            {tr('acceptThe')}{' '}
            <Link className="z-50 hover:underline" href={'/tos'}>
              {tr('terms')}
            </Link>
          </label>
        </div>

        <div>
          <button
            type="submit"
            className="w-full disabled:dark:bg-black disabled:dark:text-white disabled:dark:border-white disabled:bg-white disabled:text-black border disabled:border-black bg-black text-white dark:bg-white dark:text-black py-2 px-4 mb-2 rounded-lg focus:outline-black focus:dark:outline-white  transition-all"
            disabled={
              !tos || !validEmail || !validPassword || password !== confirmation
            }
          >
            {tr('register')}
          </button>
          <Link href="/login" className="hover:underline">
            {tr('alreadyAccount')}
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
