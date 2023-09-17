'user-client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { ClipLoader } from 'react-spinners';

import { userDataType } from '../app/dashboard/[userId]/page';

export const TrainButton = ({ userData }: { userData: userDataType }) => {
  const router = useRouter();
  const message =
    userData?.model_tokens !== 0 && userData?.model_tokens !== null
      ? !!userData?.dataset
        ? !!userData?.run_id
          ? 'Entrenamiento en proceso'
          : 'Continúa con el entrenamiento'
        : 'Entrena un modelo'
      : 'Compra tokens en la tienda';

  return (
    <button
      disabled={
        (userData?.model_tokens === 0 || userData?.model_tokens === null) &&
        userData?.dataset === null
      }
      className="py-3 w-full h-full rounded-lg group dark:shadow-slate-300 hover:shadow-lg border border-black dark:border-white transition-all ease-in-out duration-75 hover:scale-[1.03] disabled:bg-black disabled:text-white dark:disabled:bg-white dark:disabled:text-black"
      onClick={() => router.push('train/')}
    >
      {!!userData?.dataset ? (
        <div className="">
          <ClipLoader size={50} speedMultiplier={0.5} color="blue" />
        </div>
      ) : (
        <AiOutlinePlus
          size={50}
          className="w-20 m-auto translate-y-2 group-hover:-translate-y-1 transition-all duration-75"
        />
      )}
      <span className="opacity-0 group-hover:opacity-100 transtition-opacity duration-200">
        {message}
      </span>
    </button>
  );
};
