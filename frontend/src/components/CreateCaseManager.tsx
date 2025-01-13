import { createCaseManager } from "@/api/auth";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaUserTie } from "react-icons/fa";
import Button from "./ui/buttons/CreateButton";
import { toast } from "react-toastify";

const CreateCaseManager = ({ isModalOpen, setIsModalOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
        console.log("Form Submitted", data);
        const newData = {
            ...data,
            role: "CASE_MANAGER",
        };

        const result = await createCaseManager(newData);
        console.log("Case Manager created successfully:", result);
        
        // Close modal and show success message
        setIsModalOpen(false);
        toast.success("Case Manager created successfully");

    } catch (error) {
        // Handle specific error types
        if (error.response) {
            // Server responded with an error
            const errorMessage = error.response.data?.message || "Failed to create Case Manager";
            toast.error(errorMessage);
        } else if (error.request) {
            // Request made but no response received
            toast.error("Network error. Please check your connection.");
        } else {
            // Something else went wrong
            toast.error("An unexpected error occurred");
        }
        
        console.error("Error creating Case Manager:", error);
    }
};

  return (
    <div className="p-4">
      {/* Button to open the modal */}
      <Button
        Icon={FaUserTie}
        text="Create Case Manager"
        onClick={() => setIsModalOpen(true)}
      />

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-10 text-gray-700">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4 text-gray-700 ">
              Create Case Manager
            </h2>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Name */}
              <div className="mb-4">
                <label className="block mb-1 font-medium">Name</label>
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  className="w-full border border-gray-300 rounded p-2"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="block mb-1 font-medium">Email</label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email format",
                    },
                  })}
                  className="w-full border border-gray-300 rounded p-2"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Phone */}

              {/* Password */}
              <div className="mb-4">
                <label className="block mb-1 font-medium">Password</label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                  })}
                  className="w-full border border-gray-300 rounded p-2"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateCaseManager;
