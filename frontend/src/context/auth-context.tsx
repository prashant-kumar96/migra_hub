import React, {
    createContext,
    useState,
    useEffect,
    ReactNode,
    useContext,
  } from 'react';
  import { useRouter } from 'next/navigation';
   import { useSearchParams } from 'next/navigation';
import { me } from '@/api/auth';


interface AuthContextProps {
  user: any | null;
  token: string | null;
  isLoading: boolean;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean; // added is authenticated
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const searchParams = useSearchParams();

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setToken(token);
    fetchUser(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    // router.push('/login');
  };

  const fetchUser = async (token: string) => {
    setIsLoading(true);
    try {
      const response = await me();
      console.log(";; current user", response);
      if (!response || !response.status) {
        console.log("Error logging in user");
        logout();
        return;
      }
      setUser(response.data);
      setIsAuthenticated(true);
    } catch (err) {
      console.error("Error fetching user: ", err);
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUser(token);
    } else {
        setIsLoading(false);
    }
  }, [searchParams]);

  const value = {
    user,
    token,
    isLoading,
    login,
    logout,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};