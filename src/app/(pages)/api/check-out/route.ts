import { NextRequest, NextResponse } from "next/server";

import Stripe from "stripe";

// // Initialize Stripe
const stripe = new Stripe(
  "sk_test_51QdrwHF1wBgHe2O85UfYhhg3t9oKEeOi2WuAvwjCt283DIUK1gQ0p09edNeiTdK36GogXSssmtWxloRyjo9s5SzT0033K3Hv9C",
  { apiVersion: "2024-12-18.acacia" }
);

const calculateOrderAmount = (items:unknown) => {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("Invalid items array");
  }

  // Calculate total amount dynamically
  return items.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
};


export async function POST(req: NextRequest) {

  const {item} = await req.json()

  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(item),
    currency: "eur",
    // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
    automatic_payment_methods: {
      enabled: true,
    },
  });

  return NextResponse.json({ clientSecret:  paymentIntent.client_secret})
}
