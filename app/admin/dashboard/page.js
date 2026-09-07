import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE_NAME, verifyAdminCookie } from "@/lib/auth";
import AdminDashboard from "@/components/AdminDashboard";

export default async function DashboardPage() {
  const c = await cookies();
  if (!verifyAdminCookie(c.get(COOKIE_NAME)?.value)) redirect("/admin/login");
  return <AdminDashboard/>;
}
