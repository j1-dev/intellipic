import Stripe from 'stripe';

const stripeConfig: Stripe.StripeConfig = { apiVersion: '2022-11-15' };
const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY as string,
  stripeConfig
);

export default stripe;
