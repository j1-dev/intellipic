import { NextResponse } from 'next/server';
import stripe from '../../../core/clients/stripe';
import { supabase } from '@/app/supabaseClient';

export async function POST(request: any) {
  let data = await request.json();
  let userId = data.userId;
  let session = null;

  const { data: userData } = await supabase
    .from('user-data')
    .select('*')
    .eq('id', userId);

  if (userData && userData[0]) {
    session = await stripe.checkout.sessions.retrieve(
      userData[0].last_payment_id
    );

    if (session.payment_status !== userData[0].last_payment_status) {
      await supabase
        .from('payments')
        .select('*')
        .eq('id', userData[0].last_payment_id)
        .then(async (payment) => {
          const genTokens = payment?.data?.[0]
            ?.token_amount_generating as number;
          const trnTokens = payment?.data?.[0]?.token_amount_training as number;

          const { data, error } = await supabase
            .from('user-data')
            .update({
              model_tokens: userData[0].model_tokens + trnTokens,
              image_tokens: userData[0].image_tokens + genTokens,
              last_payment_status: 'paid'
            })
            .eq('id', userId);
          console.log(data);
          console.log(error);
        });

      await supabase
        .from('payments')
        .update({ payment_status: 'paid' })
        .eq('id', userData[0].last_payment_id);

      return NextResponse.json({ message: 'Payment complete!', done: true });
    } else {
      return NextResponse.json({
        message: 'Credits already collected!',
        done: true
      });
    }
  }

  return NextResponse.json({ message: 'Waiting for payment...', done: false });
}
