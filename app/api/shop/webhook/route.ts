import supabase from '@/app/core/clients/supabase';
import { NextResponse } from 'next/server';

import Stripe from 'stripe';

export async function POST(request: Request) {
  const body = await request.text();

  const sig = request.headers.get('Stripe-Signature');
  if (!sig) {
    console.log('No signature');
    return NextResponse.json({ error: 'No signature' });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2022-11-15',
    typescript: true
  });

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET! as string
    );
  } catch (err: any) {
    console.log(`Webhook signature verification failed.`, err.message);
    return NextResponse.json({ error: err });
  }

  console.log('received ', event.type);

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const paymentIntent = event.data.object as Stripe.Checkout.Session;
      const userId = paymentIntent?.metadata?.userId;
      const amount = paymentIntent?.amount_total;
      const status = paymentIntent?.payment_status;

      if (status === 'paid') {
        const { data: userData } = await supabase
          .from('user-data')
          .select('*')
          .eq('id', userId);

        let tokenAmountGenerating = 0;
        let tokenAmountTraining = 0;

        switch (amount) {
          case 100:
            tokenAmountGenerating = 10;
            break;
          case 200:
            tokenAmountGenerating = 25;
            break;
          case 300:
            tokenAmountGenerating = 40;
            break;
          case 400:
            tokenAmountGenerating = 20;
            tokenAmountTraining = 1;
            break;
          case 700:
            tokenAmountGenerating = 100;
            break;
          default:
            break;
        }

        const { data, error } = await supabase
          .from('user-data')
          .update({
            model_tokens: userData?.[0].model_tokens + tokenAmountTraining,
            image_tokens: userData?.[0].image_tokens + tokenAmountGenerating,
            last_payment_status: 'paid'
          })
          .eq('id', userId);
      }

      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  return NextResponse.json({ received: true });
}
