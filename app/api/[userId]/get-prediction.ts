import { NextApiRequest, NextApiResponse } from "next";

// TODO: translate fine_tune_model to work with replicate (show follow similar steps)
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // get request data
  const prediction_id = req.body.prediction_id as string;
  const user = req.query.userId as string;
  console.log(prediction_id)

  await fetch(`https://api.replicate.com/v1/predictions/${prediction_id}`,{
          headers: {
            Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
            "Content-Type": "application/json",
          },
        })
        .then((model) => model.json())
        .then(async (value) => {
          // call model
          return res.json(value);
        });
};

export default handler;
