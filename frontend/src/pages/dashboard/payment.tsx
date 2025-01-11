import { updatePaymentStatus } from "@/api/applicationStatus";
import { checkifPaymentIsDone, me } from "@/api/auth";
import { getApplicationCharges } from "@/api/pricing";
import CheckoutForm from "@/components/CheckoutFormComponent";
import AfterLoginLayout, { ProgressBar } from "@/components/afterLoginLayout/AfterLoginLayout";
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
  const [loading, setLoading] = useState(false); // Removed initial value of true
  const [error, setError] = useState<string | null>(null);
  const { user, isLoading, isAuthenticated } = useAuth();
  const applicationId = user?.user?.applicationId;
  
  const getmedata = async () => {
    try {
      if (!applicationId) {
          console.log("no application ID")
        return; // Exit early if no application ID
      }
        console.log("fetching data...")
      setLoading(true);
      const result = await me();
      setSharedMedata(result?.data?.user);
      const userId = result?.data?.user?._id;
      await updatePaymentStatus(applicationId);

      const paymentResult = await checkifPaymentIsDone(userId);
      setIsStripePaymentDone(paymentResult?.data?.status);

      if (isStripePaymentDone) {
        try {
          const updateStatus = await updatePaymentStatus(applicationId);
          console.log("status update", updateStatus);
        } catch (error) {
          console.log("error", error);
        }
      }

      const charges = await getApplicationCharges(userId);
      if (charges?.data) {
        setApplicationCharges(charges?.data?.applicationCharges);
      }
    } catch (error:any) {
      console.error("Error fetching data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(isAuthenticated) {
      getmedata();
    }
  }, [isAuthenticated, applicationId]);


  if (loading || isLoading ) { //simplified loading check
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <Loader text="Loading..." className="text-primary" />
      </div>
    );
  }


  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  if(!isAuthenticated) {
      return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
          <div className="text-gray-600">Not authenticated</div>
        </div>
      )
  }


  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <ProgressBar />
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
                ...applicationCharges.familyMembers,
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