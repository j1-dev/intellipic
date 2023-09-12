'use client';
import SignUp from '@/components/SignUp';
import supabase from '@/app/core/clients/supabase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function RegisterPage() {
  const [session, setSession] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
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
              href="/login"
              className=" bg-white text-black border-black hover:bg-black hover:text-white dark:bg-black dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-black border rounded py-2 px-4 transition-all ml-auto "
            >
              Inicia sesión
            </Link>
          </nav>
        </header>
        <div className="flex-col max-w-screen-sm mx-auto lg:mt-28 md:mt-16 sm:mt-8 mt-6">
          <div className="text-center">
            <h1 className="text-8xl font-bold font-sans max-w-screen-sm m-auto h-28">
              Regístrate
            </h1>
          </div>
          <SignUp t={false} />
        </div>
      </div>
    );
  } else {
    router.push(`/dashboard/${session.user.id}/`);
  }
}
