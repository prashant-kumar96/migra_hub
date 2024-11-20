import { me } from "@/api/auth";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Checkrole = () => {
  const router = useRouter();
  const getMeData = async () => {
    const result = await me();
    console.log("result me data @@ ", result);
    if (result?.data?.user?.role === "SA") {
      router.push("/adminDashboard");
    } else if (result?.data?.user?.role === "USER") {
      router.push("/dashboard");
    } else if (result?.data?.user?.role === "CASE_MANAGER") {
      router.push("/caseManagerDashboard");
    }
  };

  useEffect(() => {
    getMeData();
  }, []);
  return <div></div>;
};

export default Checkrole;
