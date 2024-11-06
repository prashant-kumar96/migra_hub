import axiosInstance from "@/utils/axios";

export const getSingleVisaData = async (visaDataId) => {
  const result = await axiosInstance.get(
    `/visaData/getSinglevisaData?visaDataId=${visaDataId}`
  );
  return result;
};
