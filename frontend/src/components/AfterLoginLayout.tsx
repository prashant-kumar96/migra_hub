import React, { useEffect, useState } from "react";
import LeftMenuBar from "./LeftMenuBar";
import { me } from "@/api/auth";
import { useRouter } from "next/router";
import Header2 from "./Header2";
import Sidebar from "./LeftSideBar";

const AfterLoginLayout = (WrappedComponent: any) => {
  return function (props: any) {
    const [isOpen, setIsOpen] = useState(false);

    console.log("isHeaderOpen", isOpen);
    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };

    const meData = async () => {
      const medata = await me();
      console.log("medata", medata);
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
          <div className="flex w-full">
            {/* Sidebar for larger screens */}
            <aside
              className={`fixed inset-y-0 top-[73px] left-0 w-64 p-4 transition-transform duration-300 transform bg-white dark:bg-gray-800 shadow-lg ${
                isOpen ? "translate-x-0" : "-translate-x-full"
              } md:translate-x-0`}
            >
              <nav className="space-y-4">
                <a
                  href="#"
                  className="block text-gray-900 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                >
                  Home
                </a>
                <a
                  href="#"
                  className="block text-gray-900 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                >
                  About
                </a>
                <a
                  href="#"
                  className="block text-gray-900 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                >
                  Services
                </a>
                <a
                  href="#"
                  className="block text-gray-900 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
                >
                  Contact
                </a>
              </nav>
            </aside>

            {/* Solid Overlay for mobile view */}
            {isOpen && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
                onClick={toggleSidebar}
              ></div>
            )}

            {/* Toggle button for mobile view */}
            <div className="md:hidden z-20 absolute top-0">
              <button
                onClick={toggleSidebar}
                className="p-2 m-4 text-gray-900 dark:text-gray-300 focus:outline-none"
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
              className={`flex-1 p-8  transition-all duration-300 bg-gray-100 dark:bg-gray-900 ml-0 md:ml-64`}
            >
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
