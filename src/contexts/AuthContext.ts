import { createContext } from 'react';

type AuthContextType = {
  authToken: string | null;
  setAuthToken: (token: string) => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;
