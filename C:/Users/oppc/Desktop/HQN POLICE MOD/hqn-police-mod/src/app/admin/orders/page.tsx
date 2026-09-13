import { AdminShell } from "@/components/admin/AdminShell";
import { GlassCard } from "@/components/ui/GlassCard";
import { ShoppingBag } from "lucide-react";

export default function OrdersAdmin() {
  return (
    <AdminShell title="الطلبات المالية">
      <GlassCard className="p-10 text-center">
        <ShoppingBag size={48} className="text-[#2A2A32] mx-auto mb-4" />
        <h3 className="text-[#F5F0E8] font-bold text-lg mb-2">طلبات المتجر</h3>
        <p className="text-[#5A5045] text-sm max-w-sm mx-auto">
          {/* TODO: Connect payment provider */}
          هذا القسم يتطلب ربط مزود خدمة الدفع (Stripe / PayPal / غيره).
          حدد المزود في <code className="text-[#C9A84C] bg-[#1A1A1F] px-1 rounded">src/config/site.ts</code>{" "}
          ثم أضف التكامل في <code className="text-[#C9A84C] bg-[#1A1A1F] px-1 rounded">src/services/payments.ts</code>
        </p>
      </GlassCard>
    </AdminShell>
  );
}
