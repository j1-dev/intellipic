import { NextResponse } from 'next/server';
import replicate from '@/app/core/clients/replicate';

export async function POST(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const req = await request.json();
  const prompt = req.prompt as string;
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  try {
    const prediction = await replicate.predictions.create({
      version:
        '58d078176e02c219e11eb4da5a02a7830a283b14cf8f94537af893ccff5ee781',
      input: {
        prompt:
          'translate the given prompt to english and optimize it to be used on a stable diffusion or text2img AI model. DO NOT CHANGE ANY WORDS YOU DO NOT UNDERSTAND, as they may be the token used to refer to the subject. Your answer has to be only the final translated and optimized prompt, no explanation or introduction please. Wrapped the final prompt in {} symbols. This is the prompt you need to translate and optimize: ' +
          prompt,
        system_prompt:
          'Act like a computer function that receives an input and returns a result. You will return ONLY what is asked for, do not output more tokens than needed'
      }
    });

    const id = prediction?.id;
    let status = prediction?.status;
    let response;
    while (status !== 'succeeded') {
      await delay(250);
      try {
        const res = await fetch(
          `https://api.replicate.com/v1/predictions/${id}`,
          {
            headers: {
              Authorization: `Token ${process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN}`,
              'Content-Type': 'application/json'
            },
            cache: 'no-store'
          }
        );
        response = await res.json();
        status = response.status;
      } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, prompt: error });
      }
    }
    let promptFinal = '';
    response?.output?.map((s: string) => (promptFinal += s));
    let matches = promptFinal.match(/\{(.*?)\}/);

    const res = NextResponse.json({ success: true, prompt: matches?.[1] });

    res.headers.set('Cache-Control', 'no-cache');

    return res;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ success: false, prompt: error });
  }
}
