// contexts/AppContext.tsx
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
 import { useAuth } from './auth-context'; // Assuming you have an auth context
import { getApplicationStatusDetails } from '@/api/applicationStatus';
import { checkifPaymentIsDone } from '@/api/auth';

interface AppContextProps {
  profileCompletionStatus: string;
  isPaymentDone: boolean;
  refreshAppStatus: () => Promise<void>; // Add a refresh function
  appLoading: boolean; // Add loading state
  appError: string | null; // Add error state
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [profileCompletionStatus, setProfileCompletionStatus] = useState('');
  const [isPaymentDone, setIsPaymentDone] = useState(false);
  const [appLoading, setAppLoading] = useState(false); // Add loading state
  const [appError, setAppError] = useState<string | null>(null); // Add error state

  const { user, isAuthenticated } = useAuth();
  const applicationId = user?.user?.applicationId;
  const userId = user?.user?._id;

    const refreshAppStatus = async () => {
        if (!applicationId || !userId) {
            return;  //Don't fetch if we don't have the IDs
        }

        setAppLoading(true); // Start loading
        setAppError(null);    // Clear previous errors

    try{
        const profileStatusResponse = await getApplicationStatusDetails(applicationId);
        setProfileCompletionStatus(profileStatusResponse?.data?.applicationStatus?.profileCompletion || '');

        const paymentStatusResponse = await checkifPaymentIsDone(userId);
        setIsPaymentDone(paymentStatusResponse?.data?.status || false);
    } catch (error: any) {
        setAppError(error.message || "An error occurred while fetching data."); // Set the error
    } finally {
          setAppLoading(false);  //End loading.
    }
  };

  useEffect(() => {
    if (isAuthenticated) { // Only fetch if authenticated
      refreshAppStatus();
    }
  }, [isAuthenticated, applicationId, userId]); // Depend on isAuthenticated, applicationId and userId

  const contextValue = {
    profileCompletionStatus,
    isPaymentDone,
      refreshAppStatus,  // Provide the refresh function
      appLoading,
      appError
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export { AppProvider, useAppContext };