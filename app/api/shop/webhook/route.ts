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
      // 'whsec_C7yyJBCdNVqfv7gfqRYdQLIzSWZIEccf'
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
      const tokenAmountGenerating = parseInt(
        paymentIntent?.metadata?.imageCredits || ''
      );
      const tokenAmountTraining = parseInt(
        paymentIntent?.metadata?.modelCredits || ''
      );
      const status = paymentIntent?.payment_status;

      console.log(tokenAmountGenerating);
      console.log(tokenAmountTraining);

      if (status === 'paid') {
        const { data: userData } = await supabase
          .from('user-data')
          .select('*')
          .eq('id', userId);

        const { data, error } = await supabase
          .from('user-data')
          .update({
            model_tokens: userData?.[0].model_tokens + tokenAmountTraining,
            image_tokens: userData?.[0].image_tokens + tokenAmountGenerating,
            last_payment_status: 'paid'
          })
          .eq('id', userId);

        await supabase
          .from('payments')
          .update({ payment_status: 'paid' })
          .eq('id', userData?.[0]?.last_payment_id);
      }

      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  return NextResponse.json({ received: true });
}
