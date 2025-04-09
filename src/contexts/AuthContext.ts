import { createContext } from 'react';

interface AuthContextType {
  authToken: string | null;
  setAuthToken: (token: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;
