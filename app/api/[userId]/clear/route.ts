// This api route resets model/training and clears the users data
// should work the same as clear_user_data from previous main.py
// TODO: Define request and response shape
// TODO: Create the function itself

import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../supabaseClient";

// TODO: Fix function pls
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const SUPABASE_TABLE_NAME = "finetuningruns"
  const userId = req.query.userId as string;

  await supabase
    .from(SUPABASE_TABLE_NAME)
    .update({run_id: null, dataset: null})
    .eq('user_id', userId)
    .then((value) => {return res.status(200).json({value: value})})
}

export default handler;
