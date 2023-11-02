import supabase from '@/app/core/clients/supabase';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.text();

  console.log(body);

  // Return a response to acknowledge receipt of the event
  return NextResponse.json({});
}
