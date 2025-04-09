import AuthContext from '../contexts/AuthContext';
import { use } from 'react';

const useAuth = () => {
  const context = use(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthContext.Provider');
  }
  return context;
};

export default useAuth;
