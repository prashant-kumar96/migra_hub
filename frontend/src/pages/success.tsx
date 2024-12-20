import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { meDataAtom } from "@/store/meDataAtom";
import { useAtom } from "jotai";
import { me } from "@/api/auth";
import AfterLoginLayout from "@/components/afterLoginLayout/AfterLoginLayout";

const Success = () => {
  const router = useRouter();
  const { session_id } = router.query; // Get session_id from the URL
  const [sessionDetails, setSessionDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [meData] = useAtom(meDataAtom);

  const getmedata = async () => {};

  useEffect(() => {
    getmedata();
  }, []);

  console.log(meData);

  const fun1 = async () => {
    if (session_id) {
      const result = await me();
      console.log("result getmedata", result?.data);

      // Fetch session details from the backend
      fetch("http://localhost:5000/retrieve-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: session_id,
          userId: result?.data?.user?._id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setSessionDetails(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching session details:", error);
          setLoading(false);
        });
    }
  };
  useEffect(() => {
    fun1();
  }, [session_id]);

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  }

  if (!sessionDetails) {
    return (
      <p className="text-center mt-10 text-red-500">
        Unable to fetch session details.
      </p>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-20 w-20 text-green-500 mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h1 className="mt-4 text-3xl font-bold text-green-600">
          Payment Successful!
        </h1>
        <p className="mt-2 text-gray-700">
          Thank you for your purchase,{" "}
          <b>{sessionDetails.customer_details.email}</b>.
        </p>
        <p className="mt-2 text-gray-700">
          Total Paid: <b>${(sessionDetails.amount_total / 100).toFixed(2)}</b>
        </p>
        <a
          href="/dashboard"
          className="mt-6 inline-block bg-green-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-green-600"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default AfterLoginLayout(Success);
