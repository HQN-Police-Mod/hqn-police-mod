import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "لوحة الإدارة",
    template: "%s | Admin — HQN",
  },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#09090C]">
      {children}
    </div>
  );
}
