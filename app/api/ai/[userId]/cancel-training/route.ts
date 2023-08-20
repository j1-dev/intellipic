import { NextResponse } from 'next/server';
import replicate from '@/app/core/clients/replicate';

export async function POST(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const req = await request.json();
  const runId = req.run_id as string;
  console.log(runId);

  const response = replicate.trainings.cancel(runId);

  console.log((await response).error);
  return NextResponse.json({ succesful: (await response).error === null });
}
