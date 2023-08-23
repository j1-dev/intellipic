'use server';
import replicate from '../clients/replicate';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function translatePrompt(prompt: string) {
  const prediction = await replicate.predictions.create({
    version: '58d078176e02c219e11eb4da5a02a7830a283b14cf8f94537af893ccff5ee781',
    input: {
      prompt: prompt,
      system_prompt:
        'You are a translator and an AI optimizer and you will translate prompts used for text2img to ENGLISH. ' +
        'You will translate and optimize the input so that it gets the best results on stable diffusion models. ' +
        'Output ONLY THE PROMPT, NOTHING ELSE, no EXPLANATION, nothing like that.' +
        'You will output only the translated/optimized text. The finished prompt has to be wrapped between {} symbols.',
      max_new_tokens: 100
    }
  });
  const id = prediction?.id;
  let status = prediction?.status;
  let response;
  while (status !== 'succeeded') {
    await delay(750);
    const res = await fetch(`https://api.replicate.com/v1/predictions/${id}`, {
      headers: {
        Authorization: `Token ${process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      cache: 'no-store'
    });
    response = await res.json();
    status = response.status;
  }
  let promptFinal = '';
  response?.output?.map((s: string) => (promptFinal += s));

  return promptFinal.replace('{', '').replace('}', '').trim();
}
