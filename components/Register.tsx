'use client';
import React, { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { useTranslations } from 'next-intl';
import { validateEmail, validatePassword } from '@/app/core/utils/validate';
import { Dialog } from '@headlessui/react';
import { ClipLoader } from 'react-spinners';
import { useTheme } from '@/app/core/utils/ThemeContext';
import { UserResponse } from '@supabase/supabase-js';
import { BsCheckCircle, BsXCircle } from 'react-icons/bs';

function Register() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmation, setConfirmation] = useState<string>('');
  const [tos, setTos] = useState<boolean>(false);
  const [validEmail, setValidEmail] = useState<boolean>(false);
  const [validPassword, setValidPassword] = useState<boolean>(false);
  const [validConfirmation, setValidConfirmation] = useState<boolean>(false);
  const [registered, setRegistered] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const supabase = createClientComponentClient();
  const { enabled } = useTheme();
  const tr = useTranslations('Signup');

  const handleEmailChange = (e: any) => {
    setValidEmail(validateEmail(e.target?.value));
    setEmail(e.target?.value);
  };

  const handlePasswordChange = (e: any) => {
    setValidPassword(validatePassword(e.target?.value));
    setPassword(e.target?.value);
  };

  const handleConfirmationChange = (e: any) => {
    console.log(passwordsMatch());
    console.log(validPassword);
    console.log(validConfirmation);

    setValidConfirmation(passwordsMatch() && validatePassword(confirmation));
    setConfirmation(e.target?.value);
  };

  const passwordsMatch = () => {
    return password === confirmation;
  };

  const closeModal = () => {
    setRegistered(false);
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
          const { error } = await supabase.from('user-data').insert({
            id: resData?.data?.user?.id,
            dataset: null,
            run_id: null,
            model_tokens: null,
            image_tokens: null,
            last_payment_id: null,
            last_payment_status: null
          });
          await fetch(`/api/ai/${resData?.data?.user?.id}/nu`);
          console.log(resData?.data?.user?.id);
          toast.success(tr('verifyEmail'));
          setRegistered(true);
          setLoading(false);
        });
    } else if (!validateEmail(email)) {
      toast.error(tr('wrongEmailFormat'));
    } else {
      toast.error(tr('wrongPasswordFormat'));
    }
  };

  return (
    <div className="block max-w-screen-xs m-auto items-center justify-center mt-10 px-8">
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
          <div className="relative">
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
              className="dark:bg-black w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-black focus:dark:border-white transition-all"
            />
            <div
              className={`absolute top-1/2 -translate-y-[10px] right-4 ${
                email.length > 0 ? 'opacity-100' : 'opacity-0'
              } transition-all`}
            >
              {!!email && email.length > 0 && validEmail ? (
                <BsCheckCircle size={20} color="#4FEB40" />
              ) : (
                <div className="tooltip" data-tip={tr('wrongEmailFormat')}>
                  <BsXCircle size={20} color="#FF1221" />
                </div>
              )}
            </div>
          </div>
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
          <div className="relative ">
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
              className="dark:bg-black w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-black focus:dark:border-white transition-all"
            />
            <div
              className={`absolute top-1/2 -translate-y-[10px] right-4 ${
                password.length > 0 ? 'opacity-100' : 'opacity-0'
              } transition-all`}
            >
              {!!password && password.length > 0 && validPassword ? (
                <BsCheckCircle size={20} color="#4FEB40" />
              ) : (
                <div className="tooltip" data-tip={tr('wrongPasswordError')}>
                  <BsXCircle size={20} color="#FF1221" />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="confirmation"
            className="block font-semibold text-2xl text-black dark:text-white mb-2"
          >
            {tr('confirmPassword')}
          </label>
          <div className="relative">
            <input
              type="password"
              id="confirmation"
              value={confirmation}
              onChange={handleConfirmationChange}
              required
              className="dark:bg-black w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-black focus:dark:border-white transition-all"
            />
            <div
              className={`absolute top-1/2 -translate-y-[10px] right-4 ${
                confirmation.length > 0 ? 'opacity-100' : 'opacity-0'
              } transition-all`}
            >
              {!!confirmation &&
              confirmation.length > 0 &&
              passwordsMatch() &&
              validatePassword(confirmation) ? (
                <BsCheckCircle size={20} color="#1FFF10" />
              ) : (
                <div
                  className="tooltip"
                  data-tip={tr('wrongConfirmationError')}
                >
                  <BsXCircle size={20} color="#FF1221" />
                </div>
              )}
            </div>
          </div>
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
            className="w-full disabled:dark:bg-gray-800 disabled:dark:text-gray-600 disabled:dark:border-gray-800 disabled:bg-gray-300 disabled:text-gray-400 border disabled:border-gray-400 bg-black text-white dark:bg-white dark:text-black py-2 px-4 mb-2 rounded-lg dark:hover:bg-gray-300 hover:bg-gray-800 transition-all"
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
      {loading && (
        <div className="my-3 w-full text-center">
          <ClipLoader
            size={40}
            speedMultiplier={0.5}
            color={`${enabled ? 'white' : 'black'}`}
          />
        </div>
      )}
      {registered && (
        <Dialog
          open={true}
          onClose={closeModal}
          className="fixed inset-0 z-40 overflow-y-auto"
        >
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white dark:bg-black border border-black dark:border-white z-50 w-full max-w-lg p-6 rounded-lg transition-all">
              <Dialog.Title className="text-2xl font-bold mb-4">
                {tr('verifyEmail')}
              </Dialog.Title>
              <BsCheckCircle
                size={100}
                color="#4FEB40"
                className="w-50 m-auto"
              />
              <button
                className="w-full mt-4 hover:dark:bg-black hover:dark:text-white hover:dark:border-white hover:bg-white hover:text-black border hover:border-black bg-black text-white dark:bg-white dark:text-black py-2 px-4 mb-2 rounded-lg transition-all"
                onClick={() => setRegistered(false)}
              >
                {tr('exit')}
              </button>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
}

export default Register;
