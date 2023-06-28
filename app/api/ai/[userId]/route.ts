import { supabase } from '../../../supabaseClient';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const SUPABASE_TABLE_NAME = 'trainingruns';
  const id = params.userId;

  const { data, error } = await supabase
    .from('user-data')
    .select()
    .eq('id', id);

  if (error) {
    console.error('Supabase error:', error);
    return NextResponse.error();
  }

  if (data?.length === 0) {
    console.log(data?.length);
    const { error } = await supabase.from('user-data').insert({ id: id });
    if (error) {
      console.error('Insert user error:', error);
      return NextResponse.error();
    }
  }

  const userData = data?.[0];
  const runId = userData?.run_id;

  if (runId !== null) {
    console.log(runId);
    try {
      const modelResponse = await fetch(
        `https://dreambooth-api-experimental.replicate.com/v1/trainings/${runId}`,
        {
          headers: {
            Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
            'Content-Type': 'application/json'
          }
        }
      );

      const modelData = await modelResponse.json();

      return NextResponse.json({
        dataset: userData?.dataset,
        run_id: userData?.run_id,
        run_data: { status: modelData.status }
      });
    } catch (error) {
      console.error('Model fetch error:', error);
      return NextResponse.error();
    }
  } else {
    return NextResponse.json({
      dataset: userData?.dataset,
      run_id: null,
      run_data: { status: null }
    });
  }
}
