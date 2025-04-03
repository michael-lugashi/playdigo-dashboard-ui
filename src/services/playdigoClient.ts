import axios from 'axios';

// Determine if we're running in development mode
const isDevelopment = import.meta.env.MODE === 'development';

const playdigoClient = axios.create({
  baseURL: isDevelopment ? 'http://localhost:3000' : 'https://api.playdigo-dash.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default playdigoClient;

export const playdigoLogin = async (email: string, password: string) => {
  const res = await playdigoClient.post('auth/authenticate', { email, password });
  return res.data.token;
};

export const getPlaydigoDashboardData = async () => {
  const res = await playdigoClient.get('dashboard/data');
  return res.data;
};
