import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { ReactNode, useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import playdigoClient from '../../services/playdigoClient';
import useAuth from '../../hooks/useAuth';
import Modal from './Modal';
import PackmanLoader from './PackmanLoader';

const AxiosInterceptor: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const { authToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isSet, setIsSet] = useState(false);

  useLayoutEffect(() => {
    setIsSet(true);
    const resInterceptor = (response: AxiosResponse) => {
      setIsLoading(false);
      return response;
    };

    const reqInterceptor = (config: InternalAxiosRequestConfig) => {
      setIsLoading(true);
      if (!authToken) return config;
      config.headers.Authorization = `Bearer ${authToken}`;
      return config;
    };

    const errInterceptor = async (error: AxiosError) => {
      setIsLoading(false);
      if (error.response?.status === 401 || error.response?.status === 403) {
        await navigate('/login');
      }

      throw error;
    };

    const responseInterceptor = playdigoClient.interceptors.response.use(resInterceptor, errInterceptor);
    const rejectInterceptor = playdigoClient.interceptors.request.use(reqInterceptor);

    return () => {
      playdigoClient.interceptors.response.eject(responseInterceptor);
      playdigoClient.interceptors.request.eject(rejectInterceptor);
    };
  }, [navigate, authToken]);

  return (
    isSet && (
      <>
        <Modal isOpen={isLoading}>
          <PackmanLoader />
        </Modal>
        {children}
      </>
    )
  );
};

export default AxiosInterceptor;
