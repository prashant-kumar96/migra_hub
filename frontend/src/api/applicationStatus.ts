// api/application.ts
import axiosInstance from "@/utils/axios";

// Get application status details
export const getApplicationStatusDetails = async (applicationStatusId: string) => {
    const result = await axiosInstance.get(`/application-status/${applicationStatusId}`);
    return result;
};