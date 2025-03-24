import { useState, useCallback, ReactNode } from 'react';
import AuthContext from '../../contexts/AuthContext';

type AuthProviderProps = {
  children: ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const [authToken, setAuthT] = useState(localStorage.getItem('token'));

  // Function to update the token
  const setAuthToken = useCallback((token: string) => {
    setAuthT(token);
    localStorage.setItem('token', token);
  }, []);

  return <AuthContext.Provider value={{ authToken, setAuthToken }}>{children}</AuthContext.Provider>;
}
