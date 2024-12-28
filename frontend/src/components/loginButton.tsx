import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { FaGoogle } from "react-icons/fa";
import { useEffect } from "react";
import { googleLogin } from "@/api/auth";


// GoogleLoginButton.js
export default function GoogleLoginButton({ onSignIn, onSignOut, session }) {
  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button
          className="flex items-center justify-center w-1/2 text-red-600 py-4 mb-4 gap-2 px-6 shadow-md border border-gray-200"
          onClick={onSignOut}
        >
          Sign out
        </button>
      </>
    );
  }

  return (
    <button
      onClick={onSignIn}
      className="flex items-center justify-center w-1/2 text-red-600 py-4 mb-4 gap-2 px-6 shadow-md border border-gray-200"
    >
      <FaGoogle className="text-red-600" />
      Google
    </button>
  );
}