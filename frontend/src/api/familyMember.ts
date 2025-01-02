// axiosInstance import remains same
import axiosInstance from "@/utils/axios";

// Create visa data
export const addFamilyMember = async (data) => {
  const result = await axiosInstance.post(`/family-member/create`, data);
  return result;
};
 