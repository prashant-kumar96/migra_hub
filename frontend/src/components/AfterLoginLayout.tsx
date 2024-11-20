import React, { useEffect, useState } from "react";
import LeftMenuBar from "./LeftMenuBar";
import { me } from "@/api/auth";
import { useRouter } from "next/router";
import Header2 from "./Header";
import Sidebar from "./LeftSideBar";
import Link from "next/link";
import Stepper from "./Stepper";

const AfterLoginLayout = (WrappedComponent: any) => {
  return function (props: any) {
    const [isOpen, setIsOpen] = useState(false);
    const [role, setRole] = useState();

    console.log("isHeaderOpen", isOpen);
    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };

    const meData = async () => {
      const medata = await me();
      console.log("medata", medata);
      console.log("role is ", medata?.data?.user?.role);
      setRole(medata?.data?.user?.role);
    };

    useEffect(() => {
      if (localStorage.getItem("token")) meData();
      // if (!localStorage.getItem("token")) {
      //   router.push("/");
      // }
    }, []);
    return (
      <>
        <Header2 />
        <div className="flex w-full min-h-[calc(100vh-72px)] w-[100vw]">
          <div className="flex w-full bg-white">
            {/* Sidebar for larger screens */}
            <aside
              className={`fixed inset-y-0 top-[73px] left-0 w-64 p-4 transition-transform duration-300 transform bg-white dark:bg-gray-800 shadow-lg ${
                isOpen ? "translate-x-0" : "-translate-x-full"
              } md:translate-x-0`}
            >
              {role === "USER" && (
                <nav className="space-y-4">
                  <Link
                    href="/dashboard"
                    className="block text-gray-900 dark:text-gray-300 hover:text-blue-500 "
                  >
                    Home
                  </Link>
                  <Link
                    href="/profilepage"
                    className="block text-gray-900 dark:text-gray-300 hover:text-blue-500 "
                  >
                    Profile
                  </Link>
                  <Link
                    href="/documentupload"
                    className="block text-gray-900 dark:text-gray-300 hover:text-blue-500 "
                  >
                    My application
                  </Link>
                  <Link
                    href="/payment"
                    className="block text-gray-900 dark:text-gray-300 hover:text-blue-500 "
                  >
                    Payment
                  </Link>
                </nav>
              )}

              {role === "CASE_MANAGER" && (
                <nav className="space-y-4">
                  <Link
                    href="/caseManagerDashboard"
                    className="block text-gray-900 dark:text-gray-300 hover:text-blue-500 "
                  >
                    View Assigned Users
                  </Link>
                </nav>
              )}

              {role === "SA" && (
                <nav className="space-y-4">
                  <Link
                    href="/adminDashboard"
                    className="block text-gray-900 dark:text-gray-300 hover:text-blue-500 "
                  >
                    Home
                  </Link>

                  <Link
                    href="/caseManagerPage"
                    className="block text-gray-900 dark:text-gray-300 hover:text-blue-500 "
                  >
                    Case Manager
                  </Link>

                  <Link
                    href="/usersList"
                    className="block text-gray-900 dark:text-gray-300 hover:text-blue-500 "
                  >
                    User List
                  </Link>

                  <Link
                    href="/assignCaseManager"
                    className="block text-gray-900 dark:text-gray-300 hover:text-blue-500 "
                  >
                    Assign Case Manager
                  </Link>
                </nav>
              )}
            </aside>

            {/* Solid Overlay for mobile view */}
            {isOpen && (
              <div
                className="fixed inset-0  bg-opacity-50 z-10 md:hidden"
                onClick={toggleSidebar}
              ></div>
            )}

            {/* Toggle button for mobile view */}
            <div className="md:hidden z-20 absolute top-0">
              <button
                onClick={toggleSidebar}
                className="p-2 m-4 text-gray-900 focus:outline-none"
              >
                {isOpen ? (
                  // Left arrow icon
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 19l-7-7 7-7"
                    ></path>
                  </svg>
                ) : (
                  // Hamburger icon
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                )}
              </button>
            </div>
            <main
              className={`flex-1 p-8  transition-all duration-300 bg-FloralWhite ml-0 md:ml-64`}
            >
              {/* <Stepper /> */}
              <WrappedComponent {...props} extraProp="I'm an extra prop!" />
            </main>

            {/* Main content placeholder */}
          </div>
        </div>
      </>
    );
  };
};

export default AfterLoginLayout;
