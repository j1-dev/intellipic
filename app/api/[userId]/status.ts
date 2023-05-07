// this api route checks the status of the model
// should work the same as model_status from previous main.py
// TODO: Define request and response shape
// TODO: Create the function itself

// req.body = {
//   url: fineTuningData.dataset,
//   prompt: instanceName,
//   instance_type: instanceType,
// }

// res.body = {
//   run_id: model.id;
// }

import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../supabaseClient";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const SUPABASE_TABLE_NAME = "finetuningruns"
  const userId = req.query.userId as string;

  await supabase
    .from(SUPABASE_TABLE_NAME)
    .select("*")
    .eq("user_id", userId)
    .then(async (data) => {
      const runId = data.data?.[0].run_id;
      if (!(runId === null)){
        await fetch(`https://dreambooth-api-experimental.replicate.com/v1/trainings/${runId}`,{
          headers: {
            Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
            "Content-Type": "application/json",
          },
        })
          .then((model) => model.json())
          .then((json) => {
            return res.status(200).json({healthy: json.status === "succeeded" , model_id: runId})
        })
      } else {
        return res.status(200).json({healthy: false, model_id: null})
      }      
    });
}

export default handler;
