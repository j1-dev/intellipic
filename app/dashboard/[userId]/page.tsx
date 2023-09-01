'use client';
import ModelCard from '@/app/components/ModelCard';
import { TrainButton } from '@/app/components/TrainButton';
import supabase from '@/app/core/clients/supabase';
import useInterval from '@/app/core/utils/useInterval';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

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
  const params = useParams();
  const user = params.userId;
  const [models, setModels] = useState<any>(() => {
    let data = localStorage.getItem('models') || '';
    let mod = data.split('(sep)');
    let arr = [] as Array<Object>;
    mod.map((m) => {
      if (m) {
        arr.push(JSON.parse(m));
      }
    });
    return arr;
  });
  const [userData, setUserData] = useState<userDataType>(() =>
    JSON.parse(localStorage.getItem('userData') as string)
  );

  useEffect(() => {
    fetchUserInfo();
    fetchModels();
  }, [user]);

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
      localStorage.setItem('models', str);
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
      localStorage.setItem('userData', JSON.stringify(d[0] || {}));
    }
  };

  async function getModelStatus(user: any) {
    await fetch(`/api/ai/${user}/status`, { cache: 'no-store' });
  }

  useInterval(() => {
    getModelStatus(user);
    fetchUserInfo();
    fetchModels();
  }, 2000);

  return (
    <div className="py-8">
      <div className="max-w-screen-lg mx-auto px-8">
        <h2 className="text-4xl font-bold mb-4">Modelos 🤖</h2>
        <h3 className="text-xl mb-4">
          Tokens para entrenar:{' '}
          {!!userData && userData.model_tokens !== undefined
            ? userData.model_tokens
            : '...'}
        </h3>

        {models && models.length !== 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {models.map((data: any) => {
              const props = {
                userId: data.user_id as string,
                modelId: data.run_id as string,
                token: data.prompt_token as string,
                status: data.status as string
              };
              return <ModelCard props={props} key={data.run_id} />;
            })}
            <TrainButton userData={userData} />
          </div>
        ) : (
          <div className="w-full m-auto mt-24 text-center">
            <h1 className="text-3xl font-bold">
              Todavía no has entrenado ningún modelo
            </h1>
            <h2 className="text-xl font-bold mt-3">
              {userData?.model_tokens === 0 ? (
                'Compra tokens en la tienda para entrenar tu primer modelo'
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
