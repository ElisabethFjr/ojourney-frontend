import axios from 'axios';

// Create an Axios instance with the base URL
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

// Set common headers for Content-Type
axiosInstance.defaults.headers.common['Content-Type'] =
  'application/x-www-form-urlencoded';

// If a user token is found, set it as an Authorization header in Axios
if (localStorage.getItem('userToken')) {
  axiosInstance.defaults.headers.common.Authorization =
    localStorage.getItem('userToken')?.replace(/"|_/g, '') || '';
}

// Check environment and set credentials if not in development
const env = null;
if (env !== 'dev' || !/iPad|iPhone|iPod/.test(navigator.userAgent)) {
  axiosInstance.defaults.withCredentials = true;
}

export default axiosInstance;
