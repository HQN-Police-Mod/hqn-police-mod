"use client";

import { useState } from "react";
import { ShoppingCart, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/hooks/useCart";
import type { Product } from "@/types";
import { siteConfig } from "@/config/site";

interface Props {
  product: Product;
}

export function ProductAddToCart({ product }: Props) {
  const cart = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    cart.addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const handleBuyNow = () => {
    cart.addItem(product);
    if (siteConfig.STORE_URL) {
      window.open(siteConfig.STORE_URL, "_blank");
    } else {
      alert("سيتم تطوير نظام الدفع قريباً. تواصل مع الإدارة عبر Discord.");
    }
  };

  return (
    <div className="flex gap-3">
      <Button
        onClick={handleAdd}
        variant={added ? "outline" : "gold"}
        disabled={!product.isAvailable}
        className="flex-1"
        size="lg"
      >
        {added ? (
          <>
            <CheckCircle size={18} />
            <span>تمت الإضافة</span>
          </>
        ) : (
          <>
            <ShoppingCart size={18} />
            <span>أضف للسلة</span>
          </>
        )}
      </Button>
      <Button
        onClick={handleBuyNow}
        variant="outline"
        disabled={!product.isAvailable}
        size="lg"
        className="flex-1"
      >
        اشتر الآن
      </Button>
    </div>
  );
}
