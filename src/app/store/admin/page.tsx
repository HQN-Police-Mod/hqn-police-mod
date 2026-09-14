import { auth, isAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";
import { StoreAdminClient } from "@/components/admin/StoreAdminClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "إدارة المتجر",
  robots: { index: false, follow: false },
};

export default async function StoreAdminPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/auth/signin");
  }

  if (!isAdmin(session.user.email)) {
    redirect("/store");
  }

  return <StoreAdminClient user={session.user} />;
}
