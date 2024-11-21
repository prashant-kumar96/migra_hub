import AdditionalDocuments from "@/components/AdditionalDocuments";
import AfterLoginLayout from "@/components/afterLoginLayout/AfterLoginLayout";
import PassportUploadComp from "@/components/PassportUploadComp";
import ProofOfFundsComp from "@/components/ProofOfFundsComp";
import ProofOfTiesComp from "@/components/ProofOfTies";
import React from "react";

const DocumentUpload = () => {
  return (
    <div>
      <PassportUploadComp />
      <ProofOfFundsComp />
      <ProofOfTiesComp />
      <AdditionalDocuments />
    </div>
  );
};

export default AfterLoginLayout(DocumentUpload);
