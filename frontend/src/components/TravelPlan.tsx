import React, { useEffect, useState } from "react";
import ReactFlagsSelect from "react-flags-select";
import StepsModal from "./StepsModal";
import countryList from "react-select-country-list";
import { FaArrowRightLong } from "react-icons/fa6";
export const countriesToRemove = [
  { label: "Canada", value: "CA" },
  { label: "USA", value: "US" },
  { label: "Chile", value: "CL" },
  { label: "Andorra", value: "AD" },
  { label: "Austria", value: "AT" },
  { label: "Belgium", value: "BE" },
  { label: "Czech Republic", value: "CZ" },
  { label: "Denmark", value: "DK" },
  { label: "Estonia", value: "EE" },
  { label: "Finland", value: "FI" },
  { label: "France", value: "FR" },
  { label: "Germany", value: "DE" },
  { label: "Greece", value: "GR" },
  { label: "Hungary", value: "HU" },
  { label: "Iceland", value: "IS" },
  { label: "Ireland", value: "IE" },
  { label: "Italy", value: "IT" },
  { label: "Latvia", value: "LV" },
  { label: "Liechtenstein", value: "LI" },
  { label: "Lithuania", value: "LT" },
  { label: "Luxembourg", value: "LU" },
  { label: "Malta", value: "MT" },
  { label: "Monaco", value: "MC" },
  { label: "Netherlands", value: "NL" },
  { label: "Norway", value: "NO" },
  { label: "Poland", value: "PL" },
  { label: "Portugal", value: "PT" },
  { label: "San Marino", value: "SM" },
  { label: "Slovakia", value: "SK" },
  { label: "Slovenia", value: "SI" },
  { label: "Spain", value: "ES" },
  { label: "Sweden", value: "SE" },
  { label: "Switzerland", value: "CH" },
  { label: "United Kingdom", value: "GB" },
  { label: "Brunei", value: "BN" },
  { label: "Israel", value: "IL" },
  { label: "Japan", value: "JP" },
  { label: "Qatar", value: "QA" },
  { label: "Singapore", value: "SG" },
  { label: "South Korea", value: "KR" },
  { label: "Taiwan", value: "TW" },
  { label: "Australia", value: "AU" },
  { label: "New Zealand", value: "NZ" },
];

const TravelPlan = () => {
  const [citizenshipCountry, setCitizenshipCountry] = useState(""); // Store country CODE, not object
  const [destinationCountry, setDestinationCountry] = useState(""); // Store country CODE, not object
  const [shouldStartjourneyShow, setShouldStartjourneyShow] = useState(false);
  const [filteredDestinationCountries, setFilteredDestinationCountries] =
    useState([]);

  const citizenshipCountries = countryList()
    .getData()
    .filter(
      (country) =>
        !countriesToRemove.some(
          (removedCountry) => removedCountry.value === country.value
        )
    );

  const destinationCountries = countryList()
    .getData()
    .filter((c) => c.value === "US" || c.value === "CA");

  const citizenshipCountryCodes = citizenshipCountries.map((c) => c.value);
  const destinationCountryCodes = destinationCountries.map((c) => c.value);

  const handleModalClose = () => {
    // setShouldStartJourneyShow(false); // Close the modal
    window.location.reload(); // Reload the page
  };

  console.log(":: countries", countryList().getData());
  console.log(":: citizenshipCountries", citizenshipCountries);
  console.log(":: citizenshipCountryCodes", citizenshipCountryCodes);
  console.log(":: destinationCountries", destinationCountries);

  const [citizenshipOptions, setCitizenshipOptions] = useState(
    citizenshipCountryCodes
  );

  const [destinationOptions, setDestinationOptions] = useState(
    destinationCountryCodes
  );
  const [error, setError] = useState({
    citizenshipCountryError: "",
    destinationCountryError: "",
  });

  console.log("citizenshipCountry@@@@@", citizenshipCountry);
  console.log("destinationCountry@@@@@", destinationCountry);

  console.log("error", error);

  const onSelectCitizenShipCountry = (code: string) => {
    console.log(":: code", code);
    setCitizenshipCountry(code);
    setError((prev) => ({ ...prev, citizenshipCountryError: "" }));

    let temp = [...destinationOptions];
    const index = temp.indexOf(code);
    if (index > -1) {
      temp.splice(index, 1);
      setDestinationOptions(temp);
    }
  };

  const onSelectDestinationCountry = (code: string) => {
    // Only allow US and Canada
    if (code !== "US" && code !== "CA") {
      setError((prev) => ({
        ...prev,
        destinationCountryError:
          "Please select either USA or Canada as destination",
      }));
      return;
    }

    setError((prev) => ({ ...prev, destinationCountryError: "" }));

    setDestinationCountry(code);

    let temp = [...citizenshipOptions];
    const index = temp.indexOf(code);
    if (index > -1) {
      temp.splice(index, 1);
      setCitizenshipOptions(temp);
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

  const filterDestinationCountries = () => {
    const filteredCountries = countryList()
      .getData()
      .filter((country) => country.value === "US" || country.value === "CA");

    setFilteredDestinationCountries(filteredCountries);
  };

  console.log("filterDestinationCountries", destinationCountry);
  useEffect(() => {
    if (shouldStartjourneyShow) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [shouldStartjourneyShow]);
  return (
    <section className="bg-[#CDE6EC] text-FloralWhite shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-[#333366] to-[#2C415A] bg-clip-borderborder-gray-200 shadow-xl ">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
        <div className="flex flex-col justify-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight leading-8 text-FloralWhite  md:text-5xl lg:text-6xl">
            MigraHub: Your Gateway to a Simplified Visitor Visa Journey
          </h1>
          <p className="mb-6 text-sm font-normal tracking-wide text-FloralWhite  lg:text-xl">
            Navigate the complexities of Visitor visa process with ease
          </p>
        </div>
        <div>
          <div className="w-full lg:max-w-lg p-5 space-y-6 sm:p-8 bg-FloralWhite rounded-lg shadow-xl">
            <h2 className="text-4xl font-bold text-Indigo ">
             Am I Eligible ?
            </h2>
            <div className="mt-4 space-y-6">
              <div>
                <label
                  htmlFor="countries"
                  className="block mb-2 text-lg font-medium text-Indigo "
                >
                  Citizenship
                </label>
                <ReactFlagsSelect
                  selected={citizenshipCountry}
                  onSelect={onSelectCitizenShipCountry}
                  className="w-full px-3 border bg-white shadow-xl items-center border-Indigo rounded-2xl text-Indigo"
                  countries={citizenshipOptions}
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
                  className="block mb-2 text-lg font-medium text-Indigo "
                >
                  Destination
                </label>
                <ReactFlagsSelect
                  selected={destinationCountry}
                  onSelect={onSelectDestinationCountry}
                  className="w-full px-3 border bg-white shadow-xl border-Indigo rounded-2xl text-Indigo"
                  countries={destinationOptions}
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
                className=" flex px-8 py-3 text-lg font-medium text-center text-FloralWhite items-center  bg-[#CDE6EC] text-FloralWhite shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-[#333366] to-[#2C415A] bg-clip-borderborder-gray-200 shadow-xl rounded-2xl"
                onClick={handleStartjourney}
              >
                <span className="mr-2 ">Start Your Journey</span>{" "}
                <FaArrowRightLong className="mt-1" />
              </button>
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
          countryCodes={citizenshipOptions}
          destinationCountry={destinationCountry}
          onModalClose={handleModalClose} // Pass the close and reload handler
        />
      )}
    </section>
  );
};

export default TravelPlan;
