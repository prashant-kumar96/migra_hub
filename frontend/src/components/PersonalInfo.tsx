// PersonalInfo.js
import React, { useEffect, useState } from "react";
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
import moment from "moment";
import { getPersonalData, savePersonalData } from "@/api/personalData";
import { meDataAtom } from "@/store/meDataAtom";
import { useAtom } from "jotai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import ButtonLoader from "./loaders/buttonLoader";
import { useAuth } from "@/context/auth-context";
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

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [sharedMedata] = useAtom(meDataAtom);
  const { user, isLoading } = useAuth();

  console.log('me data',sharedMedata);

  console.log("sharedMedata", sharedMedata);
  const [citizenshipCountryCodes, setCitizenshipCountryCodes] =
    useState(countriesCodes);
  const [citizenshipCountry, setCitizenShipCountry] = useState<string>("");
  // const [citizenshipCountryError, setCitizenshipCountryError] = useState("");
  const [firstLanguage, setFirstLanguage] = useState<string>("");
  
  const [error, setError] = useState({
    citizenshipCountryError: "",
    firstLanguageError: "",
    currentCountryError: "",
    stateError: "",
    cityError: "",
  });

  const [addressData, setAddressData] = useState({
    country: "",
    state: "",
    city: "",
  });
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);

  const handleCountrySelectChange = (e: any) => {
    console.log("countrySelect", e);
    setCountryid(e.id);
    setAddressData({ ...addressData, country: e.name });
    setError((prev) => ({
      ...prev,
      citizenshipCountryError: "",
    }));
  };

  const handleStateSelectChange = (e: any) => {
    console.log("countrySelect", e);
    setstateid(e.id);
    setAddressData({ ...addressData, state: e.name });
    setError((prev) => ({
      ...prev,
      stateError: "",
    }));
  };

  const handleCitySelectChange = (e: any) => {
    console.log("countrySelect", e);
    setAddressData({ ...addressData, city: e.name });
    setError((prev) => ({
      ...prev,
      cityError: "",
    }));
  };

  const onSubmit = async (data: any) => {
    if (!citizenshipCountry) {
      setError((prev) => ({
        ...prev,
        citizenshipCountryError: "Please select a citizenship country",
      }));
      return;
    }
    if (!addressData.country) {
      setError((prev) => ({
        ...prev,
        currentCountryError: "Please select a country",
      }));
      return;
    } else {
      setError((prev) => ({
        ...prev,
        currentCountryError: "",
      }));
    }

    if (!addressData?.state) {
      setError((prev) => ({
        ...prev,
        stateError: "Please select a state",
      }));
      return;
    } else {
      setError((prev) => ({
        ...prev,
        stateError: "",
      }));
    }

    if (!addressData.city) {
      setError((prev) => ({
        ...prev,
        cityError: "Please select a city",
      }));
      return;
    }

    if (!firstLanguage) {
      setError((prev) => ({
        ...prev,
        firstLanguageError: "Please select a First Language",
      }));
    } else {
      // console.log(data);
      // console.log("firstLanguage", firstLanguage);
      // console.log("citizenshipCountry", citizenshipCountry);
      // console.log("addressData", addressData);
      // setError((prev) => ({
      //   ...prev,
      //   firstLanguageError: "",
      //   cityError: "",
      //   stateError: "",
      //   currentCountryError: "",
      //   citizenshipCountryError: "",
      // }));

      setLoading(true);
      const newdata = {
        ...data,
        firstLanguage,
        citizenshipCountry,
        addressData,
        userId: sharedMedata?._id,
      };

      console.log("newData", newdata);

      setLoading(true);

      const result = await savePersonalData(newdata);
      console.log("result loginUser@@@@@@@", result);
      if (result?.status === 200) {
        toast(result?.data?.message);
        // Navigate to dashboard
        // console.log("we are here");
        // localStorage.setItem("token", result?.data?.token);
        router.push("/documentupload");
        setLoading(false);
      } else {
        console.log("result@@@", result);
        setLoading(false);
      }
    }
  };

  const handleSelectcountryOfCitizenship = (countryCode: string) => {
    setError((prev) => ({
      ...prev,
      citizenshipCountryError: "",
    }));
    const tempCountry: any = countryList()
      .getData()
      .find((country) => country.value === countryCode);
    setCitizenShipCountry(tempCountry);
  };

  const handleChange = (event: any) => {
    setError((prev) => ({
      ...prev,
      firstLanguageError: "",
    }));
    setFirstLanguage(event.label);
  };

  const getPersonalInfofunction = async () => {
    const result = await getPersonalData(user?._id);
    console.log("getPersonalData", result);
    if (result?.status === 200) {
      // toast(result?.data?.message);
      alert("Personal Data is Already filled");
      // Navigate to dashboard
      // console.log("we are here");
      // localStorage.setItem("token", result?.data?.token);
      router.push("/documentupload");
      setLoading(false);
    } else {
      console.log("result@@@", result);
      setLoading(false);
    }
  };

  useEffect(() => {
    getPersonalInfofunction();
  }, []);

  console.log("moment", moment().format("YYYY-MM-DD"));
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
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters long",
              },
              // pattern: {
              //   value: /^[A-Z0-9]{6,9}$/,
              //   message:
              //     "Passport number must be 6-9 alphanumeric characters and last digit should be number",
              // },
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
              selected={citizenshipCountry.value}
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
            minDate={moment().format("YYYY-MM-DD")}
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
              onChange={handleCountrySelectChange}
              placeHolder="Select Country"
            />
            {error.currentCountryError && (
              <p className="text-red-500 text-xs font-bold mt-1">
                {error.currentCountryError}
              </p>
            )}
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
              onChange={handleStateSelectChange}
              placeHolder="Select State"
            />
            {error.stateError && (
              <p className="text-red-500 text-xs font-bold mt-1">
                {error.stateError}
              </p>
            )}
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
              onChange={handleCitySelectChange}
              placeHolder="Select City"
            />
            {error.cityError && (
              <p className="text-red-500 text-xs font-bold mt-1">
                {error.cityError}
              </p>
            )}
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
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                message: "Please enter email in the correct format",
              },
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
          id="addressLine"
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
              <p className="text-red-500 text-xs font-bold mt-1">
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
              <p className="text-red-500 text-xs font-bold mt-1">
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

        <ToastContainer />

        <button
          type="submit"
          className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 flex items-center gap-2"
        >
          Submit
          {loading && <ButtonLoader />}
        </button>
      </form>
    </div>
  );
};

export default PersonalInfo;
