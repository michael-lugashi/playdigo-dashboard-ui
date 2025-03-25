import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router';
import playdigoClient from '../../services/playdigoClient';
import useAuth from '../../hooks/useAuth';

const AxiosInterceptor = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const { authToken } = useAuth();

  useEffect(() => {
    const resInterceptor = (response: AxiosResponse) => {
      return response;
    };

    const reqInterceptor = (config: InternalAxiosRequestConfig) => {
      if (!authToken) return config;
      config.headers.Authorization = `Bearer ${authToken}`;
      return config;
    };

    const errInterceptor = (error: AxiosError) => {
      if (error?.response?.status === 401) {
        navigate('/login');
      }

      return Promise.reject(error);
    };

    const responseInterceptor = playdigoClient.interceptors.response.use(resInterceptor, errInterceptor);
    const rejectInterceptor = playdigoClient.interceptors.request.use(reqInterceptor);

    return () => {
      playdigoClient.interceptors.response.eject(responseInterceptor);
      playdigoClient.interceptors.request.eject(rejectInterceptor);
    };
  }, [navigate, authToken]);

  return <>{children}</>;
};

export default AxiosInterceptor;
