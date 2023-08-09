import replicate from '@/app/core/clients/replicate';
import { supabase } from '../../../../supabaseClient';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const SUPABASE_TABLE_NAME = 'user-data';
  const id = params.userId;

  const { data, error } = await supabase
    .from(SUPABASE_TABLE_NAME)
    .select('*')
    .eq('id', id);

  if (error) {
    console.error('Supabase error:', error);
    return NextResponse.error();
  }

  const runId = data?.[0]?.run_id;
  console.log(runId);

  if (runId !== null) {
    try {
      // const modelResponse = await fetch(
      //   `https://dreambooth-api-experimental.replicate.com/v1/trainings/${runId}`,
      //   {
      //     headers: {
      //       Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
      //       'Content-Type': 'application/json'
      //     },
      //     next: { revalidate: 0 }
      //   }
      // );
      const modelResponse = await replicate.trainings.get(runId);

      console.log(modelResponse);
      console.log(modelResponse.status);

      const { data, error } = await supabase
        .from('trainings')
        .update({ status: modelResponse.status })
        .eq('run_id', runId);

      console.log(modelResponse);
      if (
        modelResponse.status === 'failed' ||
        modelResponse.status === 'canceled'
      ) {
        const { data, error } = await supabase
          .from('trainings')
          .delete()
          .eq('run_id', runId);
      }

      return NextResponse.json({
        healthy: modelResponse.status === 'succeeded',
        model_id: runId
      });
    } catch (error) {
      console.error('Model fetch error:', error);
      return NextResponse.error();
    }
  } else {
    return NextResponse.json({
      healthy: false,
      model_id: null
    });
  }
}
