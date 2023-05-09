"use client"
import { useParams } from "next/navigation";
import { useRouter } from 'next/navigation';
import { supabase } from "@/app/supabaseClient";


export default function ExamplesPage(){
  const params = useParams();
  const router = useRouter();
  
  return(
    <div>
      <span>ejemplos y tal</span>
      <img height={"64px"} width={"64px"} src="https://i1.sndcdn.com/avatars-WggpF1kuVv0c2J13-ZXk6CA-t240x240.jpg" alt="puto maricon"/>
    </div>

  )
}
