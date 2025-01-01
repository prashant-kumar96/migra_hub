import React, { useEffect, useState } from "react";
import { me } from "@/api/auth";
import { getSingleVisaData } from "@/api/visaData";
import { useAtom } from "jotai";
import { meDataAtom } from "@/store/meDataAtom";
import { TfiControlForward } from "react-icons/tfi";
import Link from "next/link";
import { RiSlowDownFill } from "react-icons/ri";
import AfterLoginLayout from "@/components/afterLoginLayout/AfterLoginLayout";
import Loader from "@/components/loaders/loader";
import Stepper from "@/components/Stepper";
import { useAuth } from "@/context/auth-context";
import TravelPlan from "@/components/TravelPlan";
import { visaDataAtom } from "@/store/visaDataAtom";


const Dashboard = () => {
 
  const [visaData, setVisaData] = useState("");
  const [sharedMedata, setSharedMedata] = useAtom(meDataAtom);
  const [sharedState, setSharedState] = useAtom(visaDataAtom);

  const [selectedValue, setSelectedValue] = useState(""); // State for selected breadcrumb value
  const [loading, setLoading] = useState<boolean>(true);
  console.log('loading',loading);
  const { user, isLoading } = useAuth();

  console.log(';; user',user);
 
  console.log('visa data',sharedState);

  const fetchData = async () => { 
    try {
      setLoading(true); 
       
      if (!user) {  
        setLoading(false); // Clear loading state
        return; // Stop data fetching
      }

      console.log(';; fetching data')
      const resultVisaData = await getSingleVisaData(user?.user?.visaDataId);
      console.log(';; resultVisaData',resultVisaData)
      setVisaData(resultVisaData?.data);
      console.log('set data',user);
     }catch(err) {
         console.error("Error during data fetching", err)
    } finally {
       setLoading(false) // Clear loading state
     }
    };

    console.log('set shared data',sharedMedata)

   useEffect(() => {
    fetchData();
  }, []); // Only runs on initial render


  console.log('loading',loading)

  const splitCamelCaseToTitleCase = (str) => {
    return str
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };


  const visaAssessmentDetails = [
    {
      title: "Applying From Passport Country",
      value: visaData?.areYouApplyingFromPassportCountry ? "Yes" : "No",
    },
    {
      title: "Citizenship Country",
      value: visaData?.citizenshipCountry?.label || "Not Specified",
    },
    {
      title: "Previously Denied Visa",
      value: visaData?.deniedVisaToUs ? "Yes" : "No",
    },
    {
      title: "Destination Country",
      value: visaData?.destinationCountry?.label || "Not Specified",
    },
    {
      title: "Have Spouse or Property",
      value: visaData?.haveSpouseOrProperty ? "Yes" : "No",
    },
    {
      title: "Passport Country",
      value: visaData?.passportCountry?.label || "Not Specified",
    },
    {
      title: "International Travel History",
      value: visaData?.travelledInternationallyAndReturnedHome ? "Yes" : "No",
    },
    {
      title: "Visa Application Location",
      value: visaData?.whereWillYouApplyForYourVisa?.label || "Not Specified",
    },
  ];

  const handleBreadcrumbClick = (value) => {
    setSelectedValue(value); // Update the state with the clicked breadcrumb's value
  };


  return (
    <div className="max-w-4xl mx-auto p-6">
      {(visaData || user?.visaDataId) ? (
        <>
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-Indigo mb-6 text-center">
              Risk Assessment Details
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {visaAssessmentDetails.map((detail, index) => (
                <div 
                  key={index} 
                  className="bg-gray-50 p-4 rounded-md border border-gray-200"
                >
                  <h3 className="text-sm font-semibold text-gray-600 mb-2">
                    {detail.title}
                  </h3>
                  <p className="text-lg text-Indigo font-medium">
                    {detail.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <h2 className="text-2xl font-bold text-Indigo mb-4">
              Travel Visa Denial Risk
            </h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              <RiSlowDownFill className="text-green-500" size={24} />
              <span className="text-xl font-medium">Low</span>
            </div>
            <p className="text-lg text-gray-600 italic mb-6">
              But our service gets your risk even lower
            </p>
            <Link
              href="/dashboard/profile"
              className="inline-flex items-center tracking-widest px-6 py-3 text-sm font-medium text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-[#333366] to-[#2C415A] rounded-md hover:opacity-90 transition-opacity"
            >
              Complete Profile
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </>
      ) : (
        <TravelPlan />
      )}
    </div>
  );
};

export default AfterLoginLayout(Dashboard);