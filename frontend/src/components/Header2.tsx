import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Header2() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [token, setToken] = useState("");
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogin = () => {
    router.push("/loginpage");
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

  // Menu items array
  const menuItems = [
    { label: "Home", href: "#" },
    { label: "About", href: "#" },
    { label: "Services", href: "#" },
    { label: "Contact", href: "#" },
    { label: "Help", href: "/help" },
  ];

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo or Brand */}
        <Link
          href="/"
          className="ml-12 md:ml-0 text-2xl font-bold text-gray-900 dark:text-white"
        >
          Migrahub
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex space-x-4">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-gray-900 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 items-center flex"
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

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-900 dark:text-gray-300 focus:outline-none"
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
              className="block text-gray-900 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 mb-2"
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
