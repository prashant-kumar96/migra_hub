import React from "react";
import { IoWarningOutline } from "react-icons/io5";
import { CiCreditCardOff } from "react-icons/ci";
import { RiPassExpiredLine } from "react-icons/ri";
import { GiCrimeSceneTape } from "react-icons/gi";
import { countriesData } from "@/utils/CountriesData";
import { useRouter } from "next/router";
const VisaRejectionReasons = () => {
  const router = useRouter();
  const { country } = router.query;
  const selectedCountry = countriesData.find(
    (item) => item.name.toLowerCase() === country?.toLowerCase()
  );
  
  const reasons = [
    {
      title: "Expired Passport",
      description:
        "Applying with a passport that has expired or expires within 6 months",
      icon:  RiPassExpiredLine
    },
    {
      title: "Insufficient Funds",
      description:
        "Failing to demonstrate enough financial resources to support your stay.",
      icon: CiCreditCardOff
    },
    {
      title: "Criminal Record",
      description:
        "Having a criminal history that disqualifies you from obtaining a visa.",
      icon:  GiCrimeSceneTape 
    },
    {
      title: "Previous Visa Violations",
      description:
        "Having overstayed or violated the terms of a previous visa.",
      icon: IoWarningOutline,
    },
  ];

  return (
    <section className="py-4 px-2 mx-auto max-w-screen-xl sm:py-6 lg:px-6">
       <h2 className="text-3xl text-Indigo font-bold mb-1">
        {selectedCountry ? `${selectedCountry.name.replace(/-/g, " ")} Visa Rejection Reasons` : 'Visa Rejection Reasons'}
      </h2>
      <div className="border-b-2 border-CGBlue w-24 mb-6"></div>
      <p className="text-[19px] tracking-wide text-Gray mb-6">
        Factors that can get your visa rejected
      </p>
      <div className="space-y-10">
        {reasons.map((reason, index) => (
          <div key={index} className="flex items-start space-x-6">
             <reason.icon size={32} color="gray" />
            <div>
              <h3 className="font-semibold text-xl text-Indigo">
                {reason.title}
              </h3>
              <p className="text-base text-Gray tracking-wider italic">{reason.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default VisaRejectionReasons;
