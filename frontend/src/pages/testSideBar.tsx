import React, { useState } from "react";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 dark:bg-gray-900 text-white dark:text-gray-200 w-64 p-4 fixed top-0 left-0 h-full ${
          isSidebarOpen ? "block" : "hidden"
        } md:block`}
      >
        <h2 className="text-xl font-bold mb-4">Sidebar</h2>
        <ul>
          <li className="mb-2">
            <a
              href="#"
              className="hover:bg-gray-700 dark:hover:bg-gray-700 hover:text-gray-200 dark:hover:text-gray-100 block p-2 rounded-md"
            >
              Home
            </a>
          </li>
          {/* Add more list items as needed */}
        </ul>
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 p-4 overflow-y-auto ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        {/* Your main content here */}
        <h1 className="text-3xl font-bold mb-4">Main Content</h1>
        <p>This is the main content area.</p>
      </div>

      {/* Sidebar Toggle Button (for mobile) */}
      <button
        className="fixed top-4 left-4 md:hidden bg-gray-800 dark:bg-gray-900 text-white dark:text-gray-200 p-2 rounded-full"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {/* Add a suitable icon here */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
          />
        </svg>
      </button>
    </div>
  );
}

export default App;
