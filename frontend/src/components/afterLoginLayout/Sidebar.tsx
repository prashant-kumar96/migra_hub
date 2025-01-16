import { me } from "@/api/auth";
import React, { useEffect, useState } from "react";
import { MdDashboardCustomize } from "react-icons/md";
import { FaUserShield } from "react-icons/fa6";
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
      },
      {
        name: "My Application",
        icon: <VscServerProcess size={22} />,
        href: "/dashboard/documentupload",
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
      // {
      //   name: "Assigned Users",
      //   icon: <ImUsers size={28} />,
      //   href: "/assignedUsers",
      // },
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
      { name: "User", icon: <ImUser size={22} />, href: "/adminDashboard/usersList" },
      // {
      //   name: "Assign Case Manager",
      //   icon: <ImUser size={22} />,
      //   href: "/adminDashboard/assignCaseManager",
      // },
    ],
  },
];

const Sidebar = () => {
  const [role, setRole] = useState(null);
  const { logout } = useAuth();
  const [menuItems, setMenuItems] = useState([]);
  const [token, setToken] = useState("");
  const { data: session } = useSession();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [activeLink, setActiveLink] = useState(""); // State to track active link

  const router = useRouter();

  const meData = async () => {
    try {
      const medata = await me();
      const userRole = medata?.data?.user?.role?.toUpperCase().trim();
      setRole(userRole);

      const roleMenu = sidebarData?.find((item) => item.role === userRole);
      setMenuItems(roleMenu?.menu || []);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };


  const handleSignout = async () => {
        router.push('/logout')
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      meData();
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const updateScreenSize = () => {
        setIsSmallScreen(window.innerWidth < 640);
      };

      updateScreenSize();
      window.addEventListener("resize", updateScreenSize);
      return () => window.removeEventListener("resize", updateScreenSize);
    }
  }, []);

     useEffect(() => {
    // When the router changes, update the active link
    setActiveLink(router.pathname);
  }, [router.pathname]);

  return (
    <main className="flex">
      {isLoggingOut && <Loader text="logging out" />}
      <div className="bg-gradient-to-r from-[#333366] to-[#2C415A] sm:w-[230px] h-screen w-14 flex   flex-col fixed left-0 top-0 ">
        {/* Logo Section */}
        <div className="text-center  text-FloralWhite  p-6">
          <Link href="/">
            {isSmallScreen ? (
              <Image
                src="/logo/onlyM.png"
                width={500}
                height={500}
                alt="Small Logo"
              />
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
            menuItems.map((item, index) => (
              <li
                key={index}
                className={`cursor-pointer  px-4 h-12 flex items-center justify-center sm:justify-start
                ${
                    activeLink === item.href
                    ? "bg-white text-Indigo"
                    : "hover:bg-gray-800 text-FloralWhite"
                  }
                 `}
              >
                {item.icon}
                <Link href={item.href} passHref>
                   <span className={` hidden sm:block  font-normal uppercase tracking-widest transition-colors
                                    ${
                                        activeLink === item.href
                                          ? "text-Indigo"
                                          : "text-gray-400 hover:text-FloralWhite"
                                      }`}
                   >
                    {item.name}
                  </span>
                </Link>
              </li>
            ))
          ) : (
            <li className="text-gray-400 text-center mt-6">
              No menu available
            </li>
          )}
        </ul>

        {/* Sign Out Button */}
        <div className="p-3 sticky bottom-0 bg-Indigo">
          {session || token ? (
            <button
              className="bg-FloralWhite text-Indigo border-2 border-FloralWhite p-2 rounded-md w-full flex items-center justify-center hover:bg-transparent hover:text-FloralWhite"
              onClick={handleSignout}
            >
              <RiUserReceivedFill size={20} />
              <span className="ml-3 hidden sm:block uppercase leading-snug tracking-widest">
                Sign Out
              </span>
            </button>
          ) : null}
        </div>
      </div>
    </main>
  );
};

export default Sidebar;