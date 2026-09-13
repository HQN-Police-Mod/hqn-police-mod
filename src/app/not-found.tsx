import { TransitionLink as Link } from "@/components/ui/TransitionLink";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen cinematic-bg flex flex-col items-center justify-center px-4 text-center">
      <div className="relative w-24 h-24 mb-8 opacity-60">
        <Image src="/HQN.png" alt="HQN" fill className="object-contain" />
      </div>
      <h1 className="heading-ar text-6xl font-black gold-text mb-4">404</h1>
      <h2 className="text-[#F5F0E8] text-2xl font-bold mb-3">الصفحة غير موجودة</h2>
      <p className="text-[#6B6558] text-base mb-8 max-w-sm">
        الصفحة التي تبحث عنها غير موجودة أو تم نقلها
      </p>
      <Link
        href="/"
        className="btn-gold px-8 py-4 rounded-xl font-bold text-base"
      >
        العودة للرئيسية
      </Link>
    </div>
  );
}
