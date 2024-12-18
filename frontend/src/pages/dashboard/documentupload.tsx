import { me } from "@/api/auth";
import AdditionalDocuments from "@/components/AdditionalDocuments";
import AfterLoginLayout from "@/components/afterLoginLayout/AfterLoginLayout";
import PassportUploadComp from "@/components/PassportUploadComp";
import ProofOfFundsComp from "@/components/ProofOfFundsComp";
import ProofOfTiesComp from "@/components/ProofOfTies";
import { useAuth } from "@/context/auth-context";
import { meDataAtom } from "@/store/meDataAtom";
import { useAtom } from "jotai";
import React, { useEffect } from "react";

const DocumentUpload = () => {
  const [sharedMedata, setSharedMedata] = useAtom(meDataAtom);
  const { user, isLoading } = useAuth();
  // const getmedata = async () => {
  //   const result = await me();
  //   setSharedMedata(result?.data?.user);
  // };

  // useEffect(() => {
  //   getmedata();
  // }, []);

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
