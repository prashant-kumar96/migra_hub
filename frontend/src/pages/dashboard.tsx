import AfterLoginLayout from "@/components/AfterLoginLayout";
import Link from "next/link";
import React from "react";
import { RiSlowDownFill } from "react-icons/ri";

const Dashboard = () => {
  return (
    <div className="flex w-full justify-center items-center">
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
