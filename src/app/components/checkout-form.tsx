import React from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "https://milestone3-ecommerce-ly9d.vercel.app/success_url",
      },
    });

    if (error?.type === "card_error" || error?.type === "validation_error") {
      setMessage(error.message || "An unexpected error occurred.");
    } else {
      setMessage("Payment succeeded!");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "accordion" as const, // Explicitly specify as a valid layout type
  };

  return (
    <form
      id="payment-form"
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 lg:space-y-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-xl font-semibold text-center">Payment Information</h2>
      <br />
      <PaymentElement
        id="payment-element"
        options={paymentElementOptions}
        className="w-full p-3 lg:border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      
      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading || !stripe || !elements}
        id="submit"
        className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-md disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-indigo-700 transition-colors"
      >
        <span id="button-text">
          {isLoading ? (
            <div className="spinner border-t-2 border-indigo-600 border-solid w-6 h-6 mx-auto animate-spin"></div>
          ) : (
            "Pay Now"
          )}
        </span>
      </button>

      {/* Error or Success Message */}
      {message && (
        <div
          id="payment-message"
          className={`p-3 rounded-md ${
            message.includes("succeeded")
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {message}
        </div>
      )}
    </form>
  );
}
