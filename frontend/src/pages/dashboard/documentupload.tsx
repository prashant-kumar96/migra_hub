import AfterLoginLayout, { ProgressBar } from '@/components/afterLoginLayout/AfterLoginLayout';
import DocumentUpload from '@/components/document-upload'
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/router'
import React from 'react'

 function DocumentUploadSection() {
const router = useRouter();
  const { user, isLoading } = useAuth();

const userId = user?.user?._id;
const applicationId = user?.user?.applicationId;

  return (

    <div className='w-full mx-auto max-w-3xl'>
            <ProgressBar />
           <DocumentUpload applicationId={applicationId} userId={userId} />
    </div>
  )
}

export default AfterLoginLayout(DocumentUploadSection)
