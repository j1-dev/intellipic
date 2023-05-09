"use client"
import { useParams } from "next/navigation";
import { useRouter } from 'next/navigation';
import { supabase } from "@/app/supabaseClient";


export default function ShopPage(){
  const params = useParams();
  const router = useRouter();
  
  return(
    <div>
      <span>la tienda en casa</span>
      <img height={"64px"} width={"64px"} src="https://i1.sndcdn.com/avatars-000590684379-a7bivd-t240x240.jpg" alt="bababooey"/>
    </div>

  )
}
