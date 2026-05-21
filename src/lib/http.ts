import axios from "axios";
import type { AxiosProgressEvent } from "axios";
import { getApiBaseUrl } from "@/lib/api-base-url";
import { getToken } from "./get-token";
import { logoutUser } from "./get-token";

export type ErrorData = {
  message: string;
  validationErrors?: string | [string] | [{ description: string }];
};

const api = axios.create({
  baseURL: getApiBaseUrl(),
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor to handle unauthorized responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status || error.status;
    const message = error.response?.data?.message;

    if (
      (message === "Invalid Authorization" && status === 401) ||
      status === 401
    ) {
      logoutUser();
    }
    return Promise.reject(error);
  },
);

export const getRequest = async <T>(params: {
  url: string;
  signal?: AbortSignal;
}) => {
  const { data } = await api.get<T>(params.url, { signal: params.signal });

  return data;
};

export const postRequest = async <T, P>(params: {
  url: string;
  payload: P;
  signal?: AbortSignal;
}) => {
  return await api.post<T>(params.url, params.payload, {
    signal: params.signal,
  });
};

export const patchRequest = async <T, P>(params: {
  url: string;
  payload: P;
}) => {
  return await api.patch<T>(params.url, params.payload);
};

export const putRequest = async <T, P>(params: { url: string; payload: P }) => {
  const { data } = await api.put<T>(params.url, params.payload);

  return data;
};

export const deleteRequest = async <T>(params: { url: string }) => {
  const { data } = await api.delete<T>(params.url);

  return data;
};

export const uploadRequest = async <T, P>(params: {
  url: string;
  payload: P;
  onUploadProgress?: (event: AxiosProgressEvent) => void;
  signal?: AbortSignal;
}) => {
  const { data } = await api.post<T>(params.url, params.payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: params.onUploadProgress,
    signal: params.signal,
  });

  return data;
};
