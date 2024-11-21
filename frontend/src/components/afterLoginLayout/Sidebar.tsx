import { me } from "@/api/auth";
import React, { useEffect, useState } from "react";
import { MdDashboardCustomize } from "react-icons/md";
import { FaUserShield } from "react-icons/fa6";
import { ImUser, ImUsers  } from "react-icons/im";
import { RiSecurePaymentFill, RiMapPinUserFill } from "react-icons/ri";
import { VscServerProcess } from "react-icons/vsc";
import Link from "next/link"; 

const sidebarData = [
  {
    role: "USER",
    menu: [
      { name: "Dashboard", icon: <MdDashboardCustomize size = {28}/>, href: "/dashboard" }, 
      { name: "Profile", icon: <RiMapPinUserFill size = {28}/>, href: "/profilepage" },
      { name: "Application", icon: <VscServerProcess  size = {28}/>, href: "/documentupload" }, 
      { name: "Payment", icon: <RiSecurePaymentFill size = {28}/>, href: "/payment" }, 
    ],
  },
  {
    role: "CASE_MANAGER",
    menu: [
      { name: "Dashboard", icon: <MdDashboardCustomize  size = {28} />, href: "/caseManagerDashboard" }, 
      { name: "Assigned Users", icon: <ImUsers size={28} />, href: "/assignedUsers" }, 
    ],
  },
  {
    role: "SA",
    menu: [
      { name: "Dashboard", icon: <MdDashboardCustomize size={28} />, href: "/adminDashboard" },
      { name: "Case Manager", icon: <FaUserShield size={28} />, href: "/caseManagerPage" },
      { name: "User", icon: <ImUser size={28} />, href: "/usersList" },
    ],
  },
];

const Sidebar = () => {
  const [role, setRole] = useState(null);
  const [menuItems, setMenuItems] = useState([]);

  const meData = async () => {
    try {
      const medata = await me();
      const userRole = medata?.data?.user?.role?.toUpperCase().trim();
      console.log("Role is:", userRole);
      setRole(userRole);

      // Filter menu items based on role
      const roleMenu = sidebarData.find((item) => item.role === userRole);
      setMenuItems(roleMenu?.menu || []); 
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      meData();
    }
  }, []);

  return (
    <main className="flex">
      <div className="bg-gray-900 sm:w-60 min-h-screen w-14 transition-all">
        <div className="text-center text-white p-6">{/* logo */}</div>
        <ul className="">
          {menuItems.length > 0 ? (
            menuItems.map((item, index) => (
              <li
                key={index}
                className="hover:bg-gray-800 text-white cursor-pointer sm:justify-start px-4 h-12 flex items-center justify-center"
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
            <li className="text-gray-400 text-center mt-6">No menu available</li>
          )}
        </ul>
      </div>
    </main>
  );
};

export default Sidebar;
