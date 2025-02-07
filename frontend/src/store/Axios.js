import axios from "axios";

const ax = axios.create({
    baseURL: "http://localhost:5173/api/accounts",
});

ax.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem("access_token");
    return config;
  });
  
  export default ax;