"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Users,
  Package,
  ShoppingBag,
  UserCog,
  BookOpen,
  Settings,
  ExternalLink,
  X,
} from "lucide-react";
import { cn } from "@/utils/cn";

const navItems = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/applications", icon: FileText, label: "الطلبات" },
  { href: "/admin/players", icon: Users, label: "اللاعبون" },
  { href: "/admin/products", icon: Package, label: "المنتجات" },
  { href: "/admin/orders", icon: ShoppingBag, label: "الطلبات المالية" },
  { href: "/admin/staff", icon: UserCog, label: "الإدارة" },
  { href: "/admin/rules", icon: BookOpen, label: "القوانين" },
  { href: "/admin/settings", icon: Settings, label: "الإعدادات" },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminSidebar({ isOpen, onClose }: Props) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 right-0 h-full w-64 z-50 admin-sidebar transition-transform duration-300",
          "lg:translate-x-0",
          isOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-5 border-b border-[#C9A84C]/10">
          <div className="flex items-center gap-2">
            <div className="relative w-8 h-8">
              <Image src="/HQN.png" alt="HQN" fill className="object-contain" />
            </div>
            <div>
              <div className="text-[#E8C96A] font-black text-sm leading-none">HQN</div>
              <div className="text-[#5A5045] text-[10px]">ADMIN</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-[#5A5045] hover:text-[#C9A84C] p-1"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-[#C9A84C]/12 text-[#E8C96A] border border-[#C9A84C]/20"
                    : "text-[#6B6558] hover:text-[#C9A84C] hover:bg-[#C9A84C]/8"
                )}
              >
                <item.icon size={17} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#C9A84C]/10">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 text-[#5A5045] hover:text-[#C9A84C] text-xs transition-colors"
          >
            <ExternalLink size={13} />
            <span>عرض الموقع</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
