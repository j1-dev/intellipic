import { NextResponse } from 'next/server';

import Stripe from 'stripe';

export async function POST(request: Request) {
  const body = await request.text();

  const sig = request.headers.get('Stripe-Signature');
  if (!sig) {
    console.log('No signature');
    return NextResponse.json({ error: 'No signature' });
  }

  const stripe = new Stripe(process.env.STRIPE_API_KEY!, {
    apiVersion: '2022-11-15',
    typescript: true
  });

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.log(`Webhook signature verification failed.`, err.message);
    return NextResponse.json({ error: err });
  }

  console.log('received ', event.type);

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object as Stripe.Checkout.Session;
      const userId = Number(paymentIntent?.metadata?.userId) || 1;
      console.log('userId ', userId);

      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;

      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  return NextResponse.json({ received: true });
}
