'use server';
import replicate from '../clients/replicate';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function translatePrompt(prompt: string) {
  const prediction = await replicate.predictions.create({
    version: '58d078176e02c219e11eb4da5a02a7830a283b14cf8f94537af893ccff5ee781',
    input: {
      prompt:
        'translate the given prompt to English and optimize it to be used on a stable diffusion model. Your answer has to be only the final translated and optimized prompt, no explanation or introduction please. Wrapped the final prompt in {} symbols. This is the prompt you need to translate and optimize: ' +
        prompt,
      system_prompt: 'Act like a robot who follows orders literally',
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
  let matches = promptFinal.match(/\{(.*?)\}/);

  return matches?.[1] || '';
}
