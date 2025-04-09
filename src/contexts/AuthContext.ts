import { createContext } from 'react';

interface AuthContextType {
  authToken: string | null;
  setAuthToken: (token: string) => void;
  isAdmin: boolean;
  institutionName: string | null;
  setIsAdmin: (isAdmin: boolean) => void;
  setInstitutionName: (institutionName: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;
