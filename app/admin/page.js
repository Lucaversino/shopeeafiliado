import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE_NAME, verifyAdminCookie } from "@/lib/auth";

export default async function AdminPage() {
  const c = await cookies();
  if (verifyAdminCookie(c.get(COOKIE_NAME)?.value)) redirect("/admin/dashboard");
  redirect("/admin/login");
}
