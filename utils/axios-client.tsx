import axios from "axios";
import Cookies from "js-cookie";

const axiosClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/api`,
});

axiosClient.interceptors.request.use((config) => {
  const token = Cookies.get("ACCESS_TOKEN");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    if (response && response.status === 401) {
      if (typeof window !== "undefined") {
        Cookies.remove('ACCESS_TOKEN');
      }
    }
    throw error;
  }
);

export default axiosClient;
