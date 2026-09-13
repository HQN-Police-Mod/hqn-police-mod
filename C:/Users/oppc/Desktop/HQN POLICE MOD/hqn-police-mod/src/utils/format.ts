// ===================================================
// Formatting utilities
// ===================================================

export function formatPrice(price: number, currency: "SAR" | "USD" = "SAR"): string {
  if (currency === "SAR") {
    return `${price} ر.س`;
  }
  return `$${price}`;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("ar-SA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "الآن";
  if (minutes < 60) return `منذ ${minutes} دقيقة`;
  if (hours < 24) return `منذ ${hours} ساعة`;
  return `منذ ${days} يوم`;
}

export function getStatusLabel(status: string): { label: string; color: string } {
  const map: Record<string, { label: string; color: string }> = {
    pending: { label: "قيد المراجعة", color: "text-yellow-400" },
    accepted: { label: "مقبول", color: "text-green-400" },
    rejected: { label: "مرفوض", color: "text-red-400" },
    review: { label: "تحت المراجعة", color: "text-blue-400" },
  };
  return map[status] || { label: status, color: "text-gray-400" };
}

export function getRoleLabel(role: string): { label: string; color: string } {
  const map: Record<string, { label: string; color: string }> = {
    owner: { label: "المالك", color: "text-[#C9A84C]" },
    "co-owner": { label: "الشريك المؤسس", color: "text-[#C9A84C]" },
    admin: { label: "مشرف", color: "text-purple-400" },
    moderator: { label: "مراقب", color: "text-blue-400" },
    developer: { label: "مطور", color: "text-green-400" },
    support: { label: "دعم فني", color: "text-gray-400" },
  };
  return map[role] || { label: role, color: "text-gray-400" };
}
