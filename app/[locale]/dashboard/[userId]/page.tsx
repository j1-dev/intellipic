'use client';
import ModelCard from '@/components/ModelCard';
import { TrainButton } from '@/components/TrainButton';
import supabase from '@/app/core/clients/supabase';
import useInterval from '@/app/core/utils/useInterval';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { encryptData, decryptData } from '@/app/core/utils/encrypt';
export interface userDataType {
  id: string;
  created_at: Date;
  dataset: object;
  run_id: string;
  image_tokens: number;
  model_tokens: number;
  last_payment_id: string;
  last_payment_status: string;
}

export default function DashboardPage() {
  const t = useTranslations('Dashboard');
  const params = useParams();
  const user = params.userId;
  const [models, setModels] = useState<any>(() => {
    let data = decryptData('models');
    let mod = data?.split('(sep)');
    let arr = [] as Array<Object>;
    mod?.map((m) => {
      if (m) {
        arr.push(JSON.parse(m));
      }
    });
    return arr;
  });
  const [progress, setProgress] = useState(() => {
    const int = parseInt(JSON.parse(decryptData(`progress`) as string));
    if (!isNaN(int)) {
      return int;
    } else {
      return -1;
    }
  });
  const [userData, setUserData] = useState<userDataType>(() =>
    // @ts-ignore
    JSON.parse(decryptData('userData'))
  );

  useEffect(() => {
    fetchUserInfo();
    fetchModels();
  }, []);

  const fetchModels = async () => {
    const { data, error } = await supabase
      .from('trainings')
      .select('*')
      .eq('user_id', user)
      .order('created_at', { ascending: false });

    if (error) {
      console.error(error);
    } else {
      setModels(data);
      let str = '';
      data.map((d: any) => {
        str += JSON.stringify(d) + '(sep)';
      });
      encryptData('models', str);
    }
  };

  const fetchUserInfo = async () => {
    const { data: d, error: e } = await supabase
      .from('user-data')
      .select('*')
      .eq('id', user);

    if (e) {
      console.error(e);
    } else {
      setUserData(d[0]);
      encryptData('userData', JSON.stringify(d[0] || {}));
    }
  };

  async function getModelStatus(user: any) {
    await fetch(`/api/ai/${user}/status`, { cache: 'no-store' })
      .then((response) => response.json())
      .then((data) => {
        if (data.run_data.status === 'failed') {
          fetchUserInfo();
        }
        const progString = data.run_data.progress;
        const progNum = parseInt(progString);
        if (!isNaN(progNum)) {
          setProgress(progNum);
        } else {
          setProgress(-1);
        }
      });
  }

  useInterval(() => {
    getModelStatus(user);
    fetchUserInfo();
    fetchModels();
  }, 2000);

  return (
    <div className="py-8">
      <div className="max-w-screen-lg mx-auto px-8">
        <h2 className="text-4xl font-bold mb-4">{t('title')}</h2>
        <h3 className="font-bold text-xl mb-4 inline-flex">
          <div>
            {'🪙🤖: '}
            {!!userData &&
            userData.model_tokens !== undefined &&
            userData.model_tokens !== null
              ? userData.model_tokens
              : '...'}
          </div>

          <div className="mx-4">
            {'🪙📷: '}
            {!!userData &&
            userData.image_tokens !== undefined &&
            userData.image_tokens !== null
              ? userData.image_tokens
              : '...'}
          </div>
        </h3>

        {models && models.length !== 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {models.map((data: any) => {
              const props = {
                userId: data.user_id as string,
                modelId: data.run_id as string,
                token: data.prompt_token as string,
                status: data.status as string,
                progress: progress as number
              };
              return <ModelCard props={props} key={data.run_id} />;
            })}
            <TrainButton userData={userData} />
          </div>
        ) : (
          <div className="w-full m-auto mt-24 text-center">
            <h1 className="text-3xl font-bold">{t('noModelsMessage')}</h1>
            <h2 className="text-xl font-semibold mt-3">
              {userData?.model_tokens === 0 ? (
                t('buyTokensMessage')
              ) : (
                <div className="max-w-screen-xs m-auto">
                  <TrainButton userData={userData} />
                </div>
              )}
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}
