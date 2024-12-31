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

const sidebarData = [
  {
    role: "USER",
    menu: [
      {
        name: "Dashboard",
        icon: <MdDashboardCustomize size={28} />,
        href: "/dashboard",
      },
      {
        name: "Profile",
        icon: <RiMapPinUserFill size={28} />,
        href: "/dashboard/profile",
      },
      {
        name: "Application",
        icon: <VscServerProcess size={28} />,
        href: "/dashboard/documentupload",
      },
      {
        name: "Payment",
        icon: <RiSecurePaymentFill size={28} />,
        href: "/dashboard/payment",
      },
    ],
  },
  {
    role: "CASE_MANAGER",
    menu: [
      {
        name: "Dashboard",
        icon: <MdDashboardCustomize size={28} />,
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
        icon: <MdDashboardCustomize size={28} />,
        href: "/adminDashboard",
      },
      {
        name: "Case Manager",
        icon: <FaUserShield size={28} />,
        href: "/caseManagerPage",
      },
      { name: "User", icon: <ImUser size={28} />, href: "/usersList" },
      {
        name: "Assign Case Manager",
        icon: <ImUser size={28} />,
        href: "/assignCaseManager",
      },
    ],
  },
];

const Sidebar = () => {
  const [role, setRole] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [token, setToken] = useState("");
  const { data: session } = useSession();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

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
    try {
      // Remove token from local storage
      localStorage.removeItem("token");
      setToken("");
  
      // Sign out and clear session if it exists
      if (session) {
        await signOut({ redirect: false }); // Ensure session is cleared without automatic redirect
      }
  
      // Redirect to login page
      await router.push("/loginpage");
    } catch (error) {
      console.error("Error during signout:", error);
      // Optionally handle signout errors (e.g., show a notification)
    }
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
    // Check if the code is running in the browser
    if (typeof window !== "undefined") {
      const updateScreenSize = () => {
        setIsSmallScreen(window.innerWidth < 640);
      };

      // Set initial value
      updateScreenSize();

      // Add resize listener
      window.addEventListener("resize", updateScreenSize);

      // Cleanup the event listener on unmount
      return () => window.removeEventListener("resize", updateScreenSize);
    }
  }, []);
  return (
    <main className="flex">
      <div className="bg-Indigo sm:w-60 min-h-screen w-14 flex flex-col transition-all">
        {/* Logo Section */}
        <div className="text-center text-white p-6">
          <Link href="/">
            {isSmallScreen ? (
              // small screen logo
              <Image
                src="/logo/onlyM.png"
                width={230}
                height={60}
                alt="Small Logo"
              />
            ) : (
              // large screen logo
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
                className="hover:bg-gray-800 text-white cursor-pointer px-4 h-12 flex items-center justify-center sm:justify-start"
              >
                {item.icon}
                <Link href={item.href} passHref>
                  <span className="ml-3 hidden sm:block text-gray-400 font-normal uppercase tracking-widest hover:text-white transition-colors">
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
        <div className="p-3">
          {session || token ? (
            <button
              className="bg-FloralWhite text-Indigo border-2 border-FloralWhite p-2 rounded-md w-full flex items-center justify-center hover:bg-transparent hover:text-FloralWhite"
              onClick={handleSignout}
            >
              <RiUserReceivedFill size={20} />
              <span onClick={()=>handleSignout} className="ml-3 hidden sm:block uppercase leading-snug tracking-widest">
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
