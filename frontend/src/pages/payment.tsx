import { checkifPaymentIsDone, me } from "@/api/auth";
import CheckoutForm from "@/components/CheckoutFormComponent";
import AfterLoginLayout from "@/components/afterLoginLayout/AfterLoginLayout";
import { meDataAtom } from "@/store/meDataAtom";
import axiosInstance from "@/utils/axios";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";

const Home = () => {
  const items = [
    { name: "Product 1", price: 2000, quantity: 1 },
    { name: "Product 2", price: 1500, quantity: 2 },
  ];
  // console.log("error", error);
  // console.log("isStripePaymentDone1", isStripePaymentDone1);
  // console.log("data", data);

  const [sharedMedata, setSharedMedata] = useAtom(meDataAtom);
  const [isStripePaymentDone, setIsStripePaymentDone] = useState(false);

  const getmedata = async () => {
    const result = await me();
    setSharedMedata(result?.data?.user);
    const userId = result?.data?.user?._id;
    console.log("userId", userId);
    const result1 = await checkifPaymentIsDone(userId);
    console.log("result1", result1);
    console.log("result", result1?.data?.status);
    setIsStripePaymentDone(result1?.data?.status);
  };

  useEffect(() => {
    getmedata();
  }, []);

  return (
    <div className="text-gray-700 p-4">
      <h1>Visa Payment</h1>
      {isStripePaymentDone ? (
        <p className="bg-green-500 text-white text-xl w-fit py-2 px-4 rounded ps-2">
          Stripe payment is Already done
        </p>
      ) : (
        <CheckoutForm items={items} />
      )}
    </div>
  );
};

export default AfterLoginLayout(Home);
