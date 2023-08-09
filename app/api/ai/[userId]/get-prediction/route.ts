import replicate from '@/app/core/clients/replicate';
import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const req = await request.json();
    const prediction_id = req.prediction_id as string;

    const predictionResponse = await replicate.predictions.get(prediction_id);

    return NextResponse.json(predictionResponse);
  } catch (error) {
    console.error('Fetch prediction error: ', error);
    return NextResponse.json({ error: 'Internal Server Error' });
  }
}
