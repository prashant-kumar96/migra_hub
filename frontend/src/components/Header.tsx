// ./src/Header.js
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { RiUserSharedFill, RiUserReceivedFill } from "react-icons/ri";
function Header2() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [token, setToken] = useState("");
  const { data: session } = useSession();
  // console.log("session", session);

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
    { label: "Partner", href: "/" },
    { label: "News", href: "/newsPage" },
    { label: "Help", href: "/help" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="shadow-lg shadow-blue-gray-500/40 bg-gradient-to-r from-[#333366] to-[#2C415A]">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo or Brand */}
        <div className="col-span-full mb-10 lg:col-span-2 lg:mb-0 text-center lg:text-left">
          <Link href="/" className="flex justify-center lg:justify-start">
            <span className="text-4xl font-greycliff font-extrabold tracking-tight text-gray-100 dark:text-gray-100">
              MigraHub
            </span>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex space-x-4">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-white  hover:text-blue-500  items-center flex whitespace-nowrap"
            >
              {item.label}
            </a>
          ))}

          {session || token ? (
            <button
              className="bg-FloralWhite text-Indigo p-1 rounded-md w-full hover:bg-Indigo hover:text-FloralWhite"
              onClick={handleSignout}
            >
              <RiUserReceivedFill />
            </button>
          ) : (
            <a
              href="#"
              onClick={handleLogin}
              className="bg-FloralWhite text-Indigo p-1 rounded-md w-full hover:bg-Indigo hover:text-FloralWhite"
            >
              <RiUserSharedFill size={20} />
            </a>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white  focus:outline-none"
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
        <nav className="md:hidden bg-white dark:bg-gray-900 p-4">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="block text-white  hover:text-blue-500  mb-2"
            >
              {item.label}
            </a>
          ))}

          {session || token ? (
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md w-full hover:bg-blue-600"
              onClick={handleSignout}
            >
              Sign out
            </button>
          ) : (
            <a
              href="#"
              onClick={handleLogin}
              className="bg-blue-500 text-white px-4 py-2 rounded-md w-full hover:bg-blue-600"
            >
              Log in
            </a>
          )}
        </nav>
      )}
    </header>
  );
}

export default Header2;
