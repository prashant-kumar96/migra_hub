import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { FaGoogle } from "react-icons/fa";
import { useEffect } from "react";
import { googleLogin } from "@/api/auth";
 
export default function GoogleLoginButton({ setGoogleLoading, googleLoading }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  
  const handleGoogleLogin = async () => {
    if (session) {
      setGoogleLoading(true);
       try {
        const response = await googleLogin({
          accessToken: session?.accessToken,
          email: session?.user?.email,
          name: session?.user?.name,
          googleId: session?.user?.googleId,
        });
        
        if (response.status === 200) {
          localStorage.setItem("token", response.data.token);
           localStorage.setItem("user", JSON.stringify(response.data.user));
          router.push('/dashboard');
         }
       } catch (err) {
        console.log(err, "error during backend google login");
       } finally {
        setGoogleLoading(false);
       }
      }
  };

  useEffect(() => {
      if (status === 'authenticated' && !googleLoading) {
         handleGoogleLogin();
        }
    }, [status,googleLoading]);

  if (session) {
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
    <button
      onClick={() => signIn("google")}
      className="flex items-center justify-center w-1/2 text-red-600 py-4 mb-4 gap-2 px-6 shadow-md border border-gray-200"
    >
      <FaGoogle className="text-red-600" />
      Google
    </button>
  );
}