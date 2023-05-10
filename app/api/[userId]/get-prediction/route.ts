import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

// TODO: translate fine_tune_model to work with replicate (show follow similar steps)
export async function POST(request: Request, { params }: { params: { userId: string } }) {
  const req = await request.json();
  
  // get request data
  const prediction_id = req.prediction_id as string;
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
          return NextResponse.json(value);
        });
};

