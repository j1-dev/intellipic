import replicate from '@/app/core/clients/replicate';
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
  const req = await request.json();
  const runId = req.run_id as string;

  const response = replicate.trainings.cancel(runId);

  console.log((await response).error);
  if ((await response).error === null) {
    await supabase.from('trainings').delete().eq('run_id', runId);
  }

  return NextResponse.json({ succesful: (await response).error === null });
}
