'use client'
import { useState, useEffect } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '../supabaseClient'
import { useRouter } from 'next/navigation'
import SignUp from '../components/SignUp'

export default function App() {
  const [session, setSession] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    })
      
    return () => {
      subscription.unsubscribe();
      console.log(session);
      // router.push(`dashboard/${session.data.user.id}`)
    }
  },[])

  if (!session) {
    return (<SignUp t={true}/>)
  }
  else {
    router.push(`dashboard/${session.user.id}`)
  }
}