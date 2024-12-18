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
const LoginPage = () => {
  const router = useRouter();
  console.log(router.query);
  const [sharedState] = useAtom(visaDataAtom);
  const [loading, setLoading] = useState(false);
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

  const onSubmit = async (data) => {
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

   

  return (
    <div className="flex items-center justify-center  mb-2">
      <div className="bg-white shadow-md rounded-lg pt-10 my-10">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-600">
          Sign Up With
        </h1>

        <div className="flex gap-5  px-8 my-8 justify-around">
          <GoogleLoginButton />

          {/* <FaceBookLoginButton /> */}
          {/* <button
            onClick={() => {}}
            className="flex items-center justify-center text-blue-600 py-4 mb-4  w-1/2 shadow-md border border-gray-200"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M22.675 0h-21.35C.595 0 0 .595 0 1.326v21.348C0 23.406.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.099 2.794.143v3.24h-1.917c-1.505 0-1.797.715-1.797 1.763v2.312h3.587l-.467 3.621h-3.12V24h6.116C23.405 24 24 23.405 24 22.676V1.326C24 .595 23.405 0 22.675 0z" />
            </svg>
            Facebook
          </button> */}
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
              {isSignUpShowing ? "Sign Up" : "Login"}{" "}
              {loading && <ButtonLoader />}
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
