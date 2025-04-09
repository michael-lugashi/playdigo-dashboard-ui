import { useState, useCallback, ReactNode, useMemo } from 'react';
import AuthContext from '../../contexts/AuthContext';

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [authToken, _setAuthToken] = useState(localStorage.getItem('token'));
  const [isAdmin, _setIsAdmin] = useState(localStorage.getItem('isAdmin') === 'true');
  const [institutionName, _setInstitutionName] = useState(localStorage.getItem('institutionName'));

  const setAuthToken = useCallback((token: string) => {
    _setAuthToken(token);
    localStorage.setItem('token', token);
  }, []);

  const setIsAdmin = useCallback((isAdmin: boolean) => {
    _setIsAdmin(isAdmin);
    localStorage.setItem('isAdmin', isAdmin.toString());
  }, []);

  const setInstitutionName = useCallback((institutionName: string) => {
    _setInstitutionName(institutionName);
    localStorage.setItem('institutionName', institutionName);
  }, []);

  const value = useMemo(
    () => ({ authToken, setAuthToken, isAdmin, institutionName, setIsAdmin, setInstitutionName }),
    [authToken, setAuthToken, isAdmin, institutionName, setIsAdmin, setInstitutionName]
  );

  return <AuthContext value={value}>{children}</AuthContext>;
}
