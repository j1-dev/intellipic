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
import replicate from '@/app/core/clients/replicate_test';
import { supabase } from '../../../../supabaseClient';
import { NextResponse } from 'next/server';
import { uniqueId } from 'lodash';

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
  // const responseReplicate = await replicateClient.post(
  //   '/v1/trainings',
  //   {
  //     input: {
  //       instance_prompt: `a photo of ${instanceToken} ${instanceClass.toLowerCase()}`,
  //       class_prompt: `a photo of a ${instanceClass.toLowerCase()}`,
  //       instance_data: instanceData,
  //       max_train_steps: 1500,
  //       num_class_images: 75,
  //       learning_rate: 2e-6,
  //       with_prior_preservation: true,
  //       train_text_encoder: true
  //       // ckpt_base:
  //       //   'https://huggingface.co/stabilityai/stable-diffusion-2-1/resolve/main/v2-1_768-ema-pruned.safetensors'
  //     },
  //     model: `${process.env.REPLICATE_USERNAME}/${id}`,
  //     trainer_version:
  //       'cd3f925f7ab21afaef7d45224790eedbb837eeac40d22e8fefe015489ab644aa' // sd-1.5
  //     // 'd5e058608f43886b9620a8fbb1501853b8cbae4f45c857a014011c86ee614ffb'// sd-2.1
  //     // 'a8ba568da0313951a6b311b43b1ea3bf9f2ef7b9fd97ed94cebd7ffd2da66654'// custom model
  //   },
  //   {
  //     headers: {
  //       Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
  //       'Content-Type': 'application/json'
  //     }
  //   }
  // );
  const dest =
    `${process.env.REPLICATE_USERNAME}/${id}` as `${string}/${string}`;
  const model_owner = 'stability-ai';
  const model_name = 'sdxl';
  const version_id =
    '2b017d9b67edd2ee1401238df49d75da53c523f36e363881e057f5dc3ed3c5b2';
  const options = {
    destination: dest,
    input: {
      input_data_tar_or_zip: instanceData,
      unet_learning_rate: 2e-6,
      ti_learning_rate_multiplier: 100,
      num_train_epochs: 200,
      token_map: instanceToken
    } as object
  };

  const responseReplicate = await replicate.trainings.create(
    model_owner,
    model_name,
    version_id,
    options
  );

  const replicateModelId = responseReplicate.id;

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
