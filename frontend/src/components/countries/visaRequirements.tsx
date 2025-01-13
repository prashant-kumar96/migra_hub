import React from "react";
import { useRouter } from "next/router";
import { countriesData } from "@/utils/CountriesData";

const VisaRequirements = () => {
  const router = useRouter();
  const { country } = router.query;

  // Find the selected country based on the query parameter
  const selectedCountry = countriesData.find(
    (item) => item.name.toLowerCase() === country?.toLowerCase()
  );

  return (
    <section className="py-8 px-6 mx-auto max-w-screen-xl">
      {/* Heading */}
      <h2 className="text-3xl text-Indigo font-bold mb-1 capitalize">
        {selectedCountry
          ? `${selectedCountry.name.replace(/-/g, " ")} Visa Requirements`
          : "Visa Requirements"}
      </h2>
      <div className="border-b-2 border-CGBlue w-24 mb-6"></div>

      {/* Visa Requirement Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {selectedCountry?.VisaRequirements?.map((item, index) => (
          <button
            key={index}
            className="relative flex items-center gap-2 p-1.5 bg-[#E6F3F5] rounded-lg text-[15px] tracking-wide font-medium group"
          >

            <span className="text-Indigo mr-1">
              <img src={item.logo} alt={item.name} className="w-5 h-5" />
            </span>
            <span className="text-Indigo tracking-wide">{item.name}</span>

            <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 z-10 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 p-4 rounded-xl bg-[#CDE6EC] bg-clip-border text-FloralWhite shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-[#333366] to-[#2C415A]">
              <span className="font-semibold whitespace-nowrap font-greycliff text-base tracking-wide">
                Required Documents:
              </span>
              <div className="flex justify-start items-start text-justify">
                <ul className="list-decimal mt-1 space-y-2 capitalize">
                  {Array.isArray(item.tooltip) ? (
                    item.tooltip.map((tip, idx) => (
                      <li key={idx} className="text-sm ml-2 ">
                        {tip}
                      </li>
                    ))
                  ) : (
                    <li className="text-sm flex justify-start capitalize">{item.tooltip}</li>
                  )}
                </ul>
              </div>
            </div>



          </button>
        ))
        }

      </div>
    </section >
  );
};

export default VisaRequirements;
