import replicate from '@/app/core/clients/replicate';
import supabase from '@/app/core/clients/supabase';
import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const req = await request.json();
  const runId = req.run_id as string;

  const response = replicate.trainings.cancel(runId);

  console.log((await response).error);
  if ((await response).error === null) {
    await supabase.from('trainings').delete().eq('run_id', runId);
  }

  return NextResponse.json({ succesful: (await response).error === null });
}
