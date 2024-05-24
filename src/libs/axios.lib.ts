import axios, { InternalAxiosRequestConfig, AxiosRequestConfig } from "axios";

import { getAccessToken, getRefreshToken } from "utills/appStorage";
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
    const originalRequest = err.config;
    const refreshToken = getRefreshToken();
    const config: AxiosRequestConfig = {
      headers: {
        "X-REFRESH": refreshToken!,
      },
    };

    // if (err.response.status === 401 && !originalRequest._retry) {
    //   if (err.response.status === 401 && !originalRequest._retry) {
    //     originalRequest._retry = true;
    //     const refreshToken = getRefreshToken()
    //     const data = await httpClient.post('/auth/refresh-tokenization', {refreshToken});

    //     if (data && data.data) {
    //       if (data.data.accessToken) setAccessToken(data.data.accessToken);
    //     }
    //   }
    //   return httpClient(originalRequest);
    // }
    return Promise.reject(err);
  }
);
export default httpClient;
