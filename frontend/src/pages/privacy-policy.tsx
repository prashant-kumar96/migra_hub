import { useState } from "react";
import Footer from "@/components/Footer";
import Header2 from "@/components/Header";

export default function PrivacyPolicy() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <Header2 />
      {loading && (
        <div className="flex items-center justify-center h-screen">
          <p className="text-gray-600">Loading...</p>
        </div>
      )}
      <iframe
        src="https://app.termly.io/policy-viewer/policy.html?policyUUID=b1acb7d2-5928-44a5-8863-2c696fec8132"
        className={`w-full h-screen text-base border rounded-lg ${loading ? "hidden" : "block"}`}
        onLoad={() => setLoading(false)}
      ></iframe>
      <Footer />
    </>
  );
}
