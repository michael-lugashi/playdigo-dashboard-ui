import axios from 'axios';
import { AuthResponse, DashboardData, User } from './playdigoClient.types';

// Determine if we're running in development mode
const isDevelopment = import.meta.env.MODE === 'development';

const playdigoClient = axios.create({
  baseURL: isDevelopment ? 'http://localhost:3000' : 'https://api.playdigo-dash.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default playdigoClient;

export const playdigoLogin = async (email: string, password: string): Promise<AuthResponse> => {
  const res = await playdigoClient.post<AuthResponse>('auth/authenticate', { email, password });
  return res.data;
};

export const getPlaydigoGraphOptions = async (): Promise<string[]> => {
  const res = await playdigoClient.get<string[]>('users/sheet-options');
  return res.data;
};

export const getPlaydigoDashboardData = async (graphOption: string): Promise<DashboardData> => {
  const res = await playdigoClient.get<DashboardData>('dashboard/data', {
    params: {
      sheetName: graphOption,
    },
  });
  return res.data;
};

export const getPlaydigoUsers = async (): Promise<User[]> => {
  const res = await playdigoClient.get<User[]>('users');
  return res.data;
};

export const getAllPlaydigoGraphOptions = async (): Promise<string[]> => {
  const res = await playdigoClient.get<string[]>('users/all-graph-options');
  return res.data;
};

export const updatePlaydigoUser = async (id: string, updates: Partial<User>): Promise<User> => {
  const res = await playdigoClient.put<User>(`users/${id}`, updates);
  return res.data;
};
