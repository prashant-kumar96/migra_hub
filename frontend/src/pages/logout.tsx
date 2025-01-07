import { useEffect } from "react";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { useAuth } from "@/context/auth-context";
import Loader from "@/components/loaders/loader";
 

const Logout = () => {
  const router = useRouter();
  const { logout } = useAuth();
  const { data: session } = useSession();
    
  useEffect(() => {
        const handleSignout = async () => {
            try {
              // Use the context's logout function which handles everything
               logout();
            
              // Handle next-auth session if it exists
              if (session) {
                await signOut();
                }
                router.push("/login");
            } catch (error) {
                console.log("Error during signout:", error);
            }
        };

        handleSignout();
  }, [logout, session, router]); // Add dependencies in order to properly run the useEffect


  return <Loader text="Logging Out..." />;
};

export default Logout;