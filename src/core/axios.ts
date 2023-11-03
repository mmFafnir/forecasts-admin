import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies(null, { path: "/" });

const instance = axios.create({
  baseURL: "https://admin.aibetguru.com/api/admin",
});
instance.interceptors.request.use((config) => {
  const token = cookies.get("_token") ? cookies.get("_token") : "";
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
