import React, { useEffect } from "react";
import Header from "./Header";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

const BeforeLoginLayout = (WrappedComponent: any) => {
  return function (props: any) {
    const router = useRouter();
    const { data: session } = useSession();
    useEffect(() => {
      if (localStorage.getItem("token") || session) {
        router.push("/dashboard");
      }
    }, []);

    return (
      <>
        <Header />
        <WrappedComponent {...props} extraProp="I'm an extra prop!" />
      </>
    );
  };
};

export default BeforeLoginLayout;
