import replicate from '@/app/core/clients/replicate';
import supabase from '@/app/core/clients/supabase';
import { NextResponse } from 'next/server';

export const revalidate = 0;

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const SUPABASE_TABLE_NAME = 'user-data';
  const id = params.userId;

  try {
    const { data: userData, error: userError } = await supabase
      .from(SUPABASE_TABLE_NAME)
      .select('*')
      .eq('id', id);

    if (userError) {
      console.error('Supabase error:', userError);
      return NextResponse.error();
    }

    const runId = userData?.[0]?.run_id;

    if (runId !== null) {
      const modelResponse = await replicate.trainings.get(runId);

      await supabase
        .from('trainings')
        .update({ status: modelResponse.status })
        .eq('run_id', runId);

      if (
        modelResponse.status === 'failed' ||
        modelResponse.status === 'canceled'
      ) {
        await supabase.from('trainings').delete().eq('run_id', runId);

        await supabase
          .from(SUPABASE_TABLE_NAME)
          .update({
            model_tokens: userData?.[0]?.model_tokens + 1,
            run_id: null,
            dataset: null
          })
          .eq('id', userData?.[0].id);
      }

      const response = NextResponse.json({
        healthy: modelResponse.status === 'succeeded',
        model_id: runId
      });

      response.headers.set('Cache-Control', 'no-cache');

      return response;
    } else {
      const response = NextResponse.json({
        healthy: false,
        model_id: null
      });

      response.headers.set('Cache-Control', 'no-cache');

      return response;
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.error();
  }
}
