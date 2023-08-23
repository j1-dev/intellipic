export default function replacePromptToken(prompt: string, token: string) {
  const refinedPrompt = prompt.replaceAll('@me', `${token}`);

  return refinedPrompt;
}
