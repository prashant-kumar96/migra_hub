import React, { useEffect, useState } from "react";
import ReactFlagsSelect from "react-flags-select";
import StepsModal from "./StepsModal";
import countryList from "react-select-country-list";

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
    const [filteredDestinationCountries, setFilteredDestinationCountries] = useState([])

    const citizenshipCountries = countryList()
        .getData()
        .filter(
            (country) =>
                !countriesToRemove.some(
                    (removedCountry) =>
                        removedCountry.value === country.value
                )
        );

    const destinationCountries = countryList()
        .getData()
        .filter(c => c.value === "US" || c.value === "CA")

    const citizenshipCountryCodes = citizenshipCountries.map(c => c.value);
    const destinationCountryCodes = destinationCountries.map(c => c.value);

    const handleModalClose = () => {
        // setShouldStartJourneyShow(false); // Close the modal
        window.location.reload(); // Reload the page
      };

    console.log(':: countries', countryList()
        .getData())
    console.log(':: citizenshipCountries', citizenshipCountries)
    console.log(':: citizenshipCountryCodes', citizenshipCountryCodes)
    console.log(':: destinationCountries', destinationCountries)

    const [citizenshipOptions, setCitizenshipOptions] =
        useState(citizenshipCountryCodes);

    const [destinationOptions, setDestinationOptions] =
        useState(destinationCountryCodes);
    const [error, setError] = useState({
        citizenshipCountryError: "",
        destinationCountryError: "",
    });

    console.log("citizenshipCountry@@@@@", citizenshipCountry);
    console.log("destinationCountry@@@@@", destinationCountry);

    console.log("error", error);

    const onSelectCitizenShipCountry = (code: string) => {
        console.log(':: code', code)
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
                destinationCountryError: "Please select either USA or Canada as destination"
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
    }

    console.log('filterDestinationCountries', destinationCountry)
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
        <section className="bg-Indigo ">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
                <div className="flex flex-col justify-center">
                    <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
                        MigraHub: Your Gateway to a Simplified Visitor Visa Journey
                    </h1>
                    <p className="mb-6 text-base font-normal text-white lg:text-xl">
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
                            Select Destination for Risk Assessment
                        </h2>
                        <div className="mt-8 space-y-6">
                            <div>
                                <label
                                    htmlFor="countries"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Citizenship
                                </label>
                                <ReactFlagsSelect
                                    selected={citizenshipCountry}
                                    onSelect={onSelectCitizenShipCountry}
                                    className="w-full px-3 dark:bg-white border shadow-md border-gray-200 rounded-lg text-gray-800"
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
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Destination to
                                </label>
                                <ReactFlagsSelect
                                    selected={destinationCountry}
                                    onSelect={onSelectDestinationCountry}
                                    className="w-full px-3 border dark:bg-white shadow-md border-gray-200 rounded-lg text-gray-800"
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
                                className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                onClick={handleStartjourney}
                            >
                                Start your journey
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