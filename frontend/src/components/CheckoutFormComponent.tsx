import { loadStripe } from "@stripe/stripe-js";
import { useMemo, useState } from "react";
import ButtonLoader from "./loaders/buttonLoader";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || "");

interface Item {
    name: string;
    price: number;
    quantity: number;
}

interface Props {
    items: Item[];
}


export default function CheckoutForm({ items }: Props) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
      setLoading(true);
      const stripe = await stripePromise;

      try {
          const response = await fetch(
              `${process.env.NEXT_PUBLIC_BACKEND_URL}create-checkout-session`,
              {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ items }),
              }
          );

          if (!response.ok) {
              const errorData = await response.json();
              console.error("Error creating checkout session:", errorData);
              throw new Error(errorData.message || "Failed to create checkout session");
          }

          const session = await response.json();

          // Redirect to Stripe Checkout
          const result = await stripe?.redirectToCheckout({ sessionId: session.id });
          console.log("result of stripe payment", result);
          if (result?.error) {
              console.error(result.error.message);
              throw new Error(result.error.message);
          }
      } catch (error: any) {
          console.error("Error during checkout:", error);
          // Handle error here
      } finally {
          setLoading(false);
      }
  };

  const calculateTotal = () => {
      return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const primaryApplicantPrice = useMemo(() => {
      const primaryApplicantItem = items.find(item => item.name === "Visa Application");
      return primaryApplicantItem ? primaryApplicantItem.price : 0;
  }, [items]);

  const familyMemberPrice = useMemo(() => {
      const familyMemberItem = items.find(item => item.name === "Family Member Application");
      return familyMemberItem ? familyMemberItem.price : 0;
  }, [items]);

  const numberOfApplications = useMemo(() => {
      return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]);

  const numberOfFamilyMembers = useMemo(() => {
      return numberOfApplications > 1 ? numberOfApplications - 1 : 0;
  }, [numberOfApplications]);


  return (
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-Indigo mb-4 text-center">
              Order Summary
          </h2>
          <div className="mb-6">
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                  <span className="font-medium text-gray-700">Primary Applicant Application</span>
                  <span className="text-gray-600">${primaryApplicantPrice}</span>
              </div>
              {numberOfFamilyMembers > 0 && (
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="font-medium text-gray-700">Family Member Applications</span>
                      <span className="text-gray-600">
                          {numberOfFamilyMembers} x ${familyMemberPrice} = ${numberOfFamilyMembers * familyMemberPrice}
                      </span>
                  </div>
              )}
          </div>
          <div className="flex justify-between items-center mb-4">
              <span className="font-bold text-gray-800">Total:</span>
              <span className="text-xl font-bold text-Indigo">${calculateTotal()}</span>
          </div>
          <button
              onClick={handleCheckout}
              className="w-full bg-gradient-to-r from-[#333366] to-[#2C415A] text-white px-4 py-3 rounded-md flex items-center justify-center gap-2 hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
          >
              Proceed to Payment {loading && <ButtonLoader />}
          </button>
      </div>
  );
}