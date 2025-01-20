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
import { getSingleVisaData } from "@/api/visaData";


const options = [
  { code: "en", label: "English" },
  { code: "es", label: "Spanish" },
  { code: "fr", label: "French" },
  { code: "hi", label: "Hindi" },
  { code: "zh", label: "Chinese" },
];


const PersonalInfo = ({userId,userEmail,userName,visaDataId}) => {
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
  const [riskAssessmentData, setRiskAssessmentData] = useState<any>({});
  const [personalDataStatus, setPersonalDataStatus] = useState<any>(null);
  const [personalData , setPersonalData] = useState()
  const [sharedMedata] = useAtom(meDataAtom);
  const { user, isLoading } = useAuth();
  console.log(";; personal visa data", user);
  
  // const userId = user?.user?._id;

  useEffect(() => {
    // Early return if no user data is available
    if (!user?.user?.visaDataId) {
      return;
    }

    const fetchVisaData = async () => {
      try {
        const visaDataResult = await getSingleVisaData(visaDataId);

        if (visaDataResult?.data) {
          setRiskAssessmentData(visaDataResult.data);
        }
      } catch (error) {
        console.error("Error fetching visa data:", error);
      }
    };

    fetchVisaData();
  }, [user?.user?.visaDataId]); 

  console.log(";; risk assessment data", riskAssessmentData);

  console.log("me data", sharedMedata);

  console.log("sharedMedata", sharedMedata);
  const [citizenshipCountryCodes, setCitizenshipCountryCodes] =
    useState(countriesCodes);
  const [citizenshipCountry, setCitizenShipCountry] = useState<any>("");
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

  // Prefill logic
  useEffect(() => {
    if (riskAssessmentData) {
      if (riskAssessmentData?.citizenshipCountry) {
        const tempCountry: any = countryList()
          .getData()
          .find(
            (country) => country.value === riskAssessmentData?.citizenshipCountry
          );
        setCitizenShipCountry(tempCountry);
      }
      if (riskAssessmentData?.whereWillYouApplyForYourVisa?.value) {
        const tempCountry: any = countryList()
          .getData()
          .find(
            (country) =>
              country.value === riskAssessmentData?.whereWillYouApplyForYourVisa?.value
          );

        setAddressData((prev) => ({ ...prev, country: tempCountry?.name }));
        const tempCountryId = countryList()
          .getData()
          .find(
            (country) =>
              country.value === riskAssessmentData?.whereWillYouApplyForYourVisa?.value
          );
        setCountryid(tempCountryId?.id);
      }
    }
    if (userEmail) {
      setValue("email", userEmail);
    }
    if (userName) {
      setValue("first_name", userName);
    }
  }, [riskAssessmentData, userEmail, setValue, userName]);

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
        citizenshipCountry: citizenshipCountry,
        addressData,
        userId: userId,
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
        // router.push("/dashboard/payment");
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
    const result = await getPersonalData(userId);
    console.log(";; getPersonalData", result);
    if (result?.status) {
      //show the info without form format if the status is true
      setPersonalData(result?.data)
      setPersonalDataStatus(result?.status);
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
   console.log(';; personal data',personalDataStatus)
   if (personalDataStatus) {
    return (
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b">
          <div>
            <h1 className="text-3xl font-bold text-[#333366] mb-2">My Profile </h1>
            <p className="text-gray-600">Visa Application Details & Risk Assessment</p>
          </div>
          <button onClick={()=>router.push('/dashboard/payment')} className="px-4 py-2 bg-[#333366] text-white rounded-lg hover:bg-[#2C415A] transition-colors">
            Proceed to Pay
          </button>
        </div>
  
        {/* Personal Information Section */}
        <div className="mb-12 text-gray-600">
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 bg-[#333366] rounded-full flex items-center justify-center mr-3">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-[#333366]">Personal Information</h2>
          </div>
  
          <div className="grid gap-8 text-gray-600 mb-8">
            {/* Basic Info Card */}
            <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Full Name</p>
                  <p className="text-sm font-medium">{`${personalData?.first_name} ${personalData?.last_name}`}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-sm font-medium">{personalData?.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Phone</p>
                  <p className="text-sm font-medium">{personalData?.phoneNumber}</p>
                </div>
              </div>
            </div>
  
            {/* Passport Details Card */}
            <div className="bg-gray-50 rounded-xl text-gray-600 p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-[#333366] mb-4">Passport Information</h3>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Passport Number</p>
                  <p className="text-sm font-medium">{personalData?.passport_number}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Citizenship</p>
                  <p className="text-sm font-medium">{personalData?.citizenshipCountry?.label}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500">Expiry Date</p>
                  <p className="text-sm font-medium">
                    {moment(personalData?.passport_expiry).format("YYYY-MM-DD")}
                  </p>
                </div>
              </div>
            </div>
  
            {/* Address Card */}
            <div className="bg-gray-50  text-gray-600 rounded-xl p-6 shadow-sm">
              <h3 className="text-sm font-semibold text-[#333366] mb-4">Address Details</h3>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-gray-500">Street Address</p>
                  <p className="text-sm font-medium">{personalData?.addressLine}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Country</p>
                    <p className="text-sm font-medium">{personalData?.addressData?.country}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">State</p>
                    <p className="text-sm font-medium">{personalData?.addressData?.state}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        {/* Risk Assessment Section */}
        <div className="text-gray-600 mt-12">
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 bg-[#333366] rounded-full flex items-center justify-center mr-3">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-[#333366]">Risk Assessment</h2>
          </div>
  
          <div className="bg-gray-50 rounded-xl p-6 shadow-sm">
            <div className="grid gap-6 md:grid-cols-2">
              {Object.entries(riskAssessmentData || {}).map(([key, value]) => (
                <div key={key} className="border-l-4 border-[#333366] pl-4">
                  <p className="text-sm font-medium text-gray-500">
                    {key.split(/(?=[A-Z])/).join(' ')}
                  </p>
                  <p className="text-sm font-medium">
                    {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : 
                     typeof value === 'object' ? value?.label :
                     value === 'true' ? 'Yes' : 
                     value === 'false' ? 'No' : 
                     value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
  
        {/* Status Banner */}
        <div className="mt-8 bg-green-50 border border-green-200 rounded-xl p-4 flex items-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-green-800">Profile Complete</h4>
            <p className="text-green-600">All required information has been provided</p>
          </div>
        </div>
      </div>
    );
  }

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
              selected={citizenshipCountry?.value}
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
              htmlFor="current_country"
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
              htmlFor="state"
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
              htmlFor="city"
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
            type="text"
            register={register}
            placeholder=""
            validation={{
              required: "Postal/Zip Code is required",
              pattern: {
                value: /^[a-zA-Z0-9]{5,6}$/, // Matches 5-6 alphanumeric characters (letters or digits)
                message:
                  "Input must be 5 or 6 alphanumeric characters (letters and numbers only, no special characters).",
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
            required:false,
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