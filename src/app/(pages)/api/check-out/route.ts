
import { NextResponse } from "next/server";

import Stripe from "stripe";

// // Initialize Stripe
const stripe = new Stripe(
  "sk_test_51QdrwHF1wBgHe2O85UfYhhg3t9oKEeOi2WuAvwjCt283DIUK1gQ0p09edNeiTdK36GogXSssmtWxloRyjo9s5SzT0033K3Hv9C",
  { apiVersion: "2024-12-18.acacia" }
);

const calculateOrderAmount = () => {
 return 1400;
  }

  // Calculate total amount dynamically

export async function POST() {


  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(),
    currency: "eur",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  return NextResponse.json({ clientSecret:  paymentIntent.client_secret})
}
