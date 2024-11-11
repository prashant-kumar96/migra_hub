import { me } from "@/api/auth";
import { getSingleVisaData } from "@/api/visaData";
import AfterLoginLayout from "@/components/AfterLoginLayout";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { RiSlowDownFill } from "react-icons/ri";
import { TbHelpHexagon } from "react-icons/tb";
import countryList from "react-select-country-list";

const Dashboard = () => {
  const [visaData, setVisaData] = useState("");
  const getmedata = async () => {
    const result = await me();
    console.log("result getmedata", result?.data?.user.visaDataId);
    const resultVisaData = await getSingleVisaData(
      result?.data?.user.visaDataId
    );

    console.log("resultVisaData", resultVisaData);
    setVisaData(resultVisaData?.data?.data);
  };

  console.log("getVisaData", visaData);

  useEffect(() => {
    getmedata();
  }, []);

  function splitCamelCaseToTitleCase(str) {
    // Add space before uppercase letters, except at the start, and convert to title case
    return str
      .replace(/([a-z])([A-Z])/g, "$1 $2") // Insert space before uppercase letters
      .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2") // Handle consecutive uppercase letters
      .split(" ") // Split into words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
      .join(" "); // Join back to a single string
  }

  const boxes = [
    {
      title: splitCamelCaseToTitleCase("ApplyingFromPassportCountry"),
      value: visaData.areYouApplyingFromPassportCountry ? "YES" : "NO",
    },
    {
      title: splitCamelCaseToTitleCase("citizenshipCountry"),
      value: visaData?.citizenshipCountry?.label,
    },
    {
      title: splitCamelCaseToTitleCase("deniedVisaToUs"),
      value: visaData.deniedVisaToUs ? "YES" : "NO",
    },
    {
      title: splitCamelCaseToTitleCase("destinationCountry"),
      value: visaData?.destinationCountry?.label,
    },
    {
      title: splitCamelCaseToTitleCase("haveSpouseOrProperty"),
      value: visaData.haveSpouseOrProperty ? "YES" : "NO",
    },
    {
      title: splitCamelCaseToTitleCase("passportCountry"),
      value: visaData?.passportCountry?.label,
    },
    {
      title: splitCamelCaseToTitleCase(
        "travelledInternationallyAndReturnedHome"
      ),
      value: visaData.travelledInternationallyAndReturnedHome ? "YES" : "NO",
    },
    {
      title: splitCamelCaseToTitleCase("whereWillYouApplyForYourVisa"),
      value: visaData?.whereWillYouApplyForYourVisa?.label
        ? visaData.whereWillYouApplyForYourVisa.label
        : "-  ",
    },
  ];

  return (
    <div className="flex w-full justify-center items-center flex-col ">
      {/* <div className="mb-10">
        <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 w-[calc(100vw-270px)] overflow-x-auto">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-800 dark:text-gray-300">
            <tr>
              {Object.keys(visaData).map((thh, index) => (
                <th
                  scope="col"
                  className="px-6 py-3 text-left font-medium"
                  key={index}
                >
                  {camelToSnake(thh)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
              {Object.values(visaData).map((thh, index) => (
                <td scope="col" className="px-6 py-3 text-left" key={index}>
                  {thh ? (thh == true ? "true" : thh) : "-"}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div> */}

      <div className="grid grid-cols-3 gap-12">
        {boxes.map((box, index) => (
          <div
            key={index}
            className="w-52 aspect-square p-4 rounded-lg bg-gradient-to-r from-[#4c51bf] to-[#6875f5] text-white flex flex-col items-center justify-around space-y-4"
          >
            <div className="text-2xl font-bold mb-2 uppercase text-center">
              {box.value}
            </div>
            <div className="text-base font-medium text-center">{box.title}</div>
          </div>
        ))}
      </div>

      <div className="max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-center justify-center mt-8">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
          Travel Visa Denial Risk
        </h5>

        <div className="flex items-center gap-2 justify-center">
          <RiSlowDownFill className="text-green-500" /> Low
        </div>
        <h2 className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-2xl text-center">
          But our service gets your risk even lower
        </h2>
        <Link
          href="/profilepage"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
    </div>
  );
};

export default AfterLoginLayout(Dashboard);
