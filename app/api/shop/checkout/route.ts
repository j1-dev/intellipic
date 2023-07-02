import { NextResponse } from 'next/server';
import stripe from '../../../core/clients/stripe';
import { supabase } from '@/app/supabaseClient';

export async function POST(request: any) {
  let data = await request.json();
  let priceId = data.priceId;
  let userId = data.userId;
  let tokenAmountGenerating = 0;
  let tokenAmountTraining = 0;
  let url = request.url.substring(0, request.url.length - 19); // crap
  // console.log(url);

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: priceId,
        quantity: 1
      }
    ],
    mode: 'payment',
    success_url: url + '/dashboard/shop/order-success',
    cancel_url: url + '/dashboard/shop/'
  });

  switch (session.amount_total) {
    case 100:
      tokenAmountGenerating = 10;
      break;
    case 200:
      tokenAmountGenerating = 30;
      break;
    case 300:
      tokenAmountGenerating = 50;
      break;
    case 350:
      tokenAmountGenerating = 20;
      tokenAmountTraining = 1;
      break;
    case 500:
      tokenAmountGenerating = 100;
      break;
    default:
      break;
  }

  console.log(tokenAmountGenerating);
  console.log(tokenAmountTraining);

  console.log(session.amount_total);

  await supabase.from('payments').insert({
    id: session.id,
    payment_status: session.payment_status,
    token_amount_generating: tokenAmountGenerating,
    token_amount_training: tokenAmountTraining
  });
  console.log(userId);
  await supabase
    .from('user-data')
    .update({
      last_payment_id: session.id,
      last_payment_status: session.payment_status
    })
    .eq('id', userId);

  return NextResponse.json(session.url);
}
