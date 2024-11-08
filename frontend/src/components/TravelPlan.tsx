import React, { useState } from "react";
import ReactFlagsSelect from "react-flags-select";
import StepsModal from "./StepsModal";
import countryList from "react-select-country-list";

const Banner = () => {
  const [citizenshipCountry, setCitizenshipCountry] = useState("");
  const [destinationCountry, setDestinationCountry] = useState("");
  const [shouldStartjourneyShow, setShouldStartjourneyShow] = useState(false);
  console.log(countryList());
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

  console.log("citizenshipCountry@@@@@", citizenshipCountry);
  console.log("destinationCountry@@@@@", destinationCountry);

  console.log("error", error);

  const onSelectCitizenShipCountry = (code: string) => {
    console.log("This is run");
    setError((prev) => ({ ...prev, citizenshipCountryError: "" }));
    setCitizenshipCountry(code);
    let temp = [...countriesCodes];
    const index = destinationCountryCodes.indexOf(code);
    if (index > -1) {
      temp.splice(index, 1);
      setDestinationCountryCodes(temp);
    }
  };

  const onSelectDestinationCountry = (code: string) => {
    setError((prev) => ({ ...prev, destinationCountryError: "" }));
    setDestinationCountry(code);
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
  console.log("citizenshipCountry", citizenshipCountry);

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
        <div className="flex flex-col justify-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            MigraHub: Your Gateway to a Simplified Visitor Visa Journey
          </h1>
          <p className="mb-6 text-base font-normal text-gray-500 lg:text-xl dark:text-gray-400">
            Navigate the complexities of Visitor visa process with ease
          </p>
          <a
            href="#"
            className="text-blue-600 dark:text-blue-500 hover:underline font-medium text-lg inline-flex items-center"
          >
            Read more about our app
            <svg
              className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
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
          </a>
        </div>
        <div>
          <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              From which country are you starting and going to which country
            </h2>
            <div className="mt-8 space-y-6">
              <div>
                <label
                  htmlFor="countries"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Citizenship From
                </label>
                <ReactFlagsSelect
                  selected={citizenshipCountry}
                  onSelect={onSelectCitizenShipCountry}
                  className="w-full px-3  border shadow-md border-gray-200 rounded-lg text-gray-800"
                  countries={citizenshipCountryCodes}
                  searchable
                  /*showSelectedLabel={showSelectedLabel}
        selectedSize={selectedSize}
        showOptionLabel={showOptionLabel}
        optionsSize={optionsSize}
        placeholder={placeholder}
        searchable={searchable}
        searchPlaceholder={searchPlaceholder}
        alignOptionsToRight={alignOptionsToRight}
        fullWidth={fullWidth}
        disabled={disabled} */
                />
                <p className="text-red-500 text-sm">
                  {" "}
                  {error.citizenshipCountryError}
                </p>
              </div>
              <div>
                <label
                  htmlFor="countries"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Destination to
                </label>
                <ReactFlagsSelect
                  selected={destinationCountry}
                  onSelect={onSelectDestinationCountry}
                  className="w-full px-3 border shadow-md border-gray-200 rounded-lg text-gray-800"
                  countries={destinationCountryCodes}
                  searchable
                  /*showSelectedLabel={showSelectedLabel}
        selectedSize={selectedSize}
        showOptionLabel={showOptionLabel}
        optionsSize={optionsSize}
        placeholder={placeholder}
        searchable={searchable}
        searchPlaceholder={searchPlaceholder}
        alignOptionsToRight={alignOptionsToRight}
        fullWidth={fullWidth}
        disabled={disabled} */
                />
                <p className="text-red-500 text-sm">
                  {error.destinationCountryError}
                </p>
              </div>

              <button
                className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={handleStartjourney}
              >
                Start your journey
              </button>
              {/* <div className="text-sm font-medium text-gray-900 dark:text-white">
                Not registered yet?{" "}
                <a className="text-blue-600 hover:underline dark:text-blue-500">
                  Create account
                </a>
              </div> */}
            </div>
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
    </section>
  );
};

export default Banner;
