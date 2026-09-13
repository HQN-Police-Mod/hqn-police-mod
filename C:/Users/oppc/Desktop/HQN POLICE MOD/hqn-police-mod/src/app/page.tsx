import { PageLayout } from "@/components/layout/PageLayout";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { DiscordCTA } from "@/components/sections/DiscordCTA";
import { Reveal } from "@/components/ui/Reveal";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HQN POLICE MOD | الموقع الرسمي",
  description: "الموقع الرسمي لسيرفر HQN POLICE MOD — تجربة Police Mod سعودية احترافية",
};

export default function HomePage() {
  return (
    <PageLayout>
      <HeroSection />
      <Reveal direction="up" delay={0}>
        <StatsSection />
      </Reveal>
      <Reveal direction="up" delay={0}>
        <AboutPreview />
      </Reveal>
      <Reveal direction="up" delay={0}>
        <DiscordCTA />
      </Reveal>
    </PageLayout>
  );
}
