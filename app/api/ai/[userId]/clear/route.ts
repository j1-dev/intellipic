import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const SUPABASE_TABLE_NAME = 'user-data';
  const userId = params.userId;
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({
    cookies: () => cookieStore
  });
  const { data, error } = await supabase
    .from(SUPABASE_TABLE_NAME)
    .update({ run_id: null, dataset: null })
    .eq('id', userId);

  if (error) {
    console.error('Supabase error:', error);
    return NextResponse.error();
  }

  const response = NextResponse.json({ success: true });

  response.headers.set('Cache-Control', 'no-cache');

  return response;
}
