'use client'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
// import { supabase } from '../supabaseClient';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

export default function LoginPage(){
  const [user, setUser] = useState<User|undefined>(undefined);
  const router = useRouter();
  const supabase = useSupabaseClient()


  return (
    <Auth
      supabaseClient={supabase}
      appearance={{theme: ThemeSupa}}
      theme='dark'
      providers={[]}
    />
  );
}