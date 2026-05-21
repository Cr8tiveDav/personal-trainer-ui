import { NextResponse, type NextProxy } from "next/server";

const SECURITY_HEADERS: Record<string, string> = {
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
};

export const proxy: NextProxy = (request) => {
  // Route Protection & Token Expiration Logic
  const { pathname } = request.nextUrl;
  const userType = request.cookies.get("user_type")?.value;
  const sessionToken = request.cookies.get("session_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;

  const isApiRoute = pathname.startsWith("/api/");
  const isAdminPage =
    pathname.startsWith("/admin") &&
    !pathname.startsWith("/admin/login") &&
    !isApiRoute;
  const isTrainerPage =
    pathname.startsWith("/trainers") &&
    !pathname.startsWith("/trainers/login") &&
    !isApiRoute;

  const hasAuthToken = !!sessionToken || !!refreshToken;

  if (isAdminPage || isTrainerPage) {
    if (isAdminPage && (userType !== "admin" || !hasAuthToken)) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    if (isTrainerPage && (userType !== "trainer" || !hasAuthToken)) {
      return NextResponse.redirect(new URL("/trainers/login", request.url));
    }
  }

  // Default request headers and security headers
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
