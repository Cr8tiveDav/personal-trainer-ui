import { NextResponse, type NextProxy } from "next/server";
import { siteConfig } from "@/config/site";
import {
  isTrainerAppRoute,
  isTrainerSecretLoginRoute,
  TRAINER_LOGIN_PATH,
} from "@/lib/auth/trainer-routes";

const SECURITY_HEADERS: Record<string, string> = {
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
};

export const proxy: NextProxy = (request) => {
  const { pathname } = request.nextUrl;
  const userType = request.cookies.get("user_type")?.value;
  const accessToken = request.cookies.get(
    siteConfig.cookieNames.access_token,
  )?.value;
  const refreshToken = request.cookies.get(
    siteConfig.cookieNames.refresh_token,
  )?.value;

  const isApiRoute = pathname.startsWith("/api/");
  const isPublicAdminAuthPage =
    pathname.startsWith("/admin/login") ||
    pathname.startsWith("/admin/forgot-password");

  const isAdminPage =
    pathname.startsWith("/admin") && !isPublicAdminAuthPage && !isApiRoute;

  const isPublicTrainerAuth =
    pathname.startsWith(TRAINER_LOGIN_PATH) ||
    pathname.startsWith("/trainers/set-password") ||
    isTrainerSecretLoginRoute(pathname);

  const isTrainerProtected = isTrainerAppRoute(pathname);

  const hasAuthToken = !!accessToken || !!refreshToken;
  const isTrainer = userType === "trainer";

  if (isAdminPage && (userType !== "admin" || !hasAuthToken)) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  if (isTrainerProtected && (!isTrainer || !hasAuthToken)) {
    const loginUrl = new URL(TRAINER_LOGIN_PATH, request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (
    isPublicTrainerAuth &&
    isTrainer &&
    hasAuthToken &&
    pathname.startsWith(TRAINER_LOGIN_PATH)
  ) {
    return NextResponse.redirect(new URL("/trainer/dashboard", request.url));
  }

  const requestId = request.headers.get("x-request-id") ?? crypto.randomUUID();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-request-id", requestId);

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    response.headers.set(key, value);
  }
  response.headers.set("x-request-id", requestId);

  return response;
};

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|woff|woff2|ttf|eot)$).*)",
  ],
};
