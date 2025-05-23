import axios from "axios";

// Create an axios instance with your API base URL and credentials
const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

// Add a request interceptor to automatically attach the JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;