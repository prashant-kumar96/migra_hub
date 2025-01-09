import { ProgressBar } from '@/components/afterLoginLayout/AfterLoginLayout';
import DocumentUpload from '@/components/document-upload'
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/router'
import React from 'react'

export default function DocumentUploadSection() {
const router = useRouter();
  const { user, isLoading } = useAuth();

const userId = user?.user?._id;
const applicationStatusId = user?.user?.applicationId;

  return (

    <div className=''>
        <ProgressBar />
           <DocumentUpload applicationStatusId={applicationStatusId} userId={userId} />
    </div>
  )
}
