import React, { useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import countryList from "react-select-country-list";
import Select from "react-select";
import { addFamilyMember } from "@/api/familyMember";
import ReactFlagsSelect from "react-flags-select";
import { countriesToRemove } from "../TravelPlan";
import moment from "moment";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
  member: {};
}

interface FormData {
  name: string;
  email: string;
  passport_number: string;
  passport_expiry: Date;
  areYouApplyingFromPassportCountry: boolean;
  citizenshipCountry: { value: string; label: string };
  deniedVisaToAnyCountry: boolean;
  destinationCountry: { value: string; label: string };
  haveSpouseOrProperty: boolean;
  passportCountry: { value: string; label: string };
  travelledInternationallyAndReturnedHome: boolean;
  whereWillYouApplyForYourVisa: { value: string; label: string };
  relationship: "parent" | "sibling" | "spouse" | "children";
}

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  // phone_number: yup.string().required('Phone number is required'),
  email: yup
    .string()
    .email("Email must be valid")
    .required("Email is required"),
  passport_number: yup.string().required("Passport number is required"),
  passport_expiry: yup
    .date()
    .required("Passport Expiry is required")
    .min(moment().startOf("day").toDate(), "Expiry date must be in the future")
    .typeError("Invalid date format"),

  // areYouApplyingFromPassportCountry:yup.boolean().required('Applying From Passport Country is required'),
  citizenshipCountry: yup.object().required("Citizenship Country is required"),
  deniedVisaToAnyCountry: yup
    .boolean()
    .required("Previously Denied Visa to any country is required"),
  // destinationCountry:yup.object().required('Destination Country is required'),
  // haveSpouseOrProperty:yup.boolean().required('Have Spouse Or Property is required'),
  // passportCountry:yup.object().required('Passport Country is required'),
  // travelledInternationallyAndReturnedHome:yup.boolean().required('Travelled Internationally And Returned Home is required'),
  // whereWillYouApplyForYourVisa:yup.object().required('Where Will You Apply For Your Visa is required'),
  relationship: yup
    .string()
    .oneOf(
      ["parent", "sibling", "spouse", "children"],
      "Relationship must be one of the given options"
    )
    .required("Relationship is required"),
});
const AddFamilyMemberModal: React.FC<Props> = ({
  isOpen,
  onClose,
  member,
  onSubmit,
}) => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const countries = useMemo(() => countryList().getData(), []);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCitizenshipCountry, setSelectedCitizenshipCountry] = useState<
    string | null
  >(null);
  const [selectedDestinationCountry, setSelectedDestinationCountry] = useState<
    string | null
  >(null);
  const [selectedPassportCountry, setSelectedPassportCountry] = useState<
    string | null
  >(null);
  const [selectedVisaApplicationCountry, setSelectedVisaApplicationCountry] =
    useState<string | null>(null);
  const [expiryDate, setExpiryDate] = useState("");

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

  const handleDateChange = (e) => {
    const inputDate = e.target.value; // Input value in YYYY-MM-DD format
    const formattedDate = moment(inputDate).format("YYYY/MM/DD"); // Convert to YYYY/MM/DD
    setExpiryDate(formattedDate); // Update the state with the formatted date
  };

  const handleFormSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    try {
      const {
        name,
        email,
        passport_number,
        passport_expiry,
        relationship,
        areYouApplyingFromPassportCountry,
        citizenshipCountry,
        deniedVisaToAnyCountry,
        destinationCountry,
        haveSpouseOrProperty,
        passportCountry,
        travelledInternationallyAndReturnedHome,
        whereWillYouApplyForYourVisa,
      } = formData;

      const data = {
        name,
        email,
        relationship,
        profileData: {
          passport_number,
          passport_expiry,
          citizenshipCountry: {
            value: citizenshipCountry?.value,
            label: citizenshipCountry?.label,
          },
        },

        data: {
          areYouApplyingFromPassportCountry,
          citizenshipCountry: citizenshipCountry,
          deniedVisaToAnyCountry,
          destinationCountry: destinationCountry,
          haveSpouseOrProperty,
          passportCountry: passportCountry,
          travelledInternationallyAndReturnedHome,
          whereWillYouApplyForYourVisa: whereWillYouApplyForYourVisa,
        },
      };

      const response = await addFamilyMember(data);

      if (response) {
        reset();
        onClose();
        onSubmit();
      }

      console.log("data::", response);
    } catch (err) {
      console.log("family member submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      border: state.isFocused ? "1px solid #9230f0" : "1px solid #ccc",
      boxShadow: state.isFocused ? "0 0 0 1px #9230f0" : "none",
      "&:hover": {
        borderColor: "#9230f0",
      },
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      color: state.isSelected ? "white" : "black",
      backgroundColor: state.isSelected ? "#9230f0" : "white",
      "&:hover": {
        backgroundColor: state.isSelected ? "#9230f0" : "#f3f3f3",
      },
    }),
  };

  if (!isOpen) return null;

  // useEffect(() => {
  //   console.log("@@@", member);
  // }, [member]);

  return ReactDOM.createPortal(
    <div className="fixed inset-0 text-gray-600 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg max-w-4xl w-full relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center text-Indigo">
          Add Family Member
        </h2>
        <form
          className="grid grid-cols-2 gap-4"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          {/* Name Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              className={`w-full px-3 py-2 border rounded ${
                errors.name ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:border-Indigo`}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className={`w-full px-3 py-2 border rounded ${
                errors.email ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:border-Indigo`}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Relationship  */}
          <div className="mb-4 bg-white ">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Relationship
            </label>
            <select
              className={`w-full px-3 py-3.5 bg-white  border rounded ${
                errors.relationship ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:border-Indigo`}
              {...register("relationship")}
            >
              <option className="p-3 bg-white" value="">
                Select Relationship
              </option>
              <option className="p-3 bg-white" value="parent">
                Parent
              </option>
              <option className="p-3 bg-white" value="sibling">
                Sibling
              </option>
              <option className="p-3 bg-white" value="spouse">
                Spouse
              </option>
              <option className="p-3 bg-white" value="children">
                Children
              </option>
            </select>
            {errors.relationship && (
              <p className="text-red-500 text-xs mt-1">
                {errors.relationship.message}
              </p>
            )}
          </div>

          {/* Passport Number Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Passport Number
            </label>
            <input
              type="text"
              className={`w-full px-3 py-2 border rounded ${
                errors.passport_number ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:border-Indigo`}
              {...register("passport_number")}
            />
            {errors.passport_number && (
              <p className="text-red-500 text-xs mt-1">
                {errors.passport_number.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-700">
              Passport Expiry Date
            </p>
            {/* <p className="text-sm font-medium"> </p> */}
            <input
              type="date"
              className={`w-full px-3 py-3 border rounded ${
                errors.passport_number ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:border-Indigo`}
              {...register("passport_expiry")}
              value={moment(watch("passport_expiry")).format("YYYY-MM-DD")}
              onChange={(e) => {
                setValue(
                  "passport_expiry",
                  moment(e.target.value).format("YYYY/MM/DD")
                );
              }}
            />
          </div>

          {/* Applying From Passport Country Select */}
          {/* <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Applying From Passport Country
                        </label>
                        <div className="flex gap-4">
                            <label className="inline-flex items-center">
                                <input type="radio"
                                       className={`form-radio h-5 w-5 text-Indigo ${errors.areYouApplyingFromPassportCountry ? "border-red-500" : "border-gray-300" } focus:outline-none focus:border-Indigo`}
                                       {...register("areYouApplyingFromPassportCountry")}
                                       value={true}
                                />
                                <span className="ml-2 text-gray-700">Yes</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    className={`form-radio h-5 w-5 text-Indigo ${errors.areYouApplyingFromPassportCountry ? "border-red-500" : "border-gray-300" } focus:outline-none focus:border-Indigo`}
                                    {...register("areYouApplyingFromPassportCountry")}
                                    value={false}
                                />
                                <span className="ml-2 text-gray-700">No</span>
                            </label>
                        </div>
                        {errors.areYouApplyingFromPassportCountry && <p className="text-red-500 text-xs mt-1">{errors.areYouApplyingFromPassportCountry.message}</p>}
                    </div> */}

          {/* Citizenship Country Select */}
          <div className="  mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Citizenship Country
            </label>
            <ReactFlagsSelect
              selected={selectedCitizenshipCountry?.value}
              onSelect={(code) => {
                const selectedCountry = countries.find(
                  (country) => country.value === code
                );
                setSelectedCitizenshipCountry(selectedCountry);
                setValue("citizenshipCountry", selectedCountry);
              }}
              countries={citizenshipCountryCodes}
              searchable
              placeholder="Select Citizenship Country"
              className={`w-full  border rounded ${
                errors.citizenshipCountry ? "border-red-500" : "border-gray-300"
              } focus:outline-none focus:border-Indigo`}
            />
            {errors.citizenshipCountry && (
              <p className="text-red-500 text-xs mt-1">
                {errors.citizenshipCountry.message}
              </p>
            )}
          </div>
          {/* Previously Denied Visa to US */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Previously Denied Visa to Any Country
            </label>
            <div className="flex gap-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className={`form-radio h-5 w-5 text-Indigo ${
                    errors.deniedVisaToAnyCountry
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:outline-none focus:border-Indigo`}
                  {...register("deniedVisaToAnyCountry")}
                  value={true}
                />
                <span className="ml-2 text-gray-700">Yes</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className={`form-radio h-5 w-5 text-Indigo ${
                    errors.deniedVisaToAnyCountry
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:outline-none focus:border-Indigo`}
                  {...register("deniedVisaToAnyCountry")}
                  value={false}
                />
                <span className="ml-2 text-gray-700">No</span>
              </label>
            </div>
            {errors.deniedVisaToAnyCountry && (
              <p className="text-red-500 text-xs mt-1">
                {errors.deniedVisaToAnyCountry.message}
              </p>
            )}
          </div>

          {/* Destination Country Select */}
          {/* <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Destination Country
                        </label>
                        <ReactFlagsSelect
                            selected={selectedDestinationCountry}
                            countries={destinationCountryCodes}
                             onSelect={(code) => {
                                 const selectedCountry = countries.find((country) => country.value === code);
                                 setSelectedDestinationCountry(code)
                                 setValue('destinationCountry', selectedCountry)
                             }}
                            placeholder="Select Destination Country"
                            searchable
                            className={`w-full border rounded  ${errors.destinationCountry ? "border-red-500" : "border-gray-300" } focus:outline-none focus:border-Indigo`}
                        />
                        {errors.destinationCountry && <p className="text-red-500 text-xs mt-1">{errors.destinationCountry.message}</p>}
                    </div> */}

          {/* Have Spouse Or Property */}
          {/* <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Have Spouse Or Property
                        </label>
                        <div className="flex gap-4">
                            <label className="inline-flex items-center">
                                <input type="radio"
                                       className={`form-radio h-5 w-5 text-Indigo ${errors.haveSpouseOrProperty ? "border-red-500" : "border-gray-300" } focus:outline-none focus:border-Indigo`}
                                       {...register("haveSpouseOrProperty")}
                                       value={true}
                                />
                                <span className="ml-2 text-gray-700">Yes</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    className={`form-radio h-5 w-5 text-Indigo ${errors.haveSpouseOrProperty ? "border-red-500" : "border-gray-300" } focus:outline-none focus:border-Indigo`}
                                    {...register("haveSpouseOrProperty")}
                                    value={false}
                                />
                                <span className="ml-2 text-gray-700">No</span>
                            </label>
                        </div>
                        {errors.haveSpouseOrProperty && <p className="text-red-500 text-xs mt-1">{errors.haveSpouseOrProperty.message}</p>}
                    </div> */}

          {/* Passport Country Select */}
          {/* <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Passport Country
                        </label>
                        <ReactFlagsSelect
                            selected={selectedPassportCountry}
                             onSelect={(code) => {
                                 const selectedCountry = countries.find((country) => country.value === code);
                                 setSelectedPassportCountry(code)
                                 setValue('passportCountry', selectedCountry)
                             }}
                             searchable
                            placeholder="Select Passport Country"
                            className={`w-full border rounded  ${errors.passportCountry ? "border-red-500" : "border-gray-300" } focus:outline-none focus:border-Indigo`}
                        />
                        {errors.passportCountry && <p className="text-red-500 text-xs mt-1">{errors.passportCountry.message}</p>}
                    </div> */}
          {/* Travelled Internationally And Returned Home */}
          {/* <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Travelled Internationally And Returned Home
                        </label>
                        <div className="flex gap-4">
                            <label className="inline-flex items-center">
                                <input type="radio"
                                       className={`form-radio h-5 w-5 text-Indigo ${errors.travelledInternationallyAndReturnedHome ? "border-red-500" : "border-gray-300" } focus:outline-none focus:border-Indigo`}
                                       {...register("travelledInternationallyAndReturnedHome")}
                                       value={true}
                                />
                                <span className="ml-2 text-gray-700">Yes</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    className={`form-radio h-5 w-5 text-Indigo ${errors.travelledInternationallyAndReturnedHome ? "border-red-500" : "border-gray-300" } focus:outline-none focus:border-Indigo`}
                                    {...register("travelledInternationallyAndReturnedHome")}
                                    value={false}
                                />
                                <span className="ml-2 text-gray-700">No</span>
                            </label>
                        </div>
                        {errors.travelledInternationallyAndReturnedHome && <p className="text-red-500 text-xs mt-1">{errors.travelledInternationallyAndReturnedHome.message}</p>}
                    </div> */}
          {/* Where Will You Apply For Your Visa */}
          {/* <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                           Where Will You Apply For Your Visa
                        </label>
                         <ReactFlagsSelect
                            selected={selectedVisaApplicationCountry}
                             onSelect={(code) => {
                                 const selectedCountry = countries.find((country) => country.value === code);
                                 setSelectedVisaApplicationCountry(code)
                                 setValue('whereWillYouApplyForYourVisa', selectedCountry)
                             }}
                             searchable
                            placeholder="Select Where Will You Apply For Your Visa"
                            className={`w-full rounded border  ${errors.whereWillYouApplyForYourVisa ? "border-red-500" : "border-gray-300" } focus:outline-none focus:border-Indigo`}
                        />
                        {errors.whereWillYouApplyForYourVisa && <p className="text-red-500 text-xs mt-1">{errors.whereWillYouApplyForYourVisa.message}</p>}
                    </div> */}
          <div className="mt-6 flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 text-white bg-Indigo rounded hover:bg-blue-700 focus:outline-none ${
                isSubmitting ? "opacity-75 cursor-not-allowed" : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Adding..." : "Add Family Member"}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default AddFamilyMemberModal;
