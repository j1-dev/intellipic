import { NextResponse } from 'next/server';
import replicate from '@/app/core/clients/replicate';
import supabase from '@/app/core/clients/supabase';

export async function POST(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const req = await request.json();
  const runId = req.run_id as string;
  console.log(runId);

  const response = replicate.trainings.cancel(runId);

  console.log((await response).error);
  if ((await response).error === null) {
    await supabase.from('trainings').delete().eq('run_id', runId);
  }

  return NextResponse.json({ succesful: (await response).error === null });
}
