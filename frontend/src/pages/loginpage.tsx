import { googleLogin, loginUser, registerUser } from "@/api/auth";
import AfterLoginLayout from "@/components/afterLoginLayout/AfterLoginLayout";
import BeforeLoginLayout from "@/components/BeforeLoginLayout";
import FaceBookLoginButton from "@/components/FacebookLoginButton";
import GoogleLoginButton from "@/components/loginButton";
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



const LoginPage = () => {
  const router = useRouter();
  const [sharedState] = useAtom(visaDataAtom);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    password: "",
  });
  const { data: session, status } = useSession();
  const [showIndexPage, setShowIndexPage] = useState(false);
  const [stepsData, setStepsData] = useState<any>();
  const [isPasswordTypePassword, setIsPasswordTypePassword] = useState(true);
  const [isGoogleLoginComplete, setIsGoogleLoginComplete] = useState(false); // New flag
  const [isSignUpShowing, setIsSignUpFormShowing] = useState(true);

  useEffect(() => {
    if (status === "authenticated" && !googleLoading && !isGoogleLoginComplete) {
      handleGoogleLogin();
    }
  }, [status, googleLoading, isGoogleLoginComplete]);

  const handleGoogleLogin = async () => {
    if (!session) return;

    const assessmentData = JSON.parse(localStorage.getItem("assessmentData") || "null");

    setGoogleLoading(true);

    try {
      const response = await googleLogin({
        accessToken: session?.accessToken,
        email: session?.user?.email,
        name: session?.user?.name,
        googleId: session?.user?.googleId,
        riskAssessmentData: assessmentData,
      });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setIsGoogleLoginComplete(true); // Set flag after successful login
        router.push("/dashboard");
      }
    } catch (err) {
      console.log(err, "error during backend google login");
      setGoogleLoading(false);
    }
  };

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEmailSignup = async (e: any) => {
    e.preventDefault();
    console.log("Sign up with:", formData);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({});

  const onSubmit = async (data: any) => {
    setLoading(true);
    console.log("Submitted Data:", data);
  
    const newData = { ...data, role: "USER", data: sharedState };
    console.log("Shared State:", sharedState);
    console.log("New Data:", newData);
  
    try {
      if (isSignUpShowing) {
        // Handle user registration
        const result = await registerUser(newData);
        console.log("Registration Result:", result);
  
        if (result?.status === 200) {
          localStorage.setItem("token", result?.data?.token);
          setLoading(false);
          router.push("/dashboard");
        } else {
          console.log("Registration Error Result:", result);
          setLoading(false);
        }
      } else {
        // Handle user login
        console.log("Login Data:", data);
        const result = await loginUser(data);
        console.log("Login Result:", result);
  
        if (result?.status === 200) {
          localStorage.setItem("token", result?.data?.token);
          const userRole = result?.data?.user?.role;
          console.log("User Role:", userRole);
  
          // Redirect based on role
          switch (userRole) {
            case "SA": // Admin
              await router.push("/adminDashboard");
              break;
            case "CASE_MANAGER": // Case Manager
              await router.push("/caseManagerDashboard");
              break;
            case "USER": // Regular User
            default: // Default role fallback
              await router.push("/dashboard");
              break;
          }
  
          setLoading(false);
        } else {
          console.log("Login Error Result:", result);
          setLoading(false);
        }
      }
    } catch (err) {
      setLoading(false);
      console.log("Error Status:", err);
  
      if (err.status === 400) {
        setError("password", {
          type: "manual",
          message: err?.response?.data?.message,
        });
  
        if (err?.response?.data?.extraInfo === "Info Incomplete") {
          setShowIndexPage(true);
        }
      }
    }
  };
  
  const handleEyeClick = () => {
    setIsPasswordTypePassword(!isPasswordTypePassword);
  };

  const handleLoginFormShow = () => {
    setIsSignUpFormShowing((prev) => !prev);
  };

  useEffect(() => {
    setStepsData(router?.query ? router?.query : "");
  }, [router]);

  if (googleLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }


   return (
    <div className="flex items-center justify-center  mb-2">
      {/* {googleLoading ? (
          <div className="flex items-center justify-center">
            <Loader />
          </div>
        ) :( */}
         <div className="bg-white shadow-md rounded-lg pt-10 my-10">
          <h1 className="text-2xl font-bold mb-4 text-center text-gray-600">
            Sign Up With
          </h1>

          <div className="flex gap-5  px-8 my-8 justify-around">
          <GoogleLoginButton 
            onSignIn={() => signIn("google")}
            onSignOut={() => signOut()}
            session={session}
          />
          </div>

          <hr />
          <div className="p-6 py-8 ">
            <h1 className="text-2xl font-bold mb-4 text-center text-gray-600">
              {isSignUpShowing ? "Or Sign Up With your email" : "Login Form"}
            </h1>

            <form onSubmit={handleSubmit(onSubmit)}>
              {isSignUpShowing && (
                <div className="mb-4 relative">
                  <IoPersonSharp className="absolute left-4 top-3 text-gray-400" />
                  <input
                    type="text"
                    {...register("name", {
                      required: "Name is required",
                      minLength: {
                        value: 2,
                        message: "Name must be atleast 2 characters ",
                      },
                      maxLength: {
                        value: 20,
                        message: "Name must be atmost 20 characters ",
                      },
                    })}
                    // onChange={handleChange}

                    className="w-full px-3 py-2 border shadow-md border border-gray-200 pl-10 text-gray-800"
                    placeholder="Name"
                  />
                  <p className="text-red-500 text-xs font-bold mt-1">
                    {errors?.name?.message}
                  </p>
                </div>
              )}

              <div className="mb-4 relative">
                <MdEmail className="absolute left-4 top-3 text-gray-400" />
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                      message: "Please enter email in the correct format",
                    },
                  })}
                  className="w-full px-3 py-2 border shadow-md border border-gray-200 pl-10 text-gray-800"
                  placeholder="Email"
                />
                <p className="text-red-500 text-xs font-bold mt-1">
                  {errors?.email?.message}
                </p>
              </div>

              <div className="mb-4 relative">
                <FaLock className="absolute left-4 top-3 text-gray-400" />
                <input
                  type={isPasswordTypePassword ? "password" : "text"}
                  {...register("password", {
                    required: "password is required",
                    // pattern: {
                    //   value:
                    //     /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                    //   message:
                    //     "Please must contain at least 8 characters, one lowercase, One uppercase, One number",
                    // },
                    minLength: {
                      value: 6,
                      message: "Password must be atleast 6 characters ",
                    },
                    maxLength: {
                      value: 20,
                      message: "Password must be atmost 20 characters ",
                    },
                  })}
                  className="w-full px-3 py-2 border shadow-md border border-gray-200 pl-10 text-gray-800"
                  placeholder="Password"
                />
                <FaEye
                  className="absolute right-4 top-3 text-gray-400 cursor-pointer"
                  onClick={handleEyeClick}
                />
                <p className="text-red-500 text-xs font-bold mt-1">
                  {errors?.password?.message}
                </p>
              </div>

              {showIndexPage && (
                <div className="my-2">
                  <Link
                    href="/"
                    type="submit"
                    className="w-full bg-yellow-600 text-white py-2 rounded-md px-4 text-sm"
                  >
                    Go to steps page
                  </Link>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-md flex gap-2 justify-center items-center"
              >
                {isSignUpShowing ? "Sign Up" : "Login"}
              </button>
              <div className="text-gray-900 mt-10">
                <p className="text-sm">* Minimum Password Requirement</p>
                <p className="text-sm">
                  {" "}
                  At least 8 characters. One lowercase letter, One uppercase
                  letter, One number
                </p>
              </div>
            </form>
            <p
              onClick={handleLoginFormShow}
              className="cursor-pointer text-blue-600"
            >
              {isSignUpShowing
                ? "Already Registered! Login"
                : "New User! Register Here"}
            </p>
          </div>
        </div>
      
    </div>
  );
};
export default BeforeLoginLayout(LoginPage);
