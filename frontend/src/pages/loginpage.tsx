import { loginUser, registerUser } from "@/api/auth";
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


const LoginPage = () => {
  const router = useRouter();
  console.log(router.query);
  const [sharedState] = useAtom(visaDataAtom);
  const [loading, setLoading] = useState(false);
  const [googleLoading,setGoogleLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    password: "",
  });

  const [showIndexPage, setShowIndexPage] = useState(false);

  const [stepsData, setStepsData] = useState<any>();

  const [isPasswordTypePassword, setIsPasswordTypePassword] = useState(true);
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    // Add logic for your custom sign-up logic using email/password
    console.log("Sign up with:", formData);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({});

  const onSubmit = async (data:any) => {
    setLoading(true);
    console.log(data);
    const newData = { ...data, role: "USER", data: sharedState };
    console.log("sharedState", sharedState);
    console.log("newData", newData);
    try {
      if (isSignUpShowing) {
        const result = await registerUser(newData);
        console.log("result registerUser ", result);
        if (result?.status === 200) {
          // Navigate to dashboard
          console.log("we are here");
          localStorage.setItem("token", result?.data?.token);
          setLoading(false);
          router.push("/dashboard");
        } else {
          console.log("result@@@", result);
          setLoading(false);
        }
      } else {
        const result = await loginUser(data);
        console.log("result loginUser@@@@@@@", result);
        if (result?.status === 200) {
          // Navigate to dashboard
          console.log("we are here");
          localStorage.setItem("token", result?.data?.token);
          4;
          if (result?.data?.user?.role === "SA") {
            router.push("/adminDashboard");
          }
          if (result?.data?.user?.role === "CASE_MANAGER") {
            router.push("/caseManagerDashboard");
          } else router.push("/dashboard");
          setLoading(false);
        } else {
          console.log("result@@@", result);
          setLoading(false);
        }
      }
    } catch (err) {
      setLoading(false);
      console.log("errstatus", err);
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

  const [isSignUpShowing, setIsSignUpFormShowing] = useState(true);
  const handleLoginFormShow = () => {
    setIsSignUpFormShowing((prev) => !prev);
  };

  useEffect(() => {
    setStepsData(router?.query ? router?.query : "");
  }, [router]);

 
   console.log('google loading',googleLoading)



   return (
    <div className="flex items-center justify-center  mb-2">
      {googleLoading ? (
          <div className="flex items-center justify-center">
            <Loader />
          </div>
        ) :(
         <div className="bg-white shadow-md rounded-lg pt-10 my-10">
          <h1 className="text-2xl font-bold mb-4 text-center text-gray-600">
            Sign Up With
          </h1>

          <div className="flex gap-5  px-8 my-8 justify-around">
          <GoogleLoginButton setGoogleLoading={setGoogleLoading} googleLoading={googleLoading} />
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
      )}
    </div>
  );
};
export default BeforeLoginLayout(LoginPage);
