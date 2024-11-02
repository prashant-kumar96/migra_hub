import React, { useEffect } from "react";
import Header from "./Header";
import LeftMenuBar from "./LeftMenuBar";
import { me } from "@/api/auth";
import { useRouter } from "next/router";

const AfterLoginLayout = (WrappedComponent: any) => {
  return function (props: any) {
    const meData = async () => {
      const medata = await me();
      console.log("medata", medata);
    };

    useEffect(() => {
      if (localStorage.getItem("token")) meData();
      // if (!localStorage.getItem("token")) {
      //   router.push("/");
      // }
    }, []);
    return (
      <>
        <Header />
        <div className="flex w-full">
          <LeftMenuBar />
          <WrappedComponent {...props} extraProp="I'm an extra prop!" />
        </div>
      </>
    );
  };
};

export default AfterLoginLayout;
