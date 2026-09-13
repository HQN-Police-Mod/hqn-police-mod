import { PageLayout } from "@/components/layout/PageLayout";
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";
import { products } from "@/data/products";
import { formatPrice } from "@/utils/format";
import { notFound } from "next/navigation";
import { CheckCircle, ArrowRight, Tag, Star } from "lucide-react";
import { TransitionLink as Link } from "@/components/ui/TransitionLink";
import Image from "next/image";
import type { Metadata } from "next";
import { ProductAddToCart } from "@/components/sections/ProductAddToCart";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  return {
    title: product ? product.nameAr : "المنتج",
    description: product?.descriptionAr,
  };
}

export async function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) notFound();

  const related = products
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  return (
    <PageLayout>
      <div className="pt-32 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-[#5A5045] mb-8">
            <Link href="/store" className="hover:text-[#C9A84C] transition-colors">
              المتجر
            </Link>
            <span>/</span>
            <span className="text-[#C9A84C]">{product.nameAr}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            {/* Product Image */}
            <GlassCard className="relative h-80 md:h-[420px] overflow-hidden">
              <Image
                src={product.image}
                alt={product.nameAr}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B]/60 to-transparent" />

              {product.isFeatured && (
                <div className="absolute top-4 right-4 z-10">
                  <Badge variant="gold"><Star size={12} /> مميز</Badge>
                </div>
              )}
              {product.discount && (
                <div className="absolute top-4 left-4 z-10">
                  <Badge variant="green"><Tag size={12} /> خصم {product.discount}%</Badge>
                </div>
              )}
            </GlassCard>

            {/* Details */}
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Badge variant={product.isAvailable ? "green" : "red"}>
                  {product.isAvailable ? "متاح" : "غير متاح"}
                </Badge>
              </div>

              <h1 className="heading-ar text-3xl font-black text-[#F5F0E8] mb-2">
                {product.nameAr}
              </h1>
              <p className="text-[#8A8070] mb-6 leading-relaxed">
                {product.descriptionAr}
              </p>

              {/* Price */}
              <div className="glass-card rounded-xl p-4 mb-6">
                <div className="flex items-end gap-3">
                  <span className="text-4xl font-black text-[#E8C96A]">
                    {formatPrice(product.price, product.currency)}
                  </span>
                  {product.discount && (
                    <span className="text-[#5A5045] line-through text-lg mb-1">
                      {formatPrice(
                        Math.round(product.price / (1 - product.discount / 100)),
                        product.currency
                      )}
                    </span>
                  )}
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h3 className="text-[#C9A84C] font-semibold text-sm uppercase tracking-wider mb-3">
                  المميزات
                </h3>
                <ul className="space-y-2">
                  {product.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-[#B0A890] text-sm">
                      <CheckCircle size={15} className="text-[#C9A84C] shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Add to cart */}
              <ProductAddToCart product={product} />
            </div>
          </div>

          {/* Related Products */}
          {related.length > 0 && (
            <div className="mt-16">
              <h2 className="text-[#F5F0E8] font-bold text-xl mb-6">حزم أخرى</h2>
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
                {related.map((p) => (
                  <Link key={p.id} href={`/store/${p.id}`}>
                    <GlassCard className="flex items-center gap-3 overflow-hidden p-0" hover>
                      <div className="relative w-20 h-20 shrink-0">
                        <Image
                          src={p.image}
                          alt={p.nameAr}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 py-3 pr-0 pl-2">
                        <p className="text-[#F5F0E8] font-semibold text-sm leading-tight">
                          {p.nameAr}
                        </p>
                        <p className="text-[#C9A84C] font-bold text-sm mt-0.5">
                          {formatPrice(p.price, p.currency)}
                        </p>
                      </div>
                      <ArrowRight size={16} className="text-[#C9A84C] ml-3 shrink-0" />
                    </GlassCard>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
