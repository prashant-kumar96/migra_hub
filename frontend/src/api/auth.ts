import axiosInstance from "@/utils/axios";

const registerUser = async (data) => {
  const result = await axiosInstance.post("/auth/register", data);
  return result;
};

const createCaseManager = async (data) => {
  const result = await axiosInstance.post("/auth/createCaseManager", data);
  return result;
};

const getCaseManagers = async () => {
  const result = await axiosInstance.get("/auth/getCaseManagers");
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

const getAllUsersWhoHaveDonePayment = async () => {
  const result = await axiosInstance.get("/auth/getUsersWhoHaveDonePayment");
  return result;
};

export {
  registerUser,
  loginUser,
  me,
  getAllUsersWhoHaveDonePayment,
  createCaseManager,
  getCaseManagers,
};
