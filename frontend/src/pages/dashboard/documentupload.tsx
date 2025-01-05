import DocumentUpload from '@/components/document-upload'
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/router'
import React from 'react'

export default function DocumentUploadSection() {
const router = useRouter();
  const { user, isLoading } = useAuth();

const userId = user?.user?._id;

  return (

    <div className=''>
           <DocumentUpload userId={userId} />
    </div>
  )
}
