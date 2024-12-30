// axiosInstance import remains same
import axiosInstance from "@/utils/axios";

// Create visa data
export const createVisaData = async (visaData) => {
  const result = await axiosInstance.post(`/visaData/create`, visaData);
  return result;
};

// Get single visa data by Id
export const getSingleVisaData = async (visaDataId) => {
  const result = await axiosInstance.get(
    `/visaData/getSinglevisaData?visaDataId=${visaDataId}`
  );
  return result?.data;
};

// Update visa data by ID
export const updateVisaData = async (visaDataId, updateData) => {
    const result = await axiosInstance.put(`/visaData/update`, {
      visaDataId,
      ...updateData,
    });
    return result;
  };