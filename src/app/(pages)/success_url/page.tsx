"use client";

import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Shipement from "../genrate-tracking/page";


// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

export default function FormPage() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [showForm] = useState<boolean>(true);

  useEffect(() => {
    // Fetch the PaymentIntent clientSecret from the server
    fetch("/api/check-out", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }), // Replace with your cart items
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  return (

    <section>
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-center mb-6">Checkout</h1>

      {showForm && clientSecret ? (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          < Shipement  />
        </Elements>
      ) : (
        <div className="flex justify-center items-center h-[60vh]">
        <div className="spinner border-t-2 border-indigo-600 border-solid w-6 h-6 mx-auto animate-spin  "></div>
      </div>
      )}
    </div>
    </section>
  );
}
