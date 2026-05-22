"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { postRequest } from "~/lib/http";
import { displayError, showSuccessToast } from "~/lib/utils";
import { API_ENDPOINTS } from "./api-endpoints";
import type { LoginPayload, LoginResponse } from "./types/auth";
import { siteConfig } from "@/config/site";
import { clearAuthCookies, logoutUser, setToken } from "@/lib/get-token";

export type LoginType = "admin" | "trainer";

type UseLoginOptions = {
  type: LoginType;
  redirectTo?: string;
};

function resolveRedirectPath(
  userType: string | undefined,
  loginType: LoginType,
  redirectTo?: string,
) {
  if (redirectTo) return redirectTo;
  const role = userType ?? loginType;
  return role === "trainer" ? "/trainer/dashboard" : "/admin/dashboard";
}

function persistAuthSession(body: LoginResponse["data"]) {
  setToken(
    siteConfig.cookieNames.access_token,
    body.access_token,
    body.expires_in,
  );
  setToken(
    siteConfig.cookieNames.refresh_token,
    body.refresh_token,
    7 * 24 * 60 * 60,
  );

  const userType = body.user.user_type ?? "admin";
  setToken(siteConfig.cookieNames.user_type, userType);

  if (body.user.email) {
    setToken(siteConfig.cookieNames.email, body.user.email);
  }

  if (body.user.name || body.user.avatar_url) {
    setToken(
      siteConfig.cookieNames.user_profile,
      JSON.stringify({
        name: body.user.name ?? "",
        email: body.user.email ?? "",
        avatar_url: body.user.avatar_url ?? null,
      }),
    );
  }
}

export function useLogin(options: UseLoginOptions) {
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: LoginPayload) => {
      const url =
        options.type === "admin"
          ? API_ENDPOINTS.AUTH.ADMIN_LOGIN
          : API_ENDPOINTS.AUTH.TRAINER_LOGIN;

      return postRequest<LoginResponse, LoginPayload>({ url, payload });
    },
    mutationKey: ["login", options.type],

    onSuccess(response) {
      if (!response?.data?.data) {
        toast.error("Login failed");
        return;
      }

      persistAuthSession(response.data.data);
      showSuccessToast("Login successful!");
      router.push(
        resolveRedirectPath(
          response.data.data.user.user_type,
          options.type,
          options.redirectTo,
        ),
      );
    },

    onError(error) {
      displayError(error);
    },
  });
}

export function useLogout(loginPath?: string) {
  return useMutation({
    mutationFn: async () => ({ ok: true }),
    mutationKey: ["logout"],

    onSuccess() {
      clearAuthCookies();
      logoutUser(loginPath ?? "/admin/login");
    },

    onError(error) {
      displayError(error);
    },
  });
}
