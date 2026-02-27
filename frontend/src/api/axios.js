import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: "https://edu-platform-dqrr.onrender.com/api",
  timeout: 60000, // 60 seconds for Render cold starts
});

// Request interceptor - Attach token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Network error (no internet, CORS, timeout, etc.)
    if (!error.response) {
      if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
        toast.error("Request timeout. Server might be starting up (cold start). Please try again in 30 seconds.");
      } else if (error.message === 'Network Error') {
        toast.error("Network error. Please check your internet connection and try again.");
      } else {
        toast.error("Unable to connect to server. Please check your internet connection.");
      }
      return Promise.reject(error);
    }

    // Handle specific HTTP errors (only for errors without custom messages)
    const status = error.response.status;
    
    if (status === 401 && !error.response.data?.message) {
      // Only show generic 401 if there's no custom message
      toast.error("Session expired. Please login again.");
      localStorage.clear();
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } else if (status === 403 && !error.response.data?.message) {
      toast.error("Access denied.");
    } else if (status === 404 && !error.response.data?.message) {
      toast.error("Resource not found.");
    } else if (status >= 500) {
      // Always show server errors
      toast.error("Server error. Please try again later.");
    }
    // For 400 and other errors with custom messages, let the page handle it

    return Promise.reject(error);
  }
);

export default api;