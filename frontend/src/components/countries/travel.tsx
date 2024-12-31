import React, { useEffect, useState } from "react";
import { GoShieldCheck } from "react-icons/go";
import { FaRegClock } from "react-icons/fa";
import ReactFlagsSelect from "react-flags-select";
import countryList from "react-select-country-list";
import StepsModal from "@/components/StepsModal";
import { countriesData } from "@/utils/CountriesData";
import { useRouter } from "next/router";
import { IoLogoWhatsapp } from "react-icons/io";
import { RiGovernmentLine } from "react-icons/ri";


const Travel = () => {
  
  const router = useRouter();
  const { country } = router.query;
  const selectedCountry = countriesData.find(
    (item) => item.name.toLowerCase() === country?.toLowerCase()
  );

  useEffect(() => {
    if (selectedCountry) {
      setDestinationCountry({
        value: selectedCountry?.code,
        label: selectedCountry?.name,
      });
    }
  }, [selectedCountry]);


  const [citizenshipCountry, setCitizenshipCountry] = useState("");
  const [destinationCountry, setDestinationCountry] = useState("");
  const [shouldStartjourneyShow, setShouldStartjourneyShow] = useState(false);
  // console.log(countryList());
  const countriesCodes = countryList()
    .getData()
    .map((c) => c.value);
  const [citizenshipCountryCodes, setCitizenshipCountryCodes] =
    useState(countriesCodes);
  const [destinationCountryCodes, setDestinationCountryCodes] =
    useState(countriesCodes);
  const [error, setError] = useState({
    citizenshipCountryError: "",
    destinationCountryError: "",
  });
  const onSelectCitizenShipCountry = (code: string) => {
    console.log("This is run");
    console.log(code);
    const tempCountry: any = countryList()
      .getData()
      .find((country) => country.value === code);

    setCitizenshipCountry(tempCountry);
    setError((prev) => ({ ...prev, citizenshipCountryError: "" }));
    let temp = [...countriesCodes];
    const index = destinationCountryCodes.indexOf(code);
    if (index > -1) {
      temp.splice(index, 1);
      setDestinationCountryCodes(temp);
    }
  };

  const onSelectDestinationCountry = (countryCode) => {
    const selectedDestination = countriesData.find(
      (item) => item.code === countryCode
    );
    if (selectedDestination) {
      setDestinationCountry({
        value: selectedDestination.code,
        label: selectedDestination.name,
      });
    }
  };

  const handleStartjourney = () => {
    console.log("citizenshipCountry", citizenshipCountry);
    console.log("destinationCountry", destinationCountry);
    if (!citizenshipCountry) {
      console.log("we are here @@@");
      setError((prev) => ({
        ...prev,
        citizenshipCountryError: "Please select a citizenship country",
      }));
    }
    if (!destinationCountry) {
      setError((prev) => ({
        ...prev,
        destinationCountryError: "Please select a destination country",
      }));
    }
    if (citizenshipCountry && destinationCountry) {
      setError((prev) => ({
        ...prev,
        destinationCountryError: "",
        citizenshipCountryError: "",
      }));
      setShouldStartjourneyShow(true);
    }
  };


  return (
    <>
      <div className="relative flex w-[360px] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md mt-10 ml-8">
        <div className="relative mx-4 -mt-6 h-14 overflow-hidden rounded-xl bg-[#CDE6EC] bg-clip-border text-FloralWhite shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-[#333366] to-[#2C415A]">
          <div className="flex items-center justify-center m-4 gap-2">
            <GoShieldCheck size={28} className="mb-1" />
            <span className="text-[19px] text-FloralWhite font-greycliff tracking-wide">
              Visa gurranted by{" "}
            </span>
            <span className="text-[19px] text-FloralWhite font-greycliff tracking-tight font-semibold">
              MigraHub
            </span>
          </div>
        </div>

        <div className="p-3">
          <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-4 ">
            {/* <h2 className="text-2xl font-bold text-Indigo ">
              Jobs fill your pocket, but adventures fill your soul.
            </h2> */}
            <div>
              <ul className="list-none text-[17px] text-Indigo space-y-2">
                <li className="relative group flex justify-between items-center tracking-wide">
                  MigraHub's Fee
                  <span className="inline-flex space-x-6 items-end justify-end">
                    {selectedCountry?.migrahubFee}
                  </span>
                  <div className="absolute left-4 bottom-full mb-2 w-max px-2 py-1 text-sm text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity">
                     MigraHub's Fee
                  </div>
                </li>
                <li className="relative group flex justify-between items-center tracking-wide">
                  Government's Fee
                  <span className="inline-flex space-x-6 items-end justify-end">
                    {selectedCountry?.governmentfee}
                  </span>
                  <div className=" inline-flex items-center absolute left-2 top-full mb-2 w-max px-3 py-1 text-sm whitespace-nowrap text-white bg-black rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                    Subjected to change by Government<RiGovernmentLine className="ml-2 text-lg" />
                  </div>
                </li>
              </ul>
            </div>

            <div className="mt-8 space-y-6">
              <div>
                <label
                  htmlFor="countries"
                  className="block mb-2 font-medium text-Indigo  text-[17px] tracking-wide"
                >
                  Citizenship From
                </label>
                <ReactFlagsSelect
                  selected={citizenshipCountry?.value}
                  onSelect={onSelectCitizenShipCountry}
                  className="w-full px-3  border shadow-md border-gray-200 rounded-lg text-Indigo"
                  countries={citizenshipCountryCodes}
                  searchable
                />
                <p className="text-red-500 text-sm">
                  {" "}
                  {error.citizenshipCountryError}
                </p>
              </div>
              <div>
                <label
                  htmlFor="countries"
                  className="block mb-2  font-medium text-Indigo  text-[17px]"
                >
                  Destination To
                </label>
                <ReactFlagsSelect
                  selected={destinationCountry?.value}
                  onSelect={() => console.log(destinationCountry?.value)}
                  className="w-full px-3 border shadow-md border-gray-200 rounded-lg text-Indigo"
                  countries={destinationCountryCodes}
                  searchable
                // disabled={isFixed}
                />
                <p className="text-red-500 text-sm">
                  {error.destinationCountryError}
                </p>
              </div>

              <button
                className="w-fit bg-yellow-500 text-FloralWhite text-[18px] text-Indigo hover:text-FloralWhite  px-[64px] py-2 whitespace-nowrap tracking-wider rounded-lg font-semibold capitalize  hover:bg-Indigo"
                onClick={handleStartjourney}
              >
                Start your journey
              </button>
            </div>
          </div>
        </div>
        {shouldStartjourneyShow && (
          <StepsModal
            setShouldStartjourneyShow={setShouldStartjourneyShow}
            citizenshipCountry={citizenshipCountry}
            setCitizenshipCountry={setCitizenshipCountry}
            onSelectCitizenShipCountry={onSelectCitizenShipCountry}
            countryCodes={countriesCodes}
            destinationCountry={destinationCountry}
          />
        )}
      </div>
      <div className="inline-flex w-[360px] items-center justify-center p-2 rounded-xl bg-transparent text-FloralWhite shadow-lg shadow-blue-gray-500/40 shadow-md mt-3 ml-8 space-x-3">
        <span className="text-[18px] text-Indigo">Get in Touch: </span>
        <IoLogoWhatsapp className="text-[#33CC66]" size={30} />
        <span className="text-Indigo text-[18px]">*********9</span>
      </div>

      <div className="relative flex w-[360px] flex-col p-4 rounded-xl bg-[#CDE6EC] text-FloralWhite shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-[#333366] to-[#2C415A] bg-clip-border shadow-md mt-3 ml-8">
        <div className="inline-flex items-start">
          <div className="ml-3 ">
            <span className="text-lg leading-1 font-semibold tracking-wide mb-1">
              On Time Guarantee
            </span>
            <br />
            <span className="tracking-wide text-justify">
              Pay our service fee only when we deliver your visa appointment on
              time.
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Travel;
