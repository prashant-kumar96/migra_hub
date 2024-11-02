import axiosInstance from "@/utils/axios";

const registerUser = async (data) => {
  const result = await axiosInstance.post("/auth/register", data);
  return result;
};

const loginUser = async (data) => {
  const result = await axiosInstance.post("/auth/login", data);
  return result;
};

const me = async () => {
  const result = await axiosInstance.get("/auth/me");
  return result;
};

export { registerUser, loginUser, me };
