import { supabase } from "../../supabaseClient";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { userId: string } }) {
  const SUPABASE_TABLE_NAME = "finetuningruns";
  const userId = params.userId;

  const { data, error } = await supabase
    .from(SUPABASE_TABLE_NAME)
    .select()
    .eq('user_id', userId);

  if (error) {
    console.error("Supabase error:", error);
    return NextResponse.error();
  }

  if (data?.length === 0) {
    await supabase.from(SUPABASE_TABLE_NAME).insert({ user_id: userId });
  }

  const userData = data?.[0];
  const runId = userData?.run_id;

  if (runId !== null) {
    try {
      const modelResponse = await fetch(`https://dreambooth-api-experimental.replicate.com/v1/trainings/${runId}`, {
        headers: {
          Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
      });

      const modelData = await modelResponse.json();

      return NextResponse.json({
        dataset: userData?.dataset,
        run_id: userData?.run_id,
        run_data: { status: modelData.status },
      });
    } catch (error) {
      console.error("Model fetch error:", error);
      return NextResponse.error();
    }
  } else {
    return NextResponse.json({
      dataset: userData?.dataset,
      run_id: null,
      run_data: { status: null },
    });
  }
}
