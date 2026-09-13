"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ExternalLink } from "lucide-react";
import { cn } from "@/utils/cn";
import { siteConfig } from "@/config/site";
import { TransitionLink } from "@/components/ui/TransitionLink";

const navLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/about", label: "عن السيرفر" },
  { href: "/sectors", label: "القطاعات" },
  { href: "/store", label: "المتجر" },
  { href: "/rules", label: "القوانين" },
  { href: "/staff", label: "أصحاب السيرفر" },
  { href: "/status", label: "حالة السيرفر" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => setIsOpen(false), [pathname]);

  if (pathname.startsWith("/admin")) return null;

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[#0A0A0B]/95 backdrop-blur-md border-b border-[#C9A84C]/10 shadow-lg"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <TransitionLink href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 md:w-12 md:h-12">
              <Image
                src="/HQN.png"
                alt="HQN POLICE MOD"
                fill
                className="object-contain transition-transform duration-300 group-hover:scale-105"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <div className="text-[#E8C96A] font-black text-lg leading-none tracking-wide">
                HQN
              </div>
              <div className="text-[#B0A890] text-xs font-medium tracking-wider">
                POLICE MOD
              </div>
            </div>
          </TransitionLink>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <TransitionLink
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                  pathname === link.href
                    ? "text-[#E8C96A] bg-[#C9A84C]/10"
                    : "text-[#B0A890] hover:text-[#E8C96A] hover:bg-[#C9A84C]/8"
                )}
              >
                {link.label}
              </TransitionLink>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={siteConfig.DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[#C9A84C] border border-[#C9A84C]/30 rounded-lg hover:bg-[#C9A84C]/10 transition-all duration-200"
            >
              <span>Discord</span>
              <ExternalLink size={14} />
            </a>
            <a
              href={siteConfig.SERVER_CONNECT}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold px-5 py-2 text-sm rounded-lg font-bold"
            >
              دخول السيرفر
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-[#C9A84C] hover:bg-[#C9A84C]/10 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="bg-[#0D0D10]/98 backdrop-blur-md border-t border-[#C9A84C]/10 px-4 py-4">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <TransitionLink
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "px-4 py-3 text-base font-medium rounded-xl transition-all duration-200",
                  pathname === link.href
                    ? "text-[#E8C96A] bg-[#C9A84C]/12 border border-[#C9A84C]/20"
                    : "text-[#B0A890] hover:text-[#E8C96A] hover:bg-[#C9A84C]/8"
                )}
              >
                {link.label}
              </TransitionLink>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-[#C9A84C]/10 flex flex-col gap-3">
            <a
              href={siteConfig.DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3 text-[#C9A84C] border border-[#C9A84C]/30 rounded-xl font-semibold"
            >
              <span>انضم للـ Discord</span>
              <ExternalLink size={16} />
            </a>
            <a
              href={siteConfig.SERVER_CONNECT}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold py-3 rounded-xl font-bold text-center block"
            >
              دخول السيرفر
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
