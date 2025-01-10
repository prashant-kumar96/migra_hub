import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-[#CDE6EC] text-FloralWhite shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-[#333366] to-[#2C415A] bg-clip-borderborder-gray-200 shadow-xl">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex justify-start lg:justify-start">
           <Image width={180} height={100} alt="logo" src ="/logo/MigraHub.png" />
        </Link>

        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className="hidden md:flex md:w-auto items-center gap-2"
          id="navbar-default"
        >
          <div className="relative inline-block">
            <img
              src="/logo/plane.png"
              className="w-[55px] inline-block shrink-0"
              alt="Plane logo"
            />
          </div>
          <div className="text-left">
            <span className="leading-tight">
              On Time <br />
              Guaranteed
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
