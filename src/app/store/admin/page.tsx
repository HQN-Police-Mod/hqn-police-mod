import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify } from "jose";
import { StoreAdminClient } from "@/components/admin/StoreAdminClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "إدارة المتجر",
  robots: { index: false, follow: false },
};

const JWT_SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET ?? process.env.NEXTAUTH_SECRET ?? "hqn_admin_jwt_secret"
);

export default async function StoreAdminPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (!token) redirect("/admin/login");

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    const admin = payload as { username: string; role: string; id: string };

    return (
      <StoreAdminClient
        user={{ name: admin.username, email: admin.username, image: null }}
      />
    );
  } catch {
    redirect("/admin/login");
  }
}
