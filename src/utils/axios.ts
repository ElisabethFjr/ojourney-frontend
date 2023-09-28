import axios from 'axios';

// const localstorage = localStorage.getItem('token');
// const token = localstorage.replace(/"|_/g, '');
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    // Authorization: `Bearer ${token}`,
  },
});

export default axiosInstance;
