// api/application.ts
import axiosInstance from "@/utils/axios";
import { Result } from "postcss";

// Get application status details
export const getApplicationStatusDetails = async (applicationId: string) => {
    const result = await axiosInstance.get(`/application-status/${applicationId}`);
    return result;
};


export const getApplicationDetails = async (applicationId: string) => {
    const result = await axiosInstance.get(`/application-status/application-details/${applicationId}`);
    return result
}

// Send status update email
export const sendStatusUpdateEmail = async (data: any) => {
    const result = await axiosInstance.post(`/application-status/send-status-update`, data);
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