import replicate from '@/app/core/clients/replicate';
import supabase from '@/app/core/clients/supabase';
import { NextResponse } from 'next/server';

export const revalidate = 0;

export async function POST(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const SUPABASE_TABLE_NAME = 'user-data';
  const id = params.userId;
  const req = await request.json();
  const prediction_id = req.prediction_id as string;

  try {
    const { data: userData, error: userError } = await supabase
      .from(SUPABASE_TABLE_NAME)
      .select('*')
      .eq('id', id);

    const { data: predictionData, error: predictionError } = await supabase
      .from('predictions')
      .select('*')
      .eq('id', prediction_id);

    if (userError) {
      console.error('Supabase error: ', userError);
      return NextResponse.error();
    }

    if (predictionError) {
      console.error('Supabase error: ', predictionError);
      return NextResponse.error();
    }

    const predictionResponse = await replicate.predictions.get(prediction_id);

    await supabase
      .from('predictions')
      .update({ status: predictionResponse.status })
      .eq('id', prediction_id);

    if (
      predictionResponse.status === 'failed' ||
      predictionResponse.status === 'canceled'
    ) {
      const imageTokens = userData?.[0]?.image_tokens + 1;
      await supabase
        .from('user-data')
        .update({ image_tokens: imageTokens })
        .eq('id', userData?.[0].id);

      await supabase.from('predictions').delete().eq('id', prediction_id);
    }

    return NextResponse.json(predictionResponse);
  } catch (error) {
    console.error('Fetch prediction error: ', error);
    return NextResponse.json({ error: 'Internal Server Error' });
  }
}
