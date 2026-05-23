import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosProgressEvent,
  type InternalAxiosRequestConfig,
} from "axios";
import { API_ENDPOINTS } from "@/api/api-endpoints";
import { getApiBaseUrl } from "@/lib/api-base-url";
import {
  getJwtType,
  hasJwtExp,
  isJwtExpired,
} from "@/lib/jwt";
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

export type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
  /** When true, a 401 will not trigger token refresh (logout, refresh endpoint, etc.). */
  _skipAuthRefresh?: boolean;
};

let apiInstance: AxiosInstance | null = null;

/** Refresh token that already failed — avoid reusing after server rotation. */
let rejectedRefreshToken: string | null = null;

/** Single in-flight refresh shared by concurrent 401s and proactive refresh. */
let refreshPromise: Promise<string | null> | null = null;

/** Call after a successful login so a prior failed refresh does not block the new session. */
export function resetAuthRefreshState() {
  rejectedRefreshToken = null;
  refreshPromise = null;
  invalidateAccessTokenCache();
}

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

function isRefreshTokenUsable(refreshToken: string): boolean {
  if (!refreshToken.trim()) return false;
  if (refreshToken === rejectedRefreshToken) return false;

  if (hasJwtExp(refreshToken)) {
    const typ = getJwtType(refreshToken);
    if (typ && typ !== "refresh") return false;
    if (isJwtExpired(refreshToken)) return false;
  }

  return true;
}

function shouldProactivelyRefresh(accessToken: string | null): boolean {
  if (!accessToken) return true;
  if (isAccessTokenExpired()) return true;
  if (hasJwtExp(accessToken) && isJwtExpired(accessToken, 30_000)) return true;
  return false;
}

function coalescedRefresh(
  refreshToken: string,
  accessToken: string | null,
): Promise<string | null> {
  refreshPromise ??= refreshAccessTokenClient(refreshToken, accessToken)
    .then((token) => {
      if (token) rejectedRefreshToken = null;
      return token;
    })
    .finally(() => {
      refreshPromise = null;
    });

  return refreshPromise;
}

/**
 * If another request refreshed while we were queued, retry with the latest tokens
 * instead of refreshing again with a stale refresh token.
 */
function retryWithLatestTokens(
  originalRequest: RetryableRequestConfig,
  capturedRefreshToken: string,
): Promise<unknown> | null {
  const currentRefreshToken = getRefreshToken();
  if (
    !currentRefreshToken ||
    currentRefreshToken === capturedRefreshToken ||
    !isRefreshTokenUsable(currentRefreshToken)
  ) {
    return null;
  }

  invalidateAccessTokenCache();
  const currentAccessToken = getToken();
  if (!currentAccessToken) return null;

  setAuthHeader(originalRequest, currentAccessToken);
  return getApi()(originalRequest);
}

async function refreshSession(
  refreshToken: string,
  accessToken: string | null,
): Promise<string | null> {
  const currentRefreshToken = getRefreshToken();
  if (
    currentRefreshToken &&
    currentRefreshToken !== refreshToken &&
    isRefreshTokenUsable(currentRefreshToken)
  ) {
    invalidateAccessTokenCache();
    const currentAccessToken = getToken();
    if (currentAccessToken) return currentAccessToken;
  }

  return coalescedRefresh(refreshToken, accessToken);
}

/** Returns a valid access token, refreshing silently when expired. */
export async function ensureValidAccessToken(): Promise<string | null> {
  const refreshToken = getRefreshToken();
  const accessToken = getToken();

  if (!refreshToken) return accessToken;
  if (!shouldProactivelyRefresh(accessToken)) return accessToken;
  if (!isRefreshTokenUsable(refreshToken)) return accessToken;

  try {
    if (refreshPromise) return refreshPromise;
    return await refreshSession(refreshToken, accessToken);
  } catch {
    return accessToken;
  }
}

async function handleUnauthorized(
  error: AxiosError,
  originalRequest: RetryableRequestConfig,
): Promise<unknown> {
  const refreshToken = getRefreshToken();
  const accessToken = getToken();

  if (!refreshToken) {
    if (accessToken) logoutUser();
    return Promise.reject(error);
  }

  if (!isRefreshTokenUsable(refreshToken)) {
    rejectedRefreshToken = refreshToken;
    logoutUser();
    return Promise.reject(error);
  }

  originalRequest._retry = true;
  invalidateAccessTokenCache();

  const retried = retryWithLatestTokens(originalRequest, refreshToken);
  if (retried) return retried;

  if (refreshPromise) {
    try {
      const newToken = await refreshPromise;
      if (!newToken) {
        rejectedRefreshToken = refreshToken;
        logoutUser();
        return Promise.reject(error);
      }
      setAuthHeader(originalRequest, newToken);
      return getApi()(originalRequest);
    } catch {
      rejectedRefreshToken = refreshToken;
      logoutUser();
      return Promise.reject(error);
    }
  }

  try {
    const newToken = await refreshSession(refreshToken, accessToken);
    if (!newToken) {
      rejectedRefreshToken = refreshToken;
      logoutUser();
      return Promise.reject(error);
    }
    setAuthHeader(originalRequest, newToken);
    return getApi()(originalRequest);
  } catch {
    rejectedRefreshToken = refreshToken;
    logoutUser();
    return Promise.reject(error);
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
      const originalRequest = error.config as RetryableRequestConfig | undefined;
      const requestUrl = String(originalRequest?.url ?? "");

      if (originalRequest?._skipAuthRefresh) {
        return Promise.reject(error);
      }

      if (
        status !== 401 ||
        !originalRequest ||
        originalRequest._retry ||
        isAuthEndpoint(requestUrl)
      ) {
        return Promise.reject(error);
      }

      return handleUnauthorized(error, originalRequest);
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
  /** Milliseconds; 0 = no timeout (recommended for large uploads). */
  timeout?: number;
}) => {
  const { data } = await getApi().post<T>(params.url, params.payload, {
    onUploadProgress: params.onUploadProgress,
    signal: params.signal,
    timeout: params.timeout ?? 0,
    maxBodyLength: Infinity,
    maxContentLength: Infinity,
    // Let axios set multipart boundary — a manual Content-Type breaks uploads.
  });

  return data;
};
