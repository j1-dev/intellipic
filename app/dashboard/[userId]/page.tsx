'use client';
import { useParams } from 'next/navigation';
import { supabase } from '@/app/supabaseClient';
import { useEffect, useState } from 'react';
import ModelCard from '@/app/components/ModelCard';
import { PulseLoader } from 'react-spinners';

export default function DashboardPage() {
  const params = useParams();
  const user = params.userId;
  const [models, setModels] = useState<any>();

  useEffect(() => {
    const fetchModels = async () => {
      const { data, error } = await supabase
        .from('trainings')
        .select('*')
        .eq('user_id', user);

      if (error) {
        console.error(error);
      } else {
        setModels(data);
      }
    };

    fetchModels();
  }, []);

  return (
    <div className="py-8">
      <div className="max-w-screen-lg mx-auto px-8">
        <h2 className="text-2xl font-bold mb-4">Modelos 🤖</h2>

        {models ? (
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
          <div className="w-40 m-auto mt-24">
            <PulseLoader color="#B6B6B6" />
          </div>
        )}
      </div>
    </div>
  );
}
