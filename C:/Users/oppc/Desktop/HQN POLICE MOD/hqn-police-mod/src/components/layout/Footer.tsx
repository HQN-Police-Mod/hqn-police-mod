import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { siteConfig } from "@/config/site";
import { TransitionLink } from "@/components/ui/TransitionLink";

const footerLinks = {
  navigation: [
    { href: "/", label: "الرئيسية" },
    { href: "/about", label: "عن السيرفر" },
    { href: "/sectors", label: "القطاعات" },
    { href: "/status", label: "حالة السيرفر" },
  ],
  resources: [
    { href: "/store", label: "المتجر" },
    { href: "/rules", label: "القوانين" },
    { href: "/staff", label: "أصحاب السيرفر" },
    { href: "/discord", label: "Discord" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-[#C9A84C]/10 bg-[#0A0A0B] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">

          {/* Brand */}
          <div className="md:col-span-2">
            <TransitionLink href="/" className="flex items-center gap-3 mb-4">
              <div className="relative w-12 h-12">
                <Image src="/HQN.png" alt="HQN" fill className="object-contain" />
              </div>
              <div>
                <div className="text-[#E8C96A] font-black text-xl leading-none">HQN POLICE MOD</div>
                <div className="text-[#8A6820] text-xs mt-1">{siteConfig.MOTTO}</div>
              </div>
            </TransitionLink>
            <p className="text-[#6B6558] text-sm leading-relaxed max-w-xs">
              {siteConfig.SERVER_DESCRIPTION}
            </p>
            <div className="mt-6 flex items-center gap-4">
              <a
                href={siteConfig.DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[#C9A84C] hover:text-[#E8C96A] transition-colors"
              >
                <ExternalLink size={14} />
                <span>Discord</span>
              </a>
              <span className="text-[#2A2A32]">|</span>
              <a
                href={siteConfig.SERVER_CONNECT}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#C9A84C] hover:text-[#E8C96A] transition-colors"
              >
                دخول السيرفر
              </a>
            </div>
          </div>

          {/* Nav Links */}
          <div>
            <h4 className="text-[#E8C96A] font-semibold mb-4 text-sm uppercase tracking-widest">
              التنقل
            </h4>
            <ul className="space-y-2">
              {footerLinks.navigation.map((item) => (
                <li key={item.href}>
                  <TransitionLink
                    href={item.href}
                    className="text-[#6B6558] hover:text-[#C9A84C] text-sm transition-colors"
                  >
                    {item.label}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Resource Links */}
          <div>
            <h4 className="text-[#E8C96A] font-semibold mb-4 text-sm uppercase tracking-widest">
              روابط
            </h4>
            <ul className="space-y-2">
              {footerLinks.resources.map((item) => (
                <li key={item.href}>
                  <TransitionLink
                    href={item.href}
                    className="text-[#6B6558] hover:text-[#C9A84C] text-sm transition-colors"
                  >
                    {item.label}
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="section-divider mb-6" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-[#3A3A42] text-xs">
          <p>© {new Date().getFullYear()} HQN POLICE MOD. جميع الحقوق محفوظة.</p>
          <p className="gold-text font-semibold text-xs">{siteConfig.MOTTO}</p>
        </div>
      </div>
    </footer>
  );
}
