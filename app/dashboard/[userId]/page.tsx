"use client"
import { useParams } from "next/navigation";
import { useRouter } from 'next/navigation';
import { supabase } from "@/app/supabaseClient";


export default function DashboardPage(){
  const params = useParams();
  const router = useRouter();

  async function logout(){
    supabase.auth.signOut().then(() => {
      const expires = new Date(0).toUTCString()
      document.cookie = `sb-access-token=; path=/; expires=${expires}; SameSite=Lax; secure`
      document.cookie = `sb-refresh-token=; path=/; expires=${expires}; SameSite=Lax; secure`
    })
    .then(()=>{
      router.push("/")
    });
  }
  
  return(
    <div>
      <span>hello {params.userId}</span>
      <button onClick={logout}>logout</button>
    </div>

  )
}
