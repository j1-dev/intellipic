import React from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';

function PromptCard({
  props
}: {
  props: { img: string; text1: string; text2: string; text3: string };
}) {
  function handleCopy(text: string) {
    return function (event: React.MouseEvent<HTMLAnchorElement>) {
      event.preventDefault(); // Prevent default navigation behavior

      navigator.clipboard.writeText(text).then(() => {
        toast.success('Copiado con éxito');
      });
    };
  }

  return (
    <div className="my-1" onClick={() => handleCopy(props.text3)}>
      <div className="float-right">
        <Image
          src={props.img}
          alt=""
          width={200}
          height={200}
          className="object-cover rounded-full"
        />
      </div>
      <a
        href="#"
        onClick={handleCopy(props.text3)}
        className="block p-9 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {props.text1}
        </h5>

        <h6 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">
          {props.text2}
        </h6>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {props.text3}
        </p>
      </a>
    </div>
  );
}

export default PromptCard;
