import supabase from '@/app/core/clients/supabase';
import { NextResponse } from 'next/server';
import replicate from '../../../../core/clients/replicate';

export async function POST(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const req = await request.json();

    const prompt = req.instance_prompt as string;
    const id = req.run_id as string;
    const user = req.user_id as string;

    const modelResponse = await replicate.trainings.get(id);

    const options = {
      version: modelResponse.output.version.split(':')[1],
      input: {
        prompt: prompt,
        negative_prompt: process.env.REPLICATE_NEGATIVE_PROMPT,
        // num_inference_steps: 50,
        refine: 'base_image_refiner'
        // // scheduler: 'K_EULER',
        // // apply_watermark: false,
        // high_noise_frac: 0.9,
        // lora_scale: 0.85
      }
    };

    const predictionData = await replicate.predictions.create(options);

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
