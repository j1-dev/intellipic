import React from 'react';
import Image from 'next/image';

interface PromptCardProps {
  img: string;
  text: string;
}

function PromptCard({ img, text }: PromptCardProps) {
  return (
    <div
      className="my-1"
      style={{ display: 'inline-block', margin: '10px', width: '300px', height: '300px',border: '2px solid black', }}
    >
      <Image src={img} alt="" width={300} height={300} objectFit="cover" />
      <p style={{ marginTop: '10px', textAlign: 'center' }}>{text}</p>
    </div>
  );
}

export default PromptCard;
