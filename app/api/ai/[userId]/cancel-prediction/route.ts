import replicate from '@/app/core/clients/replicate';
import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const req = await request.json();
  const predictionId = req.prediction_id as string;

  const response = replicate.predictions.cancel(predictionId);

  console.log((await response).error);
  return NextResponse.json({ succesful: (await response).error === null });
}
