'use client';
import Link from 'next/link';
import SignUp from '@/components/SignUp';
import supabase from '@/app/core/clients/supabase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
useLocale;

export default function LoginPage() {
  const [session, setSession] = useState<any>(null);
  const router = useRouter();
  const locale = useLocale();

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
            <Link
              href="/register"
              className=" bg-white text-black border-black hover:bg-black hover:text-white dark:bg-black dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black border rounded py-2 px-4 transition-all ml-auto "
            >
              {locale === 'es' ? 'Regístrate' : 'Register'}
            </Link>
          </nav>
        </header>
        <div className="flex-col max-w-screen-xl mx-auto lg:mt-28 md:mt-16 sm:mt-8 mt-6">
          <div className="text-center">
            <h1 className="text-9xl font-bold font-sans max-w-screen-xs m-auto h-32">
              Log in
            </h1>
          </div>
          <SignUp t={true} />
        </div>
      </div>
    );
  } else {
    router.push(`/dashboard/${session.user.id}`);
  }
}
