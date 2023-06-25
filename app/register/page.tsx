'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useRouter } from 'next/navigation';
import SignUp from '../components/SignUp';

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
      console.log(session);
      // router.push(`dashboard/${session.data.user.id}`)
    };
  }, []);

  if (!session) {
    return (
      <div className="flex-col max-w-screen-xs mx-auto mt-48">
        <h1 className="text-9xl font-bold font-sans  w-fit m-auto ">
          Register
        </h1>
        <SignUp t={false} />
      </div>
    );
  } else {
    router.push(`dashboard/${session.user.id}`);
  }
}
