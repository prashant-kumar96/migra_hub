// ./src/Header.js
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { RiUserSharedFill, RiUserReceivedFill } from "react-icons/ri";

function Header2() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [token, setToken] = useState("");
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogin = () => {
    router.push("/login");
  };

  const handleSignout = () => {
    if (session) {
      signOut();
    } else {
      localStorage.removeItem("token");
      setToken("");
      router.push("/");
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  const menuItems = [
    { label: "Visitor Journey", href: "/" },
    // { label: "Partner", href: "/" },
    // { label: "News", href: "/newsPage" },
    { label: "Help", href: "https://appletheory.atlassian.net/servicedesk/customer/portals" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-[#333366] to-[#2C415A]">
      {/* Logo or Brand */}
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex justify-start lg:justify-start">
          <Image width={180} height={100} alt="logo" src="/logo/MigraHub.png" />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex space-x-8">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-FloralWhite hover:text-blue-500 items-center flex whitespace-nowrap"
            >
              <span className="text-lg tracking-wider">{item.label}</span>
            </Link>
          ))}

          {session || token ? (
            <button
              className="bg-FloralWhite text-Indigo p-1 rounded-md w-full hover:bg-Indigo hover:text-FloralWhite"
              onClick={handleSignout}
            >
              <RiUserReceivedFill />
            </button>
          ) : (
            <Link
              href="#"
              onClick={handleLogin}
              className="flex bg-transparent border-FloralWhite border-2 px-4 py-1 text-FloralWhite text-center rounded-full w-full hover:text-Indigo hover:bg-FloralWhite"
            >
              <span className="tracking-wider">Login</span>
            </Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-FloralWhite focus:outline-none"
          >
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
                d={
                  menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                }
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {menuOpen && (
        <nav className="md:hidden bg-FloralWhite p-4">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="block text-Indigo hover:text-blue-500 mb-2"
            >
              {item.label}
            </Link>
          ))}

          {session || token ? (
            <button
              className="bg-blue-500 text-FloralWhite px-4 py-2 rounded-md w-full hover:bg-blue-600"
              onClick={handleSignout}
            >
              Sign out
            </button>
          ) : (
            <Link
              href="#"
              onClick={handleLogin}
              className="block text-Indigo bg-transparent border-Indigo border-2 px-4 py-2 text-center rounded-full w-full hover:text-FloralWhite hover:bg-Indigo"
            >
              Log in
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}

export default Header2;