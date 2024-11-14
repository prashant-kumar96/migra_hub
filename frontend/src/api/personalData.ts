import axiosInstance from "@/utils/axios";

export const savePersonalData = async (personalData: {}) => {
  const result = await axiosInstance.post(
    `/personalData/savePersonalData`,
    personalData
  );
  return result;
};

export const getPersonalData = async (userId: {}) => {
  const result = await axiosInstance.get(
    `/personalData/getSinglePersonalData?userId=${userId}`
  );
  return result;
};
