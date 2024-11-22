import React, { useEffect, useState } from "react";
import { me } from "@/api/auth";
import Header2 from "../Header";
import Sidebar from "./Sidebar";

const AfterLoginLayout = (WrappedComponent: any) => {
  return function (props: any) {
    const [isOpen, setIsOpen] = useState(false);
    const [role, setRole] = useState();

    console.log("isHeaderOpen", isOpen);
    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };

    const meData = async () => {
      const medata = await me();
      console.log("medata", medata);
      console.log("role is ", medata?.data?.user?.role);
      setRole(medata?.data?.user?.role);
    };

    useEffect(() => {
      if (localStorage.getItem("token")) meData();
    }, []);
    return (
      <>
        <Header2 />

        <div className="flex w-full min-h-[calc(100vh-72px)] w-[100vw]">
          <div className="flex w-full ">
            <Sidebar />

            <main
              className={`flex-1 p-8  transition-all duration-300 bg-FloralWhite ml-0 md:ml-64`}
            >
              {/* <Stepper /> */}
              <WrappedComponent {...props} extraProp="I'm an extra prop!" />
            </main>

            {/* Main content placeholder */}
          </div>
        </div>
      </>
    );
  };
};

export default AfterLoginLayout;
