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

    const userDataEntry = userData?.[0];
    const runId = userData?.[0]?.run_id;

    if (runId !== null) {
      const modelResponse = await replicate.trainings.get(runId);

      await supabase
        .from('trainings')
        .update({ status: modelResponse.status })
        .eq('run_id', runId);

      if (
        modelResponse.status === 'canceled' ||
        modelResponse.status === 'failed'
      ) {
        console.log(userData?.[0]?.model_tokens);
        const modelTokens = () => {
          userData?.[0]?.dataset !== null
            ? userData?.[0]?.model_tokens + 1
            : userData?.[0]?.model_tokens;
        };
        await supabase
          .from(SUPABASE_TABLE_NAME)
          .update({
            run_id: null,
            model_tokens: userData?.[0]?.model_tokens + 1,
            dataset: null
          })
          .eq('id', userData?.[0].id);

        await supabase.from('trainings').delete().eq('run_id', runId);

        const response = NextResponse.json({
          dataset: null,
          run_id: null,
          run_data: { status: modelResponse.status }
        });

        response.headers.set('Cache-Control', 'no-cache');

        return response;
      }

      if (modelResponse.status === 'succeeded') {
        try {
          const { data, error } = await supabase
            .from(SUPABASE_TABLE_NAME)
            .update({ run_id: null, dataset: null })
            .eq('id', userData?.[0].id);

          if (error) {
            console.error('Supabase error:', error);
            return NextResponse.error();
          }

          const response = NextResponse.json({
            dataset: null,
            run_id: null,
            run_data: { status: modelResponse.status }
          });

          response.headers.set('Cache-Control', 'no-cache');

          return response;
        } catch (error) {
          console.error('Error during "succeeded" status handling:', error);
          return NextResponse.error();
        }
      }

      const response = NextResponse.json({
        dataset: userDataEntry?.dataset,
        run_id: userDataEntry?.run_id,
        run_data: { status: modelResponse.status }
      });

      response.headers.set('Cache-Control', 'no-cache');

      return response;
    } else {
      const response = NextResponse.json({
        dataset: userDataEntry?.dataset,
        run_id: null,
        run_data: { status: null }
      });

      response.headers.set('Cache-Control', 'no-cache');

      return response;
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.error();
  }
}
