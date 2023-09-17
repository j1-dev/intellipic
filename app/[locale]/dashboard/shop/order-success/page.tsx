'use client';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import useInterval from '@/app/core/utils/useInterval';

function SuccessPage() {
  const [user, setUser] = useState<any>(null);
  const [done, setDone] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const sub = async () => {
      supabase.auth.getSession().then((s) => {
        setUser(s?.data?.session?.user);
      });
    };
    sub();
  }, []);

  useEffect(() => {
    if (done) {
      toast.success('Payment successful!');
    }
  }, [done]);

  const handleGetPaymentStatus = async () => {
    if (user !== null) {
      const { data } = await axios.post(
        '/api/shop/get-payment-status/',
        {
          userId: user.id
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      if (data.done) {
        router.push(`/dashboard/${user.id}/`);
      }
      setDone(data.done);
    }
  };

  useInterval(() => handleGetPaymentStatus(), 500);

  return (
    <div className="w-full m-auto mt-24 text-center">
      <h1 className="text-3xl font-bold">El pago ha sido aceptado</h1>
      <h2 className="text-xl font-bold mt-3">
        Será redirigido a la pantalla de inicio pronto
      </h2>
    </div>
  );
}

export default SuccessPage;
