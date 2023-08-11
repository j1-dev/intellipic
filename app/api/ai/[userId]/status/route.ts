import replicate from '@/app/core/clients/replicate';
import supabase from '@/app/core/clients/supabase';
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

  if (runId !== null) {
    try {
      const modelResponse = await replicate.trainings.get(runId);

      const { data, error } = await supabase
        .from('trainings')
        .update({ status: modelResponse.status })
        .eq('run_id', runId);

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
