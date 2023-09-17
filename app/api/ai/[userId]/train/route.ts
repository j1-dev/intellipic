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
      '8beff3369e81422112d93b89ca01426147de542cd4684c244b673b105188fe5f';
    const options = {
      destination: dest,
      input: {
        input_images: instanceData,
        max_train_steps: 1800,
        unet_learning_rate: 4e-6,
        token_string: instanceToken,
        // is_lora: false,
        //mask_target_prompts: `photo of a ${instanceClass.toLowerCase()}`,
        caption_prefix: `a photo of ${instanceToken}`,
        crop_based_on_salience: false,
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
      .update({ run_id: replicateModelId })
      .eq('id', id);

    return NextResponse.json({ run_id: replicateModelId });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.error();
  }
}
