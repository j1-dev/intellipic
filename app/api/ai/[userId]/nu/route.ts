import supabase from '@/app/core/clients/supabase';
import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const replicateClient = axios.create({
    baseURL: 'https://dreambooth-api-experimental.replicate.com',
    headers: {
      Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
      'Content-Type': 'application/json',
      'Accept-Encoding': '*'
    }
  });
  const id = params.userId as string;
  console.log(id);

  const responseReplicate = await replicateClient.post(
    '/v1/trainings',
    {
      input: {
        instance_prompt: ``,
        class_prompt: ``,
        instance_data: null,
        max_train_steps: 0,
        num_class_images: 0,
        learning_rate: 2e-6,
        with_prior_preservation: false,
        train_text_encoder: false
        // ckpt_base:
        //   'https://huggingface.co/stabilityai/stable-diffusion-2-1/resolve/main/v2-1_768-ema-pruned.safetensors'
      },
      model: `${process.env.REPLICATE_USERNAME}/${id}`,
      trainer_version:
        'cd3f925f7ab21afaef7d45224790eedbb837eeac40d22e8fefe015489ab644aa' // sd-1.5
      // 'd5e058608f43886b9620a8fbb1501853b8cbae4f45c857a014011c86ee614ffb'// sd-2.1
      // 'a8ba568da0313951a6b311b43b1ea3bf9f2ef7b9fd97ed94cebd7ffd2da66654'// custom model
    },
    {
      headers: {
        Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    }
  );

  // return response
  return NextResponse.json({});
}
