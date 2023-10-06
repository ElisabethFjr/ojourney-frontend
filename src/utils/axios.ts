import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  const configCopy = { ...config };
  if (token) {
    configCopy.headers.Authorization = `Bearer ${token}`;
  }
  return configCopy;
});

const env = 'dev';
if (env !== 'dev') {
  axiosInstance.defaults.withCredentials = true;
}

export default axiosInstance;
