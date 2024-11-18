import React from "react";
import { FaRepeat } from "react-icons/fa6";
import { PiClockCountdownFill } from "react-icons/pi";
import { TfiWorld } from "react-icons/tfi";
import { GiCommercialAirplane } from "react-icons/gi";
const Concierge = () => {
  return (
    <>
      <section className="py-4 px-2 mx-auto max-w-screen-xl sm:py-6 lg:px-6">
        <h2 className="text-3xl text-Indigo font-bold mb-1">
          Meet Your Concierge
        </h2>
        {/* avatar */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
          {/* Avatar */}
          <div className="relative inline-block">
            <img
              className="inline-block shrink-0 w-[74px] h-[74px] sm:w-[89px] sm:h-[89px] rounded-full ring ring-Indigo p-1"
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
              alt="Avatar"
            />
            <span className="absolute bottom-1.5 end-4 block p-1 rounded-full transform translate-y-1/2 translate-x-1/2 bg-Indigo">
              <GiCommercialAirplane size={20} />
            </span>
          </div>

          {/* Name and Position */}
          <div className="text-center sm:text-left">
            <h3 className="text-[18px] sm:text-[19px] font-semibold text-DarkGray tracking-wide">
              John Doe
            </h3>
            <p className="text-[14px] sm:text-[16px] text-Gray tracking-wider italic">
              Customer Support Lead
            </p>
          </div>
        </div>

        {/* table */}
        <div className="flex flex-col mt-8 mb-8 p-1">
          <div className="-m-1.5 overflow-x-auto ">
            <div className="p-1.5 min-w-3xl inline-block align-middle border-2 border-Gray p-2 rounded-2xl shadow-2xl shadow">
              <div className="overflow-hidden ">
                <table className=" divide-y divide-LightGray  ">
                  <thead>
                    <tr className="divide-x divide-LightGray">
                      <th
                        scope="col"
                        className="px-3 py-3 inline-flex justify-start text-start text-[19px] tracking-wide font-medium text-DarkGray capitalize "
                      >
                        <span className="mr-2 mt-1">
                          <FaRepeat size={20} />
                        </span>
                        response rate
                        <span className=" ml-auto sm:ml-20 sm:gap-2 tracking-wide font-medium text-DarkGray">
                          100%
                        </span>
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3 inline-flex tracking-wide text-start text-[19px] font-medium text-DarkGray capitalize whitespace-nowrap "
                      >
                        <span className="mr-1">
                          <PiClockCountdownFill size={28} />
                        </span>{" "}
                        response time
                        <span className=" ml-auto sm:ml-20 sm:gap-2 tracking-wide font-medium text-DarkGray">
                          30 minutes
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 ">
                    <tr>
                      <td className="px-3 py-3 whitespace-nowrap flex justify-between items-center text-[19px] font-medium capitalize text-DarkGray">
                        {/* Language Label */}
                        <div className="flex items-center gap-2">
                          <TfiWorld className="mt-1" />
                          <span>languages</span>
                        </div>

                        {/* Language List */}
                        <span className="text-end text-DarkGray">
                          Punjabi, Hindi, English
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Concierge;
