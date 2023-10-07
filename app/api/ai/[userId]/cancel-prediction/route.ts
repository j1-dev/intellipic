import replicate from '@/app/core/clients/replicate';
import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const req = await request.json();
  const predictionId = req.prediction_id as string;
  console.log(predictionId);
  const response = replicate.predictions.cancel(predictionId);
  console.log(await response);

  return NextResponse.json({ succesful: (await response).error === null });
}
