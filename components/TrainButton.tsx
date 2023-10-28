'user-client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { ClipLoader } from 'react-spinners';
import { useTranslations } from 'next-intl';
import { useTheme } from '@/app/core/utils/ThemeContext';

import { userDataType } from '@/app/[locale]/dashboard/[userId]/page';

export const TrainButton = ({ userData }: { userData: userDataType }) => {
  const t = useTranslations('TrainButton');
  const router = useRouter();
  const { enabled } = useTheme();
  const message =
    userData?.model_tokens !== 0 && userData?.model_tokens !== null
      ? !!userData?.dataset
        ? !!userData?.run_id
          ? t('trainingInProgress')
          : t('continueTraining')
        : t('trainModel')
      : t('buyTokens');

  function handleTrain(e: any) {
    e.preventDefault();
    if (!!userData?.run_id) {
      router.push('train/');
    } else if (
      userData?.model_tokens === 0 ||
      userData?.model_tokens === null
    ) {
      router.push('/dashboard/shop');
    } else {
      router.push('train/');
    }
  }

  return (
    <button
      className="py-3 w-full h-full rounded-lg group dark:shadow-slate-300 hover:shadow-lg border border-black dark:border-white transition-all ease-in-out duration-75 hover:scale-[1.03] disabled:bg-black disabled:text-white dark:disabled:bg-white dark:disabled:text-black"
      onClick={handleTrain}
    >
      {!!userData?.dataset ? (
        <div className="">
          <ClipLoader
            size={50}
            speedMultiplier={0.5}
            color={`${enabled ? 'white' : 'black'}`}
          />
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
