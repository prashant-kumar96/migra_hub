import AfterLoginLayout from "@/components/afterLoginLayout/AfterLoginLayout";
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
import { useAuth } from "@/context/auth-context";


const ProfilePage = () => {
  const [citizenshipCountry, setCitizenshipCountry] = useState("");
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);
  const { user, isLoading } = useAuth();
  const countryCodes = countryList().getData().map((country) => country.value);
  const [citizenshipCountryCodes, setCitizenshipCountryCodes] = useState(countryCodes);
  const [error, setError] = useState({
    citizenshipCountryError: "",
    destinationCountryError: "",
  });

  console.log(';; user', user?.user?._id)

  const onSelectCitizenShipCountry = (code) => {
    setError((prev) => ({ ...prev, citizenshipCountryError: "" }));
    setCitizenshipCountry(code);
  };

  // Show loading state while user data is being fetched
  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  // Check if user and required data are available
  if (!user?.user?._id) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-center text-red-600">
          <p>Unable to load profile data. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-5/6">
      <div className="px-24 py-20">
        <h1 className="text-4xl mb-2">Personal Information</h1>
        <PersonalInfo 
          visaDataId={user.user.visaDataId}
          userEmail={user.user.email}
          userName={user.user.name}
          userId={user.user._id}
        />
      </div>
    </div>
  );
};

export default AfterLoginLayout(ProfilePage);