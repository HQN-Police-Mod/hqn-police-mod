"use client";

import Image from "next/image";
import { ExternalLink, ChevronDown, Zap } from "lucide-react";
import { siteConfig } from "@/config/site";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[#07070A]" />
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 50% -10%, rgba(201,168,76,0.13) 0%, transparent 55%),
              radial-gradient(ellipse at 20% 60%,  rgba(160,120,50,0.06)  0%, transparent 40%),
              radial-gradient(ellipse at 80% 80%,  rgba(201,168,76,0.04)  0%, transparent 40%)
            `,
          }}
        />
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div
          className="absolute bottom-0 left-0 right-0 h-48"
          style={{ background: "linear-gradient(to top, #07070A, transparent)" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto pt-24 pb-20 w-full">

        {/* Logo */}
        <div className="flex justify-center mb-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <div className="relative w-32 h-32 md:w-40 md:h-40 animate-float">
            <div className="absolute inset-0 rounded-full bg-[#C9A84C]/10 blur-2xl scale-125" />
            <Image
              src="/HQN.png"
              alt="HQN POLICE MOD"
              fill
              className="object-contain relative z-10 drop-shadow-2xl"
              priority
            />
          </div>
        </div>

        {/* Motto Badge */}
        <div
          className="flex items-center justify-center gap-2 mb-6 animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C9A84C]/20 bg-[#C9A84C]/5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse-gold" />
            <span className="text-[#C9A84C] text-sm font-semibold tracking-widest">
              {siteConfig.MOTTO}
            </span>
          </span>
        </div>

        {/* Main Heading */}
        <h1
          className="heading-ar text-5xl sm:text-6xl md:text-7xl font-black mb-4 animate-fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          <span className="gold-text">HQN</span>
          <br />
          <span className="text-[#F5F0E8]">POLICE MOD</span>
        </h1>

        {/* Arabic Tagline */}
        <p
          className="text-[#C9A84C] text-xl md:text-2xl font-bold mb-6 animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          {siteConfig.SERVER_TAGLINE}
        </p>

        {/* Description */}
        <p
          className="text-[#8A8070] text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10 animate-fade-in-up"
          style={{ animationDelay: "0.5s" }}
        >
          سيرفر Police Mod سعودي احترافي يجمع بين الواقعية والتنظيم الأمني.
          منظومة متكاملة من القطاعات بإدارة عالية المستوى ومجتمع متماسك.
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up"
          style={{ animationDelay: "0.6s" }}
        >
          <a
            href={siteConfig.SERVER_CONNECT}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold gap-2 px-8 py-4 rounded-xl text-base font-bold w-full sm:w-auto"
          >
            <Zap size={18} />
            <span>دخول السيرفر</span>
          </a>

          <a
            href={siteConfig.DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-gold gap-2 px-8 py-4 rounded-xl text-base font-semibold w-full sm:w-auto"
          >
            <ExternalLink size={18} />
            <span>Discord</span>
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-16 flex justify-center animate-bounce opacity-40">
          <ChevronDown size={28} className="text-[#C9A84C]" />
        </div>
      </div>
    </section>
  );
}
