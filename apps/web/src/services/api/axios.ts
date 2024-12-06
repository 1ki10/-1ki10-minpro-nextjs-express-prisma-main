import axios from 'axios';
import { apiConfig } from '@/config/api';

const DEFAULT_TOKEN = 'org-001';

export const api = axios.create({
  baseURL: 'http://localhost:3001/api',  // Pastikan ini selalu ke port 3001
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Gunakan token dari localStorage atau default token
    const token = localStorage.getItem('token') || DEFAULT_TOKEN;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Untuk development, langsung gunakan default token
      localStorage.setItem('token', DEFAULT_TOKEN);
      originalRequest.headers.Authorization = `Bearer ${DEFAULT_TOKEN}`;
      return api(originalRequest);
    }

    return Promise.reject(error);
  }
);