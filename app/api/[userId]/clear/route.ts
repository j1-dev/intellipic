import { NextResponse } from "next/server";
import { supabase } from "../../../supabaseClient";

export async function POST(request: Request, { params }: { params: { userId: string } }) {
  const SUPABASE_TABLE_NAME = "finetuningruns";
  const userId = params.userId;

  const { data, error } = await supabase
    .from(SUPABASE_TABLE_NAME)
    .update({ run_id: null, dataset: null })
    .eq('user_id', userId);

  if (error) {
    console.error("Supabase error:", error);
    return NextResponse.error();
  }

  // Send a JSON response
  return NextResponse.json({ success: true });
}
