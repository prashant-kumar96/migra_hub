import React, { useState } from "react";
import { GoShieldCheck } from "react-icons/go";
import { FaRegClock } from "react-icons/fa";
import ReactFlagsSelect from "react-flags-select";
import countryList from "react-select-country-list";
import StepsModal from "@/components/StepsModal";

const test2 = () => {
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

  const onSelectDestinationCountry = (code: string) => {
    setError((prev) => ({ ...prev, destinationCountryError: "" }));
    const tempCountry: any = countryList()
      .getData()
      .find((country) => country.value === code);
    setDestinationCountry(tempCountry);
    let temp = [...countriesCodes];
    const index = citizenshipCountryCodes.indexOf(code);
    if (index > -1) {
      temp.splice(index, 1);
      setCitizenshipCountryCodes(temp);
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
        <div className="relative mx-4 -mt-6 h-14 overflow-hidden rounded-xl bg-[#CDE6EC] bg-clip-border text-white shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-[#333366] to-[#2C415A]">
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
            <h2 className="text-2xl font-bold text-gray-900 ">
              From which country are you starting and going to which country
            </h2>
            <div className="mt-8 space-y-6">
              <div>
                <label
                  htmlFor="countries"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Citizenship From
                </label>
                <ReactFlagsSelect
                  selected={citizenshipCountry.value}
                  onSelect={onSelectCitizenShipCountry}
                  className="w-full px-3  border shadow-md border-gray-200 rounded-lg text-gray-800"
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
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Destination to
                </label>
                <ReactFlagsSelect
                  selected={destinationCountry.value}
                  onSelect={onSelectDestinationCountry}
                  className="w-full px-3 border shadow-md border-gray-200 rounded-lg text-gray-800"
                  countries={destinationCountryCodes}
                  searchable
                  // disabled={isFixed}
                />
                <p className="text-red-500 text-sm">
                  {error.destinationCountryError}
                </p>
              </div>

              <button
                className="w-full bg-yellow-400 text-white py-3 rounded-lg font-medium hover:bg-yellow-500"
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
      <div className="relative flex w-[360px] flex-col p-6 rounded-xl bg-[#CDE6EC] text-FloralWhite shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-[#333366] to-[#2C415A] bg-clip-border shadow-md mt-3 ml-8">
        <div className="flex flex-col items-start">
          <div className="inline-block justify-start size-8 rounded-full ring ring-FloralWhite p-4 ">
            <FaRegClock size={24} />
          </div>
        </div>
      </div>
    </>
  );
};

export default test2;
