// PersonalInfo.js
import React from "react";
import { useForm } from "react-hook-form"; // Import the reusable Input component
import ReactFlagsSelect from "react-flags-select";
import Input from "@/utils/InputComponent";

const PersonalInfo = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  }: any = useForm();

  const selectedCountry = watch("citizenship");

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-6 mb-6 md:grid-cols-2">
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
        <Input
          label="First Language"
          id="first_language"
          placeholder="English"
          register={register}
          validation={{
            required: "First Language is required",
          }}
          errors={errors.first_language}
        />
        <div className="mb-4">
          <label
            htmlFor="citizenship"
            className="block mb-2 text-base font-medium text-gray-700"
          >
            Country of Citizenship
          </label>
          <ReactFlagsSelect
            selected={selectedCountry || null}
            onSelect={(code) => setValue("citizenship", code)}
            className="bg-white text-black"
            countries={["US", "IN", "CA"]} // You can replace this with a more comprehensive list or dynamic data
            searchable
          />
          {errors.citizenship && (
            <p className="text-red-500 text-xs font-bold mt-1">
              {errors.citizenship.message}
            </p>
          )}
        </div>
        <Input
          label="Passport Number"
          id="passport_number"
          placeholder="Passport Number"
          type="number"
          register={register}
          validation={{
            required: "Passport Number is required",
          }}
          errors={errors.passport_number}
        />
        <Input
          label="Passport Expiry Date"
          id="passport_expiry"
          type="date"
          required
          register={register}
        />
      </div>

      <div className="mb-6">
        <label className="block mb-2 text-base font-medium text-gray-700">
          Marital Status
        </label>
        <div className="flex items-center mb-4">
          <input
            type="radio"
            id="single"
            value="Single"
            {...register("marital_status")}
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
            {...register("marital_status")}
            className="w-4 h-4"
          />
          <label
            htmlFor="married"
            className="ms-2 text-sm font-medium text-gray-500  "
          >
            Married
          </label>
        </div>
      </div>

      <div className="mb-6">
        <label className="block mb-2 text-base font-medium text-gray-700">
          Gender
        </label>
        <div className="flex items-center mb-4">
          <input
            type="radio"
            id="male"
            value="Male"
            {...register("gender")}
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
            {...register("gender")}
            className="w-4 h-4"
          />
          <label
            htmlFor="female"
            className="ms-2 text-sm font-medium text-gray-500"
          >
            Female
          </label>
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
  );
};

export default PersonalInfo;
