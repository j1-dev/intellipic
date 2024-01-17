import replicate from '@/app/core/clients/replicate';
import { getProgressGenerating } from '@/app/core/utils/getPercentage';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const revalidate = 0;

export async function POST(request: Request) {
  const req = await request.json();
  const prediction_id = req.prediction_id as string;
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({
    cookies: () => cookieStore
  });
  try {
    const predictionResponse = await replicate.predictions.get(prediction_id);
    let percentage = '-1';
    if (
      typeof predictionResponse.logs !== undefined &&
      !!predictionResponse.logs
    )
      percentage =
        getProgressGenerating(predictionResponse.logs as string) || '-1';

    await supabase
      .from('predictions')
      .update({ status: predictionResponse.status })
      .eq('id', prediction_id);

    return NextResponse.json({
      status: predictionResponse.status,
      output: predictionResponse?.output?.[0],
      progress: percentage
    });
  } catch (error) {
    console.error('Fetch prediction error: ', error);
    return NextResponse.json({ error: 'Internal Server Error' });
  }
}
