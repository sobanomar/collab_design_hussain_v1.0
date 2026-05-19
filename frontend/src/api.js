import axios from "axios";

const api = axios.create({
  baseURL: "https://collab-design-hussain-v1-0.onrender.com",
  headers: { "Content-Type": "application/json" },
  validateStatus: (status) => status < 500, // Treat 4xx errors as valid responses
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("collabToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
