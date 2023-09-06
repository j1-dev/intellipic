import React from 'react';
import PromptBuilder from '@/components/PromptBuilder';

const page = () => {
  return (
    <div className="max-w-screen-xl m-auto mt-5">
      <h1 className="text-3xl font-bold">Prompt Builder</h1>
      <PromptBuilder />
    </div>
  );
};

export default page;
