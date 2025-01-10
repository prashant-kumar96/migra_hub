// api/application.ts
import axiosInstance from "@/utils/axios";

// Get application status details
export const getApplicationStatusDetails = async (applicationId: string) => {
    const result = await axiosInstance.get(`/application-status/${applicationId}`);
    return result;
};


export const updateDocumentUploadStatus = async (applicationId:string) => {
    const result  = await axiosInstance.post(`/application-status/document-upload-status/${applicationId}`);
return result;
}

export const updatePaymentStatus = async (applicationId:string) => {
    const result  = await axiosInstance.post(`/application-status/payment-status/${applicationId}`);
    return result;
}