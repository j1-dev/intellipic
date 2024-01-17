import { NextResponse } from 'next/server';
import stripe from '../../../core/clients/stripe';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';

export async function POST(request: any) {
  const cookieStore = cookies();
  const supabase = createRouteHandlerClient({
    cookies: () => cookieStore
  });
  let data = await request.json();
  let productId = data.productId;
  let priceId = data.priceId;
  let userId = data.userId;

  let url = request.url.substring(0, request.url.length - 19);

  const product = await stripe.products.retrieve(productId);

  const imageCredits = product.metadata.image_credits;
  const modelCredits = product.metadata.model_credits;

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: priceId,
        quantity: 1
      }
    ],
    mode: 'payment',
    allow_promotion_codes: true,
    success_url: url + '/dashboard/' + userId,
    cancel_url: url + '/dashboard/' + userId,
    metadata: {
      userId: userId,
      imageCredits: imageCredits,
      modelCredits: modelCredits
    }
  });

  await supabase.from('payments').insert({
    id: session.id,
    payment_status: session.payment_status,
    token_amount_generating: product.metadata.image_credits,
    token_amount_training: product.metadata.model_credits,
    price: session.amount_total
  });

  await supabase
    .from('user-data')
    .update({
      last_payment_id: session.id,
      last_payment_status: session.payment_status
    })
    .eq('id', userId);

  return NextResponse.json(session.url);
}
