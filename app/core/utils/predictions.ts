export const replacePromptToken = (
  prompt: string,
  token: string,
  instanceClass: string
) => {
  const refinedPrompt = prompt.replaceAll('@me', `${token}`);

  return refinedPrompt;
};
