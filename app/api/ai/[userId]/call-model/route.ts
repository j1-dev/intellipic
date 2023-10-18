import supabase from '@/app/core/clients/supabase';
import { NextResponse } from 'next/server';
import replicate from '../../../../core/clients/replicate';
import { userDataType } from '@/app/[locale]/dashboard/[userId]/page';

export async function POST(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const req = await request.json();
    const prompt = req.instance_prompt as string;
    const id = req.run_id as string;
    const user = req.user as userDataType;
    const { data: imageTokens, error: userError } = await supabase
      .from('user-data')
      .select('image_tokens')
      .eq('id', user.id);

    if (userError) {
      console.error('Supabase error: ', userError);
      return NextResponse.error();
    }

    const modelResponse = await replicate.trainings.get(id);

    const options = {
      version: modelResponse.output.version.split(':')[1],
      input: {
        prompt: prompt,
        negative_prompt: process.env.REPLICATE_NEGATIVE_PROMPT,
        // num_inference_steps: 50,
        refine: 'expert_ensemble_refiner',
        scheduler: 'K_EULER_ANCESTRAL',
        apply_watermark: false,
        high_noise_frac: 0.95,
        lora_scale: 0.7
      }
    };

    if (imageTokens[0] && imageTokens?.[0]?.image_tokens > 0) {
      const predictionData = await replicate.predictions.create(options);
      console.log(predictionData);

      await supabase.from('predictions').insert({
        user_id: user.id,
        created_at: predictionData.created_at,
        status: predictionData.status,
        url: predictionData.output,
        id: predictionData.id,
        prompt: prompt
      });

      await supabase
        .from('user-data')
        .update({ image_tokens: imageTokens?.[0]?.image_tokens - 1 })
        .eq('id', params.userId);

      return NextResponse.json({ prediction_id: predictionData.id });
    } else {
      return NextResponse.json({ error_code: 'CLIENT_SERVER_TOKENS_DESYNC' });
    }
  } catch (error) {
    console.error('Call-model error: ', error);
    return NextResponse.json({ error: 'Internal Server Error' });
  }
}
