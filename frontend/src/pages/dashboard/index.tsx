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

  console.log('visa data',sharedState)

  const fetchData = async () => { 
    try {
      setLoading(true); // Set loading to true before fetching data
         // Using setRole in the correct scope
    //   const setRole = (user: any) => {
    //         console.log("Setting user", user)
    //         setSharedMedata(user);
    //    }

    //   const meData = await me(); // Wait for meData to complete
    //   console.log('me data',meData?.data)
    //   setRole(meData?.data?.user)
       // Check if sharedMedata is still null
      if (!user) {
        setLoading(false); // Clear loading state
        return; // Stop data fetching
        }
      const resultVisaData = await getSingleVisaData(user?.visaDataId);
      setVisaData(resultVisaData?.data?.data);
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

  const breadcrumbs = [
    {
      title: splitCamelCaseToTitleCase("ApplyingFromPassportCountry"),
      value: visaData?.areYouApplyingFromPassportCountry ? "YES" : "NO",
    },
    {
      title: splitCamelCaseToTitleCase("citizenshipCountry"),
      value: visaData?.citizenshipCountry?.label || "N/A",
    },
    {
      title: splitCamelCaseToTitleCase("deniedVisaToUs"),
      value: visaData?.deniedVisaToUs ? "YES" : "NO",
    },
    {
      title: splitCamelCaseToTitleCase("destinationCountry"),
      value: visaData?.destinationCountry?.label || "N/A",
    },
    {
      title: splitCamelCaseToTitleCase("haveSpouseOrProperty"),
      value: visaData?.haveSpouseOrProperty ? "YES" : "NO",
    },
    {
      title: splitCamelCaseToTitleCase("passportCountry"),
      value: visaData?.passportCountry?.label || "N/A",
    },
    {
      title: splitCamelCaseToTitleCase(
        "travelledInternationallyAndReturnedHome"
      ),
      value: visaData?.travelledInternationallyAndReturnedHome ? "YES" : "NO",
    },
    {
      title: splitCamelCaseToTitleCase("whereWillYouApplyForYourVisa"),
      value: visaData?.whereWillYouApplyForYourVisa?.label || "-",
    },
  ];

  const handleBreadcrumbClick = (value) => {
    setSelectedValue(value); // Update the state with the clicked breadcrumb's value
  };

   // return <Stepper/>

  return (
    <div className="flex flex-col justify-center items-center space-y-4 p-4">
      {/* Breadcrumbs */}
      <nav className="flex flex-wrap items-center justify-center text-sm ">
        {visaData ? breadcrumbs.map((box, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <span className="mx-2 font-bold">
                {" "}
                <TfiControlForward className="font-bold text-Gray" size={16} />
              </span>
            )}
            <button
              onClick={() => handleBreadcrumbClick(box.value)}
              className="text-DarkGray tracking-wider hover:underline  hover: underline-offset-4 hover:text-indigo-400 focus:outline-none"
            >
              {box.title}
            </button>
          </React.Fragment>
        )) : 
        <TravelPlan/>
        }
      </nav>
      {/* <Stepper/> */}

      {/* Display selected value */}
      { visaData ? 
      <div className="max-w-md p-4 bg-transparent rounded-xl shadow text-center justify-center mt-8">
        {selectedValue ? (
          <p className="text-base font-medium text-Indigo">
            Selected Value:{" "}
            <span className="text-indigo-400">{selectedValue}</span>
          </p>
        ) : (
          <p className="text-gray-500">Click a breadcrumb to view its value</p>
        )}
      </div>
       : ''
      }
      {visaData ? <div className="max-w-md p-6 bg-transparent rounded-xl shadow text-center justify-center mt-12">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-Indigo text-center">
          Travel Visa Denial Risk
        </h5>

        <div className="flex items-center gap-2 justify-center">
          <RiSlowDownFill className="text-green-500 text-center" size={24} />{" "}
          Low
        </div>
        <h2 className="mb-3 font-normal text-LightGray italic text-xl text-center">
          But our service gets your risk even lower
        </h2>
        <Link
          href="/profilepage"
          className="inline-flex items-center tracking-widest px-3 py-2 text-sm font-medium text-center text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-[#333366] to-[#2C415A]"
        >
          Complete Profile
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
       : ''}
    </div>
  );
};

export default AfterLoginLayout(Dashboard);
