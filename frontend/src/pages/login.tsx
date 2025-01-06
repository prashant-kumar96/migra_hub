import { googleLogin, loginUser, registerUser } from "@/api/auth";
import AfterLoginLayout from "@/components/afterLoginLayout/AfterLoginLayout";
import BeforeLoginLayout from "@/components/BeforeLoginLayout";
import FaceBookLoginButton from "@/components/FacebookLoginButton";
// import GoogleLoginButton from "@/components/loginButton";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaLock } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { useAtom } from "jotai";
import { visaDataAtom } from "@/store/visaDataAtom";
import ButtonLoader from "@/components/loaders/buttonLoader";
import Loader from "@/components/loaders/loader";
import { signIn, signOut, useSession } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";
import { useAuth } from "@/context/auth-context";


const GoogleLoginButton = ({ onSignIn, onSignOut, session, disabled }) => {
  const handleClick = async () => {
    if (session) {
      await onSignOut();
    } else {
      await onSignIn();
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`flex items-center justify-center w-full gap-2 px-6 py-3 border border-gray-300 rounded-md shadow-sm
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'}`}
    >
      <FaGoogle className="text-2xl text-red-600" />
      <span className="text-red-700 text-center font-medium">
        {session ? 'Sign Out' : 'Sign in with Google'}
      </span>
    </button>
  );
};

