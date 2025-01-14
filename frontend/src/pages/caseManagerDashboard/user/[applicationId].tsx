import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import AfterLoginLayout from "@/components/afterLoginLayout/AfterLoginLayout";
import { getAllDetailsOfUser } from "@/api/caseManager";
import UserDetails from "@/components/UserDetails";
import ApplicationDetails from "@/pages/adminDashboard/usersList/application-details";


const User = () => {
  

  return (
    <div className="text-gray-700 mx-auto w-full ">
           <ApplicationDetails/>
       </div>
  );
};

export default AfterLoginLayout(User);
