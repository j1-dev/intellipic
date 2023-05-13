"use client"
import { useParams } from "next/navigation";
import { useRouter } from 'next/navigation';
import { supabase } from "@/app/supabaseClient";
import styles from "../../../Home.module.css";
import Image from 'next/image'
import Prompts from "@/app/components/Prompts";

export default function ExamplesPage(){
  const params = useParams();
  const router = useRouter();
  
return(
    <div>
      <Prompts />
    </div>
  )
}
