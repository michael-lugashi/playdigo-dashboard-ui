import axios from 'axios';
import { AuthResponse, DashboardData } from './playdigoClient.types';

// Determine if we're running in development mode
const isDevelopment = import.meta.env.MODE === 'development';

const playdigoClient = axios.create({
  baseURL: isDevelopment ? 'http://localhost:3000' : 'https://api.playdigo-dash.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default playdigoClient;

export const playdigoLogin = async (email: string, password: string): Promise<string> => {
  const res = await playdigoClient.post<AuthResponse>('auth/authenticate', { email, password });
  return res.data.token;
};

export const getPlaydigoDashboardData = async (): Promise<DashboardData> => {
  const res = await playdigoClient.get<DashboardData>('dashboard/data');
  return res.data;
};
