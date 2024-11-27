import axiosInstance from "@/utils/axios";

export const getSinglePassportData = async (userId: {}) => {
  const result = await axiosInstance.get(
    `/document/getSinglePassportData?userId=${userId}`
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

export const checkWhetherDocumentsAreUploadedBeforePayment =
  async (userId: {}) => {
    const result = await axiosInstance.get(
      `/document/checkWhetherDocumentsAreUploadedBeforePayment?userId=${userId}`
    );
    return result;
  };
