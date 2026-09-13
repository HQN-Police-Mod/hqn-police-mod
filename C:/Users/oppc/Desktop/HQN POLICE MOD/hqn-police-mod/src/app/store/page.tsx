import { PageLayout } from "@/components/layout/PageLayout";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { StoreGrid } from "@/components/sections/StoreGrid";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "المتجر",
  description: "متجر HQN POLICE MOD — منتجات وباقات حصرية",
};

export default function StorePage() {
  return (
    <PageLayout>
      {/* Hero */}
      <div className="relative pt-32 pb-16 px-4 text-center cinematic-bg">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="relative max-w-3xl mx-auto">
          <span className="badge-gold mb-4 inline-block">المتجر</span>
          <h1 className="heading-ar text-4xl md:text-5xl font-black mb-4 gold-text">
            المتجر الرسمي
          </h1>
          <p className="text-[#8A8070] text-lg">
            منتجات وباقات حصرية لدعم السيرفر والحصول على مزايا مميزة
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <SectionHeader
          badge="المنتجات"
          title="اختر باقتك"
          subtitle="جميع الأسعار بالريال السعودي"
        />
        <StoreGrid />
      </div>
    </PageLayout>
  );
}
