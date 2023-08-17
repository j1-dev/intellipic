import React from 'react';
import Image from 'next/image';

interface PromptCardProps {
  img: string;
}

function PromptCard({ img }: PromptCardProps) {
  return (
    <div
      className="my-1"
      style={{ display: 'inline-block', margin: '10px', width: '200px', height: '200px' }}
    >
      <Image src={img} alt="" width={200} height={200} objectFit="cover" />
    </div>
  );
}

export default PromptCard;
