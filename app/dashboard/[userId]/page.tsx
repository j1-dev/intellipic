"use client"
import { useParams } from "next/navigation"
import { supabase } from "@/app/supabaseClient";
import { useRouter } from 'next/navigation';


export default function DashboardPage(){
  const params = useParams();
  const router = useRouter();
  

  const handleLogout = async() => {
    console.log("dick")
    const { error } = await supabase.auth.signOut();
    router.refresh;
  } 
  
  return(
    <div>
      <span>hello {params.userId}</span>
      <button onClick={handleLogout}>logout</button>
    </div>

  )
}
