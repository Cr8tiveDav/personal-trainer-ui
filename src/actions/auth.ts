/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { adminLogin, trainerLogin } from "@/lib/services/auth";
import { cookies } from "next/headers";

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const type = formData.get("type") as "admin" | "trainer";

  try {
    const result =
      type === "admin"
        ? await adminLogin({ email, password })
        : await trainerLogin({ email, password });

    const cookieStore = await cookies();

    cookieStore.set("session_token", result.data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: result.data.expires_in,
    });

    cookieStore.set("refresh_token", result.data.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    cookieStore.set("user_type", result.data.user.user_type, {
      httpOnly: false,
      sameSite: "lax",
      path: "/",
    });

    const userProfile = {
      name: result.data.user?.name ?? "",
      email: result.data.user?.email ?? "",
      avatar_url: result.data.user?.avatar_url ?? null,
    };

    cookieStore.set("user_profile", JSON.stringify(userProfile), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: result.data.expires_in,
    });

    const apiUserType = result.data.user.user_type;

    return {
      success: true,
      redirectTo:
        apiUserType === "trainer" ? "/trainer/dashboard" : "/admin/dashboard",
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
}
