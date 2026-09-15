"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ExternalLink, LogIn, LogOut, User } from "lucide-react";
import { cn } from "@/utils/cn";
import { siteConfig } from "@/config/site";
import { TransitionLink } from "@/components/ui/TransitionLink";
import { useSession, signIn, signOut } from "next-auth/react";

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
  const { data: session, status } = useSession();

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
              <div className="text-[#E8C96A] font-black text-lg leading-none tracking-wide">HQN</div>
              <div className="text-[#B0A890] text-xs font-medium tracking-wider">POLICE MOD</div>
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

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Discord */}
            <a
              href={siteConfig.DISCORD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[#C9A84C] border border-[#C9A84C]/30 rounded-lg hover:bg-[#C9A84C]/10 transition-all duration-200"
            >
              <span>Discord</span>
              <ExternalLink size={14} />
            </a>

            {/* Auth Button */}
            {status === "loading" ? (
              <div className="w-8 h-8 rounded-full bg-[#1A1A1F] animate-pulse" />
            ) : session ? (
              <div className="flex items-center gap-2">
                {session.user?.image ? (
                  <img src={session.user.image} alt="" className="w-8 h-8 rounded-full border border-[#C9A84C]/30" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#C9A84C]/10 border border-[#C9A84C]/30 flex items-center justify-center">
                    <User size={14} className="text-[#C9A84C]" />
                  </div>
                )}
                <button
                  onClick={() => signOut()}
                  className="flex items-center gap-1 px-3 py-2 text-xs font-semibold text-[#5A5045] hover:text-red-400 transition-colors rounded-lg"
                >
                  <LogOut size={13} />
                  <span>خروج</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn("google")}
                className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-white/5 border border-white/10 text-[#F5F0E8] rounded-lg hover:bg-white/10 transition-all"
              >
                <GoogleIcon />
                <span>تسجيل الدخول</span>
              </button>
            )}

            {/* Join Server */}
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
          isOpen ? "max-h-[700px] opacity-100" : "max-h-0 opacity-0"
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
            {/* Mobile Auth */}
            {session ? (
              <div className="flex items-center justify-between px-4 py-3 glass-card rounded-xl">
                <div className="flex items-center gap-2">
                  {session.user?.image && (
                    <img src={session.user.image} alt="" className="w-8 h-8 rounded-full" />
                  )}
                  <span className="text-[#B0A890] text-sm truncate max-w-[150px]">{session.user?.name}</span>
                </div>
                <button onClick={() => signOut()} className="text-[#5A5045] hover:text-red-400 transition-colors">
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn("google")}
                className="flex items-center justify-center gap-2 py-3 glass-card rounded-xl text-[#F5F0E8] font-semibold text-sm"
              >
                <GoogleIcon />
                <span>تسجيل الدخول بـ Google</span>
              </button>            )}

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

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}
