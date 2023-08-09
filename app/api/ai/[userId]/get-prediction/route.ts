import replicate from '@/app/core/clients/replicate';
import { NextResponse } from 'next/server';

// TODO: translate fine_tune_model to work with replicate (show follow similar steps)
export async function POST(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const req = await request.json();
    const prediction_id = req.prediction_id as string;
    console.log(prediction_id);

    // const predictionResponse = await fetch(
    //   `https://api.replicate.com/v1/predictions/${prediction_id}`,
    //   {
    //     headers: {
    //       Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
    //       'Content-Type': 'application/json'
    //     }
    //   }
    // );

    // if (!predictionResponse.ok) {
    //   throw new Error(
    //     `Failed to fetch prediction data. Status: ${predictionResponse.status}`
    //   );
    // }
    const predictionResponse = await replicate.predictions.get(prediction_id);

    return NextResponse.json(predictionResponse);
  } catch (error) {
    console.error('Fetch prediction error: ', error);
    return NextResponse.json({ error: 'Internal Server Error' });
  }
}
