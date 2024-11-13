// PersonalInfo.js
import React, { useState } from "react";
import { useForm } from "react-hook-form"; // Import the reusable Input component
import Input from "@/utils/InputComponent";
//import css module
import Select from "react-select";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import ReactFlagsSelect from "react-flags-select";
import countryList from "react-select-country-list";
import "react-country-state-city/dist/react-country-state-city.css";

const options = [
  { code: "en", label: "English" },
  { code: "es", label: "Spanish" },
  { code: "fr", label: "French" },
  { code: "hi", label: "Hindi" },
  { code: "zh", label: "Chinese" },
];

const PersonalInfo = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  }: any = useForm();
  const countriesCodes = countryList()
    .getData()
    .map((c) => c.value);

  const [citizenshipCountryCodes, setCitizenshipCountryCodes] =
    useState(countriesCodes);
  const [citizenshipCountry, setCitizenShipCountry] = useState<string>("");
  // const [citizenshipCountryError, setCitizenshipCountryError] = useState("");
  const [firstLanguage, setFirstLanguage] = useState<string>("");
  const [error, setError] = useState({
    citizenshipCountryError: "",
    firstLanguageError: "",
  });
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);
  const onSubmit = (data: any) => {
    if (!citizenshipCountry) {
      setError((prev) => ({
        ...prev,
        citizenshipCountryError: "Please select a citizenship country",
      }));
    }
    if (!firstLanguage) {
      setError((prev) => ({
        ...prev,
        firstLanguageError: "Please select a First Language",
      }));
    } else {
      console.log(data);
      console.log(citizenshipCountry);
    }
  };

  const handleSelectcountryOfCitizenship = (countryCode: string) => {
    setError((prev) => ({
      ...prev,
      citizenshipCountryError: "",
    }));
    setCitizenShipCountry(countryCode);
  };

  const handleChange = (event: any) => {
    setError((prev) => ({
      ...prev,
      firstLanguageError: "",
    }));
    setFirstLanguage(event.label);
  };

  return (
    <div className="border-2 p-8 ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-6 mb-6 md:grid-cols-2  ">
          <Input
            label="First Name"
            type="text"
            id="first_name"
            register={register}
            validation={{
              required: "First name is required",
              minLength: {
                value: 2,
                message: "First name must be at least 2 characters",
              },
              maxLength: {
                value: 20,
                message: "First name must be at most 20 characters",
              },
            }}
            placeholder="John"
            errors={errors.first_name}
          />
          <Input
            label="Last Name"
            type="text"
            id="last_name"
            register={register}
            validation={{
              required: "Last name is required",
              minLength: {
                value: 2,
                message: "Last name must be at least 2 characters",
              },
              maxLength: {
                value: 20,
                message: "Last name must be at most 20 characters",
              },
            }}
            placeholder="Doe"
            errors={errors.last_name}
          />
          {/* <Input
          label="First Language"
          id="first_language"
          placeholder="English"
          register={register}
          validation={{
            required: "First Language is required",
          }}
          errors={errors.first_language}
        /> */}
          <div>
            <label className="block mb-2 text-base font-medium text-gray-700">
              First Language
            </label>
            <Select
              options={options}
              className={`w-full shadow-md rounded-lg text-gray-800`}
              onChange={handleChange}
            />{" "}
            {error.firstLanguageError && (
              <p className="text-red-500 text-xs font-bold mt-1">
                {error.firstLanguageError}
              </p>
            )}
          </div>
          <Input
            label="Passport Number"
            id="passport_number"
            placeholder="Passport Number"
            type="text"
            register={register}
            toUpperCase={true}
            validation={{
              required: "Passport Number is required",
              pattern: {
                value: /^[A-Z0-9]{6,9}$/,
                message:
                  "Passport number must be 6-9 alphanumeric characters and last digit should be number",
              },
            }}
            errors={errors.passport_number}
          />
          <div className="mb-4">
            <label
              htmlFor="citizenship"
              className="block mb-2 text-base font-medium text-gray-700"
            >
              Country of Citizenship
            </label>
            <ReactFlagsSelect
              selected={citizenshipCountry}
              onSelect={handleSelectcountryOfCitizenship}
              className="w-full  border shadow-md border-gray-200 rounded-lg text-gray-800"
              countries={citizenshipCountryCodes} // You can replace this with a more comprehensive list or dynamic data
              searchable
            />
            {error.citizenshipCountryError && (
              <p className="text-red-500 text-xs font-bold mt-1">
                {error.citizenshipCountryError}
              </p>
            )}
          </div>
          <Input
            label="Passport Expiry Date"
            id="passport_expiry"
            type="date"
            register={register}
            placeholder=""
            validation={{
              required: "Passport Expiry Date is required",
            }}
            errors={errors.passport_expiry}
          />
          <div className="text-gray-900">
            <label
              htmlFor="first_name"
              className="block mb-2 text-base font-medium text-gray-700"
            >
              Current Country
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
          <Input
            label="Postal/Zip Code"
            id="zipCode"
            type="number"
            register={register}
            placeholder=""
            validation={{
              required: "Postal/Zip Code is required",
              pattern: {
                value: /^\d{5,6}$/, // Matches 5 digits or 5-4 digit zip codes
                message:
                  "Zip code must be 5 or 6 digits or 5+4 format (e.g., 12345 or 12345-6789)",
              },
            }}
            errors={errors.zipCode}
          />
          <Input
            label="Email"
            id="email"
            type="email"
            register={register}
            placeholder=""
            validation={{
              required: "Email is required",
            }}
            errors={errors.email}
          />
          <Input
            label=" Phone Number"
            id="phoneNumber"
            type="number"
            register={register}
            placeholder=""
            validation={{
              required: "Phone Number is required",
            }}
            errors={errors.phoneNumber}
          />{" "}
        </div>

        <Input
          label="Address"
          id="Address"
          type="text"
          register={register}
          placeholder=""
          validation={{
            required: "Address is required",
          }}
          errors={errors.Address}
        />

        <div className="flex space-between w-full">
          <div className="mb-6 w-1/2">
            <label className="block mb-2 text-base font-medium text-gray-700">
              Marital Status
            </label>

            <div className="flex items-center mb-4">
              <input
                type="radio"
                id="single"
                value="Single"
                {...register("marital_status", {
                  required: "Marital status is required",
                })}
                className="w-4 h-4"
              />
              <label
                htmlFor="single"
                className="ms-2 text-sm font-medium text-gray-500"
              >
                Single
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="radio"
                id="married"
                value="Married"
                {...register("marital_status", {
                  required: "Marital status is required",
                })}
                className="w-4 h-4"
              />
              <label
                htmlFor="married"
                className="ms-2 text-sm font-medium text-gray-500"
              >
                Married
              </label>
            </div>

            {errors.marital_status && (
              <p className="text-red-500 text-sm mt-2">
                {errors.marital_status.message}
              </p>
            )}
          </div>

          <div className="mb-6 w-1/2">
            <label className="block mb-2 text-base font-medium text-gray-700">
              Gender
            </label>
            <div className="flex items-center mb-4">
              <input
                type="radio"
                id="male"
                value="Male"
                {...register("gender", {
                  required: "Gender is required",
                })}
                className="w-4 h-4"
              />
              <label
                htmlFor="male"
                className="ms-2 text-sm font-medium text-gray-500"
              >
                Male
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="female"
                value="Female"
                {...register("gender", {
                  required: "Gender is required",
                })}
                className="w-4 h-4"
              />
              <label
                htmlFor="female"
                className="ms-2 text-sm font-medium text-gray-500"
              >
                Female
              </label>
            </div>
            {errors.gender && (
              <p className="text-red-500 text-sm mt-2">
                {errors.gender.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-start mb-6">
          <input
            type="checkbox"
            id="terms"
            {...register("terms")}
            className="w-4 h-4"
            required
          />
          <label
            htmlFor="terms"
            className="ms-2 text-base font-medium text-gray-500"
          >
            I agree with the{" "}
            <a href="#" className="text-blue-600 hover:underline">
              terms and conditions
            </a>
            .
          </label>
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 rounded-lg w-full sm:w-auto px-5 py-2.5"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PersonalInfo;
