// components/AfterLoginLayout.tsx
import React, { useEffect, useState, ComponentType } from "react";
import { me } from "@/api/auth";
import Header2 from "../Header";
import Sidebar from "./Sidebar";

// Accept a ComponentType as input
const AfterLoginLayout = <P extends {}>(WrappedComponent: ComponentType<P>) => {
  // Return a new functional component that can accept props
  return (props: P) => {
    const [isOpen, setIsOpen] = useState(false);
    const [role, setRole] = useState<string | undefined>();

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const meData = async () => {
      try {
        if(localStorage.getItem("token")){
            const medata = await me();
          setRole(medata?.data?.user?.role);
        }
      } catch (error) {
           console.error("Error while fetching user data", error)
      }
    };

    useEffect(() => {
      meData();
    }, []);

    return (
      <>
          <div className="flex w-full min-h-screen">
              <div className="flex w-full ">
                    <Sidebar />
                    <main
                         className={`flex-1  transition-all duration-300 bg-FloralWhite ml-0 `}
                     >
                    <WrappedComponent {...props} />
                  </main>
                </div>
          </div>
      </>
    );
  };
};

export default AfterLoginLayout;