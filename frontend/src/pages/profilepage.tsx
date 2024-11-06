import AfterLoginLayout from "@/components/AfterLoginLayout";
import React, { useState } from "react";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import ReactFlagsSelect from "react-flags-select";
import countryList from "react-select-country-list";
import "react-country-state-city/dist/react-country-state-city.css";
import PersonalInfo from "@/components/PersonalInfo";

const ProfilePage = () => {
  const [citizenshipCountry, setCitizenshipCountry] = useState("");
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);
  const countryCodes = countryList()
    .getData()
    .map((country) => country.value);
  const [citizenshipCountryCodes, setCitizenshipCountryCodes] =
    useState(countryCodes);
  const [error, setError] = useState({
    citizenshipCountryError: "",
    destinationCountryError: "",
  });

  const onSelectCitizenShipCountry = (code: string) => {
    console.log("This is run");
    setError((prev) => ({ ...prev, citizenshipCountryError: "" }));
    setCitizenshipCountry(code);
  };
  return (
    <div className="w-5/6">
      <div className="px-24 py-20">
        <PersonalInfo />

        <div className="mt-8">
          <h2 className="text-2xl mb-4 text-gray-700">Address Info</h2>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="first_name"
                className="block mb-2 text-base font-medium text-gray-700"
              >
                Address
              </label>
              <input
                type="text"
                id="first_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                placeholder="John"
                required
              />
            </div>

            <div className="text-gray-900">
              <label
                htmlFor="first_name"
                className="block mb-2 text-base font-medium text-gray-700"
              >
                Country
              </label>
              <CountrySelect
                className="block mb-2 text-base font-medium text-gray-700"
                onChange={(e) => {
                  console.log(e);
                  setCountryid(e.id);
                }}
                placeHolder="Select Country"
              />
            </div>
            <div className="text-gray-900">
              <label
                htmlFor="first_name"
                className="block mb-2 text-base font-medium text-gray-700"
              >
                Province/State
              </label>
              <StateSelect
                countryid={countryid}
                className="block mb-2 text-base font-medium text-gray-700"
                onChange={(e) => {
                  console.log(e);
                  setstateid(e.id);
                }}
                placeHolder="Select State"
              />
            </div>
            <div className="text-gray-900">
              <label
                htmlFor="first_name"
                className="block mb-2 text-base font-medium text-gray-700"
              >
                City/Town
              </label>
              <CitySelect
                countryid={countryid}
                stateid={stateid}
                onChange={(e) => {
                  console.log("city", e);
                }}
                placeHolder="Select City"
              />
            </div>
            <div>
              <label
                htmlFor="first_name"
                className="block mb-2 text-base font-medium text-gray-700"
              >
                Postal/Zip Code
              </label>
              <input
                type="text"
                id="first_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                placeholder="John"
                required
              />
            </div>
            <div>
              <label
                htmlFor="first_name"
                className="block mb-2 text-base font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="text"
                id="first_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                placeholder="John"
                required
              />
            </div>
            <div>
              <label
                htmlFor="first_name"
                className="block mb-2 text-base font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="first_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  "
                placeholder="John"
                required
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AfterLoginLayout(ProfilePage);
