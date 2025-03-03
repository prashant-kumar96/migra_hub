import Footer from "@/components/Footer";
import Header2 from "@/components/Header";
import { useState } from "react";


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
        src=" https://app.termly.io/policy-viewer/policy.html?policyUUID=b8137fba-b82f-4cae-b0fe-8fbb8b7ef4a3"
        className="w-full h-screen text-base border rounded-lg"
        onLoad={() => setLoading(false)}
      ></iframe>
      <Footer/>
    </>
  );
}
