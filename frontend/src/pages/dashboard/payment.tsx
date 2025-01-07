import { checkifPaymentIsDone, me } from "@/api/auth";
import { getApplicationCharges } from "@/api/pricing";
import CheckoutForm from "@/components/CheckoutFormComponent";
import AfterLoginLayout from "@/components/afterLoginLayout/AfterLoginLayout";
import Loader from "@/components/loaders/loader";
import { useAuth } from "@/context/auth-context";
import { meDataAtom } from "@/store/meDataAtom";
import axiosInstance from "@/utils/axios";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const Home = () => {
  const { width, height } = useWindowSize();
  const [sharedMedata, setSharedMedata] = useAtom(meDataAtom);
  const [isStripePaymentDone, setIsStripePaymentDone] = useState(false);
  const [applicationCharges, setApplicationCharges] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, isLoading } = useAuth();

  const getmedata = async () => {
    try {
      setLoading(true);
      const result = await me();
      setSharedMedata(result?.data?.user);
      const userId = result?.data?.user?._id;
      
      const paymentResult = await checkifPaymentIsDone(userId);
      setIsStripePaymentDone(paymentResult?.data?.status);
      
      const charges = await getApplicationCharges(userId);
      if (charges?.data) {
        setApplicationCharges(charges?.data?.applicationCharges);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getmedata();
  }, [user]);

  if (loading || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <Loader text="Loading..." className="text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {isStripePaymentDone && (
          <>
            <Confetti
              width={width}
              height={height}
              recycle={false}
              numberOfPieces={500}
              gravity={0.3}
            />
            <div className="mb-8 text-center">
              <div className="bg-green-100 border border-green-400 rounded-lg p-6">
                <div className="flex items-center justify-center mb-4">
                  <svg
                    className="w-12 h-12 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-green-700 mb-2">
                  Payment Successful!
                </h2>
                <p className="text-green-600">
                  Thank you for your payment. We have received it successfully.
                </p>
              </div>
            </div>
          </>
        )}

        {!isStripePaymentDone && applicationCharges !== null ? (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Complete Your Payment
            </h2>
            <CheckoutForm
              items={[
                applicationCharges.primaryApplicant,
                ...applicationCharges.familyMembers
              ]}
            />
          </div>
        ) : (
          !isStripePaymentDone && (
            <div className="text-center text-gray-600">
              Loading application charges...
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default AfterLoginLayout(Home);