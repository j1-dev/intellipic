// This api route calls the model (if exists) and returns a predition image
// should work the same as call_model from previous main.py

// Might have to create a predictions and then get the prediction
// check out Replicate HTTP api docs: https://replicate.com/docs/reference/http

// Route to call from the front-end: api/{$user.id}/useModel

// req.body = {
//   prompt: prompt,
//   id: model.id
// }

// res.body = {
//   url: url
// }

import replicateClient from "../../../core/clients/replicate";
import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../supabaseClient";

// TODO: translate fine_tune_model to work with replicate (show follow similar steps)
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // get request data
  const prompt = req.body.instance_prompt as string;
  const id = req.body.run_id as string
  const user = req.query.userId as string;

  await fetch(`https://dreambooth-api-experimental.replicate.com/v1/trainings/${id}`,{
          headers: {
            Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
            "Content-Type": "application/json",
          },
        })
        .then((model) => model.json())
        .then(async (value) => {
          // call model
          console.log(value.version)
          await replicateClient.post(
            `https://api.replicate.com/v1/predictions`,
            {
              input: {
                prompt: prompt,
                negative_prompt: process.env.REPLICATE_NEGATIVE_PROMPT,
                disable_safety_check: true,
                prompt_strength: 0.8,
                guidance_scale: 7.5,
              },
              version: value.version,
            }
          )
          .then(async (data: any)=>{
            const predictionData = data.data;
            await supabase
              .from("predictions")
              .insert({
                user_id: user,
                created_at: predictionData.created_at,
                status: predictionData.status,
                url: predictionData.output,
                id: predictionData.id,
                prompt: predictionData.input.prompt,
              })
              
            return res.status(200).json({prediction_id: predictionData.id})
          });
        })
        
};

export default handler;
