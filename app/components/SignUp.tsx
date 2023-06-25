'use client';
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import type { AuthError } from '@supabase/supabase-js';
import type { Session } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

function SignUp({ t }: { t: boolean }) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<AuthError | null>(null);
  const [toggle, setToggle] = useState<boolean>(t);
  const router = useRouter();

  const handleEmailChange = (e: any) => {
    setEmail(e.target?.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target?.value);
  };

  useEffect(() => {
    console.log(t);
  }, [t]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (toggle) {
      // code for logging in
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) {
        setError(error);
        toast.error(error.message);
      } else {
        toast.success('Logged in successfully!');
      }
    } else {
      // code for signing up
      await supabase.auth.admin
        .createUser({
          email: email,
          password: password,
          email_confirm: true
        })
        .then(() => {
          toast.success('Signed up successfully!');
          router.push('/login');
        })
        .catch((error) => {
          toast.error(error.message);
        });
    }
  };

  return (
    <div className="flex items-center justify-center mt-10">
      <form
        onSubmit={handleSubmit}
        className="max-w-sm p-4 bg-white dark:bg-black rounded-lg border border-black dark:border-white"
      >
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block font-medium text-gray-700 dark:text-white mb-2"
          >
            Email:
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
            className="block font-medium text-gray-700 dark:text-white mb-2"
          >
            Password:
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
            className="w-full bg-black text-white dark:bg-white dark:text-black py-2 px-4 mb-2 rounded-lg focus:outline-black focus:dark:outline-white  transition-all"
          >
            {toggle ? 'Sign In' : 'Sign up'}
          </button>
          <Link href={toggle ? '/register' : '/login'}>
            {toggle
              ? "Don't have an account? click here!"
              : 'Already have an account? click here!'}
          </Link>
          {toggle && <button className="block">Reset password</button>}
        </div>
        {/* {error && <div className="text-red-500 mt-4">{error}</div>} */}
      </form>
    </div>
  );
}

export default SignUp;
