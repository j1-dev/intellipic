"use client"
import { useParams } from "next/navigation";
import { useRouter } from 'next/navigation';
import { supabase } from "@/app/supabaseClient";


export default function DashboardPage(){
  const params = useParams();
  const router = useRouter();

  async function logout(){
    await supabase.auth.signOut().then(e => router.push("/"))
  }
  
  return(
    <div>
      <span>hello {params.userId}</span>
      <button onClick={logout}>logout</button>
    </div>

  )
}
