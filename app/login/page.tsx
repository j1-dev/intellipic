'use client'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '../supabaseClient';
import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

export default function LoginPage(){
  const [user, setUser] = useState<User|undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    const sub = async() => {
      const {data: s} = await supabase.auth.getSession()
      setUser(s.session?.user)
    }
    sub();
  })

  useEffect(()=>{
    console.log(user);
    if(!(user === undefined))
      router.push(`/dashboard/${user?.id}`)
  },[user])

  return (
    <Auth
      supabaseClient={supabase}
      appearance={{theme: ThemeSupa}}
      theme='dark'
      providers={[]}
      redirectTo='localhost:3000/login'
    />
  );
}