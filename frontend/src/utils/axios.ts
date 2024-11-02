import axios from "axios";
// import { store } from "../store";
// import { logout } from "../slices/authSlice";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers["Cache-Control"] =
      "no-store, no-cache, must-revalidate, proxy-revalidate";
    config.headers["Pragma"] = "no-cache";
    config.headers["Expires"] = "0";
    config.headers["Surrogate-Control"] = "no-store";
    const token = localStorage.getItem("token");
    console.log("token", token);
    console.log(typeof token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log(response, "reeponse");
    return response;
  },
  (error) => {
    console.log("error1212", error);
    if (error.response.status === 401) {
      console.log(error.response.data.message, "response");
      if (error.response.data.message === "Invalid or expired token") {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
      //   store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
