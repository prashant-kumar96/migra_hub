import Footer from "@/components/Footer";
import Header2 from "@/components/Header";


export default function PrivacyPolicy() {
  return (
    <>
    <Header2/>
      <iframe
        src="https://app.termly.io/policy-viewer/policy.html?policyUUID=b1acb7d2-5928-44a5-8863-2c696fec8132"
        className="w-full h-screen text-base border rounded-lg"
      ></iframe>
      <Footer/>
    </>
  );
}
