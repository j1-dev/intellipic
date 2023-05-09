"use client"
import { useParams } from "next/navigation";
import { useRouter } from 'next/navigation';
import { supabase } from "@/app/supabaseClient";


export default function ModelPage(){
  const params = useParams();
  const router = useRouter();
  
  return(
    <div>
      <span>its training time</span>
      <button onClick={()=>alert("maricon")}>train</button>
    </div>

  )
}
