import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({
    cookies: () => cookieStore
  });
  const body = await request.text();
  const parsedBody = JSON.parse(body);
  const status = parsedBody.status;
  const predictionId = parsedBody.id;
  const id = params.userId;
  console.log(status);

  if (status === 'failed' || status === 'canceled') {
    const { data: userData, error: userError } = await supabase
      .from('user-data')
      .select('*')
      .eq('id', id);

    if (userError) {
      console.error('Supabase error: ', userError);
      return NextResponse.error();
    }
    const imageTokens = userData?.[0]?.image_tokens + 1;
    await supabase
      .from('user-data')
      .update({ image_tokens: imageTokens })
      .eq('id', userData?.[0].id);

    await supabase.from('predictions').delete().eq('id', predictionId);
  }

  // Return a response to acknowledge receipt of the event
  return NextResponse.json({});
}
