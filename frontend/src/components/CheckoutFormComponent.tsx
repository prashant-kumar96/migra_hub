import { loadStripe } from "@stripe/stripe-js";
import { useMemo, useState } from "react";
import ButtonLoader from "./loaders/buttonLoader";
import CreateButton from "@/components/ui/buttons/CreateButton"
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
              `${process.env.NEXT_PUBLIC_API_URL}/create-checkout-session`,
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
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-6 text-center">
                Order Summary
            </h2>
            
            <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                    <span className="font-medium text-gray-700">Primary Applicant</span>
                    <span className="text-gray-900 font-semibold">${primaryApplicantPrice}</span>
                </div>
                
                {numberOfFamilyMembers > 0 && (
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                        <span className="font-medium text-gray-700">Family Member</span>
                        <span className="text-gray-900 font-semibold">
                            {numberOfFamilyMembers} × ${familyMemberPrice} = ${numberOfFamilyMembers * familyMemberPrice}
                        </span>
                    </div>
                )}
            </div>

            <div className="flex justify-between items-center mb-8">
                <span className="text-xl font-bold text-gray-900">Total</span>
                <span className="text-xl font-bold text-gray-900">${calculateTotal()}</span>
            </div>

            <CreateButton
                text="Pay now"
                onClick={handleCheckout}
                loading={loading}
                className="w-full"
            />
            
            <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-gray-500">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 116 0z" clipRule="evenodd" />
                </svg>
                <span>Secure payment powered by Stripe</span>
            </div>
        </div>
    );
}