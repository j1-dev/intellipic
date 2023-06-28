import Stripe from 'stripe';
import { NextResponse } from 'next/server';

interface Product {
  id: string;
  name: string;
  price: number;
  features: string[];
}

export async function GET(request: any) {
  const config: Stripe.StripeConfig = { apiVersion: '2022-11-15' };
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, config);
  const prices = await stripe.prices.list({
    limit: 5
  });
  const products = await stripe.products.list({
    limit: 5
  });
  const resArray: Product[] = new Array<Product>();
  prices.data.map((price, index) => {
    const pric = prices.data[index];
    const prod = products.data[index];
    const producto: Product = {
      id: prod.id,
      name: prod.name,
      price: pric.unit_amount as number,
      features: prod.attributes as string[]
    };
    resArray.push(producto);
  });

  return NextResponse.json(resArray.reverse());
}
