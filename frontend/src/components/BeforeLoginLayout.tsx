import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Header2 from "./Header";
import { me } from "@/api/auth";

const BeforeLoginLayout = (WrappedComponent: any) => {
  return function (props: any) {
    const router = useRouter();
    const { data: session } = useSession();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      const handleAuth = async () => {
        if (localStorage.getItem("token") || session) {
          setIsLoading(true);
          try {
            const result = await me();
            const userRole = result?.data?.user?.role;
            
            switch (userRole) {
              case "SA":
                await router.push("/adminDashboard");
                break;
              case "USER":
                await router.push("/dashboard");
                break;
              case "CASE_MANAGER":
                await router.push("/caseManagerDashboard");
                break;
              default:
                console.error("Unknown user role:", userRole);
            }
          } catch (error) {
            console.error("Error fetching user role:", error);
            // Handle error - maybe redirect to login or show error message
          } finally {
            setIsLoading(false);
          }
        }
      };

      handleAuth();
    }, [session]);

    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    return (
      <>
        <Header2 />
        <WrappedComponent {...props} extraProp="I'm an extra prop!" />
      </>
    );
  };
};

export default BeforeLoginLayout;