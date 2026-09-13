"use client";

import { useState } from "react";
import { TransitionLink as Link } from "@/components/ui/TransitionLink";
import Image from "next/image";
import { ShoppingCart, Star, Tag } from "lucide-react";
import { products } from "@/data/products";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/utils/format";
import { useCart } from "@/hooks/useCart";
import { CartDrawer } from "./CartDrawer";

export function StoreGrid() {
  const cart = useCart();
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      {/* Cart Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setCartOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1A1A1F] border border-[#C9A84C]/20 text-[#C9A84C] hover:bg-[#C9A84C]/10 transition-all font-semibold text-sm"
        >
          <ShoppingCart size={18} />
          <span>السلة</span>
          {cart.itemCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-[#C9A84C] text-[#0A0A0B] text-xs font-black flex items-center justify-center">
              {cart.itemCount}
            </span>
          )}
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <GlassCard key={product.id} className="flex flex-col overflow-hidden" hover>
            {/* Product Image */}
            <div className="relative h-52 overflow-hidden bg-[#0D0D10]">
              <Image
                src={product.image}
                alt={product.nameAr}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              {/* Gradient overlay at bottom */}
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#0D0D10] to-transparent" />

              {/* Badges */}
              {product.isFeatured && (
                <div className="absolute top-3 right-3 z-10">
                  <Badge variant="gold">
                    <Star size={10} />
                    مميز
                  </Badge>
                </div>
              )}
              {product.discount && (
                <div className="absolute top-3 left-3 z-10">
                  <Badge variant="green">
                    <Tag size={10} />
                    -{product.discount}%
                  </Badge>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-[#F5F0E8] font-bold text-base leading-snug">
                  {product.nameAr}
                </h3>
                <div className="text-right shrink-0 mr-2">
                  <div className="text-[#E8C96A] font-black text-lg leading-none">
                    {formatPrice(product.price, product.currency)}
                  </div>
                  {product.discount && (
                    <div className="text-[#5A5045] text-xs line-through mt-0.5">
                      {formatPrice(
                        Math.round(product.price / (1 - product.discount / 100)),
                        product.currency
                      )}
                    </div>
                  )}
                </div>
              </div>

              <p className="text-[#8A8070] text-sm leading-relaxed mb-4 flex-1">
                {product.descriptionAr}
              </p>

              {/* Features */}
              <ul className="space-y-1 mb-5">
                {product.features.slice(0, 3).map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-[#8A8070] text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] shrink-0" />
                    {f}
                  </li>
                ))}
                {product.features.length > 3 && (
                  <li className="text-[#5A5045] text-xs">
                    +{product.features.length - 3} ميزات إضافية
                  </li>
                )}
              </ul>

              {/* Actions */}
              <div className="flex gap-2">
                <Link
                  href={`/store/${product.id}`}
                  className="flex-1 text-center py-2.5 text-sm font-semibold rounded-xl border border-[#C9A84C]/20 text-[#C9A84C] hover:bg-[#C9A84C]/10 transition-colors"
                >
                  التفاصيل
                </Link>
                <Button
                  size="sm"
                  onClick={() => {
                    cart.addItem(product);
                    setCartOpen(true);
                  }}
                  disabled={!product.isAvailable}
                  className="flex-1"
                >
                  <ShoppingCart size={15} />
                  <span>أضف</span>
                </Button>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
      />
    </>
  );
}
