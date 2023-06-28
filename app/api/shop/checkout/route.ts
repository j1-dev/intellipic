import { NextResponse, NextRequest } from 'next/server';
import stripe from '../../../core/clients/stripe';

export async function POST(request: any) {
  let data = await request.json();
  let priceId = data.priceId;
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: priceId,
        quantity: 1
      }
    ],
    mode: 'payment',
    success_url: 'http://localhost:3000',
    cancel_url: 'http://localhost:3000'
  });

  return NextResponse.json(session.url);
}
