import React from 'react';
import PromptCard from './PromptCard';

export default function Prompts() {
  const promptInfo = [
    {
      img: 'https://photoshot.app/prompts/sacha/viking.png',
      text1: 'Vikingo',
    },
    {
      img: 'https://photoshot.app/prompts/sacha/superhero.png',
      text1: 'Superhéroe',
    },
    {
      img: 'https://photoshot.app/prompts/sacha/astronaut.png',
      text1: 'Astronauta',
    },
    {
      img: 'https://photoshot.app/prompts/romy/wizard.png',
      text1: 'Mago',
    },
    {
      img: 'https://photoshot.app/prompts/romy/hobbit.png',
      text1: 'Hobbit',
    },
    {
      img: 'https://photoshot.app/prompts/sacha/clown.png',
      text1: 'Payaso',
    }
  ];
  // const chunkSize = 3; // Number of images in each horizontal row

  // // Chunk the promptInfo array into smaller arrays of size 'chunkSize'
  // const chunkedPrompts = [];
  // for (let i = 0; i < promptInfo.length; i += chunkSize) {
  //   chunkedPrompts.push(promptInfo.slice(i, i + chunkSize));
  // }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
    {promptInfo.map((data, index) => (
      <PromptCard img={data.img} text={data.text1} key={index} />
    ))}
  </div>
);
}