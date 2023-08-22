'user-client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

export const TrainButton = () => {
  const [userData] = useState<any>(() =>
    JSON.parse(localStorage.getItem('userData') as string)
  );
  const router = useRouter();
  console.log(userData.model_tokens === 0);

  return (
    <button
      disabled={userData.model_tokens === 0}
      className="rounded-lg group dark:shadow-slate-300 hover:shadow-lg border border-black dark:border-white transition-all ease-in-out duration-75 hover:scale-[1.03] disabled:bg-black disabled:text-white dark:disabled:bg-white dark:disabled:text-black"
      onClick={() => router.push('train/')}
    >
      <AiOutlinePlus
        size={50}
        className="w-20 m-auto translate-y-2 group-hover:-translate-y-1 transition-all duration-75"
      />
      <span className="opacity-0 group-hover:opacity-100 transtition-opacity duration-200">
        {userData.model_tokens === 0
          ? 'Compra tokens en la tienda'
          : 'Entrena un modelo'}
      </span>
    </button>
  );
};
