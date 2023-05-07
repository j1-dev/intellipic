// This is the main api route that returns the user's data when called
// should work the same as user_data from previous main.py
// TODO: Define request and response shape
// TODO: Create the function itself

import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../supabaseClient";

// TODO: Fix function pls
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const SUPABASE_TABLE_NAME = "finetuningruns"
  const userId = req.query.userId as string;

  await supabase
    .from(SUPABASE_TABLE_NAME)
    .select()
    .eq('user_id', userId)
    .then(async (data) => {
      if(data.data?.length === 0){
        supabase.from(SUPABASE_TABLE_NAME).insert({user_id: userId})
      }
      const userData = data.data?.[0];
      await fetch(`https://dreambooth-api-experimental.replicate.com/v1/trainings/${userData?.run_id}`,{
          headers: {
            Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
            "Content-Type": "application/json",
          },
        })
          .then((model) => model.json())
          .then((values) => {
            return res.status(200).json({dataset: userData?.dataset, run_id: userData?.run_id,run_data:{status: values.status}})
          })
    })
}

export default handler;
