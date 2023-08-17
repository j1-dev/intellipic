import React from 'react';
import PromptCard from './PromptCard';

export default function Prompts() {
  const promptInfo = [
    {
      img: 'https://photoshot.app/prompts/sacha/viking.png',
      text1: 'Instrucciones para crear un Avatar Vikingo',
    },
    {
      img: 'https://photoshot.app/prompts/sacha/superhero.png',
      text1: 'Instrucciones para crear un Superhéroe',
    },
    {
      img: 'https://photoshot.app/prompts/sacha/astronaut.png',
      text1: 'Instrucciones para crear un Astronauta',
    },
    {
      img: 'https://photoshot.app/prompts/romy/wizard.png',
      text1: 'Instrucciones para crear un Mago',
    },
    {
      img: 'https://photoshot.app/prompts/romy/hobbit.png',
      text1: 'Instrucciones para crear un Hobbit',
    },
    {
      img: 'https://photoshot.app/prompts/sacha/clown.png',
      text1: 'Instrucciones para crear un Payaso',
    }
  ];
  const chunkSize = 3; // Number of images in each horizontal row

  // Chunk the promptInfo array into smaller arrays of size 'chunkSize'
  const chunkedPrompts = [];
  for (let i = 0; i < promptInfo.length; i += chunkSize) {
    chunkedPrompts.push(promptInfo.slice(i, i + chunkSize));
  }


  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {chunkedPrompts.map((chunk, rowIndex) => (
        <div key={rowIndex} style={{ display: 'flex' }}>
          {chunk.map((prompt, index) => (
            <PromptCard img={prompt.img} key={index} />
          ))}
        </div>
      ))}
    </div>
  );
}
