import React, { useEffect } from "react";
import Header from "./Header";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Header2 from "./Header";


const BeforeLoginLayout = (WrappedComponent: any) => {
  return function (props: any) {
    const router = useRouter();
    const { data: session } = useSession();
    useEffect(() => {
      if (localStorage.getItem("token") || session) {
        console.log();
        // router.push("/dashboard");
        router.push("/checkRole");
      }
    }, []);

    return (
      <>
        <Header2 />
        <WrappedComponent {...props} extraProp="I'm an extra prop!" />
      </>
    );
  };
};

export default BeforeLoginLayout;
