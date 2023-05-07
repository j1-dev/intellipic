'use client'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '../supabaseClient';

export default function LoginPage(){
  return (
    <Auth
      supabaseClient={supabase}
      appearance={{theme: ThemeSupa}}
      theme='dark'
      providers={[]}
    />
  );
}