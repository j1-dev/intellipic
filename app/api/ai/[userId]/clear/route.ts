import { NextResponse } from 'next/server';
import supabase from '@/app/core/clients/supabase';

export async function POST(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const SUPABASE_TABLE_NAME = 'user-data';
  const userId = params.userId;

  const { data, error } = await supabase
    .from(SUPABASE_TABLE_NAME)
    .update({ dataset: null })
    .eq('id', userId);

  if (error) {
    console.error('Supabase error:', error);
    return NextResponse.error();
  }

  // Send a JSON response
  return NextResponse.json({ success: true });
}
