import Footer from "@/components/Footer";
import Header2 from "@/components/Header";


export default function PrivacyPolicy() {
  return (
    <>
    <Header2/>
      <iframe
        src=" https://app.termly.io/policy-viewer/policy.html?policyUUID=b8137fba-b82f-4cae-b0fe-8fbb8b7ef4a3"
        className="w-full h-screen text-base border rounded-lg"
      ></iframe>
      <Footer/>
    </>
  );
}