const LoginPage = () => {
  const router = useRouter();
  const [sharedState] = useAtom(visaDataAtom);
  const { data: session, status } = useSession();
  const { logout } = useAuth(); // Get the logout function from auth-context

  // Form States
  const [isSignUpShowing, setIsSignUpFormShowing] = useState(true);
  const [isPasswordTypePassword, setIsPasswordTypePassword] = useState(true);
  const [showIndexPage, setShowIndexPage] = useState(false);

  // Auth States
  const [authState, setAuthState] = useState({
    isLoading: false,
    isProcessing: false,
    error: null,
    completed: false
  });

  const [googleAuthStatus, setGoogleAuthStatus] = useState({
    attempted: false,
    completed: false,
    processing: false,
    error: null
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  useEffect(() => {
    // Handle Google Auth
    if (status === "authenticated" && 
        session?.user?.email &&
        !googleAuthStatus.attempted && 
        !googleAuthStatus.completed && 
        !googleAuthStatus.processing) {
      handleGoogleLogin();
    }
  }, [status, session, googleAuthStatus]);


// Similarly for Google login
const handleGoogleLogin = async () => {
 
  if (googleAuthStatus.processing || googleAuthStatus.completed) {
    return;
  }

  if (!session?.user?.email) {
    console.error("No valid session found");
    return;
  }

  try {
    setGoogleAuthStatus(prev => ({
      ...prev,
      processing: true,
      attempted: true,
      error: null
    }));

    setAuthState(prev => ({
      ...prev,
      isLoading: true,
      error: null
    }));

    const assessmentData = JSON.parse(localStorage.getItem("assessmentData") || "null");
    
    const response = await googleLogin({
      accessToken: session?.accessToken,
      email: session?.user?.email,
      name: session?.user?.name,
      googleId: session?.user?.googleId,
      riskAssessmentData: assessmentData,
    });

    if (response?.status === 200 && response?.data?.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.removeItem('assessmentData');

      // Don't set states to false/completed before redirect
      await router.push("/dashboard");
    } else {
      throw new Error("Invalid response from server");
    }
  } catch (err) {
    console.error("Google login error:", err);
    
    setGoogleAuthStatus(prev => ({
      ...prev,
      processing: false,
      error: err.message || "Login failed"
    }));

    setAuthState(prev => ({
      ...prev,
      isLoading: false,
      error: err.message || "Login failed"
    }));

     // Call logout on error
     logout(); 
  }
};

const onSubmit = async (data) => {
  setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

  try {
    if (isSignUpShowing) {
      const newData = { ...data, role: "USER", data: sharedState };
      const result = await registerUser(newData);

      if (result?.status === 200) {
        localStorage.setItem("token", result?.data?.token);
        // Don't set isLoading to false before redirect
        await router.push("/dashboard");
      }
    } else {
      const result = await loginUser(data);

      if (result?.status === 200) {
        localStorage.setItem("token", result?.data?.token);
        
        // Don't set isLoading to false before redirect
        switch (result?.data?.user?.role) {
          case "SA":
            await router.push("/adminDashboard");
            break;
          case "CASE_MANAGER":
            await router.push("/caseManagerDashboard");
            break;
          default:
            await router.push("/dashboard");
        }
      }
    }
  } catch (err) {
    console.error("Auth error:", err);
    
    if (err.status === 400) {
      setError("password", {
        type: "manual",
        message: err?.response?.data?.message,
      });

      if (err?.response?.data?.extraInfo === "Info Incomplete") {
        setShowIndexPage(true);
      }
    }

    setAuthState(prev => ({
      ...prev,
      isLoading: false,
      error: err?.response?.data?.message || "Authentication failed"
    }));
  }
  // Remove the finally block since we want to keep loading state during redirect
};

  const handleEyeClick = () => setIsPasswordTypePassword(!isPasswordTypePassword);
  const handleLoginFormShow = () => setIsSignUpFormShowing(prev => !prev);

  // Loading State
  if (authState.isLoading || googleAuthStatus.processing) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50">
        <div className="text-center">
          <Loader text="Please wait..." />
          <p className="mt-4 text-gray-600">Processing your request...</p>
        </div>
      </div>
    );
  }

  // Error State
  // if (authState.error || googleAuthStatus.error) {
  //   return (
  //     <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50">
  //       <div className="text-center p-6 bg-white rounded-lg shadow-lg">
  //         <div className="text-red-600 mb-4">
  //           {authState.error || googleAuthStatus.error}
  //         </div>
  //         <button 
  //           onClick={() => {
  //             setAuthState(prev => ({ ...prev, error: null }));
  //             setGoogleAuthStatus(prev => ({
  //               attempted: false,
  //               completed: false,
  //               processing: false,
  //               error: null
  //             }));
  //           }}
  //           className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
  //         >
  //           Try Again
  //         </button>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4 py-12">
      <div className="bg-white shadow-xl rounded-lg w-full max-w-md">
        <div className="px-8 pt-10">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
            {isSignUpShowing ? "Create an Account" : "Welcome Back"}
          </h1>

          <div className="mb-8">
            <GoogleLoginButton 
              onSignIn={() => signIn("google")}
              onSignOut={() => signOut()}
              session={session}
              disabled={authState.isLoading || googleAuthStatus.processing}
            />
          </div>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="text-gray-700 space-y-6">
            {isSignUpShowing && (
              <div className="relative">
                <IoPersonSharp className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                    maxLength: {
                      value: 20,
                      message: "Name must be at most 20 characters",
                    },
                  })}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Full Name"
                />
                {errors?.name && (
                  <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
                )}
              </div>
            )}

            <div className="relative">
              <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Email address"
              />
              {errors?.email && (
                <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={isPasswordTypePassword ? "password" : "text"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={handleEyeClick}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <FaEye />
              </button>
              {errors?.password && (
                <p className="mt-1 text-xs text-red-600">{errors.password.message}</p>
              )}
            </div>

            {showIndexPage && (
              <Link
                href="/"
                className="block w-full text-center bg-yellow-600 text-white py-2 rounded-md hover:bg-yellow-700 transition-colors"
              >
                Complete Assessment First
              </Link>
            )}

            <button
              type="submit"
              disabled={authState.isLoading}
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50"
            >
              {isSignUpShowing ? "Sign Up" : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={handleLoginFormShow}
              className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
            >
              {isSignUpShowing
                ? "Already have an account? Sign in"
                : "Need an account? Sign up"}
            </button>
          </div>

          <div className="mt-8 pb-8 text-xs text-gray-500">
            <p className="font-medium">Password Requirements:</p>
            <ul className="mt-2 list-disc list-inside">
              <li>Minimum 6 characters</li>
              <li>At least one uppercase letter</li>
              <li>At least one lowercase letter</li>
              <li>At least one number</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeforeLoginLayout(LoginPage);