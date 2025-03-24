import axios from 'axios';

const playdigoClient = axios.create({
  baseURL: 'http://127.0.0.1:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default playdigoClient;

export const playdigoLogin = async (email: string, password: string) => {
  try {
    const res = await playdigoClient.post('auth/authenticate', { email, password });
    return res.data.token;
  } catch (error) {
    console.log(error);
  }
};
