'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useRouter } from 'next/navigation';
import SignUp from '../components/SignUp';
import Link from 'next/link';

export default function LoginPage() {
  const [session, setSession] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        const maxAge = 100 * 365 * 24 * 60 * 60; // 100 years, never expires
        document.cookie = `sb-access-token=${session?.access_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`;
        document.cookie = `sb-refresh-token=${session?.refresh_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`;
      }
    });

    return () => {
      subscription.unsubscribe();
      console.log(session);
      // router.push(`dashboard/${session.data.user.id}`)
    };
  }, []);

  if (!session) {
    return (
      <div>
        <header className="py-8">
          <nav className="max-w-screen-lg mx-auto flex justify-between items-center px-8">
            <h1 className="text-3xl font-bold">
              <Link href="/">Intellipic</Link>
            </h1>
            <button className=" bg-white text-black border-black hover:bg-black hover:text-white dark:bg-black dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black border rounded py-2 px-4 transition-all ml-auto ">
              <Link href="/register">Register</Link>
            </button>
          </nav>
        </header>
        <div className="flex-col max-w-screen-xs mx-auto lg:mt-28 md:mt-16 sm:mt-8 mt-6">
          <h1 className="text-9xl font-bold font-sans  w-fit m-auto ">Login</h1>
          <SignUp t={true} />
        </div>
      </div>
    );
  } else {
    router.push(`dashboard/${session.user.id}`);
  }
}
