import { useState, useCallback, ReactNode, useMemo } from 'react';
import AuthContext from '../../contexts/AuthContext';

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [authToken, setAuthT] = useState(localStorage.getItem('token'));

  // Function to update the token
  const setAuthToken = useCallback((token: string) => {
    setAuthT(token);
    localStorage.setItem('token', token);
  }, []);

  const value = useMemo(() => ({ authToken, setAuthToken }), [authToken, setAuthToken]);

  return <AuthContext value={value}>{children}</AuthContext>;
}
