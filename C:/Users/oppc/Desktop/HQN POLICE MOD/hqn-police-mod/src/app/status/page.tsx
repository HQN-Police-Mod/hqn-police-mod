import type { Metadata } from "next";
import { PageLayout } from "@/components/layout/PageLayout";
import { ServerStatusPage } from "@/components/sections/ServerStatusPage";

export const metadata: Metadata = {
  title: "حالة السيرفر",
  description: "تابع حالة سيرفر HQN POLICE MOD مباشرة — عدد اللاعبين والاتصال",
};

export default function StatusPage() {
  return (
    <PageLayout>
      <ServerStatusPage />
    </PageLayout>
  );
}
