import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import AfterLoginLayout from "@/components/afterLoginLayout/AfterLoginLayout";
import { getAllDetailsOfUser } from "@/api/caseManager";
import UserDetails from "@/components/UserDetails";
import ApplicationDetails from "@/pages/adminDashboard/usersList/application-details";


const User = () => {
  const router = useRouter();
  const [data1, setData1] = useState();
  const getAllDetailsOfUserfunction = async (userId) => {
    const userDetails = await getAllDetailsOfUser(userId);
    console.log("userDetails", userDetails?.data?.data);
    setData1(userDetails?.data?.data);
  };

  console.log(';; query id',router)

  // useEffect(() => {
  //   if (router.query.id) getAllDetailsOfUserfunction(router.query.id);
  // }, [router.query.id]);

  return (
    <div className="text-gray-700">
      <div className="p-4">
        {/* <h1>User Details</h1>
        <p>User ID: {router.query.id}</p> */}
      </div>
     
      <ApplicationDetails/>
       {/* <UserDetails data={data1}  */}
      
    
    </div>
  );
};

export default AfterLoginLayout(User);
