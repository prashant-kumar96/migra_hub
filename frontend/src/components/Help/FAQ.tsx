import React, { useState } from "react";
import { HelpData } from "@/utils/HelpData";

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  const toggleCategory = (index: number) => {
    setActiveCategory(activeCategory === index ? null : index);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="space-y-6">
        {HelpData.map((category, index) => (
          <div key={index} className="border-b border-gray-300">
            <div
              className="flex justify-between items-center cursor-pointer p-4"
              onClick={() => toggleCategory(index)}
            >
              <h3 className="text-xl font-bold tracking-tight text-Indigo">
                {category.title}
              </h3>
              <div
                className={`w-6 h-6 relative transform ${
                  activeCategory === index ? "rotate-45" : ""
                } transition-transform duration-300`}
              >
                <span className="absolute top-1/2 left-0 w-full h-1 bg-Indigo transform -translate-y-1/2"></span>
                <span className="absolute top-0 left-1/2 w-1 h-full bg-Indigo transform -translate-x-1/2"></span>
              </div>
            </div>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                activeCategory === index ? "max-h-screen" : "max-h-0"
              }`}
            >
              <div className="p-4 text-sm text-gray-400">
                {activeCategory === index &&
                  category.questions.map((faq, faqIndex) => (
                    <div key={faqIndex} className="mb-4">
                      <h4 className="text-lg font-semibold">{faq.q}</h4>
                      <p>{faq.a}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
