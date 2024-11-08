import { me } from "@/api/auth";
import { getSingleVisaData } from "@/api/visaData";
import AfterLoginLayout from "@/components/AfterLoginLayout";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { RiSlowDownFill } from "react-icons/ri";
import { TbHelpHexagon } from "react-icons/tb";

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

  return (
    <div className="flex w-full justify-center items-center flex-col ">
      <div className="mb-10">
        <div className="w-96 overflow-x-auto">
          <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                {Object.keys(visaData).map((thh, index) => (
                  <th scope="col" className="px-6 py-3" key={index}>
                    {thh}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                {Object.values(visaData).map((thh, index) => (
                  <td scope="col" className="px-6 py-3" key={index}>
                    {thh ? thh : "-"}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="max-w-md p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-center justify-center">
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
