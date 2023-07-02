// This api route begins the training process
// should work the same as fine_tune_model from previous main.py

// Route to call from the front-end: api/{$user.id}/train

// req.body = {
//   url: fineTuningData.dataset,
//   prompt: instanceName,
//   instance_type: instanceType,
// }

// res.body = {
//   run_id: model.id;
// }

import replicateClient from '../../../../core/clients/replicate';
import { supabase } from '../../../../supabaseClient';
import { NextResponse } from 'next/server';

// TODO: translate fine_tune_model to work with replicate (show follow similar steps)
export async function POST(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const SUPABASE_PREFIX_URL = 'https://fuyhpknpcwdkcyntvzvk.supabase.co/';
  const SUPABASE_TABLE_NAME = 'trainings';
  const SUPABASE_BUCKET_NAME = 'training-bucket';
  const SUPABASE_OBJECT_URL = `${SUPABASE_PREFIX_URL}storage/v1/object/public/${SUPABASE_BUCKET_NAME}/`;

  const req = await request.json();

  // get request data and instatiate useful data
  const instanceClass = req.instance_type as string;
  const url = req.url as string;
  const id = req.user_id as string;
  const instanceToken = req.prompt as string;
  const instanceData = SUPABASE_OBJECT_URL + url;

  // initiate training
  // TODO: add REPLICATE_USERNAME to .env.local file
  const responseReplicate = await replicateClient.post(
    '/v1/trainings',
    {
      input: {
        instance_prompt: `a photo of ${instanceToken} ${instanceClass.toLowerCase()}`,
        class_prompt: `a photo of a ${instanceClass.toLowerCase()}`,
        instance_data: instanceData,
        max_train_steps: 2000,
        num_class_images: 100,
        learning_rate: 2e-6,
        with_prior_preservation: true,
        train_text_encoder: true
        // ckpt_base: "https://huggingface.co/prompthero/openjourney-v4/resolve/main/openjourney-v4.ckpt"
      },
      model: `${process.env.REPLICATE_USERNAME}/${id}`,
      trainer_version:
        'd5e058608f43886b9620a8fbb1501853b8cbae4f45c857a014011c86ee614ffb' // sd-2.1
    },
    {
      headers: {
        Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    }
  );

  const replicateModelId = responseReplicate.data.id as string;

  // update user's data in supabase
  const { error } = await supabase.from(SUPABASE_TABLE_NAME).insert({
    run_id: replicateModelId,
    user_id: id,
    status: 'starting',
    dataset: instanceData,
    prompt_token: instanceToken,
    instance_class: instanceClass
  });

  if (error) {
    console.error('Insert user error:', error);
    return NextResponse.error();
  }

  try {
    await supabase
      .from('user-data')
      .update({ run_id: replicateModelId })
      .eq('id', id);
  } catch (error) {
    console.error('Insert user error:', error);
    return NextResponse.error();
  }

  // return response
  return NextResponse.json({ run_id: replicateModelId });
}
