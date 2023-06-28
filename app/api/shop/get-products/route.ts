import Stripe from 'stripe';
import { NextResponse } from 'next/server';

export async function GET(request: any) {
  const config: Stripe.StripeConfig = { apiVersion: '2022-11-15' };
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, config);
  const prices = await stripe.prices.list({
    limit: 5
  });

  return NextResponse.json(prices.data.reverse());
}
