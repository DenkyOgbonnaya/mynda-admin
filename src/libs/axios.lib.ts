import axios, { InternalAxiosRequestConfig, AxiosRequestConfig } from "axios";

import {
  clearAccessToken,
  getAccessToken,
  getRefreshToken,
} from "utills/appStorage";
import { BASE_URL } from "constants/env.constant";

const httpClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": true,
    crossorigin: true,
  },
});

// Add a request interceptor
httpClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    if (token) {
      if (config.headers) config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return error;
  }
);

httpClient.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    if (err.response.status === 401) {
      clearAccessToken();
      window.location.href = "/";
    }
    return Promise.reject(err);
  }
);
export default httpClient;
