import axios from 'axios';

const API = axios.create({
  baseURL: 'https://shop-backend-qp87.onrender.com',
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
