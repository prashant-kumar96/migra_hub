import AfterLoginLayout from "@/components/afterLoginLayout/AfterLoginLayout";
import React, { useState } from "react";
import PersonalInfo from "@/components/PersonalInfo";

const ProfilePage = () => {
  return (
    <div className="w-5/6">
      <div className="px-24 py-20">
        <h1 className="text-4xl mb-2 text-gray-700">Personal Information</h1>
        <PersonalInfo />
      </div>
    </div>
  );
};

export default AfterLoginLayout(ProfilePage);
