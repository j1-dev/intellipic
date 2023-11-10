'use client';
import Link from 'next/link';
import supabase from '@/app/core/clients/supabase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { BsArrowReturnLeft } from 'react-icons/bs';
import Login from '@/components/Login';

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
            <Link className="inline-flex" href="/">
              <BsArrowReturnLeft size={40} />
              <h1 className="text-4xl font-bold mx-4 -translate-y-1">
                IntelliPic
              </h1>
            </Link>
            <Link
              href="/register"
              className=" bg-white text-black border-black hover:bg-black hover:text-white dark:bg-black dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black border rounded py-2 px-4 transition-all ml-auto "
            >
              {locale === 'es' ? 'Regístrate' : 'Register'}
            </Link>
          </nav>
        </header>
        <div className="min-h-screen flex flex-col justify-between">
          <div className="flex-1"></div>
          <div className="flex-1 flex items-center justify-center">
            {/* Your component goes here */}
            <Login />
          </div>
          <div className="flex-1"></div>
        </div>
      </div>
    );
  } else {
    router.push(`/dashboard/${session.user.id}`);
  }
}
