import React from "react";
import { BsReceiptCutoff } from "react-icons/bs";
import { TbPhotoSensor2 } from "react-icons/tb";
import { BiScan } from "react-icons/bi";
import { GrAtm } from "react-icons/gr";
import { FaThumbsUp } from "react-icons/fa";
import { countriesData } from "@/utils/CountriesData";
import { useRouter } from "next/router";
const VisaRequirements = () => {
  const router = useRouter();
  const { country } = router.query;
  const selectedCountry = countriesData.find(
    (item) => item.name.toLowerCase() === country?.toLowerCase()
  );
  const items = [
    { name: "Passport", icon: <BiScan size={24} /> },
    { name: "Photo", icon: <TbPhotoSensor2 size={24} /> },
    { name: "Bank Statement", icon: <GrAtm size={24} /> },
    { name: "Income Tax Return (ITR)", icon: < BsReceiptCutoff size={22} /> },
  ];
  return (
    <section className="py-8 px-4 mx-auto max-w-screen-xl">
      {/* Heading */}
      <h2 className="text-3xl text-Indigo font-bold mb-1 capitalize">
        {selectedCountry
          ? `${selectedCountry.name.replace(/-/g, " ")} Visa requirements`
          : "visa requirements"}
      </h2>
      <div className="border-b-2 border-CGBlue w-24 mb-6"></div>
      {/* Requirements Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {items.map((item, index) => (
          <button
            key={index}
            className={`flex items-center gap-2 p-2  bg-[#E6F3F5] rounded-lg text-[17px] tracking-wide font-medium `}
          >
            <span className="text-Indigo mr-1">{item.icon}</span>
            <span className="text-Indigo tracking-wide">{item.name}</span>
          </button>
        ))}
      </div>

      {/* Ease of Applying and Upload Time */}
      <div className="grid sm:grid-cols-2 gap-4">
        {/* Ease of Applying */}
        <div className="bg-gray-50 rounded-lg p-4 shadow-sm flex flex-col items-center text-center">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl"><FaThumbsUp color="blue"/></span>
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
            6080 users+ found uploading documents as{" "}
            <span className="font-semibold">very easy</span>
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
            6080 users+ average docs upload time is{" "}
            <span className="font-semibold">02:24 seconds</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default VisaRequirements;
