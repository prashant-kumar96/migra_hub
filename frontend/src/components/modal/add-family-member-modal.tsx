import React, { useMemo, useState } from "react";
import ReactDOM from 'react-dom';
import { useForm } from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import countryList from "react-select-country-list";
import Select from "react-select";
import { addFamilyMember } from "@/api/familyMember";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => Promise<void>;
}


interface FormData {
    name: string;
    email: string;
    areYouApplyingFromPassportCountry:boolean;
    citizenshipCountry: {value: string, label:string};
    deniedVisaToUs:boolean;
    destinationCountry: {value: string, label:string};
    haveSpouseOrProperty:boolean;
    passportCountry: {value: string, label:string};
    travelledInternationallyAndReturnedHome:boolean;
    whereWillYouApplyForYourVisa: {value: string, label:string};
    relationship: "father" | "mother" | "brother" | "sister"
}


const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Email must be valid').required('Email is required'),
    areYouApplyingFromPassportCountry:yup.boolean().required('Applying From Passport Country is required'),
    citizenshipCountry:yup.object().required('Citizenship Country is required'),
    deniedVisaToUs:yup.boolean().required('Previously Denied Visa to US is required'),
    destinationCountry:yup.object().required('Destination Country is required'),
    haveSpouseOrProperty:yup.boolean().required('Have Spouse Or Property is required'),
    passportCountry:yup.object().required('Passport Country is required'),
    travelledInternationallyAndReturnedHome:yup.boolean().required('Travelled Internationally And Returned Home is required'),
    whereWillYouApplyForYourVisa:yup.object().required('Where Will You Apply For Your Visa is required'),
    relationship: yup.string().oneOf(["father", "mother", "brother", "sister"], "Relationship must be one of the given options").required("Relationship is required"),
})

