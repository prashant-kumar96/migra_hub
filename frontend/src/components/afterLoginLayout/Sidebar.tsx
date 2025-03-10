import { checkifPaymentIsDone, me } from "@/api/auth";
import React, { useEffect, useState, useRef } from "react"; // Added useRef
import { MdDashboardCustomize } from "react-icons/md";
import { FaUserShield, FaBars } from "react-icons/fa6"; // Added FaBars
import { ImUser, ImUsers } from "react-icons/im";
import {
  RiSecurePaymentFill,
  RiMapPinUserFill,
  RiUserReceivedFill,
} from "react-icons/ri";
import { VscServerProcess } from "react-icons/vsc";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useAuth } from "@/context/auth-context";
import Loader from "../loaders/loader";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { getApplicationStatusDetails } from "@/api/applicationStatus";
import { meDataAtom } from "@/store/meDataAtom";
import { useAtom } from "jotai";
import { getApplicationCharges } from "@/api/pricing";
import { useAppContext } from "@/context/app-context";

  const sidebarData = [
    {
      role: "USER",
      menu: [
        {
          name: "Home",
          icon: <MdDashboardCustomize size={22} />,
          href: "/dashboard",
        },
        {
          name: "Profile",
          icon: <RiMapPinUserFill size={22} />,
          href: "/dashboard/profile",
        },
        {
          name: "Payment",
          icon: <RiSecurePaymentFill size={22} />,
          href: "/dashboard/payment",
          disabled: false, // Initial state, will be updated
        },
        {
          name: "My Application",
          icon: <VscServerProcess size={22} />,
          href: "/dashboard/documentupload",
          disabled: false, // Initial state, will be updated
        },
      ],
    },
    {
      role: "CASE_MANAGER",
      menu: [
        {
          name: "Dashboard",
          icon: <MdDashboardCustomize size={22} />,
          href: "/caseManagerDashboard",
        },
      ],
    },
    {
      role: "SA",
      menu: [
        {
          name: "Dashboard",
          icon: <MdDashboardCustomize size={22} />,
          href: "/adminDashboard",
        },
        {
          name: "Case Manager",
          icon: <FaUserShield size={22} />,
          href: "/adminDashboard/caseManagerPage",
        },
        {
          name: "Applications",
          icon: <ImUser size={22} />,
          href: "/adminDashboard/usersList",
        },
      ],
    },
  ];




  const Sidebar = () => {

    const [role, setRole] = useState<string | null>(null); // Explicitly type state
    const { logout } = useAuth();
    const [menuItems, setMenuItems] = useState<any[]>([]); // Explicitly type state
    const [token, setToken] = useState("");
    const { data: session } = useSession();
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [sharedMedata, setSharedMedata] = useAtom(meDataAtom);
  
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [activeLink, setActiveLink] = useState("");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const { user, isLoading, isAuthenticated } = useAuth();
    const [error, setError] = useState<string | null>(null);
    const [applicationCharges, setApplicationCharges] = useState<any>(null); // Better type handling
    const [loading, setLoading] = useState(false);
    const router = useRouter();
  
    // Use the context
    const {
      profileCompletionStatus,
      isPaymentDone,  // Not used in this component, but part of your context
      appLoading,     // Not used in this component, but part of your context
      appError,       // Not used in this component, but part of your context
      refreshAppStatus, // Not used in this component, but part of your context
    } = useAppContext();
  
  
  
    const getmedata = async () => {
      let userRole = null;
  
      try {
        const result = await me();
        userRole = result?.data?.user?.role;
        const userId = result?.data?.user?._id;
        setRole(userRole);
        setSharedMedata(result?.data?.user);
        console.log(";; userRole", userRole);
  
        // Only check for applicationId if the role is not SA or CASE_MANAGER
        if (userRole !== 'SA' && userRole !== 'CASE_MANAGER') {
          const applicationId = user?.user?.applicationId; // Move inside the conditional
          if (!applicationId) {
            console.warn("Application ID is missing for user role:", userRole);
            return; //  Exit if no application ID when required
          }
        }
        setLoading(true);
        setError(null);
         // Moved BEFORE getApplicationCharges
        const userMenu = sidebarData.find((item) => item.role === userRole)?.menu || [];
        console.log(';; sidebar data', userMenu);
  
        try {
          const charges = await getApplicationCharges(userId);
          setApplicationCharges(charges?.data?.applicationCharges || null);
        } catch (chargesError) {
          console.error("Error fetching application charges:", chargesError);
          // Handle the error specifically for getApplicationCharges,
          //  perhaps set a different error state, or retry, etc.
          setError("Failed to fetch application charges.");
        }
        
          console.log(';; sidebar data');  //This should log now
  
        const updatedMenuItems = userMenu.map((item: any) => {
          if (item.name === "Payment" || item.name === "My Application") {
            return {
              ...item,
              disabled: profileCompletionStatus !== "completed",
            };
          }
          return item;
        });
  
        setMenuItems(updatedMenuItems);
      } catch (error: any) {
        console.error("Error fetching data:", error);
        setError(error.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      if (isAuthenticated) {
        getmedata();
      }
    }, [isAuthenticated, profileCompletionStatus]); // Removed applicationId
  
    const handleSignout = async () => {
      router.push("/logout");
    };
  
    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
  
    // Close sidebar on outside click
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          sidebarRef.current &&
          !sidebarRef.current.contains(event.target as Node)
        ) {
          setIsSidebarOpen(false);
        }
      };
  
      if (isSidebarOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      }
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isSidebarOpen]);
  
    useEffect(() => {
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
      }
    }, []);
  
    useEffect(() => {
      if (typeof window !== "undefined") {
        const updateScreenSize = () => {
          setIsSmallScreen(window.innerWidth < 940);
          if (window.innerWidth >= 640) {
            setIsSidebarOpen(false); // Keep sidebar closed on larger screens
          }
        };
  
        updateScreenSize();
        window.addEventListener("resize", updateScreenSize);
        return () => window.removeEventListener("resize", updateScreenSize);
      }
    }, []);
  
    useEffect(() => {
      setActiveLink(router.pathname);
    }, [router.pathname]);
  
    const renderLink = (item: any) => {
      const linkContent = (
        <span
          className={`px-4 py-1 font-normal uppercase tracking-wide transition-colors ${
            activeLink === item.href
              ? "text-Indigo"
              : "text-gray-400 " // Add group-hover here
          }`}
        >
          {item.name}
        </span>
      );
  
      if (item.disabled) {
        return (
          <span
            className={`px-4 py-1 font-normal uppercase tracking-wide text-gray-400 cursor-not-allowed`}
          >
            {item.name}
          </span>
        );
      } else {
        return (
          <Link href={item.href} passHref>
            {linkContent}
          </Link>
        );
      }
    };
  
    return (
      <main className="flex min-h-screen">
        {isLoggingOut && <Loader className="text-Indigo" text="logging out" />}
  
        {/* Hamburger Menu Button (Mobile) */}
        {isSmallScreen && (
          <button
            onClick={toggleSidebar}
            className="fixed top-4 left-4 z-50 text-gray-700 hover:text-gray-900 focus:outline-none"
          >
            <FaBars size={24} />
          </button>
        )}
  
        {/* Sidebar */}
        <div
          ref={sidebarRef}
          className={`bg-gradient-to-r from-[#333366] to-[#2C415A] transition-transform duration-300 ease-in-out ${
            isSmallScreen
              ? `fixed top-0 left-0 h-full w-64 transform ${
                  isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                } z-40`
              : "w-[230px] h-full flex flex-col justify-between fixed left-0 top-0"
          }`} // Added flex, flex-col, justify-between
        >
          <div
            className={`flex ${
              isSmallScreen ? "flex-col p-4" : "flex-col p-2 mt-6"
            }`}
          >
            {/* Logo Section */}
            <div className="text-center text-FloralWhite">
              <Link href="/">
                {isSmallScreen ? (
                  <span className="text-3xl lg:text-5xl text-FloralWhite font-bold font-sans">
                    Migrahub
                  </span>
                ) : (
                  <Image
                    src="/logo/MigraHub.png"
                    width={230}
                    height={60}
                    alt="Large Logo"
                  />
                )}
              </Link>
            </div>
  
            {/* Sidebar Menu */}
            <ul className="flex-1">
              {menuItems.length > 0 ? (
                menuItems?.map((item: any, index: number) => (
                  <li
                    key={index}
                    className={`group text-sm cursor-pointer px-3 py-4 flex items-center rounded-md transition-colors duration-200
                        ${
                          activeLink === item.href && !item.disabled
                            ? "bg-FloralWhite text-Indigo"
                            : "hover:bg-gray-800"
                        }
                       ${item.disabled ? "opacity-50 cursor-not-allowed" : ""}
                       `}
                  >
                    {item.icon}
                    {renderLink(item)}
                  </li>
                ))
              ) : (
                <li className="text-gray-400 text-center mt-6">
                  No menu available
                </li>
              )}
            </ul>
          </div>
  
          {/* Sign Out Button */}
          <div className="p-3  shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-[#333366] to-[#2C415A]">
            {" "}
            {/* Removed bottom-0 and sticky */}
            {session || token ? (
              <button
                className="bg-FloralWhite text-Indigo border-2 border-FloralWhite p-2 rounded-md w-full flex items-center justify-center hover:bg-transparent hover:text-FloralWhite transition-all duration-200"
                onClick={handleSignout}
              >
                <RiLogoutCircleRLine size={20} />
                <span className="ml-3 uppercase leading-snug tracking-wide">
                  Sign Out
                </span>
              </button>
            ) : null}
          </div>
        </div>
  
        {/* Content Area (Adjusted for Sidebar) */}
        {!isSmallScreen && (
          <div className="sm:ml-[230px] w-[calc(100%-230px)]"></div>
        )}
        {/* Overlay for mobile sidebar */}
        {isSmallScreen && isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={toggleSidebar}
          ></div>
        )}
      </main>
    );
  };
  
  export default Sidebar;