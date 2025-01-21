import Input from "@/utils/InputComponent";
import { Button } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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

// interface User extends Document {
//     marital_status: "Single" | "Married" | "Divorced" | "Widowed";
//     gender: "Male" | "Female" | "Other";
//     terms: boolean;
//     first_name: string;
//     middle_name?: string;
//     last_name: string;
//     dob: Date;
//     passport_number: string;
//     passport_expiry: Date;
//     zipCode: string;
//     email: string;
//     phoneNumber: string;
//     addressLine: string;
//     addressData: {
//         city: string;
//         country: string;
//         state: string;
//     };
//     citizenshipCountry: {
//         value: string;
//         label: string;
//     };
//     // userId: ObjectId;
// }

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    modalTitle: string;
    children: React.ReactNode;
    onSave: (formData: any) => void;
    // user: User;
    userId: string;
}

const EditPersonalInfo: React.FC<ModalProps> = ({  userId, onSave, isOpen, onClose, modalTitle, children }) => {
    // Manage body scroll state


    if (!isOpen) return null; // Don't render if modal is not open
    const { register, handleSubmit: handleFormSubmit, setValue, watch, formState: { errors } }: any = useForm();
    const [formData, setFormData] = useState(userId);
    const [personalDataStatus, setPersonalDataStatus] = useState<any>(null);
    const [personalData, setPersonalData] = useState()
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Sync form data with user info
        setFormData(userId);
    }, [userId]);

    const handleChange = (e) => {
        console.log(e); // Log to debug
        if (e && e.preventDefault) e.preventDefault(); // Safeguard
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
      };
      

    const onFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    const options = [
        { code: "en", label: "English" },
        { code: "es", label: "Spanish" },
        { code: "fr", label: "French" },
        { code: "hi", label: "Hindi" },
        { code: "zh", label: "Chinese" },
    ];

    useEffect(() => {
        const getPersonalInfoFunction = async () => {
            if (!userId) {
                console.error("userId is undefined");
                return; // Exit early if userId is not defined
            }
    
            const result = await getPersonalData(userId);
            console.log(";; getPersonalData", result);
    
            if (result?.status) {
                setPersonalData(result?.data);
                setPersonalDataStatus(result?.status);
                setLoading(false);
    
                // Pre-fill the form using the fetched data
                if (result?.data) {
                    Object.keys(result.data).forEach((key) => {
                        setValue(key, result.data[key], { shouldValidate: true });
                    });
                }
            } else {
                console.log("result@@@", result);
                setLoading(false);
            }
        };
    
        getPersonalInfoFunction();
    }, [userId, setValue]);
    
      

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("no-scroll");
        } else {
            document.body.classList.remove("no-scroll");
        }

        // Cleanup on unmount
        return () => {
            document.body.classList.remove("no-scroll");
        };
    }, [isOpen]);

    if (loading) {
        return <p>Loading...</p>;
    }
    return (
        <div className="fixed inset-0 backdrop-blur-sm bg-[#807D78]/30 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-FloralWhite rounded-lg p-6 shadow-lg w-1/2 relative">
                <div className="flex justify-between ">
                    <h3 className="text-xl font-bold font-sans mb-4">{modalTitle}</h3>
                    <button
                        className="text-gray-600 mb-8 hover:text-gray-900"
                        onClick={onClose}
                    >
                        < IoMdClose />
                    </button>
                </div>
                <div className="">
                    <form onSubmit={handleFormSubmit(onFormSubmit)}>
                        <div className="grid gap-6 md:grid-cols-4  ">
                            <Input
                                label="First Name"
                                type="text"
                                id="first_name"
                                onChange={handleChange}
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
                                label="Middle Name"
                                type="text"
                                id="middle_name"
                                onChange={handleChange}
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
                                onChange={handleChange}
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
                            <Input
                                label="DOB"
                                type="date"
                                id="dob"
                                onChange={handleChange}
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
                            {/* {/* <Input
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
                                {errors.firstLanguageError && (
                                    <p className="text-red-500 text-xs font-bold mt-1">
                                        {errors.firstLanguageError}
                                    </p>
                                )}
                            </div>
                            <Input
                                label="Passport Number"
                                id="passport_number"
                                placeholder="Passport Number"
                                type="text"
                                onChange={handleChange}
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
                                onChange={handleChange}
                                register={register}
                                placeholder=""
                                minDate={moment().format("YYYY-MM-DD")}
                                validation={{
                                    required: "Passport Expiry Date is required",
                                }}
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
                                onChange={handleChange}

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
                                onChange={handleChange}

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
                            onChange={handleChange}

                            register={register}
                            placeholder=""
                            validation={{
                                required: false,
                            }}
                            errors={errors.Address}
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
                                        onChange={handleChange}

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
                                        onChange={handleChange}

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
                                        onChange={handleChange}

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
                                        onChange={handleChange}

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