const AddFamilyMemberModal: React.FC<Props> = ({ isOpen, onClose, onSubmit }) => {
    const { register, handleSubmit, formState: { errors },reset, setValue } = useForm<FormData>({
        resolver:yupResolver(schema),
    });

     const countries = useMemo(() => countryList().getData(), []);

    const [isSubmitting, setIsSubmitting] = useState(false);


   
    const handleFormSubmit = async (formData: FormData) => {
        setIsSubmitting(true);
        try {
           const {
              name,
                email,
                relationship,
                areYouApplyingFromPassportCountry,
                 citizenshipCountry,
                deniedVisaToUs,
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
                  data: {
                     areYouApplyingFromPassportCountry,
                     citizenshipCountry,
                     deniedVisaToUs,
                     destinationCountry,
                       haveSpouseOrProperty,
                    passportCountry,
                       travelledInternationallyAndReturnedHome,
                      whereWillYouApplyForYourVisa,
                   }
                }
           const response = await addFamilyMember(data);
            if (response){
            reset()
            onClose()
            
            }
           console.log("data::", response)

        } catch(err){
            console.log("family member submission error:", err)
        } finally {
            setIsSubmitting(false);
        }
    };

    const customStyles = {
        control: (provided: any, state:any) => ({
            ...provided,
            border: state.isFocused ? '1px solid #9230f0' : '1px solid #ccc',
            boxShadow: state.isFocused ? '0 0 0 1px #9230f0' : 'none',
            '&:hover': {
                borderColor: '#9230f0'
            },
        }),
        option: (provided:any, state:any) => ({
            ...provided,
            color: state.isSelected ? "white" : "black",
            backgroundColor: state.isSelected ? "#9230f0" : "white",
            '&:hover': {
               backgroundColor: state.isSelected ? '#9230f0' : "#f3f3f3",
            },
        }),
    };


    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 text-gray-600 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg max-w-lg w-full relative">
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
                <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit(handleFormSubmit)}>
                    {/* Name Input */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            className={`w-full px-3 py-2 border rounded ${errors.name ? "border-red-500" : "border-gray-300" } focus:outline-none focus:border-Indigo`}
                            {...register("name")}
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>

                    {/* Email Input */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            className={`w-full px-3 py-2 border rounded ${errors.email ? "border-red-500" : "border-gray-300" } focus:outline-none focus:border-Indigo`}
                            {...register("email")}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>

                     {/* Relationship  */}
                     <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Relationship
                        </label>
                        <select
                                className={`w-full px-3 py-2 border rounded ${errors.relationship ? "border-red-500" : "border-gray-300" } focus:outline-none focus:border-Indigo`}
                                 {...register("relationship")}
                            >
                                <option value="">Select Relationship</option>
                                <option value="father">Father</option>
                                 <option value="mother">Mother</option>
                                <option value="brother">Brother</option>
                                 <option value="sister">Sister</option>
                            </select>
                            {errors.relationship && <p className="text-red-500 text-xs mt-1">{errors.relationship.message}</p>}
                      </div>

                    {/* Applying From Passport Country Select */}
                    <div className="mb-4">
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
                    </div>


                    {/* Citizenship Country Select */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Citizenship Country
                        </label>
                        <Select
                            styles={customStyles}
                            placeholder='Select Citizenship Country'
                            options={countries}
                            onChange={(option:any) => setValue('citizenshipCountry',option) }
                             getOptionLabel={(option:any) => option.label}
                            getOptionValue={(option:any) => option.value}
                        />
                        {errors.citizenshipCountry && <p className="text-red-500 text-xs mt-1">{errors.citizenshipCountry.message}</p>}

                    </div>
                    {/* Previously Denied Visa to US */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Previously Denied Visa to US
                        </label>
                        <div className="flex gap-4">
                            <label className="inline-flex items-center">
                                <input type="radio"
                                       className={`form-radio h-5 w-5 text-Indigo ${errors.deniedVisaToUs ? "border-red-500" : "border-gray-300" } focus:outline-none focus:border-Indigo`}
                                       {...register("deniedVisaToUs")}
                                       value={true}
                                />
                                <span className="ml-2 text-gray-700">Yes</span>
                            </label>
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    className={`form-radio h-5 w-5 text-Indigo ${errors.deniedVisaToUs ? "border-red-500" : "border-gray-300" } focus:outline-none focus:border-Indigo`}
                                    {...register("deniedVisaToUs")}
                                    value={false}
                                />
                                <span className="ml-2 text-gray-700">No</span>
                            </label>
                        </div>
                        {errors.deniedVisaToUs && <p className="text-red-500 text-xs mt-1">{errors.deniedVisaToUs.message}</p>}
                    </div>

                    {/* Destination Country Select */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Destination Country
                        </label>
                       <Select
                            styles={customStyles}
                           placeholder='Select Destination Country'
                           options={countries}
                           onChange={(option:any) => setValue('destinationCountry',option) }
                           getOptionLabel={(option:any) => option.label}
                            getOptionValue={(option:any) => option.value}
                        />
                        {errors.destinationCountry && <p className="text-red-500 text-xs mt-1">{errors.destinationCountry.message}</p>}
                    </div>

                    {/* Have Spouse Or Property */}
                    <div className="mb-4">
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
                    </div>
                    {/* Passport Country Select */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Passport Country
                        </label>
                         <Select
                            styles={customStyles}
                            placeholder='Select Passport Country'
                            options={countries}
                            onChange={(option:any) => setValue('passportCountry',option) }
                            getOptionLabel={(option:any) => option.label}
                            getOptionValue={(option:any) => option.value}
                        />
                        {errors.passportCountry && <p className="text-red-500 text-xs mt-1">{errors.passportCountry.message}</p>}
                    </div>
                    {/* Travelled Internationally And Returned Home */}
                    <div className="mb-4">
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
                    </div>
                    {/* Where Will You Apply For Your Visa */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                           Where Will You Apply For Your Visa
                        </label>
                         <Select
                            styles={customStyles}
                            placeholder='Select Where Will You Apply For Your Visa'
                             options={countries}
                             onChange={(option:any) => setValue('whereWillYouApplyForYourVisa',option) }
                            getOptionLabel={(option:any) => option.label}
                            getOptionValue={(option:any) => option.value}
                        />
                        {errors.whereWillYouApplyForYourVisa && <p className="text-red-500 text-xs mt-1">{errors.whereWillYouApplyForYourVisa.message}</p>}
                    </div>
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
                            className={`px-4 py-2 text-white bg-Indigo rounded hover:bg-blue-700 focus:outline-none ${isSubmitting ? "opacity-75 cursor-not-allowed" : "" }`}
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