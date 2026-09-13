import { AdminShell } from "@/components/admin/AdminShell";
import { GlassCard } from "@/components/ui/GlassCard";
import { FileText, Users, Package, ShoppingBag } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Dashboard" };

const stats = [
  { icon: FileText, label: "إجمالي الطلبات", value: "0", sub: "طلب تقديم", color: "#C9A84C" },
  { icon: Users, label: "أعضاء الإدارة", value: "6", sub: "عضو نشط", color: "#4ADE80" },
  { icon: Package, label: "المنتجات", value: "5", sub: "منتج متاح", color: "#60A5FA" },
  { icon: ShoppingBag, label: "الطلبات المالية", value: "0", sub: "طلب شراء", color: "#F472B6" },
];

export default function AdminDashboard() {
  return (
    <AdminShell title="لوحة التحكم">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s, i) => (
          <GlassCard key={i} className="p-5">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
              style={{ background: `${s.color}15`, border: `1px solid ${s.color}30` }}
            >
              <s.icon size={18} style={{ color: s.color }} />
            </div>
            <div className="text-2xl font-black" style={{ color: s.color }}>
              {s.value}
            </div>
            <p className="text-[#F5F0E8] text-sm font-medium">{s.label}</p>
            <p className="text-[#5A5045] text-xs">{s.sub}</p>
          </GlassCard>
        ))}
      </div>

      {/* Quick Actions */}
      <GlassCard className="p-6 mb-8">
        <h2 className="text-[#F5F0E8] font-bold mb-4">إجراءات سريعة</h2>
        <div className="grid sm:grid-cols-3 gap-3">
          {[
            { label: "مراجعة الطلبات", href: "/admin/applications", color: "#C9A84C" },
            { label: "إدارة المنتجات", href: "/admin/products", color: "#60A5FA" },
            { label: "الإعدادات", href: "/admin/settings", color: "#4ADE80" },
          ].map((action, i) => (
            <a
              key={i}
              href={action.href}
              className="flex items-center justify-center py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
              style={{
                background: `${action.color}15`,
                border: `1px solid ${action.color}30`,
                color: action.color,
              }}
            >
              {action.label}
            </a>
          ))}
        </div>
      </GlassCard>

      {/* Note */}
      <GlassCard className="p-5 border-yellow-500/20">
        <p className="text-[#8A8070] text-sm">
          <span className="text-yellow-400 font-semibold">ملاحظة: </span>
          هذه لوحة إدارة تجريبية. لتفعيل المصادقة وحماية الوصول، قم بإعداد{" "}
          <code className="bg-[#1A1A1F] px-1.5 py-0.5 rounded text-xs font-mono text-[#C9A84C]">
            ADMIN_SECRET
          </code>{" "}
          في ملف{" "}
          <code className="bg-[#1A1A1F] px-1.5 py-0.5 rounded text-xs font-mono text-[#C9A84C]">
            .env.local
          </code>
          .
          {" "}كما يمكن إضافة NextAuth.js أو Clerk لمصادقة كاملة.
        </p>
      </GlassCard>
    </AdminShell>
  );
}
