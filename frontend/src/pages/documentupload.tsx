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
import DocumentUploadComp from "@/components/DocumentUploadComp";

const DocumentUpload = () => {
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
      <div className="px-24">
        <DocumentUploadComp />
      </div>
    </div>
  );
};

export default AfterLoginLayout(DocumentUpload);
