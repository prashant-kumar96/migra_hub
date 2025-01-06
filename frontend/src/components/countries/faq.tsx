import { useRouter } from "next/router";
import React, { useState, useRef } from "react";
import { countriesData } from "@/utils/CountriesData";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";

const FAQSection = () => {
  const [openAccordion, setOpenAccordion] = useState(null);
  const accordionRefs = useRef([]);
  const router = useRouter();
  const { country } = router.query;

  // Find the selected country's data based on the route's query parameter
  const selectedCountry = countriesData?.find(
    //@ts-ignore
    (item) => item.name.toLowerCase() === country?.toLowerCase()
  );
  console.log(';; selected country',selectedCountry)


  // If no country is found, display a fallback message
  if (!selectedCountry) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Country Not Found</h2>
        <p className="text-gray-700">Please select a valid country.</p>
      </div>
    );
  }

  console.log('selected country',selectedCountry);
  

  const handleAccordionToggle = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const handleButtonClick = (index) => {
    setOpenAccordion(index);
    accordionRefs.current[index]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section className="py-3 px-2 mx-auto max-w-screen-xl sm:py-6 lg:px-6">
      <h2 className="text-3xl text-Indigo font-bold mb-1 capitalize">
        Frequently Asked Questions
      </h2>
      <div className="border-b-2 border-CGBlue w-24 mb-6 "></div>

      {/* FAQ Buttons */}
      <div className="flex flex-wrap gap-4 mb-8">
        {selectedCountry?.faq?.map((faqItem, index) => (
          <button
            key={index}
            onClick={() => handleButtonClick(index)}
            className={`px-4 py-2 font-medium rounded transition ${
              openAccordion === index
                ? " text-Indigo bg-transparent border border-Indigo hover:text-FloralWhite hover:bg-Indigo focus:z-10 focus:ring-2 focus:ring-Indigo focus:bg-Indigo focus:text-FloralWhite focus:border-FloralWhite "
                : " text-Indigo bg-transparent border border-Indigo "
            }`}
          >
            {faqItem.faqButton}
          </button>
        ))}
      </div>

      {/* Accordion */}
      <div>
        {selectedCountry?.faq?.map((faqItem, index) => (
          <div
            key={index}
            ref={(el) => (accordionRefs.current[index] = el)}
            className="border-b border-gray-200 mb-4"
          >
            <button
              className="w-full flex justify-between items-center p-4 text-left font-medium text-Indigo text-[19px] transition"
              onClick={() => handleAccordionToggle(index)}
            >
              <span className="font-bold uppercase text-[18px]">{faqItem.faqButton}</span>
              <span className="text-xl">
                {openAccordion === index ? (
                  <span className="text-[15px] text-Indigo">
                    <FaMinus />
                  </span>
                ) : (
                  <span className="text-[15px] text-Indigo">
                    <FaPlus />
                  </span>
                )}
              </span>
            </button>
            {openAccordion === index && (
              <div className="p-6 bg-transparent ">
                {faqItem.questions.map((qItem, qIndex) => (
                  <div key={qIndex} className="mb-4">
                    <p className="font-bold text-[18px] tracking-wide text-gray-500">{qItem.q}</p>
                    <p className="text-gray-500 tracking-wide text-[18px] text-justify mt-1 mb-6">{qItem.a}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
