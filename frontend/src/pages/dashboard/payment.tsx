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


const Home = () => {
  const [sharedMedata, setSharedMedata] = useAtom(meDataAtom);
  const [isStripePaymentDone, setIsStripePaymentDone] = useState(false);
  const [applicationCharges, setApplicationCharges] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { user, isLoading } = useAuth();

  const getmedata = async () => {
      try {
          setLoading(true);
          const result = await me();
          setSharedMedata(result?.data?.user);
          const userId = result?.data?.user?._id;
          console.log("userId", userId);
          const result1 = await checkifPaymentIsDone(userId);
          console.log("result1", result1);
          console.log("result", result1?.data?.status);
          setIsStripePaymentDone(result1?.data?.status);

          const charges = await getApplicationCharges(userId);
          if(charges?.data){
              setApplicationCharges(charges?.data?.applicationCharges)
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
          <div className="flex justify-center items-center min-h-screen">
              <Loader text='Loading..' />
          </div>
      );
  }

  return (
      <div className="text-gray-700 p-4">
          <h1>Visa Payment</h1>
          {isStripePaymentDone ? (
              <p className="bg-green-500 text-white text-xl w-fit py-2 px-4 rounded ps-2">
                  Stripe payment is Already done
              </p>
          ) : (
              applicationCharges !== null ? (
                  <CheckoutForm items={[applicationCharges.primaryApplicant, ...applicationCharges.familyMembers]} />
              ) : (
                  <p>Loading application charges...</p>
              )
          )}
      </div>
  );
};

export default AfterLoginLayout(Home);