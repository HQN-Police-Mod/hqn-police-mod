import { AdminShell } from "@/components/admin/AdminShell";
import { GlassCard } from "@/components/ui/GlassCard";
import { Users } from "lucide-react";

export default function PlayersAdmin() {
  return (
    <AdminShell title="اللاعبون">
      <GlassCard className="p-10 text-center">
        <Users size={48} className="text-[#2A2A32] mx-auto mb-4" />
        <h3 className="text-[#F5F0E8] font-bold text-lg mb-2">إدارة اللاعبين</h3>
        <p className="text-[#5A5045] text-sm max-w-sm mx-auto">
          {/* TODO: Connect to server database or FiveM API */}
          هذا القسم يتطلب ربطاً مع قاعدة بيانات السيرفر أو FiveM API.
          أضف الاتصال في <code className="text-[#C9A84C] bg-[#1A1A1F] px-1 rounded">src/services/players.ts</code>
        </p>
      </GlassCard>
    </AdminShell>
  );
}
