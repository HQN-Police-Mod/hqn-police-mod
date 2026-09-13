"use client";

import { useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { products as initialProducts } from "@/data/products";
import { formatPrice } from "@/utils/format";
import type { Product } from "@/types";
import { Plus, Package } from "lucide-react";

export default function ProductsAdmin() {
  const [products, setProducts] = useState(initialProducts);

  const toggleAvailability = (id: string) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, isAvailable: !p.isAvailable } : p
      )
    );
  };

  return (
    <AdminShell title="إدارة المنتجات">
      <div className="flex justify-between items-center mb-6">
        <p className="text-[#6B6558] text-sm">{products.length} منتج</p>
        <button className="flex items-center gap-2 btn-gold px-4 py-2 rounded-xl text-sm font-bold">
          <Plus size={16} />
          <span>منتج جديد</span>
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {products.map((product: Product) => (
          <GlassCard key={product.id} className="p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">
                  {product.category === "vip" ? "👑" : product.category === "bundle" ? "📦" : "🎁"}
                </span>
                <div>
                  <h3 className="text-[#F5F0E8] font-bold text-sm">{product.nameAr}</h3>
                  <p className="text-[#5A5045] text-xs">{product.category}</p>
                </div>
              </div>
              <Badge variant={product.isAvailable ? "green" : "red"}>
                {product.isAvailable ? "متاح" : "مخفي"}
              </Badge>
            </div>

            <p className="text-[#E8C96A] font-black text-lg mb-3">
              {formatPrice(product.price, product.currency)}
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => toggleAvailability(product.id)}
                className="flex-1 py-2 rounded-lg text-xs font-semibold bg-[#1A1A1F] border border-[#2A2A32] text-[#8A8070] hover:border-[#C9A84C]/30 hover:text-[#C9A84C] transition-all"
              >
                {product.isAvailable ? "إخفاء" : "إظهار"}
              </button>
              <button className="flex-1 py-2 rounded-lg text-xs font-semibold bg-[#C9A84C]/10 border border-[#C9A84C]/20 text-[#C9A84C] hover:bg-[#C9A84C]/20 transition-all">
                تعديل
              </button>
            </div>
          </GlassCard>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-20 text-[#5A5045]">
          <Package size={40} className="mx-auto mb-3 opacity-30" />
          <p>لا توجد منتجات</p>
        </div>
      )}
    </AdminShell>
  );
}
