'use client';
import React, { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { AuthError } from '@supabase/supabase-js';
import type { UserResponse } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

function SignUp({ t }: { t: boolean }) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<AuthError | null>(null);
  const [toggle, setToggle] = useState<boolean>(t);
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleEmailChange = (e: any) => {
    setEmail(e.target?.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target?.value);
  };

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
        router.push(`/dashboard/${data.user.id}`);
      }
    } else {
      // code for signing up
      await supabase.auth.admin
        .createUser({
          email: email,
          password: password,
          email_confirm: true
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
          router.push('/login');
        });
    }
  };

  return (
    <div className="flex items-center justify-center mt-10">
      <form
        onSubmit={handleSubmit}
        className="max-w-sm p-4 bg-white dark:bg-black rounded-lg border border-black dark:border-white transition-all"
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
            Contraseña:
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
            {toggle ? 'Iniciar Sesión' : 'Regristrarse'}
          </button>
          <Link href={toggle ? '/register' : '/login'}>
            {toggle
              ? 'No tienes cuenta? Entra aqui!'
              : 'Ya tienes cuenta? Entra aqui!'}
          </Link>
          {toggle && (
            <button className="block">Olvidaste tu Contraseña?</button>
          )}
        </div>
      </form>
    </div>
  );
}

export default SignUp;