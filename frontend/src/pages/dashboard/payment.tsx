import { getApplicationStatusDetails, updatePaymentStatus } from "@/api/applicationStatus";
import { checkifPaymentIsDone, me } from "@/api/auth";
import { getApplicationCharges } from "@/api/pricing";
import CheckoutForm from "@/components/CheckoutFormComponent";
import AfterLoginLayout, { ProgressBar } from "@/components/afterLoginLayout/AfterLoginLayout";
import Loader from "@/components/loaders/loader";
import { useAuth } from "@/context/auth-context";
import { meDataAtom } from "@/store/meDataAtom";
import axiosInstance from "@/utils/axios";
import { useAtom } from "jotai";
import { useEffect, useMemo, useState } from "react";
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';
import applicationDetails from "../adminDashboard/usersList/application-details";
import { RiSlowDownFill } from "react-icons/ri";
import Link from "next/link";


const Home = () => {
  const { width, height } = useWindowSize();
  const [sharedMedata, setSharedMedata] = useAtom(meDataAtom);
  const [isStripePaymentDone, setIsStripePaymentDone] = useState(false);
  const [applicationCharges, setApplicationCharges] = useState<any>(null);
  const [profileCompleteStatus, setProfileCompleteStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user, isLoading, isAuthenticated } = useAuth();
   const applicationId = user?.user?.applicationId;
    const userId = user?.user?._id;

  const getmedata = async () => {
      if (!applicationId) {
          console.log("No application ID available. Exiting.");
          return;
      }

      setLoading(true); // Ensure this is before any async operations
      setError(null); // Reset error before fetch

      try {
          console.log("Fetching profile completion status...");
          const isProfileComplete = await getApplicationStatusDetails(applicationId);
          setProfileCompleteStatus(isProfileComplete?.data?.applicationStatus?.profileCompletion);

          console.log("Fetching user metadata...");
           const result = await me();
           const userId = result?.data?.user?._id;
           setSharedMedata(result?.data?.user);

          console.log("Checking payment status...");
          const paymentResult = await checkifPaymentIsDone(userId);
          const paymentStatus = paymentResult?.data?.status;
          setIsStripePaymentDone(paymentStatus);

          console.log("Fetching application charges...");
          const charges = await getApplicationCharges(userId);
          setApplicationCharges(charges?.data?.applicationCharges || null);
         
      } catch (error: any) {
          console.error("Error fetching data:", error);
          setError(error.message || "An unexpected error occurred.");
      } finally {
          setLoading(false);
      }
  };

  useEffect(() => {
      if (isAuthenticated) {
          getmedata();
      }
  }, [isAuthenticated, applicationId]);
console.log(';; is payment',isStripePaymentDone)

const unpaidItems = useMemo(() => {
  if(!applicationCharges) return [];
const items = [];
if(applicationCharges?.primaryApplicant && !applicationCharges?.primaryApplicant?.payment) {
    items.push(applicationCharges.primaryApplicant);
}
 if(applicationCharges?.familyMembers && applicationCharges?.familyMembers?.length > 0) {
   const familyMembers = applicationCharges.familyMembers.filter((item:any)=> !item.payment)
   items.push(...familyMembers)
  }

  return items;

  },[applicationCharges])
  
const paidItems = useMemo(() => {
      if(!applicationCharges) return [];
      const items = [];
      if(applicationCharges?.primaryApplicant && applicationCharges?.primaryApplicant?.payment) {
          items.push(applicationCharges.primaryApplicant);
      }
     if(applicationCharges?.familyMembers && applicationCharges?.familyMembers?.length > 0) {
          const familyMembers = applicationCharges.familyMembers.filter((item:any)=> item.payment)
        items.push(...familyMembers)
      }
    return items;
  },[applicationCharges])

console.log('paid items',paidItems)


  if (loading || isLoading) {
      return (
          <div className="flex justify-center items-center min-h-screen bg-gray-50">
              <Loader text="Loading..." className="text-primary" />
          </div>
      );
  }

  if (error) {
      return (
          <div className="flex justify-center items-center min-h-screen bg-gray-50">
              <div className="text-red-500">
                  <p>{error}</p>
              </div>
          </div>
      );
  }

    if(profileCompleteStatus == 'pending'){
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <h2 className="text-2xl font-bold text-Indigo mb-4">
                Travel Visa Denial Risk
              </h2>
              <div className="flex items-center justify-center gap-2 mb-4">
                <RiSlowDownFill className="text-green-500" size={24} />
                <span className="text-xl font-medium">Low</span>
              </div>
              <p className="text-lg text-gray-600 italic mb-6">
                But our service gets your risk even lower
              </p>
              <Link
                href="/dashboard/profile"
                className="inline-flex items-center tracking-widest px-6 py-3 text-sm font-medium text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-[#333366] to-[#2C415A] rounded-md hover:opacity-90 transition-opacity"
              >
                Complete Profile First
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
  )
}
  if(!isAuthenticated) {
      return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
          <div className="text-gray-600">Not authenticated</div>
        </div>
      )
  }


  console.log(';; items',applicationCharges)
  console.log(';; unpaidItems',unpaidItems)
 

  return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
         
          <div className="max-w-3xl mx-auto">
              {isStripePaymentDone && (
                  <>
                      {/* <Confetti
                          width={width}
                          height={height}
                          recycle={false}
                          numberOfPieces={500}
                          gravity={0.3}
                      /> */}
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
                {paidItems?.length > 0 && (
                  <div className="bg-white shadow rounded-lg p-6">
                       <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                          Paid Applications
                      </h2>
                      <div className="mb-6">
                            {paidItems?.map((item:any, index:number) => (
                                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200">
                                    <span className="font-medium text-gray-700">{item.price === '145' ? 'Primary Applicant': item.name} {item.relationship && `(${item.relationship})`}</span>
                                    <span className="text-gray-600">
                                       ${item.price}
                                    </span>
                                </div>
                            ))}
                         
                      </div>
                  </div>
              )}
               {unpaidItems.length > 0 ? (
                  <div className="bg-white shadow rounded-lg p-6 mt-4">
                       <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                          Complete Your Payment
                      </h2>
                      <CheckoutForm
                          items={unpaidItems}
                      />
                  </div>
              ) : (
                  !isStripePaymentDone && applicationCharges &&  (
                      <div className="text-center text-gray-600">
                          All applications are paid.
                      </div>
                  )
              )}
                {!isStripePaymentDone && !applicationCharges &&  (
                  <div className="text-center text-gray-600">
                       Loading application charges...
                  </div>
              )}
          </div>
      </div>
  );
};

export default AfterLoginLayout(Home);