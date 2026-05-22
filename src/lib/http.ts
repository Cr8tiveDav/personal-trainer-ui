import axios, { type AxiosInstance, type AxiosProgressEvent } from "axios";
import { getApiBaseUrl } from "@/lib/api-base-url";
import { getToken, logoutUser } from "./get-token";

export type ErrorData = {
  message: string;
  validationErrors?: string | [string] | [{ description: string }];
};

let apiInstance: AxiosInstance | null = null;

function getApi(): AxiosInstance {
  if (apiInstance) return apiInstance;

  apiInstance = axios.create({
    baseURL: getApiBaseUrl(),
  });

  apiInstance.interceptors.request.use(
    (config) => {
      const token = getToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error),
  );

  apiInstance.interceptors.response.use(
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

  return apiInstance;
}

export const getRequest = async <T>(params: {
  url: string;
  signal?: AbortSignal;
}) => {
  const { data } = await getApi().get<T>(params.url, { signal: params.signal });

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
