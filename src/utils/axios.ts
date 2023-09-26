import axios from 'axios';

// console.log('VITE_BASE_URL', import.meta.env.VITE_BASE_URL);

export default axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});
