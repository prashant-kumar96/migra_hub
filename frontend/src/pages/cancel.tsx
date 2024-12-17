import AfterLoginLayout from "@/components/afterLoginLayout/AfterLoginLayout";

 const Cancel = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-20 w-20 text-red-500 mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        <h1 className="mt-4 text-3xl font-bold text-red-600">
          Payment Cancelled
        </h1>
        <p className="mt-2 text-gray-700">
          Your payment process was not completed. Please try again.
        </p>
        <a
          href="/payment"
          className="mt-6 inline-block bg-red-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-red-600"
        >
          Go Back
        </a>
      </div>
    </div>
  );
};

export default AfterLoginLayout(Cancel);
