"use client";

import { X, ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
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

export function CartDrawer({ isOpen, onClose, cart }: CartDrawerProps) {
  const handleCheckout = () => {
    if (siteConfig.STORE_URL) {
      window.open(siteConfig.STORE_URL, "_blank");
    } else {
      // TODO: Implement checkout flow or redirect to payment provider
      alert("نظام الدفع قيد التطوير. يرجى التواصل مع الإدارة عبر Discord.");
    }
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-full sm:w-96 z-50 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          background: "linear-gradient(180deg, #0D0D10 0%, #111114 100%)",
          borderRight: "1px solid rgba(201,168,76,0.15)",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#2A2A32]">
          <div className="flex items-center gap-2">
            <ShoppingCart size={20} className="text-[#C9A84C]" />
            <h2 className="text-[#F5F0E8] font-bold text-lg">السلة</h2>
            {cart.itemCount > 0 && (
              <span className="badge-gold">{cart.itemCount}</span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#6B6558] hover:text-[#C9A84C] transition-colors rounded-lg"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5 max-h-[calc(100vh-200px)]">
          {cart.items.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingCart size={40} className="text-[#2A2A32] mx-auto mb-4" />
              <p className="text-[#5A5045]">السلة فارغة</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.items.map((item) => (
                <div
                  key={item.product.id}
                  className="glass-card rounded-xl p-4 flex items-start gap-3"
                >
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0">
                    <Image
                      src={item.product.image}
                      alt={item.product.nameAr}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#F5F0E8] font-semibold text-sm truncate">
                      {item.product.nameAr}
                    </p>
                    <p className="text-[#C9A84C] font-bold text-sm">
                      {formatPrice(item.product.price * item.quantity, item.product.currency)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => cart.updateQuantity(item.product.id, item.quantity - 1)}
                      className="w-6 h-6 rounded-md bg-[#1A1A1F] border border-[#2A2A32] flex items-center justify-center text-[#C9A84C] hover:bg-[#C9A84C]/10 transition-colors"
                    >
                      <Minus size={10} />
                    </button>
                    <span className="text-[#F5F0E8] text-sm w-4 text-center font-bold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => cart.updateQuantity(item.product.id, item.quantity + 1)}
                      className="w-6 h-6 rounded-md bg-[#1A1A1F] border border-[#2A2A32] flex items-center justify-center text-[#C9A84C] hover:bg-[#C9A84C]/10 transition-colors"
                    >
                      <Plus size={10} />
                    </button>
                    <button
                      onClick={() => cart.removeItem(item.product.id)}
                      className="w-6 h-6 rounded-md text-[#5A5045] hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.items.length > 0 && (
          <div className="p-5 border-t border-[#2A2A32]">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[#8A8070] font-medium">الإجمالي:</span>
              <span className="text-[#E8C96A] font-black text-xl">
                {formatPrice(cart.total, "SAR")}
              </span>
            </div>
            <Button onClick={handleCheckout} className="w-full py-4">
              إتمام الشراء
            </Button>
            <button
              onClick={cart.clearCart}
              className="w-full mt-2 text-[#5A5045] text-sm hover:text-red-400 transition-colors py-2"
            >
              إفراغ السلة
            </button>
            {/* Note */}
            <p className="text-[#3A3A42] text-xs text-center mt-2">
              {/* TODO: Connect payment provider */}
              سيتم تطوير نظام الدفع قريباً
            </p>
          </div>
        )}
      </div>
    </>
  );
}
