import axios from 'axios';

// Create an Axios instance with the base URL
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

// Set common headers for Content-Type
axiosInstance.defaults.headers.common['Content-Type'] =
  'application/x-www-form-urlencoded';

// Interceptor to include the Authorization token if available
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  const configCopy = { ...config };
  if (token) {
    configCopy.headers.Authorization = `Bearer ${token}`;
  }
  return configCopy;
});

// Check environment and set credentials if not in development
const env = 'dev';
if (env !== 'dev') {
  axiosInstance.defaults.withCredentials = true;
}

export default axiosInstance;
