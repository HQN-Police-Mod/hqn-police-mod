"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { AdminSidebar } from "./AdminSidebar";

interface Props {
  children: React.ReactNode;
  title: string;
}

export function AdminShell({ children, title }: Props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex" dir="rtl">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content — offset for fixed sidebar on desktop */}
      <div className="flex-1 lg:mr-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-[#09090C]/90 backdrop-blur-sm border-b border-[#C9A84C]/8 px-5 py-3 flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 text-[#6B6558] hover:text-[#C9A84C] transition-colors rounded-lg"
          >
            <Menu size={20} />
          </button>
          <h1 className="text-[#F5F0E8] font-bold text-lg">{title}</h1>
        </header>

        {/* Page Content */}
        <main className="p-5 md:p-8">{children}</main>
      </div>
    </div>
  );
}
