import React from 'react';
import Image from 'next/image';

interface PromptCardProps {
  img: string;
  text: string;
}

function PromptCard({ img, text }: PromptCardProps) {
  return (
    <div className="my-1 inline-block mx-2 w-72 h-72 border-2 border-black ">
      <Image src={img} alt="" width={300} height={300} objectFit="cover" />
      <p className="text-center my-1">{text}</p>
    </div>
  );
}

export default PromptCard;
