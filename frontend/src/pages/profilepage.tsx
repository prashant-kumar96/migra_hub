import AfterLoginLayout from "@/components/afterLoginLayout/AfterLoginLayout";
import React, { useState } from "react";
import PersonalInfo from "@/components/PersonalInfo";

const ProfilePage = () => {
  return (
    <section className="py-10 my-auto dark:bg-gray-900 text-gray-800">
      <div className="lg:w-[80%] md:w-[90%] xs:w-[96%] mx-auto flex gap-4">
        <div className="lg:w-[88%] md:w-[80%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center dark:bg-gray-800/40">
          <PersonalInfo />
        </div>
      </div>
    </section>
  );
};

export default AfterLoginLayout(ProfilePage);
