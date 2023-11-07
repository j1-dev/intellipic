import { NextResponse } from 'next/server';
import replicate from '@/app/core/clients/replicate';
import { Visibility } from 'replicate';

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const id = params.userId as string;
  const options = {
    visibility: 'public' as Visibility,
    hardware: 'gpu-a40-large'
  };

  replicate.models.create('replicate', id, options);

  // return response
  return NextResponse.json({});
}
