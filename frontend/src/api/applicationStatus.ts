// api/application.ts
import axiosInstance from "@/utils/axios";

// Get application status details
export const getApplicationStatusDetails = async (applicationStatusId: string) => {
    const result = await axiosInstance.get(`/application-status/${applicationStatusId}`);
    return result;
};


export const updateDocumentUploadStatus = async (applicationStatusId:string) => {
    const result  = await axiosInstance.post(`/application-status/document-upload-status/${applicationStatusId}`);
return result;
}

export const updatePaymentStatus = async (applicationStatusId:string) => {
    const result  = await axiosInstance.post(`/application-status/payment-status/${applicationStatusId}`);
return result;
}