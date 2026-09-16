import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { jwtVerify } from "jose";
import { AdminShell } from "@/components/admin/AdminShell";
import { GlassCard } from "@/components/ui/GlassCard";
import { prisma } from "@/lib/prisma";
import { FileText, Users, Package, Tag } from "lucide-react";
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

export default async function AdminDashboard() {
  const admin = await getAdmin();
  if (!admin) redirect("/admin/login");

  // Fetch real stats from DB
  const [productCount, couponCount, adminCount] = await Promise.all([
    prisma.product.count(),
    prisma.coupon.count({ where: { isActive: true } }),
    prisma.adminUser.count(),
  ]);

  const stats = [
    { icon: Package, label: "المنتجات", value: String(productCount), sub: "منتج في المتجر", color: "#C9A84C" },
    { icon: Tag, label: "الكوبونات النشطة", value: String(couponCount), sub: "كوبون مفعّل", color: "#4ADE80" },
    { icon: Users, label: "المسؤولون", value: String(adminCount), sub: "حساب إداري", color: "#60A5FA" },
    { icon: FileText, label: "الإعدادات", value: "—", sub: "اضغط للوصول", color: "#F472B6" },
  ];

  return (
    <AdminShell title="لوحة التحكم">
      <div className="mb-5 p-4 glass-card rounded-xl flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-[#C9A84C]/15 border border-[#C9A84C]/30 flex items-center justify-center">
          <span className="text-[#C9A84C] font-black text-sm">{admin.username.charAt(0).toUpperCase()}</span>
        </div>
        <div>
          <p className="text-[#F5F0E8] font-semibold text-sm">مرحباً، <span className="text-[#C9A84C]">{admin.username}</span></p>
          <p className="text-[#5A5045] text-xs">{admin.role === "SUPER_ADMIN" ? "أدمن رئيسي" : "مسؤول متجر"}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <GlassCard key={i} className="p-5">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
              style={{ background: `${s.color}15`, border: `1px solid ${s.color}30` }}>
              <s.icon size={18} style={{ color: s.color }} />
            </div>
            <div className="text-2xl font-black mb-0.5" style={{ color: s.color }}>{s.value}</div>
            <p className="text-[#F5F0E8] text-sm font-medium">{s.label}</p>
            <p className="text-[#5A5045] text-xs">{s.sub}</p>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="p-6">
        <h2 className="text-[#F5F0E8] font-bold mb-4">إجراءات سريعة</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { label: "إدارة المنتجات والكوبونات", href: "/store/admin", color: "#C9A84C", desc: "أضف وعدّل الحزم" },
            { label: "القوانين", href: "/admin/rules", color: "#60A5FA", desc: "عرض وتعديل القوانين" },
            { label: "الإعدادات", href: "/admin/settings", color: "#4ADE80", desc: "إعدادات الموقع" },
          ].map((a, i) => (
            <a key={i} href={a.href}
              className="flex flex-col p-4 rounded-xl text-sm font-semibold transition-all hover:opacity-90 hover:scale-[1.02]"
              style={{ background: `${a.color}10`, border: `1px solid ${a.color}25` }}>
              <span style={{ color: a.color }}>{a.label}</span>
              <span className="text-[#5A5045] text-xs mt-1 font-normal">{a.desc}</span>
            </a>
          ))}
        </div>
      </GlassCard>
    </AdminShell>
  );
}
