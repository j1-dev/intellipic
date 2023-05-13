"use client"
import { useParams } from "next/navigation";
import { useRouter } from 'next/navigation';
import { supabase } from "@/app/supabaseClient";
import styles from "../../../Home.module.css";

export default function ExamplesPage(){
  const params = useParams();
  const router = useRouter();
  
return(
  <div className="BidD, align-middle, h-2">
    <div className="Vikingo">
    <a href="#" className="block max-w-sm p-9 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Instrucciones para crear un Avatar Vikingo</h5>
    <h6 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">Conviértete en un vikingo con nuestra guía de IA gratuita</h6>
    <p className="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
    </a>
    </div>
    <div>
    <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
    <p className="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
    </a>
    </div>
    <div>
    <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
    <p className="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
    </a>
    </div>
    <div>
    <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
    <p className="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
    </a>
    </div>
    <div>
    <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
    <p className="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
    </a>
    </div>
    </div>
   

  )
}
