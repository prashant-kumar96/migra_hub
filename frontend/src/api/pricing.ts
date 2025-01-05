// api/pricing.ts
import axiosInstance from "@/utils/axios";

// Get pricing data
export const getPricingData = async () => {
  const result = await axiosInstance.get(`/pricing`);
  return result;
};

// Get application charges
export const getApplicationCharges = async (userId) => {
  const result = await axiosInstance.get(`/pricing/application-charges/${userId}`);
  return result;
};