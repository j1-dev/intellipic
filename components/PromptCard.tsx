import Image from 'next/image';

interface PromptCardProps {
  img: string;
  text: string;
}

function PromptCard({ img, text }: PromptCardProps) {
  return (
    <div className="my-2 inline-block rounded-lg hover:scale-[1.02] transition-all max-w-screen-lg mx-auto">
      <Image
        src={img}
        alt=""
        width={250}
        height={250}
        objectFit="cover"
        className="rounded-lg"
      />
      <p className="text-center my-1">{text}</p>
    </div>
  );
}

export default PromptCard;
