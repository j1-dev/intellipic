"use client"
import { useParams } from "next/navigation";
import { supabase } from "@/app/supabaseClient";
import { useEffect, useState } from "react";
import ModelCard from "@/app/components/ModelCard";
import { PulseLoader } from "react-spinners";


export default function DashboardPage(){
  const params = useParams();
  const user = params.userId;
  const [models, setModels] = useState<any>();

  useEffect(() => {
    const sub = async() => {
      await supabase
        .from("trainings")
        .select("*")
        .eq("user_id", user)
        .then((data)=>{
          setModels(data?.data)
        })
    }

    sub()
  }, [])
  


  // async function logout(){
  //   supabase.auth.signOut().then(() => {
  //     const expires = new Date(0).toUTCString()
  //     document.cookie = `sb-access-token=; path=/; expires=${expires}; SameSite=Lax; secure`
  //     document.cookie = `sb-refresh-token=; path=/; expires=${expires}; SameSite=Lax; secure`
  //   })
  //   .then(()=>{
  //     router.push("/")
  //   });
  // }
  
  return(
    <div>
      {!!models ? (
        <div className="grid grid-cols-4 grid-flow-col">
          {models.map((data: any) => {
            const props={
              userId: data.user_id as string,
              modelId: data.run_id as string,
              token: data.prompt_token as string,
              status: data.status as string
            };
            // console.log(data)
            return(
              <ModelCard props={props} key={data.run_id}></ModelCard>
            )
          })}
        </div>
      ):(
        <div className="w-40 m-auto mt-24">
          <PulseLoader color="#B6B6B6" />
        </div>
      )}
    </div>

  )
}
