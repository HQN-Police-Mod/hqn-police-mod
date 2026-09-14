"use client";

import { useState } from "react";
import { X, ShoppingCart, Trash2, Plus, Minus, Tag, CheckCircle, XCircle } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/utils/format";
import type { useCart } from "@/hooks/useCart";
import { siteConfig } from "@/config/site";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: ReturnType<typeof useCart>;
}

interface CouponResult {
  code: string;
  discount: number;
  description: string | null;
}

export function CartDrawer({ isOpen, onClose, cart }: CartDrawerProps) {
  const [couponCode, setCouponCode] = useState("");
  const [coupon, setCoupon] = useState<CouponResult | null>(null);
  const [couponError, setCouponError] = useState("");
  const [couponLoading, setCouponLoading] = useState(false);

  const discountedTotal = coupon
    ? Math.round(cart.total * (1 - coupon.discount / 100))
    : cart.total;

  const validateCoupon = async () => {
    if (!couponCode.trim()) return;
    setCouponLoading(true);
    setCouponError("");
    setCoupon(null);
    try {
      const r = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponCode.trim() }),
      });
      const d = await r.json();
      if (!r.ok) { setCouponError(d.error); }
      else { setCoupon(d); }
    } catch { setCouponError("حدث خطأ، حاول مرة أخرى"); }
    finally { setCouponLoading(false); }
  };

  const removeCoupon = () => { setCoupon(null); setCouponCode(""); setCouponError(""); };

  const handleCheckout = () => {
    if (siteConfig.STORE_URL) window.open(siteConfig.STORE_URL, "_blank");
    else alert("سيتم تطوير نظام الدفع قريباً. تواصل مع الإدارة عبر Discord.");
  };

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" onClick={onClose} />}

      <div
        className={`fixed top-0 left-0 h-full w-full sm:w-96 z-50 flex flex-col transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        style={{ background: "linear-gradient(180deg,#0D0D10 0%,#111114 100%)", borderRight: "1px solid rgba(201,168,76,0.15)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#2A2A32] shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingCart size={20} className="text-[#C9A84C]" />
            <h2 className="text-[#F5F0E8] font-bold text-lg">السلة</h2>
            {cart.itemCount > 0 && <span className="badge-gold">{cart.itemCount}</span>}
          </div>
          <button onClick={onClose} className="p-2 text-[#6B6558] hover:text-[#C9A84C] transition-colors rounded-lg">
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5">
          {cart.items.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingCart size={40} className="text-[#2A2A32] mx-auto mb-4" />
              <p className="text-[#5A5045]">السلة فارغة</p>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.items.map((item) => (
                <div key={item.product.id} className="glass-card rounded-xl p-3 flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-[#1A1A1F]">
                    <Image src={item.product.image} alt={item.product.nameAr} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#F5F0E8] font-semibold text-sm truncate">{item.product.nameAr}</p>
                    <p className="text-[#C9A84C] font-bold text-sm">
                      {formatPrice(item.product.price * item.quantity, item.product.currency as "SAR")}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button onClick={() => cart.updateQuantity(item.product.id, item.quantity - 1)}
                      className="w-6 h-6 rounded-md bg-[#1A1A1F] border border-[#2A2A32] flex items-center justify-center text-[#C9A84C] hover:bg-[#C9A84C]/10 transition-colors">
                      <Minus size={10} />
                    </button>
                    <span className="text-[#F5F0E8] text-sm w-5 text-center font-bold">{item.quantity}</span>
                    <button onClick={() => cart.updateQuantity(item.product.id, item.quantity + 1)}
                      className="w-6 h-6 rounded-md bg-[#1A1A1F] border border-[#2A2A32] flex items-center justify-center text-[#C9A84C] hover:bg-[#C9A84C]/10 transition-colors">
                      <Plus size={10} />
                    </button>
                    <button onClick={() => cart.removeItem(item.product.id)} className="w-6 h-6 rounded-md text-[#5A5045] hover:text-red-400 transition-colors flex items-center justify-center">
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.items.length > 0 && (
          <div className="p-5 border-t border-[#2A2A32] shrink-0 space-y-3">

            {/* Coupon */}
            {!coupon ? (
              <div>
                <div className="flex gap-2">
                  <input
                    value={couponCode}
                    onChange={(e) => { setCouponCode(e.target.value.toUpperCase()); setCouponError(""); }}
                    onKeyDown={(e) => e.key === "Enter" && validateCoupon()}
                    placeholder="كود الخصم"
                    className="input-dark flex-1 px-3 py-2 rounded-xl text-sm font-mono uppercase"
                    dir="ltr"
                  />
                  <Button size="sm" onClick={validateCoupon} loading={couponLoading} variant="outline" className="shrink-0 px-4">
                    <Tag size={14} />
                  </Button>
                </div>
                {couponError && (
                  <p className="flex items-center gap-1 text-red-400 text-xs mt-1">
                    <XCircle size={12} />{couponError}
                  </p>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-between p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-400" />
                  <div>
                    <p className="text-green-400 font-bold text-sm font-mono">{coupon.code}</p>
                    <p className="text-green-400/70 text-xs">خصم {coupon.discount}%</p>
                  </div>
                </div>
                <button onClick={removeCoupon} className="text-[#5A5045] hover:text-red-400 transition-colors">
                  <X size={16} />
                </button>
              </div>
            )}

            {/* Totals */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-sm">
                <span className="text-[#6B6558]">المجموع:</span>
                <span className="text-[#B0A890] font-mono">{formatPrice(cart.total, "SAR")}</span>
              </div>
              {coupon && (
                <div className="flex justify-between text-sm">
                  <span className="text-green-400">خصم {coupon.discount}%:</span>
                  <span className="text-green-400 font-mono">- {formatPrice(cart.total - discountedTotal, "SAR")}</span>
                </div>
              )}
              <div className="flex justify-between items-center pt-1 border-t border-[#2A2A32]">
                <span className="text-[#8A8070] font-semibold">الإجمالي:</span>
                <span className="text-[#E8C96A] font-black text-xl">{formatPrice(discountedTotal, "SAR")}</span>
              </div>
            </div>

            <Button onClick={handleCheckout} className="w-full py-3.5">إتمام الشراء</Button>
            <button onClick={cart.clearCart} className="w-full text-[#5A5045] text-sm hover:text-red-400 transition-colors py-1">
              إفراغ السلة
            </button>
          </div>
        )}
      </div>
    </>
  );
}
