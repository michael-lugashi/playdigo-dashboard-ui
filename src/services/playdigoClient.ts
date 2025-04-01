import axios from 'axios';

const playdigoClient = axios.create({
  baseURL: 'http://127.0.0.1:3000',
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
