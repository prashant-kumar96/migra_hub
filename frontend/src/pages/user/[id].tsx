import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import AfterLoginLayout from "@/components/AfterLoginLayout";
import { getAllDetailsOfUser } from "@/api/caseManager";
import UserDetails from "@/components/UserDetails";

const User = () => {
  const router = useRouter();
  const { id } = router.query;
  const [data1, setData1] = useState();
  const getAllDetailsOfUserfunction = async (userId) => {
    const userDetails = await getAllDetailsOfUser(userId);
    console.log("userDetails", userDetails?.data?.data);
    setData1(userDetails?.data?.data);
  };

  useEffect(() => {
    getAllDetailsOfUserfunction(id);
  }, [id]);

  return (
    <div>
      <h1>User Details</h1>
      <p>User ID: {id}</p>
      {data1 && <UserDetails data={data1} />}
    </div>
  );
};

export default AfterLoginLayout(User);
