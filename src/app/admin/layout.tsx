import { AdminShell } from "@/components/admin/dashboard/AdminShell";
import { cookies } from "next/headers";
import { isValidImageSrc } from "@/lib/utils";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const profileCookie = cookieStore.get("user_profile")?.value;
  const userType = cookieStore.get("user_type")?.value ?? "";

  let userName = "Admin";
  let userEmail = "";
  let userAvatar = undefined;

  if (profileCookie) {
    try {
      const user = JSON.parse(profileCookie);
      userName = user.name || userName;
      userEmail = user.email || userEmail;
      userAvatar = isValidImageSrc(user.avatar_url) ? user.avatar_url : undefined;
    } catch (e) {
      console.error("Failed to parse user_profile cookie inside layout:", e);
    }
  }

  return (
    <AdminShell
      userName={userName}
      userEmail={userEmail}
      userAvatar={userAvatar}
      userType={userType}
    >
      {children}
    </AdminShell>
  );
}
