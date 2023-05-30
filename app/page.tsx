'use client';
import { supabase } from './supabaseClient';
import Link from 'next/link';

export default async function Home() {
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <Link href="/login">login</Link>
        <span className="text-9xl m-auto">HOME</span>
        <Link href="/register">register</Link>
      </div>
      <button onClick={handleLogout}>logout</button>
    </main>
  );
}
