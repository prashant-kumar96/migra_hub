import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import ButtonLoader from "./loaders/buttonLoader";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function CheckoutForm({ items }) {
  const [loading, setLoading] = useState(false);
  const handleCheckout = async () => {
    setLoading(true);
    const stripe = await stripePromise;

    const response = await fetch(
      "http://localhost:5000/create-checkout-session",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      }
    );

    const session = await response.json();

    // Redirect to Stripe Checkout
    const result = await stripe.redirectToCheckout({ sessionId: session.id });
    console.log("result of stripe payment", result);
    if (result.error) {
      console.error(result.error.message);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="bg-blue-500 text-white px-4 py-2 rounded flex items-center justify-center gap-2"
    >
      Checkout {loading && <ButtonLoader />}
    </button>
  );
}
