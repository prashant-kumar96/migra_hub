// api/familyMember.ts
import axiosInstance from "@/utils/axios";

// Create family member
export const addFamilyMember = async (familyMemberData: any) => {
  const result = await axiosInstance.post(
    `/family-member/create`,
    familyMemberData
  );
  return result;
};

export const editFamilyMember = async (familyMemberData, id) => {
  const result = await axiosInstance.post(
    `/family-member/editFamilyMember?id=${id}`,
    familyMemberData
  );
  return result;
};
// Get linked family members
export const getLinkedFamilyMembers = async (userId) => {
  try {
    const result = await axiosInstance.get(
      `/family-member/linked-family-members/${userId}`
    );
    return result;
  } catch (err) {
    console.error("Error fetching linked family members:", err);
    throw err; // Re-throw to handle in the caller
  }
};
export const deleteFamilyMember = async (userId) => {
  try {
    const result = await axiosInstance.delete(
      `/family-member/delete/?userId=${userId}`
    );
    return result;
  } catch (err) {
    console.error("Error fetching linked family members:", err);
    throw err; // Re-throw to handle in the caller
  }
};

export const getSingleFamilyMemberDetails = async (userId) => {
  try {
    const result = await axiosInstance.get(
      `/family-member/singleFamilyMemberDetails/${userId}`
    );
    return result;
  } catch (err) {
    console.error("Error fetching linked family members:", err);
    throw err; // Re-throw to handle in the caller
  }
};

// Get family member application details
export const getFamilyMemberApplicationDetails = async (userId: any) => {
  const result = await axiosInstance.get(`/family-member?userId=${userId}`);
  return result;
};
