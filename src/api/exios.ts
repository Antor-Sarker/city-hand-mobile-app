import { BASE_URL } from "@/config/api";
import { tokenStorage } from "@/storage/tokenStorage";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { router } from "expo-router";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else if (token) {
      promise.resolve(token);
    }
  });

  failedQueue = [];
};

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await tokenStorage.getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.headers["X-Client-Type"] = "mobileApp";
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;

            resolve(api(originalRequest));
          },
          reject,
        });
      });
    }
    isRefreshing = true;

    try {
      const newAccessToken = await refreshAccessToken();
      processQueue(null, newAccessToken);
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return api(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);

      await logoutApi();

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

const refreshAccessToken = async () => {
  const refreshToken = await tokenStorage.getRefreshToken();

  try {
    const data: { accessToken: string } = await api.post(
      `/auth/refresh-token`,
      {
        refreshToken,
      },
    );
    await tokenStorage.setAccessToken(data.accessToken);
    return data.accessToken;
  } catch (error) {
    console.log("refresh token api error");
  }
};

const logoutApi = async () => {
  try {
    const refreshToken = await tokenStorage.getRefreshToken();

    await api.post(`/api/auth/logout`, {
      refreshToken,
    });
    tokenStorage.clearTokens();

    router.replace("/(tabs)/profile/auth");
  } catch (error) {
    console.log("Logout API failed");
  }
};

export default api;
