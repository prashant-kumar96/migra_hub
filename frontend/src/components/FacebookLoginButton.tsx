import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { FaFacebook, FaGoogle } from "react-icons/fa";

export default function FaceBookLoginButton() {
  const { data: session } = useSession();
  const router = useRouter();
  if (session) {
    // router.push("/dashboard");
    return (
      <>
        Signed in as {session.user.email} <br />
        <button
          className="flex items-center justify-center w-1/2 text-red-600 py-4 mb-4 gap-2 px-6 shadow-md border border-gray-200"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </>
    );
  }
  return (
    <>
      <button
        onClick={() => signIn("facebook")}
        className="flex items-center justify-center w-1/2 text-blue-600 py-4 mb-4 gap-2 px-6 shadow-md border border-gray-200"
      >
        <FaFacebook className="text-blue-600" />
        Facebook
      </button>
    </>
  );
}
