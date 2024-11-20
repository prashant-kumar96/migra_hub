import { me } from "@/api/auth";
import { getSingleVisaData } from "@/api/visaData";
import AfterLoginLayout from "@/components/AfterLoginLayout";
import { meDataAtom } from "@/store/meDataAtom";
import { useAtom } from "jotai";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { RiSlowDownFill } from "react-icons/ri";
import { TbHelpHexagon } from "react-icons/tb";
import countryList from "react-select-country-list";

const Dashboard = () => {
  const [visaData, setVisaData] = useState("");
  const [sharedMedata, setSharedMedata] = useAtom(meDataAtom);
  const getmedata = async () => {
    const result = await me();
    console.log("result getmedata", result?.data);
    setSharedMedata(result?.data?.user);

    const resultVisaData = await getSingleVisaData(
      result?.data?.user.visaDataId
    );

    console.log("resultVisaData", resultVisaData);
    setVisaData(resultVisaData?.data?.data);
  };

  console.log("sharedMedata", sharedMedata);

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
  const breadcrumbItems = [
    { name: "Home", href: "#", icon: true },
    { name: "Projects", href: "#", icon: false },
    { name: "Flowbite", href: null, icon: false, isCurrent: true },
  ];

  return (
    <div className="flex w-full justify-around items-center flex-wrap-reverse gap-8">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        {breadcrumbItems.map((item, index) => (
          <li
            key={index}
            className={`inline-flex items-center ${
              item.isCurrent ? "aria-current=page" : ""
            }`}
          >
            {index !== 0 && (
              <svg
                className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            )}
            {item.href ? (
              <a
                href={item.href}
                className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                {item.icon && (
                  <svg
                    className="w-3 h-3 me-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                  </svg>
                )}
                {item.name}
              </a>
            ) : (
              <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2">
                {item.name}
              </span>
            )}
          </li>
        ))}
      </ol>
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

      {/* <div className="grid grid-cols-3 gap-12">
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
      </div> */}

      <div className="max-w-lg  p-4 bg-gray-100 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">User Details</h2>
        <ul className="space-y-2">
          {boxes.map((box, index) => (
            <li className="flex justify-between border-b pb-2 gap-5">
              <span className="font-medium text-gray-700">{box.title}</span>
              <span className="text-gray-900"> {box.value}</span>
            </li>
          ))}
        </ul>
      </div>

      
    </div>
  );
};

export default AfterLoginLayout(Dashboard);
