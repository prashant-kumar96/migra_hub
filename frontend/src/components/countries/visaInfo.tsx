import React from "react";
import { BiSolidSticker } from "react-icons/bi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { AiOutlineClockCircle } from "react-icons/ai";
import { FaRegAddressBook } from "react-icons/fa6";
import { countriesData } from "@/utils/CountriesData";
import { useRouter } from "next/router";
const VisaInfo = () => {
  const router = useRouter();
  const { country } = router.query;
  const selectedCountry = countriesData.find(
    (item) => item.name.toLowerCase() === country?.toLowerCase()
  );
  
  return (
    <section className="py-8 px-4 mx-auto max-w-screen-2xl">
      <h2 className="text-3xl text-Indigo font-bold mb-1 capitalize">
        {selectedCountry
          ? `${selectedCountry.name.replace(/-/g, " ")} Visa information`
          : "visa information"}
      </h2>
      <div className="border-b-2 border-CGBlue w-24 mb-6"></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Visa Type */}
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-100 rounded-full text-indigo-600">
            <BiSolidSticker size={22} />
          </div>
          <div>
            <h3 className="text-[19px] font-semibold text-DarkGray tracking-wide">Visa Type</h3>
            <p className="text-base font-medium text-Gray tracking-wide">
              {selectedCountry?.visaType}
            </p>
          </div>
        </div>

        {/* Length of Stay */}
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-100 rounded-full text-blue-600">
            <FaRegCalendarAlt size={24} />
          </div>
          <div>
            <h3 className="text-[19px] font-semibold text-DarkGray tracking-wide whitespace-nowrap">
              Duration
            </h3>
            <p className="text-base font-medium text-Gray tracking-wide">
              {selectedCountry?.stayLength}
            </p>
          </div>
        </div>

        {/* Validity */}
        <div className="flex items-center gap-4">
          <div className="p-3 bg-green-100 rounded-full text-green-600">
            <AiOutlineClockCircle size={24} />
          </div>
          <div>
            <h3 className="text-[19px] font-semibold text-DarkGray tracking-wide">Validity</h3>
            <p className="text-base font-medium text-Gray tracking-wide">
              {selectedCountry?.visaValidity}
            </p>
          </div>
        </div>

        {/* Entry */}
        <div className="flex items-center gap-2">
          <div className="p-3 bg-purple-100 rounded-full text-purple-600">
            <FaRegAddressBook size={24} />
          </div>
          <div>
            <h3 className="text-[19px] font-semibold text-DarkGray tracking-wide">Entry</h3>
            <p className="text-base font-medium text-Gray tracking-wide whitespace-nowrap">
              {selectedCountry?.entry}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisaInfo;
