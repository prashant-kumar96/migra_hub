// components/AfterLoginLayout.tsx
import React, { useEffect, useState, ComponentType } from "react";
import { me } from "@/api/auth";
import Header2 from "../Header";
import Sidebar from "./Sidebar";
import { useRouter } from "next/router";
import Stepper from "../Stepper";
import Dashboard from "@/pages/dashboard";

 

interface WithAuthProps {
    user?: any;
    isLoading: boolean;
}

const AfterLoginLayout = <P extends WithAuthProps>(WrappedComponent: ComponentType<P>) => {
    return (props: P) => {
        const [isOpen, setIsOpen] = useState(false);
        const [role, setRole] = useState<string | undefined>();
        const [loading, setLoading] = useState(true);
        const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
        const [user, setUser] = useState<any>(null);
        const router = useRouter();

       const toggleSidebar = () => {
            setIsOpen(!isOpen);
        };

        const meData = async () => {
           try {
                if (localStorage.getItem("token")) {
                    const medata = await me();
                    if (!medata || !medata.status) {
                        console.warn("User not authorized, or user data not found.");
                       localStorage.removeItem("token")
                        setIsAuthenticated(false);
                        setUser(null)
                        return;
                   }
                   setRole(medata?.user?.role);
                   setUser(medata?.user)
                    setIsAuthenticated(true)
                } else {
                    console.warn("User token not found.");
                    localStorage.removeItem("token")
                    setIsAuthenticated(false)
                   setUser(null)
                }
            } catch (error) {
                console.error("Error while fetching user data", error);
               localStorage.removeItem("token")
                setIsAuthenticated(false)
                setUser(null)
            } finally {
                setLoading(false);
            }
        };

         useEffect(() => {
            meData();
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
                <div className="flex-1 ml-14 sm:ml-60">
                    <main className="w-full min-h-screen p-4">
                      <WrappedComponent {...props} user={user} isLoading={loading}/>
                    </main>
                </div>
            </div>
        );
    };
};

export default AfterLoginLayout;