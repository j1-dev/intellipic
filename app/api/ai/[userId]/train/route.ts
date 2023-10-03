import replicate from '@/app/core/clients/replicate';
import supabase from '@/app/core/clients/supabase';
import { NextResponse } from 'next/server';

export async function POST(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const SUPABASE_PREFIX_URL = 'https://fuyhpknpcwdkcyntvzvk.supabase.co/';
  const SUPABASE_TABLE_NAME = 'trainings';
  const SUPABASE_BUCKET_NAME = 'training-bucket';
  const SUPABASE_OBJECT_URL = `${SUPABASE_PREFIX_URL}storage/v1/object/public/${SUPABASE_BUCKET_NAME}/`;

  const { data: modelTokens, error: userError } = await supabase
    .from('user-data')
    .select('model_tokens')
    .eq('id', params.userId);

  if (userError) {
    console.error('Supabase error: ', userError);
    return NextResponse.error();
  }

  if (modelTokens[0] && modelTokens?.[0]?.model_tokens > 0) {
    try {
      const req = await request.json();

      const instanceClass = req.instance_type as string;
      const url = req.url as string;
      const id = req.user_id as string;
      const instanceToken = req.prompt as string;
      const instanceData = SUPABASE_OBJECT_URL + url;

      const dest =
        `${process.env.REPLICATE_USERNAME}/${id}` as `${string}/${string}`;
      const model_owner = 'stability-ai';
      const model_name = 'sdxl';
      const version_id =
        '1bfb924045802467cf8869d96b231a12e6aa994abfe37e337c63a4e49a8c6c41';
      const options = {
        destination: dest,
        input: {
          input_images: instanceData,
          max_train_steps: 1500,
          unet_learning_rate: 8e-6,
          token_string: instanceToken,
          // is_lora: false,
          //mask_target_prompts: `photo of a ${instanceClass.toLowerCase()}`,
          caption_prefix: `a photo of ${instanceToken}`,
          // crop_based_on_salience: false,
          use_face_detection_instead: true
        } as object
      };

      const responseReplicate = await replicate.trainings.create(
        model_owner,
        model_name,
        version_id,
        options
      );

      const replicateModelId = responseReplicate.id;

      const { error } = await supabase.from(SUPABASE_TABLE_NAME).insert({
        run_id: replicateModelId,
        user_id: id,
        status: 'starting',
        dataset: instanceData,
        prompt_token: instanceToken,
        instance_class: instanceClass.toLowerCase()
      });

      if (error) {
        console.error('Insert user error:', error);
        return NextResponse.error();
      }

      await supabase
        .from('user-data')
        .update({
          run_id: replicateModelId,
          model_tokens: modelTokens?.[0]?.model_tokens - 1
        })
        .eq('id', id);

      return NextResponse.json({ run_id: replicateModelId });
    } catch (error) {
      console.error('API Error:', error);
      return NextResponse.error();
    }
  } else {
    return NextResponse.json({ error_code: 'CLIENT_SERVER_TOKENS_DESYNC' });
  }
}
