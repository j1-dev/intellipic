import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const body = await request.text();
  const parsedBody = JSON.parse(body);
  const status = parsedBody.status;
  const runId = parsedBody.id;
  const id = params.userId;
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({
    cookies: () => cookieStore
  });

  if (status === 'failed' || status === 'canceled') {
    const { data: userData, error: userError } = await supabase
      .from('user-data')
      .select('*')
      .eq('id', id);

    if (userError) {
      console.error('Supabase error: ', userError);
      return NextResponse.error();
    }
    await supabase
      .from('user-data')
      .update({
        run_id: null,
        model_tokens: userData?.[0]?.model_tokens + 1,
        dataset: null
      })
      .eq('id', userData?.[0].id);

    console.log(runId);

    await supabase.from('trainings').delete().eq('run_id', runId);
  }

  // Return a response to acknowledge receipt of the event
  return NextResponse.json({});
}
