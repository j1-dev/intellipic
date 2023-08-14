'use client';
import { useParams } from 'next/navigation';
import supabase from '@/app/core/clients/supabase';
import { useEffect, useState, useRef } from 'react';
import { useIsomorphicLayoutEffect } from 'usehooks-ts';
import ModelCard from '@/app/components/ModelCard';

function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);

  // Remember the latest callback if it changes.
  useIsomorphicLayoutEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    // Don't schedule if no delay is specified.
    // Note: 0 is a valid value for delay.
    if (!delay && delay !== 0) {
      return;
    }

    const id = setInterval(() => savedCallback.current(), delay);

    return () => clearInterval(id);
  }, [delay]);
}

// TODO: Add "Entrenar modelo" button to start the training process from this tab. Show it when the user has tokens
//       and hide it if they don't
export default function DashboardPage() {
  const params = useParams();
  const user = params.userId;
  const [models, setModels] = useState<any[]>();
  const [userData, setUserData] = useState<any>();

  useEffect(() => {
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
        console.log(d[0].image_tokens);
        console.log(d[0].model_tokens);
        setUserData(d[0]);
      }
    };

    fetchModels();
    fetchUserInfo();
  }, [user]);

  async function getModelStatus(user: any) {
    await fetch(`/api/ai/${user}/status`);
  }

  useInterval(() => getModelStatus(user), 10000);

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
          </div>
        ) : (
          <div className="w-full m-auto mt-24 text-center">
            <h1 className="text-3xl font-bold">
              Todavía no has entrenado ningún modelo
            </h1>
            <h2 className="text-xl font-bold mt-3">
              Compra tokens en la tienda para entrenar tu primer modelo
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}
