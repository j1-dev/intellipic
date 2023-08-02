'use client';
import { supabase } from '@/app/supabaseClient';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useIsomorphicLayoutEffect } from 'usehooks-ts';

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

function SuccessPage() {
  const [user, setUser] = useState<any>(null);
  const [done, setDone] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const sub = async () => {
      supabase.auth.getSession().then((s) => {
        console.log(s?.data?.session?.user.id);
        setUser(s?.data?.session?.user);
      });
    };
    sub();
  }, []);

  useEffect(() => {
    if (done) {
      toast.success('Payment successful!');
      router.push(`/dashboard/${user.id}/`);
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
      console.log(data.done);
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
