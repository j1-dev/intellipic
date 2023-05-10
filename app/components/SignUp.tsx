import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

import type { AuthError } from '@supabase/supabase-js';
import type { Session } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

function SignUp({t}:{t: boolean}) {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<AuthError|null>(null);
  const [toggle, setToggle] = useState<boolean>(t);
  const router = useRouter();

  const handleEmailChange = (e: any) => {
    setEmail(e.target?.value);
  };

  const handlePasswordChange = (e: any) => {
    setPassword(e.target?.value);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (toggle){
      // code for logging in
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError(error);
      } else {
        // const s = data.session as Session;
        // supabase.auth.setSession(s);
      }
    } else {
      // code for signing up
      await supabase.auth.admin.createUser({
        email: email,
        password: password,
        email_confirm: true,
      }).then(()=> router.push('/login'));
    };
  };
  

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-4 bg-gray-100 rounded-lg shadow-md">
      <div className="mb-4">
        <label htmlFor="email" className="block font-medium text-gray-700 mb-2">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          required
          className="w-full px-4 py-2 rounded-lg shadow-md border border-gray-300 focus:outline-none focus:border-indigo-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block font-medium text-gray-700 mb-2">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          required
          className="w-full px-4 py-2 rounded-lg shadow-md border border-gray-300 focus:outline-none focus:border-indigo-500"
        />
      </div>
      <div>
        <button type="submit" className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">{toggle ? "Sign In" : "Sign up"}</button>
        <a href={toggle ? '/register':'/login'}>{toggle ? "Don't have an account? click here!" : "Already have an account? click here!"}</a>
        {toggle && (<button >Reset password</button>)}
      </div>
      {/* {error && <div className="text-red-500 mt-4">{error}</div>} */}
    </form>
  );
}

export default SignUp;