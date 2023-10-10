import axios from 'axios';
import { redirect } from 'react-router-dom';

// Create an Axios instance with the base URL
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

// Set common headers for Content-Type
axiosInstance.defaults.headers.common['Content-Type'] =
  'application/x-www-form-urlencoded';

// Interceptor to redirect the user to the /500 route if status code of the response if 500 (Internal Server Error).
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 500) {
      redirect('/500');
    }
    return Promise.reject(error);
  }
);

// Check environment and set credentials if not in development
const env = 'dev';
if (env !== 'dev') {
  axiosInstance.defaults.withCredentials = true;
}

export default axiosInstance;
