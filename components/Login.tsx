'use client';
import React, { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { useTranslations } from 'next-intl';

function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const supabase = createClientComponentClient();
  const tr = useTranslations('Signup');

  const handleEmailChange = (e: any) => {
    setEmail(e.target?.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target?.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // code for logging in
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) {
      toast.error(error.message);
    } else {
      setLoading(true);
      toast.success(tr('loggingIn'));
      router.push(`/dashboard/${data.user.id}`);
    }
  };

  return (
    <div className="block max-w-screen-xs m-auto items-center justify-center mt-10 px-8">
      <h1 className="text-5xl my-5 font-bold font-sans max-w-screen-xs ">
        {tr('login')}
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
            className="block font-semibold text-2xl text-black dark:text-white mb-2"
          >
            {tr('passwordLabel')}
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
        <div>
          <button
            type="submit"
            className="w-full disabled:dark:bg-black disabled:dark:text-white disabled:dark:border-white disabled:bg-white disabled:text-black border disabled:border-black bg-black text-white dark:bg-white dark:text-black py-2 px-4 my-4 rounded-lg focus:outline-black focus:dark:outline-white  transition-all"
          >
            {tr('login')}
          </button>
          <Link href="/register" className="hover:underline">
            {tr('noAccount')}
          </Link>

          <button
            onClick={(e: any) => {
              e.preventDefault();
              router.push('/recovery');
            }}
            className="block hover:underline"
          >
            {tr('forgotPass')}
          </button>
        </div>
      </form>
      {loading && <div className="my-3 w-full text center">Cargando...</div>}
    </div>
  );
}

export default Login;
