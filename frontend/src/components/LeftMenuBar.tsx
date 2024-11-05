import Link from "next/link";
import React from "react";

const LeftMenuBar = () => {
  return (
    <div className=" w-1/6 bg-gray-800 text-white flex flex-col">
      <div className="p-4 text-lg font-semibold">Menu</div>
      <nav className="flex-grow">
        <ul className="space-y-4">
          <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
            <Link href="#">Home</Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
            <Link href="/profilepage">Profile</Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
            <Link href="#">My Application</Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
            <Link href="#">Payment</Link>
          </li>
          <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">
            <Link href="#">Contact Us</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default LeftMenuBar;
