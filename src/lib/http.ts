import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosProgressEvent,
  type InternalAxiosRequestConfig,
} from "axios";
import { API_ENDPOINTS } from "@/api/api-endpoints";
import { getApiBaseUrl } from "@/lib/api-base-url";
import {
  getRefreshToken,
  getToken,
  invalidateAccessTokenCache,
  isAccessTokenExpired,
  logoutUser,
} from "./get-token";
import { refreshAccessTokenClient } from "./refresh-access-token";

export type ErrorData = {
  message: string;
  validationErrors?: string | [string] | [{ description: string }];
};

type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

let apiInstance: AxiosInstance | null = null;
let isRefreshing = false;
let refreshQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

function isLoginRequest(url: string) {
  return (
    url.includes(API_ENDPOINTS.AUTH.ADMIN_LOGIN) ||
    url.includes(API_ENDPOINTS.AUTH.TRAINER_LOGIN)
  );
}

function isAuthEndpoint(url: string) {
  return isLoginRequest(url) || url.includes(API_ENDPOINTS.AUTH.REFRESH);
}

function setAuthHeader(config: InternalAxiosRequestConfig, token: string) {
  if (typeof config.headers?.set === "function") {
    config.headers.set("Authorization", `Bearer ${token}`);
  } else {
    config.headers.Authorization = `Bearer ${token}`;
  }
}

function processRefreshQueue(error: unknown | null, token: string | null) {
  refreshQueue.forEach(({ resolve, reject }) => {
    if (error || !token) reject(error ?? new Error("Token refresh failed"));
    else resolve(token);
  });
  refreshQueue = [];
}

async function refreshSession(): Promise<string | null> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;

  invalidateAccessTokenCache();
  const expiredAccessToken = getToken();

  return refreshAccessTokenClient(refreshToken, expiredAccessToken);
}

/** Returns a valid access token, refreshing silently when expired. */
export async function ensureValidAccessToken(): Promise<string | null> {
  const refreshToken = getRefreshToken();
  const accessToken = getToken();

  if (!refreshToken) return accessToken;

  const shouldRefresh = !accessToken || isAccessTokenExpired();

  if (!shouldRefresh) return accessToken;

  if (isRefreshing) {
    return new Promise<string>((resolve, reject) => {
      refreshQueue.push({ resolve, reject });
    });
  }

  isRefreshing = true;

  try {
    const newToken = await refreshSession();
    processRefreshQueue(null, newToken);
    return newToken ?? accessToken;
  } catch (error) {
    processRefreshQueue(error, null);
    throw error;
  } finally {
    isRefreshing = false;
  }
}

function getApi(): AxiosInstance {
  if (apiInstance) return apiInstance;

  apiInstance = axios.create({
    baseURL: getApiBaseUrl(),
  });

  apiInstance.interceptors.request.use(
    async (config) => {
      const requestUrl = String(config.url ?? "");

      if (!isAuthEndpoint(requestUrl)) {
        const token = await ensureValidAccessToken();
        if (token) setAuthHeader(config, token);
      }

      return config;
    },
    (error) => Promise.reject(error),
  );

  apiInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const status = error.response?.status;
      const originalRequest = error.config as
        | RetryableRequestConfig
        | undefined;
      const requestUrl = String(originalRequest?.url ?? "");

      if (
        status !== 401 ||
        !originalRequest ||
        originalRequest._retry ||
        isAuthEndpoint(requestUrl)
      ) {
        return Promise.reject(error);
      }

      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        if (getToken()) logoutUser();
        return Promise.reject(error);
      }

      originalRequest._retry = true;
      invalidateAccessTokenCache();

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          refreshQueue.push({
            resolve: (token) => {
              setAuthHeader(originalRequest, token);
              resolve(getApi()(originalRequest));
            },
            reject,
          });
        });
      }

      isRefreshing = true;

      try {
        const newToken = await refreshSession();

        if (!newToken) {
          processRefreshQueue(error, null);
          logoutUser();
          return Promise.reject(error);
        }

        processRefreshQueue(null, newToken);
        setAuthHeader(originalRequest, newToken);
        return getApi()(originalRequest);
      } catch (refreshError) {
        processRefreshQueue(refreshError, null);
        logoutUser();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    },
  );

  return apiInstance;
}

export const getRequest = async <T>(params: {
  url: string;
  signal?: AbortSignal;
}) => {
  const { data } = await getApi().get<T>(params.url, { signal: params.signal });

  return data;
};

export const getBlobRequest = async (params: {
  url: string;
  signal?: AbortSignal;
}) => {
  const { data } = await getApi().get<Blob>(params.url, {
    responseType: "blob",
    signal: params.signal,
  });

  return data;
};

export const postRequest = async <T, P>(params: {
  url: string;
  payload: P;
  signal?: AbortSignal;
}) => {
  return getApi().post<T>(params.url, params.payload, {
    signal: params.signal,
  });
};

export const patchRequest = async <T, P>(params: {
  url: string;
  payload: P;
}) => {
  return getApi().patch<T>(params.url, params.payload);
};

export const patchFormRequest = async <T>(params: {
  url: string;
  payload: FormData;
}) => {
  const { data } = await getApi().patch<T>(params.url, params.payload);

  return data;
};

export const putRequest = async <T, P>(params: { url: string; payload: P }) => {
  const { data } = await getApi().put<T>(params.url, params.payload);

  return data;
};

export const deleteRequest = async <T>(params: { url: string }) => {
  const { data } = await getApi().delete<T>(params.url);

  return data;
};

export const uploadRequest = async <T, P>(params: {
  url: string;
  payload: P;
  onUploadProgress?: (event: AxiosProgressEvent) => void;
  signal?: AbortSignal;
}) => {
  const { data } = await getApi().post<T>(params.url, params.payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: params.onUploadProgress,
    signal: params.signal,
  });

  return data;
};
