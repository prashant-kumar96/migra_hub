import axiosInstance from "@/utils/axios";

export const getSinglePassportData = async (userId: {}) => {
  console.log(';; user id passed', userId)
  const result = await axiosInstance.get(
    `/document/getSinglePassportData?userId=${userId}`
  );
  return result;
};

export const getUploadedDocumentsData = async (userId: {}) => {
  console.log(';; user id passed', userId)
  const result = await axiosInstance.get(
    `/document/uploadedDocuments?userId=${userId}`
  );
  return result;
};

export const getSingleProofOfFundsData = async (userId: {}) => {
  const result = await axiosInstance.get(
    `/document/getSingleProofOfFundsData?userId=${userId}`
  );
  return result;
};

export const getSingleProofOfTiesData = async (userId: {}) => {
  const result = await axiosInstance.get(
    `/document/getSingleProofOfTiesData?userId=${userId}`
  );
  return result;
};

export const getAdditionalDocuments = async (userId: {}) => {
  const result = await axiosInstance.get(
    `/document/getAdditionalDocuments?userId=${userId}`
  );
  return result;
};
