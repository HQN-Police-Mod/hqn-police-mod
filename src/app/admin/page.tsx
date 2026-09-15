import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify } from "jose";
import { AdminShell } from "@/components/admin/AdminShell";
import { GlassCard } from "@/components/ui/GlassCard";
import { FileText, Users, Package, ShoppingBag } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Dashboard" };

const JWT_SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET ?? process.env.NEXTAUTH_SECRET ?? "hqn_admin_jwt_secret"
);

async function getAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload as { username: string; role: string };
  } catch { return null; }
}

const stats = [
  { icon: FileText, label: "إجمالي الطلبات", value: "0", sub: "طلب تقديم", color: "#C9A84C" },
  { icon: Users, label: "أعضاء الإدارة", value: "2", sub: "أدمن", color: "#4ADE80" },
  { icon: Package, label: "المنتجات", value: "11", sub: "حزمة", color: "#60A5FA" },
  { icon: ShoppingBag, label: "الطلبات", value: "0", sub: "طلب شراء", color: "#F472B6" },
];

export default async function AdminDashboard() {
  const admin = await getAdmin();
  if (!admin) redirect("/admin/login");

  return (
    <AdminShell title="لوحة التحكم">
      <div className="mb-4">
        <p className="text-[#5A5045] text-sm">مرحباً، <span className="text-[#C9A84C] font-bold">{admin.username}</span></p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <GlassCard key={i} className="p-5">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
              style={{ background: `${s.color}15`, border: `1px solid ${s.color}30` }}>
              <s.icon size={18} style={{ color: s.color }} />
            </div>
            <div className="text-2xl font-black" style={{ color: s.color }}>{s.value}</div>
            <p className="text-[#F5F0E8] text-sm font-medium">{s.label}</p>
            <p className="text-[#5A5045] text-xs">{s.sub}</p>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="p-6">
        <h2 className="text-[#F5F0E8] font-bold mb-4">إجراءات سريعة</h2>
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { label: "إدارة المتجر", href: "/store/admin", color: "#C9A84C" },
            { label: "القوانين", href: "/admin/rules", color: "#60A5FA" },
            { label: "الإعدادات", href: "/admin/settings", color: "#4ADE80" },
          ].map((a, i) => (
            <a key={i} href={a.href}
              className="flex items-center justify-center py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
              style={{ background: `${a.color}15`, border: `1px solid ${a.color}30`, color: a.color }}>
              {a.label}
            </a>
          ))}
        </div>
      </GlassCard>
    </AdminShell>
  );
}
