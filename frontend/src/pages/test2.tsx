import { useRouter } from "next/router";
import React, { useState, useRef } from "react";
import { countriesData } from "@/utils/CountriesData";

const FAQSection = () => {
  const [openAccordion, setOpenAccordion] = useState(null);
  const accordionRefs = useRef([]);
  const router = useRouter();
  const { country } = router.query;

  // Find the selected country's data based on the route's query parameter
  const selectedCountry = countriesData.find(
    (item) => item.name.toLowerCase() === country?.toLowerCase()
  );

  // If no country is found, display a fallback message
  if (!selectedCountry) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Country Not Found</h2>
        <p className="text-gray-700">Please select a valid country.</p>
      </div>
    );
  }

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
    <div className="p-6 max-w-4xl mx-auto">
      {/* Heading */}
      <h2 className="text-2xl font-semibold mb-6">
        Frequently Asked Questions about {selectedCountry.name}
      </h2>

      {/* FAQ Buttons */}
      <div className="flex flex-wrap gap-4 mb-8">
        {selectedCountry.faq.map((faqItem, index) => (
          <button
            key={index}
            onClick={() => handleButtonClick(index)}
            className="px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded hover:bg-blue-500 hover:text-white transition"
          >
            {faqItem.faqButton}
          </button>
        ))}
      </div>

      {/* Accordion */}
      <div>
        {selectedCountry.faq.map((faqItem, index) => (
          <div
            key={index}
            ref={(el) => (accordionRefs.current[index] = el)}
            className="border-b border-gray-300 mb-4"
          >
            <button
              className="w-full flex justify-between items-center p-4 text-left font-medium text-blue-700 hover:bg-gray-100 transition"
              onClick={() => handleAccordionToggle(index)}
            >
              {faqItem.faqHeading}
              <span className="text-xl">
                {openAccordion === index ? "−" : "+"}
              </span>
            </button>
            {openAccordion === index && (
              <div className="p-4 bg-gray-50">
                {faqItem.questions.map((qItem, qIndex) => (
                  <div key={qIndex} className="mb-4">
                    <p className="font-semibold">{qItem.q}</p>
                    <p>{qItem.a}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
