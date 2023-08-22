import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const replicateClient = axios.create({
    baseURL: 'https://dreambooth-api-experimental.replicate.com',
    headers: {
      Authorization: `Token ${process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN}`,
      'Content-Type': 'application/json',
      'Accept-Encoding': '*'
    }
  });
  const id = params.userId as string;

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
      },
      model: `${process.env.REPLICATE_USERNAME}/${id}`,
      trainer_version:
        'cd3f925f7ab21afaef7d45224790eedbb837eeac40d22e8fefe015489ab644aa'
    },
    {
      headers: {
        Authorization: `Token ${process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    }
  );

  // return response
  return NextResponse.json({});
}
