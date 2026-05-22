import type { ApiEnvelope } from "@/api/types/index";
import { authenticatedFetch } from "@/lib/services/auth-session";
import { ApiError, UnauthorizedError } from "./errors";

export { ApiError, UnauthorizedError };
export type { ApiEnvelope };

export async function apiRequest<T>(
  path: string,
  init?: RequestInit,
): Promise<{ response: Response; body: ApiEnvelope<T> }> {
  const response = await authenticatedFetch(path, init);
  const body = (await response.json().catch(() => ({}))) as ApiEnvelope<T>;

  if (response.status === 401) {
    throw new UnauthorizedError(
      body.message || "Session expired or invalid. Please log in again.",
    );
  }

  return { response, body };
}

export async function apiGetData<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const { response, body } = await apiRequest<T>(path, init);

  if (!response.ok) {
    throw new ApiError(
      body.message ?? `Request failed (${response.status})`,
      response.status,
      body,
    );
  }

  return body.data;
}

export async function apiPostData<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const { response, body } = await apiRequest<T>(path, {
    method: "POST",
    ...init,
  });

  if (!response.ok) {
    throw new ApiError(
      body.message ?? `Request failed (${response.status})`,
      response.status,
      body,
    );
  }

  return body.data;
}
