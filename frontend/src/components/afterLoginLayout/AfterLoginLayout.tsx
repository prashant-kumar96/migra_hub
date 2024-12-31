// components/AfterLoginLayout.tsx
import React, { useEffect, useState, ComponentType } from "react";
import { me } from "@/api/auth";
import Header2 from "../Header";
import Sidebar from "./Sidebar";
import { useRouter } from "next/router";
import Stepper from "../Stepper";
import Dashboard from "@/pages/dashboard";


// Accept a ComponentType as input
const AfterLoginLayout = <P extends {}>(WrappedComponent: ComponentType<P>) => {
  return (props: P) => {
    const [isOpen, setIsOpen] = useState(false);
    const [role, setRole] = useState<string | undefined>();
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const router = useRouter();

    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };

    const meData = async (setRole: any) => {
      try {
        if (localStorage.getItem("token")) {
          const medata = await me();
          if (!medata || !medata.status) {
            console.warn("User not authorized, or user data not found.");
            setIsAuthenticated(false);
            return;
          }
          setRole(medata?.user?.role);
          setIsAuthenticated(true)
        } else {
          console.warn("User token not found.");
          setIsAuthenticated(false)
        }
      } catch (error) {
        console.error("Error while fetching user data", error);
        setIsAuthenticated(false)
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      meData(setRole);
    }, []);

    if (loading) {
      return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white z-50">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      );
    }

    if (isAuthenticated === false) {
      router.push("/login");
      return null;
    }

    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 ml-14 sm:ml-60"> {/* Add margin-left to match sidebar width */}
          <main className="w-full min-h-screen p-4"> {/* Add padding for content spacing */}
            <WrappedComponent {...props} />
          </main>
        </div>
      </div>
    );
  };
};

export default AfterLoginLayout;