import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

const env = 'dev';
if (env !== 'dev') {
  axiosInstance.defaults.withCredentials = true;
}

export default axiosInstance;
