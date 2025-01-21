import Input from "@/utils/InputComponent";
import { Button } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
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
import { ToastContainer, toast } from "react-toastify";

const EditPersonalInfo = ({ isOpen, onClose, personalData, savePersonalData, modalTitle }) => {
    const { register, handleSubmit, setValue, control, formState: { errors }, reset } = useForm({
        defaultValues: {
            first_name: "",
            middle_name: "",
            last_name: "",
            email: "",
            dob: "",
            phoneNumber: "",
            addressLine: "",
            passport_number: "",
            gender: "",
            zipCode: "",
            firstLanguageError: "",
            passport_expiry: "",
            marital_status: "",
        },
    });
    // useEffect(() => {
    //     if (personalData) {
    //         setFormData(personalData); // Populate form data when personalData changes
    //     }
    // }, [personalData]);

    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData({ ...formData, [name]: value });
    // };


    const onSubmit = async (formData) => {
        console.log("Submitted Data:", formData); // Debug
        try {
          const result = await savePersonalData(formData); // Call API or action
          if (result?.status === 200) {
            toast.success("Information updated successfully!");
            onClose();
          } else {
            toast.error("Failed to update information");
          }
        } catch (error) {
          console.error("Error occurred:", error); // Debug
          toast.error("An error occurred");
        }
      };
      

    const options = [
        { code: "en", label: "English" },
        { code: "es", label: "Spanish" },
        { code: "fr", label: "French" },
        { code: "hi", label: "Hindi" },
        { code: "zh", label: "Chinese" },
    ];
    useEffect(() => {
        if (personalData) {
            reset({
                first_name: personalData?.first_name || "",
                middle_name: personalData?.middle_name || "",
                last_name: personalData?.last_name || "",
                email: personalData?.email || "",
                dob: moment(personalData?.dob).format("YYYY-MM-DD"),
                phoneNumber: personalData?.phoneNumber || "",
                addressLine: personalData?.addressLine || "",
                passport_number: personalData?.passport_number || "",
                gender: personalData?.gender || "",
                zipCode: personalData?.zipCode || "",
                firstLanguageError: personalData?.firstLanguageError || "",
                passport_expiry: moment(personalData?.passport_expiry).format("YYYY-MM-DD"),
                marital_status: personalData?.marital_status || "",
            });
        }
    }, [personalData, reset]);
    // useEffect(() => {
    //     document.body.style.overflow = "hidden";
    //     return () => {
    //         document.body.style.overflow = "auto";
    //     };
    // }, []);
    useEffect(() => {
        console.log("Updated personalData:", personalData);
    }, [personalData]);
    if (!isOpen) return null; // Don't render if modal is not open

    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-[#807D78]/30 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-FloralWhite rounded-lg p-6 shadow-lg w-[70%] relative">
                <div className="flex justify-between ">
                    <h3 className="text-xl font-bold font-sans mb-4">{modalTitle}</h3>
                    <button
                        className="text-gray-600 mb-8 hover:text-gray-900"
                        onClick={onClose}
                    >
                        < IoMdClose />
                    </button>

                </div>
                <hr className="mb-4" />
                <div className="">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-6 md:grid-cols-4  ">
                            <Input
                                label="First Name"
                                type="text"
                                id="first_name"
                                // onChange={handleInputChange}
                                register={register}
                                readOnly={true}
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
                                label="Middle Name"
                                type="text"
                                id="middle_name"
                                readOnly={true}
                                // onChange={handleInputChange}
                                register={register}
                                validation={{
                                    required: "Middle name is required",
                                    minLength: {
                                        value: 2,
                                        message: "Middle name must be at least 2 characters",
                                    },
                                    maxLength: {
                                        value: 20,
                                        message: "Middle name must be at most 20 characters",
                                    },
                                }}
                                placeholder="Singh"
                                errors={errors.middle_name}
                            />
                            <Input
                                label="Last Name"
                                type="text"
                                id="last_name"
                                // onChange={handleInputChange}
                                register={register}
                                readOnly={true}
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
                            <Input
                                label="DOB"
                                type="date"
                                id="dob"
                                // onChange={handleInputChange}
                                register={register}
                                minDate={moment().subtract(18, 'years').format("YYYY-MM-DD")}
                                validation={{
                                    required: "DOB is required",
                                    validate: {
                                        // Optional: You can also check if the date is valid and at least 18 years old before submitting
                                        isValidDate: (value) => {
                                            const isValid = moment(value, "YYYY-MM-DD", true).isValid();
                                            if (!isValid) {
                                                return "Please enter a valid date in YYYY-MM-DD format";
                                            }
                                            // Optional: Check if the user is 18 years old
                                            const age = moment().diff(moment(value), 'years');
                                            if (age < 18) {
                                                return "User must be at least 18 years old";
                                            }
                                            return true;
                                        },
                                    }
                                }}
                                placeholder=""
                                errors={errors.dob}
                            />

                            <div>
                                <label className="block mb-2 text-base font-medium text-gray-700">
                                    First Language
                                </label>
                                <Controller
                                    name="firstLanguageError"
                                    control={control}
                                    defaultValue={
                                        personalData?.firstLanguageError
                                            ? options.find((opt) => opt.value === personalData.firstLanguageError)
                                            : null
                                    }
                                    rules={{ required: "First Language is required" }}
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            options={options}
                                            className={`w-full shadow-md rounded-lg text-gray-800`}
                                        />
                                    )}
                                />
                                {errors.firstLanguageError && (
                                    <p className="text-red-500 text-xs font-medium mt-1">
                                        {errors.firstLanguageError.message}
                                    </p>
                                )}
                            </div>
                            <Input
                                label="Passport Number"
                                id="passport_number"
                                placeholder="Passport Number"
                                type="text"
                                // onChange={handleInputChange}
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
                            {/* <div className="mb-4">
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
                                {errors.citizenshipCountryError && (
                                    <p className="text-red-500 text-xs font-bold mt-1">
                                        {errors.citizenshipCountryError}
                                    </p>
                                )}
                            </div> */}
                            <Input
                                label="Passport Expiry Date"
                                id="passport_expiry"
                                type="date"
                                // onChange={handleInputChange}
                                register={register}
                                placeholder=""
                                minDate={moment().format("YYYY-MM-DD")}
                                validation={{
                                    required: "Passport Expiry Date is required",
                                }}
                                readOnly={false}
                                errors={errors.passport_expiry}
                            />
                            {/* <div className="text-gray-900">
                                <label
                                    htmlFor="current_country"
                                    className="block mb-2 text-base font-sans font-medium text-gray-700"
                                >
                                    Current Country
                                </label>
                                <CountrySelect
                                    className="block mb-2 text-base font-medium text-gray-700"
                                    onChange={handleCountrySelectChange}
                                    placeHolder="Select Country"
                                />
                                {errors.currentCountryError && (
                                    <p className="text-red-500 text-xs font-bold mt-1">
                                        {errors.currentCountryError}
                                    </p>
                                )}
                            </div> */}
                            {/* <div className="text-gray-900">
                                <label
                                    htmlFor="state"
                                    className="block mb-2 text-base font-medium font-sans  text-gray-700"
                                >
                                    Province/State
                                </label>
                                <StateSelect
                                    countryid={countryid}
                                    className="block mb-2 text-base font-sans font-medium text-gray-700 placeholder:italic"
                                    onChange={handleStateSelectChange}
                                    placeHolder="Select State"
                                />
                                {errors.stateError && (
                                    <p className="text-red-500 text-sm font-normal mt-1">
                                        {errors.stateError}
                                    </p>
                                )}
                            </div> */}
                            {/* <div className="text-gray-900">
                                <label
                                    htmlFor="city"
                                    className="block mb-2 text-base font-sans  font-medium text-gray-700"
                                >
                                    City/Town
                                </label>
                                <CitySelect
                                    countryid={countryid}
                                    stateid={stateid}
                                    onChange={handleCitySelectChange}
                                    className="font-sans placeholder:italic"
                                    placeHolder="Select City"
                                />
                                {errors.cityError && (
                                    <p className="text-red-500 text-xs font-bold mt-1">
                                        {errors.cityError}
                                    </p>
                                )}
                            </div> */}
                            <Input
                                label="Postal/Zip Code"
                                id="zipCode"
                                type="text"
                                register={register}
                                // onChange={handleInputChange}

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
                                readOnly={true}
                                // onChange={handleInputChange}

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
                                // onChange={handleInputChange}

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
                            // onChange={handleInputChange}

                            register={register}
                            placeholder=""
                            validation={{
                                required: false,
                            }}
                            errors={errors.addressLine}
                        />

                        <div className="flex space-between w-full">
                            <div className="mb-6 w-1/2">
                                <label className="block mb-2 text-base font-sans font-medium text-gray-700">
                                    Marital Status
                                </label>

                                <div className="flex items-center mb-4">
                                    <input
                                        type="radio"
                                        id="single"
                                        value="Single"
                                        // onChange={handleInputChange}

                                        {...register("marital_status", {
                                            required: "Marital status is required",
                                        })}
                                        className="w-4 h-4"
                                    />
                                    <label
                                        htmlFor="single"
                                        className="ms-2 text-base tracking-wide font-medium text-gray-500"
                                    >
                                        Single
                                    </label>
                                </div>

                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        id="married"
                                        value="Married"
                                        // onChange={handleInputChange}

                                        {...register("marital_status", {
                                            required: "Marital status is required",
                                        })}
                                        className="w-4 h-4"
                                    />
                                    <label
                                        htmlFor="married"
                                        className="ms-2 text-base tracking-wide font-medium text-gray-500"
                                    >
                                        Married
                                    </label>
                                </div>

                                {errors.marital_status && (
                                    <p className="text-red-500 text-sm font-sans tracking-wide font-normal mt-1">
                                        *{errors.marital_status.message}
                                    </p>
                                )}
                            </div>

                            <div className="mb-6 w-1/2">
                                <label className="block mb-2 text-base font-sans font-medium text-gray-700">
                                    Gender
                                </label>
                                <div className="flex items-center mb-4">
                                    <input
                                        type="radio"
                                        id="male"
                                        value="Male"
                                        // onChange={handleInputChange}

                                        {...register("gender", {
                                            required: "Gender is required",
                                        })}
                                        className="w-4 h-4"
                                    />
                                    <label
                                        htmlFor="male"
                                        className="ms-2 text-base tracking-wide font-medium text-gray-500"
                                    >
                                        Male
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        type="radio"
                                        id="female"
                                        value="Female"
                                        // onChange={handleInputChange}

                                        {...register("gender", {
                                            required: "Gender is required",
                                        })}
                                        className="w-4 h-4"
                                    />
                                    <label
                                        htmlFor="female"
                                        className="ms-2 text-base tracking-wide font-medium text-gray-500"
                                    >
                                        Female
                                    </label>
                                </div>
                                {errors.gender && (
                                    <p className="text-red-500 text-sm font-sans tracking-wide font-normal mt-1">
                                        *{errors.gender.message}
                                    </p>
                                )}
                            </div>
                        </div>



                        <div className="flex justify-end space-x-2 mt-4">
                            <button
                                type="button"
                                className="px-8 py-2 bg-gray-300 rounded"
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                            <button type="submit" className="px-8 py-2 shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-[#333366] to-[#2C415A] text-FloralWhite rounded">
                                Save
                            </button>
                        </div>
                    </form>
                </div>

                {/* {children} */}
            </div>
        </div>
    );
};

export default EditPersonalInfo;
