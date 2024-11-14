import React from "react";
import ProgressPie from "./progressPie";

const VisaRequirements = () => {
  return (
    <section className="bg-white py-6 px-4 max-w-4xl mx-auto">
      {/* Heading */}
      <h2 className="text-2xl font-bold mb-4">Canada Visa Requirements</h2>

      {/* Requirements Buttons */}
      <div className="flex flex-wrap gap-3 mb-6">
        {["Passport", "Photo", "Bank Statement", "Income Tax Return (ITR)"].map(
          (item, index) => (
            <button
              key={index}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium hover:bg-gray-200"
            >
              <span className="text-gray-700">{item}</span>
            </button>
          )
        )}
      </div>

      {/* Ease of Applying and Upload Time */}
      <div className="grid sm:grid-cols-2 gap-4">
        {/* Ease of Applying */}
        <div className="bg-gray-50 rounded-lg p-4 shadow-sm flex flex-col items-center text-center">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">👍</span>
            <span className="text-sm font-medium text-gray-700">
              Ease of Applying
            </span>
          </div>
          <div className="relative flex items-center justify-center w-36 h-36">
            {/* Circular Meter */}
            <svg className="w-full h-full">
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="10"
              />
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                fill="none"
                stroke="#34D399"
                strokeWidth="10"
                strokeDasharray="80 100"
                strokeLinecap="round"
              />
            </svg>
            {/* <ProgressPie/> */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-bold">Easy</span>
            </div>
          </div>
          <p className="text-sm mt-2 text-gray-700">
            6080 users+ found uploading documents as <span className="font-semibold">very easy</span>
          </p>
        </div>

        {/* Time to Upload */}
        <div className="bg-gray-50 rounded-lg p-4 shadow-sm flex flex-col items-center text-center">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">⏱️</span>
            <span className="text-sm font-medium text-gray-700">
              Time to Upload
            </span>
          </div>
          <div className="relative flex items-center justify-center w-36 h-36">
            {/* Circular Meter */}
            <svg className="w-full h-full">
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="10"
              />
              <circle
                cx="50%"
                cy="50%"
                r="45%"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="10"
                strokeDasharray="50 100"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-bold">02:24</span>
            </div>
          </div>
          <p className="text-sm mt-2 text-gray-700">
            6080 users+ average docs upload time is <span className="font-semibold">02:24 seconds</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default VisaRequirements;
