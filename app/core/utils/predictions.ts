export default function replacePromptToken(
  prompt: string,
  //token: string
  instanceClass: string
) {
  const refinedPrompt = prompt.replaceAll('@me', 'TOK ' + instanceClass);

  return refinedPrompt;
}
