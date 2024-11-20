import Footer from "@/components/Footer";
import Header2 from "@/components/Header";
import React from "react";

const Help = () => {
  return (
    <>
      <Header2 />
      <div className="max-w-lg mx-auto mt-10 p-6 bg-white border border-gray-200 rounded-lg shadow mb-8">
        <h1 className="text-4xl text-Indigo font-semibold mb-4">Help Center</h1>

        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search for your question"
            className="w-full py-3 pl-4 pr-10 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            defaultValue="how to pay using credit card"
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-Gray tracking-wide text-justify"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </span>
        </div>

        <div>
          <h2 className="text-lg font-medium text-DarkGray mb-4">
            Search results for "how to pay using credit card"
          </h2>

          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-lg hover:shadow transition">
              <span className="px-2 py-1 text-xs font-semibold text-white bg-blue-500 rounded-md">
                BEST MATCH
              </span>
              <h3 className="mt-2 text-base font-medium text-DarkGray">
                How do I pay with a card?
              </h3>
              <p className="text-base text-Gray tracking-wide text-justify">
                Learn about which cards you can use with Remitly and what fees
                apply.
              </p>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg hover:shadow transition">
              <h3 className="text-base font-medium text-DarkGray">How do I pay using iDEAL?</h3>
              <p className="text-base text-Gray tracking-wide text-justify">
                Find out how to pay for your Remitly transfer in the Netherlands
                using iDEAL.
              </p>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg hover:shadow transition">
              <h3 className="text-base font-medium text-DarkGray">
                How do I pay with Apple Pay?
              </h3>
              <p className="text-base text-Gray tracking-wide text-justify">
                Learn how to pay for your transfers with Apple Pay, add your
                debit card, and get answers to common questions.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Help;
