import replicate from '@/app/core/clients/replicate';
import supabase from '@/app/core/clients/supabase';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const SUPABASE_TABLE_NAME = 'trainingruns';
  const id = params.userId;

  try {
    const { data: userData, error: userError } = await supabase
      .from('user-data')
      .select()
      .eq('id', id);

    if (userError) {
      console.error('Supabase error:', userError);
      return NextResponse.error();
    }

    if (userData?.length === 0) {
      console.log(userData?.length);
      const { error: insertError } = await supabase
        .from('user-data')
        .insert({ id: id });
      if (insertError) {
        console.error('Insert user error:', insertError);
        return NextResponse.error();
      }
    }

    const userDataEntry = userData?.[0];
    const runId = userDataEntry?.run_id;

    if (runId !== null) {
      const modelResponse = await replicate.trainings.get(runId);
      return NextResponse.json({
        dataset: userDataEntry?.dataset,
        run_id: userDataEntry?.run_id,
        run_data: { status: modelResponse.status }
      });
    } else {
      return NextResponse.json({
        dataset: userDataEntry?.dataset,
        run_id: null,
        run_data: { status: null }
      });
    }
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.error();
  }
}
