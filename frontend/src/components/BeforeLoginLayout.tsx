import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Header2 from "./Header";
import { me } from "@/api/auth";
import { useAuth } from "@/context/auth-context";
import MainLoader from "./loaders/mainLoader";


const BeforeLoginLayout = (WrappedComponent: any) => {
  return function (props: any) {
    const router = useRouter();
    const { data: session } = useSession();
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      const handleAuth = async () => {
        const token = localStorage.getItem("token");

        if (token || session) {
          setIsLoading(true);
          try {
            const result = await me();
            const userRole = result?.data?.user?.role;
            console.log("role", userRole);

            if (userRole === "SA") {
              // Admin role: redirect to /dashboard first, then to /adminDashboard
              await router.push("/dashboard"); // Wait for the first redirection
              await router.replace("/adminDashboard"); // Replace the URL with /adminDashboard
            } else if (userRole === "USER") {
              // Regular user role
              await router.push("/dashboard");
            } else if (userRole === "CASE_MANAGER") {
              // Case manager role
              await router.push("/caseManagerDashboard");
            } else {
              console.error("Unknown user role:", userRole);
              // Optionally redirect to a fallback route
              await router.push("/login");
            }
          } catch (error) {
            console.error("Error fetching user role:", error);
            // Redirect to login or show an error message
            await router.push("/login");
          } finally {
            setIsLoading(false);
          }
        }
      };

      handleAuth();
    }, [session, user]); // Dependencies to trigger when `session` or `user` changes

    if (isLoading) {
      return (
        // <div className="flex items-center justify-center min-h-screen">
        //   <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        // </div>
        <MainLoader/>
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
