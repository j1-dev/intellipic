import replicate from '../../../../core/clients/replicate';
import supabase from '@/app/core/clients/supabase';
import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    // Get request data
    const req = await request.json();
    console.log(req);

    const prompt = req.instance_prompt as string;
    const id = req.run_id as string;
    const user = req.user_id as string;

    const modelResponse = await replicate.trainings.get(id);

    // Call model
    const options = {
      version: modelResponse.output.version.split(':')[1],
      input: {
        prompt: prompt,
        negative_prompt: process.env.REPLICATE_NEGATIVE_PROMPT,
        num_inference_steps: 55,
        refine: 'expert_ensemble_refiner',
        scheduler: 'DDIM',
        apply_watermark: false,
        high_noise_frac: 0.85,
        lora_scale: 0.8
      }
    };

    const predictionData = await replicate.predictions.create(options);

    // Insert prediction into supabase
    await supabase.from('predictions').insert({
      user_id: user,
      created_at: predictionData.created_at,
      status: predictionData.status,
      url: predictionData.output,
      id: predictionData.id,
      prompt: prompt
    });

    return NextResponse.json({ prediction_id: predictionData.id });
  } catch (error) {
    console.error('Call-model error: ', error);
    return NextResponse.json({ error: 'Internal Server Error' });
  }
}
