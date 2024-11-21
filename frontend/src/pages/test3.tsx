import React from "react";
import { FaHome } from "react-icons/fa";
const Sidebar = () => {
  return (
    <main className="flex">
      <div className="bg-gray-900 sm:w-60 min-h-screen w-14 pt-4 transition-all">
        <div className="text-center text-white p-6">
          <svg
            viewBox="0 0 248 31"
            className="w-auto hidden sm:block"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M25.517 0C18.712 0 14.46 3.382 12.758 10.146c2.552-3.382 5.529-4.65 8.931-3.805 1.941.482 3.329 1.882 4.864 3.432 2.502 2.524 5.398 5.445 11.722 5.445 6.804 0 11.057-3.382 12.758-10.145-2.551 3.382-5.528 4.65-8.93 3.804-1.942-.482-3.33-1.882-4.865-3.431C34.736 2.92 31.841 0 25.517 0zM12.758 15.218C5.954 15.218 1.701 18.6 0 25.364c2.552-3.382 5.529-4.65 8.93-3.805 1.942.482 3.33 1.882 4.865 3.432 2.502 2.524 5.397 5.445 11.722 5.445 6.804 0 11.057-3.381 12.758-10.145-2.552 3.382-5.529 4.65-8.931 3.805-1.941-.483-3.329-1.883-4.864-3.432-2.502-2.524-5.398-5.446-11.722-5.446z"
              fill="#06B6D4"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M76.546 12.825h-4.453v8.567c0 2.285 1.508 2.249 4.453 2.106v3.463c-5.962.714-8.332-.928-8.332-5.569v-8.567H64.91V9.112h3.304V4.318l3.879-1.143v5.937h4.453v3.713z"
              fill="#fff"
            />
            {/* Add additional path elements as required */}
          </svg>
        </div>
        <ul className="mt-11">
          <li className="hover:bg-gray-800 cursor-pointer sm:justify-start px-4 h-12 flex items-center justify-center active">
            <FaHome/>
            <span className="ml-3 hidden sm:block text-gray-400 font-semibold tracking-wide hover:text-white transition-colors">
              Dashboard
            </span>
          </li>
          {/* Add more menu items here */}
        </ul>
      </div>
    </main>
  );
};

export default Sidebar;
