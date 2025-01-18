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
        ${disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"}`}
    >
      <FaGoogle className="text-2xl text-red-600" />
      <span className="text-red-700 text-center font-medium">
        {session ? "Sign Out" : "Sign in with Google"}
      </span>
    </button>
  );
};

const SignUpModal = () => {
  const router = useRouter();
  const [sharedState] = useAtom(visaDataAtom);
  const { data: session, status } = useSession();
  const { logout } = useAuth(); // Get the logout function from auth-context

  // Form States
  const [isSignUpShowing, setIsSignUpFormShowing] = useState(true);
  const [isPasswordTypePassword, setIsPasswordTypePassword] = useState(true);

  // Auth States
  const [authState, setAuthState] = useState({
    isLoading: false,
    isProcessing: false,
    error: null,
    completed: false,
  });

  const [googleAuthStatus, setGoogleAuthStatus] = useState({
    attempted: false,
    completed: false,
    processing: false,
    error: null,
  });

  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [sendTips, setSendTips] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  useEffect(() => {
    // Handle Google Auth
    if (
      status === "authenticated" &&
      session?.user?.email &&
      !googleAuthStatus.attempted &&
      !googleAuthStatus.completed &&
      !googleAuthStatus.processing
    ) {
      handleGoogleLogin();
    }
  }, [status, session, googleAuthStatus]);

  const handleGoogleLogin = async () => {
    if (googleAuthStatus.processing || googleAuthStatus.completed) {
      return;
    }

    if (!session?.user?.email) {
      console.error("No valid session found");
      return;
    }

    try {
      setGoogleAuthStatus((prev) => ({
        ...prev,
        processing: true,
        attempted: true,
        error: null,
      }));

      setAuthState((prev) => ({
        ...prev,
        isLoading: true,
        error: null,
      }));
      const assessmentData = JSON.parse(
        localStorage.getItem("assessmentData") || "null"
      );

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
        // Don't set states to false/completed before redirect
        await router.push("/dashboard");
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err) {
      console.error("Google login error:", err);

      setGoogleAuthStatus((prev) => ({
        ...prev,
        processing: false,
        error: err.message || "Login failed",
      }));

      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: err.message || "Login failed",
      }));

      // Call logout on error
      logout();
    }
  };
  const onSubmit = async (data) => {
    const assessmentData = JSON.parse(
      localStorage.getItem("assessmentData") || "null"
    );

    setAuthState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      if (isSignUpShowing) {
        const newData = {
          ...data,
          data: assessmentData,
          role: "USER",
          agreedToTerms,
          sendTips,
        };
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
      }
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: err?.response?.data?.message || "Authentication failed",
      }));
    }
  };

  const handleEyeClick = () =>
    setIsPasswordTypePassword(!isPasswordTypePassword);
  const handleLoginFormShow = () => setIsSignUpFormShowing((prev) => !prev);

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

  return (
    <div className="flex items-center justify-center bg-transparent  px-4 ">
      <div className="bg-white shadow-l rounded-lg w-full max-w-md">
        <div className="px-8 pt-10">
          <div className="mb-8">
            <GoogleLoginButton
              onSignIn={() => signIn("google")}
              onSignOut={() => signOut()}
              session={session}
              disabled={authState.isLoading || googleAuthStatus.processing}
            />
          </div>

          <div className="relative mb-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>

          {isSignUpShowing ? (
            <span className="text-center flex items-center py-2 text-gray-500 mx-auto w-full">
              Register
            </span>
          ) : (
            <span className="text-center flex items-center mx-auto py-2 text-gray-500 w-full">
              Login
            </span>
          )}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="text-gray-700 space-y-4"
          >
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
                <p className="mt-1 text-xs text-red-600">
                  {errors.email.message}
                </p>
              )}
              <div className="text-xs mt-1 text-red-500">
                {errors.email?.message === "Email is required" &&
                  "Email is required"}
              </div>
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
                <p className="mt-1 text-xs text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="mt-4 flex items-start">
              <input
                type="checkbox"
                id="terms"
                className="mr-2 mt-1 border-gray-300 rounded focus:ring-indigo-500"
                checked={agreedToTerms}
                onChange={() => setAgreedToTerms(!agreedToTerms)}
              />
              <label htmlFor="terms" className="text-sm text-gray-700">
                I agree to the MigraHUB&nbsp;
                <Link href="#" className="text-indigo-600 hover:underline">
                  Privacy Policy
                </Link>
                &nbsp;
                <span>and</span>
                &nbsp;
                <Link href="#" className="text-indigo-600 hover:underline">
                  Terms of Use.
                </Link>
              </label>
            </div>

            <div className="mt-2 flex items-start">
              <input
                type="checkbox"
                id="tips"
                className="mr-2 mt-1 border-gray-300 rounded focus:ring-indigo-500"
                checked={sendTips}
                onChange={() => setSendTips(!sendTips)}
              />
              <label htmlFor="tips" className="text-sm text-gray-700">
                Send me important tips and updates about the visa process.
              </label>
            </div>

            <div className="flex items-center justify-between mt-6">
              <button
                type="submit"
                disabled={authState.isLoading}
                className="bg-indigo-900 text-white py-2 px-6 rounded-md disabled:opacity-50 disabled:bg-gray-100"
              >
                View Results
              </button>
            </div>
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
        </div>
      </div>
    </div>
  );
};

export default SignUpModal;
