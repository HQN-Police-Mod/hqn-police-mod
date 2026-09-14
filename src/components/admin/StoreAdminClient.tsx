"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { signOut } from "next-auth/react";
import {
  Package, Tag, Plus, Pencil, Trash2, LogOut,
  CheckCircle, XCircle, ToggleLeft, ToggleRight,
  Star, Save, X, RefreshCw
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/utils/format";

// ─── Types ────────────────────────────────────
interface DBProduct {
  id: string; name: string; nameAr: string;
  description: string | null; descriptionAr: string | null;
  price: number; currency: string; category: string;
  image: string; features: string[];
  isAvailable: boolean; isFeatured: boolean;
  discount: number | null; sortOrder: number;
}

interface DBCoupon {
  id: string; code: string; discount: number;
  maxUses: number; usedCount: number;
  isActive: boolean; expiresAt: string | null;
  description: string | null; createdAt: string;
}

type Tab = "products" | "coupons";

interface Props {
  user: { name?: string | null; email?: string | null; image?: string | null };
}

// ─── Empty forms ──────────────────────────────
const emptyProduct = (): Partial<DBProduct> => ({
  name: "", nameAr: "", description: "", descriptionAr: "",
  price: 0, currency: "SAR", category: "bundle", image: "/HQN.png",
  features: [], isAvailable: true, isFeatured: false, discount: undefined, sortOrder: 0,
});

const emptyCoupon = (): Partial<DBCoupon> => ({
  code: "", discount: 10, maxUses: 100, isActive: true,
  expiresAt: null, description: "",
});

// ─── Main Component ───────────────────────────
export function StoreAdminClient({ user }: Props) {
  const [tab, setTab] = useState<Tab>("products");
  const [products, setProducts] = useState<DBProduct[]>([]);
  const [coupons, setCoupons] = useState<DBCoupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  // Product modal
  const [productModal, setProductModal] = useState(false);
  const [editProduct, setEditProduct] = useState<Partial<DBProduct>>(emptyProduct());
  const [isEditingProduct, setIsEditingProduct] = useState(false);

  // Coupon modal
  const [couponModal, setCouponModal] = useState(false);
  const [editCoupon, setEditCoupon] = useState<Partial<DBCoupon>>(emptyCoupon());
  const [isEditingCoupon, setIsEditingCoupon] = useState(false);

  const showMsg = (type: "ok" | "err", text: string) => {
    setMsg({ type, text });
    setTimeout(() => setMsg(null), 3500);
  };

  // ── Fetch ──
  const fetchProducts = useCallback(async () => {
    const r = await fetch("/api/admin/products");
    if (r.ok) { const d = await r.json(); setProducts(d.data); }
  }, []);

  const fetchCoupons = useCallback(async () => {
    const r = await fetch("/api/admin/coupons");
    if (r.ok) { const d = await r.json(); setCoupons(d.data); }
  }, []);

  useEffect(() => {
    Promise.all([fetchProducts(), fetchCoupons()]).finally(() => setLoading(false));
  }, [fetchProducts, fetchCoupons]);

  // ── Product CRUD ──
  const openNewProduct = () => { setEditProduct(emptyProduct()); setIsEditingProduct(false); setProductModal(true); };
  const openEditProduct = (p: DBProduct) => { setEditProduct({ ...p }); setIsEditingProduct(true); setProductModal(true); };

  const saveProduct = async () => {
    setSaving(true);
    try {
      const url = isEditingProduct ? `/api/admin/products/${editProduct.id}` : "/api/admin/products";
      const method = isEditingProduct ? "PATCH" : "POST";
      const r = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(editProduct) });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error);
      await fetchProducts();
      setProductModal(false);
      showMsg("ok", isEditingProduct ? "تم تحديث المنتج" : "تم إضافة المنتج");
    } catch (e) { showMsg("err", (e as Error).message); }
    finally { setSaving(false); }
  };

  const toggleAvailable = async (p: DBProduct) => {
    await fetch(`/api/admin/products/${p.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ isAvailable: !p.isAvailable }) });
    await fetchProducts();
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("حذف هذا المنتج؟")) return;
    await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    await fetchProducts();
    showMsg("ok", "تم الحذف");
  };

  // ── Coupon CRUD ──
  const openNewCoupon = () => { setEditCoupon(emptyCoupon()); setIsEditingCoupon(false); setCouponModal(true); };
  const openEditCoupon = (c: DBCoupon) => { setEditCoupon({ ...c }); setIsEditingCoupon(true); setCouponModal(true); };

  const saveCoupon = async () => {
    setSaving(true);
    try {
      const url = isEditingCoupon ? `/api/admin/coupons/${editCoupon.id}` : "/api/admin/coupons";
      const method = isEditingCoupon ? "PATCH" : "POST";
      const r = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(editCoupon) });
      const d = await r.json();
      if (!r.ok) throw new Error(d.error);
      await fetchCoupons();
      setCouponModal(false);
      showMsg("ok", isEditingCoupon ? "تم التحديث" : "تم إنشاء الكوبون");
    } catch (e) { showMsg("err", (e as Error).message); }
    finally { setSaving(false); }
  };

  const toggleCoupon = async (c: DBCoupon) => {
    await fetch(`/api/admin/coupons/${c.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ isActive: !c.isActive }) });
    await fetchCoupons();
  };

  const deleteCoupon = async (id: string) => {
    if (!confirm("حذف هذا الكوبون؟")) return;
    await fetch(`/api/admin/coupons/${id}`, { method: "DELETE" });
    await fetchCoupons();
    showMsg("ok", "تم الحذف");
  };

  const inputCls = "input-dark w-full px-3 py-2.5 rounded-xl text-sm";
  const labelCls = "block text-[#C9A84C] text-xs font-semibold mb-1";

  return (
    <div className="min-h-screen bg-[#09090C]" dir="rtl">
      {/* Toast */}
      {msg && (
        <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-2 px-5 py-3 rounded-xl shadow-xl text-sm font-semibold transition-all ${msg.type === "ok" ? "bg-green-600 text-white" : "bg-red-600 text-white"}`}>
          {msg.type === "ok" ? <CheckCircle size={16} /> : <XCircle size={16} />}
          {msg.text}
        </div>
      )}

      {/* Header */}
      <header className="bg-[#0D0D10] border-b border-[#C9A84C]/10 px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8"><Image src="/HQN.png" alt="HQN" fill className="object-contain" /></div>
          <div>
            <p className="text-[#E8C96A] font-black text-sm leading-none">HQN POLICE MOD</p>
            <p className="text-[#5A5045] text-xs">إدارة المتجر</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {user.image && <img src={user.image} alt="" className="w-8 h-8 rounded-full" />}
          <span className="text-[#6B6558] text-xs hidden sm:block">{user.email}</span>
          <button onClick={() => signOut({ callbackUrl: "/" })} className="flex items-center gap-1 text-[#5A5045] hover:text-red-400 transition-colors text-xs">
            <LogOut size={14} /><span>خروج</span>
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex gap-3 mb-8">
          {[
            { id: "products" as Tab, label: "المنتجات", icon: Package, count: products.length },
            { id: "coupons" as Tab, label: "الكوبونات", icon: Tag, count: coupons.length },
          ].map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${tab === t.id ? "bg-[#C9A84C]/15 border border-[#C9A84C]/30 text-[#E8C96A]" : "bg-[#1A1A1F] border border-[#2A2A32] text-[#6B6558] hover:text-[#C9A84C]"}`}>
              <t.icon size={16} />{t.label}
              <span className="px-2 py-0.5 rounded-full bg-[#C9A84C]/10 text-[#C9A84C] text-xs">{t.count}</span>
            </button>
          ))}
          <button onClick={() => { fetchProducts(); fetchCoupons(); }} className="mr-auto p-2.5 rounded-xl bg-[#1A1A1F] border border-[#2A2A32] text-[#5A5045] hover:text-[#C9A84C] transition-colors">
            <RefreshCw size={16} />
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20 text-[#5A5045]">جاري التحميل...</div>
        ) : tab === "products" ? (
          <>
            {/* Products Header */}
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[#F5F0E8] font-bold text-lg">{products.length} منتج</h2>
              <Button onClick={openNewProduct} size="sm" className="gap-1">
                <Plus size={16} /><span>منتج جديد</span>
              </Button>
            </div>

            {/* Products Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((p) => (
                <GlassCard key={p.id} className="p-4 relative overflow-hidden">
                  {!p.isAvailable && <div className="absolute top-0 left-0 right-0 h-0.5 bg-red-500/50" />}
                  {p.isFeatured && <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#C9A84C]" />}

                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-[#F5F0E8] font-bold text-sm">{p.nameAr}</p>
                      <p className="text-[#5A5045] text-xs">{p.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[#E8C96A] font-black text-base">{formatPrice(p.price, p.currency as "SAR")}</p>
                      {p.discount && <p className="text-green-400 text-xs">-{p.discount}%</p>}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${p.isAvailable ? "bg-green-500/15 text-green-400" : "bg-red-500/15 text-red-400"}`}>
                      {p.isAvailable ? "متاح" : "مخفي"}
                    </span>
                    {p.isFeatured && <span className="text-xs px-2 py-0.5 rounded-full bg-[#C9A84C]/15 text-[#E8C96A]">مميز</span>}
                    <span className="text-xs text-[#5A5045]">{p.category}</span>
                  </div>

                  <div className="flex gap-2 pt-3 border-t border-[#2A2A32]">
                    <button onClick={() => toggleAvailable(p)} className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg text-xs font-semibold bg-[#1A1A1F] border border-[#2A2A32] hover:border-[#C9A84C]/30 text-[#8A8070] hover:text-[#C9A84C] transition-all">
                      {p.isAvailable ? <ToggleRight size={13} /> : <ToggleLeft size={13} />}
                      {p.isAvailable ? "إخفاء" : "إظهار"}
                    </button>
                    <button onClick={() => openEditProduct(p)} className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg text-xs font-semibold bg-[#C9A84C]/10 border border-[#C9A84C]/20 text-[#C9A84C] hover:bg-[#C9A84C]/20 transition-all">
                      <Pencil size={13} />تعديل
                    </button>
                    <button onClick={() => deleteProduct(p.id)} className="px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all">
                      <Trash2 size={13} />
                    </button>
                  </div>
                </GlassCard>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Coupons Header */}
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[#F5F0E8] font-bold text-lg">{coupons.length} كوبون</h2>
              <Button onClick={openNewCoupon} size="sm" className="gap-1">
                <Plus size={16} /><span>كوبون جديد</span>
              </Button>
            </div>

            {/* Coupons Table */}
            <div className="space-y-3">
              {coupons.map((c) => (
                <GlassCard key={c.id} className="p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center shrink-0">
                    <Tag size={18} className="text-[#C9A84C]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[#F5F0E8] font-black font-mono text-base">{c.code}</span>
                      <span className="text-[#E8C96A] font-bold text-sm">-{c.discount}%</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${c.isActive ? "bg-green-500/15 text-green-400" : "bg-red-500/15 text-red-400"}`}>
                        {c.isActive ? "مفعّل" : "موقوف"}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-[#5A5045]">
                      <span>الاستخدام: {c.usedCount}/{c.maxUses}</span>
                      {c.expiresAt && <span>ينتهي: {new Date(c.expiresAt).toLocaleDateString("ar-SA")}</span>}
                      {c.description && <span className="truncate max-w-xs">{c.description}</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button onClick={() => toggleCoupon(c)} className={`p-2 rounded-lg border transition-all ${c.isActive ? "bg-green-500/10 border-green-500/20 text-green-400" : "bg-[#1A1A1F] border-[#2A2A32] text-[#5A5045]"}`}>
                      {c.isActive ? <ToggleRight size={16} /> : <ToggleLeft size={16} />}
                    </button>
                    <button onClick={() => openEditCoupon(c)} className="p-2 rounded-lg bg-[#C9A84C]/10 border border-[#C9A84C]/20 text-[#C9A84C] hover:bg-[#C9A84C]/20 transition-all">
                      <Pencil size={16} />
                    </button>
                    <button onClick={() => deleteCoupon(c.id)} className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </GlassCard>
              ))}
              {coupons.length === 0 && (
                <div className="text-center py-16 text-[#5A5045]">
                  <Tag size={40} className="mx-auto mb-3 opacity-20" />
                  <p>لا توجد كوبونات — أنشئ أول كوبون خصم</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* ── Product Modal ─────────────────── */}
      {productModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <GlassCard className="w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 relative">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent rounded-t-xl" />
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[#F5F0E8] font-bold text-lg">{isEditingProduct ? "تعديل المنتج" : "منتج جديد"}</h3>
              <button onClick={() => setProductModal(false)} className="text-[#5A5045] hover:text-[#C9A84C]"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div><label className={labelCls}>الاسم بالعربي *</label><input value={editProduct.nameAr ?? ""} onChange={(e) => setEditProduct(p => ({ ...p, nameAr: e.target.value }))} className={inputCls} placeholder="حزمة الذهب" /></div>
                <div><label className={labelCls}>الاسم بالإنجليزي *</label><input value={editProduct.name ?? ""} onChange={(e) => setEditProduct(p => ({ ...p, name: e.target.value }))} className={inputCls} placeholder="Gold Bundle" dir="ltr" /></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className={labelCls}>السعر (ريال) *</label><input type="number" value={editProduct.price ?? 0} onChange={(e) => setEditProduct(p => ({ ...p, price: Number(e.target.value) }))} className={inputCls} min={0} /></div>
                <div><label className={labelCls}>الخصم % (اختياري)</label><input type="number" value={editProduct.discount ?? ""} onChange={(e) => setEditProduct(p => ({ ...p, discount: e.target.value ? Number(e.target.value) : undefined }))} className={inputCls} min={0} max={100} placeholder="10" /></div>
              </div>
              <div><label className={labelCls}>الوصف بالعربي</label><textarea value={editProduct.descriptionAr ?? ""} onChange={(e) => setEditProduct(p => ({ ...p, descriptionAr: e.target.value }))} className={`${inputCls} resize-none`} rows={2} /></div>
              <div><label className={labelCls}>مسار الصورة</label><input value={editProduct.image ?? "/HQN.png"} onChange={(e) => setEditProduct(p => ({ ...p, image: e.target.value }))} className={inputCls} dir="ltr" /></div>
              <div><label className={labelCls}>المميزات (كل سطر ميزة)</label>
                <textarea
                  value={(editProduct.features ?? []).join("\n")}
                  onChange={(e) => setEditProduct(p => ({ ...p, features: e.target.value.split("\n").filter(Boolean) }))}
                  className={`${inputCls} resize-none`} rows={4}
                  placeholder={"تخطي قائمة الانتظار\nلقب حصري\nمركبة VIP"}
                />
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={editProduct.isAvailable ?? true} onChange={(e) => setEditProduct(p => ({ ...p, isAvailable: e.target.checked }))} className="accent-[#C9A84C]" />
                  <span className="text-[#B0A890] text-sm">متاح</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={editProduct.isFeatured ?? false} onChange={(e) => setEditProduct(p => ({ ...p, isFeatured: e.target.checked }))} className="accent-[#C9A84C]" />
                  <span className="text-[#B0A890] text-sm flex items-center gap-1"><Star size={12} className="text-[#C9A84C]" />مميز</span>
                </label>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <Button onClick={saveProduct} loading={saving} className="flex-1 gap-1"><Save size={16} /><span>{isEditingProduct ? "حفظ التعديلات" : "إضافة المنتج"}</span></Button>
              <Button variant="ghost" onClick={() => setProductModal(false)} className="flex-1">إلغاء</Button>
            </div>
          </GlassCard>
        </div>
      )}

      {/* ── Coupon Modal ──────────────────── */}
      {couponModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <GlassCard className="w-full max-w-md p-6 relative">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent rounded-t-xl" />
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[#F5F0E8] font-bold text-lg">{isEditingCoupon ? "تعديل الكوبون" : "كوبون جديد"}</h3>
              <button onClick={() => setCouponModal(false)} className="text-[#5A5045] hover:text-[#C9A84C]"><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div><label className={labelCls}>كود الخصم *</label>
                <input value={editCoupon.code ?? ""} onChange={(e) => setEditCoupon(c => ({ ...c, code: e.target.value.toUpperCase() }))} className={`${inputCls} font-mono uppercase`} placeholder="HQNVIP20" dir="ltr" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div><label className={labelCls}>نسبة الخصم % *</label><input type="number" value={editCoupon.discount ?? 10} onChange={(e) => setEditCoupon(c => ({ ...c, discount: Number(e.target.value) }))} className={inputCls} min={1} max={100} /></div>
                <div><label className={labelCls}>أقصى استخدام</label><input type="number" value={editCoupon.maxUses ?? 100} onChange={(e) => setEditCoupon(c => ({ ...c, maxUses: Number(e.target.value) }))} className={inputCls} min={1} /></div>
              </div>
              <div><label className={labelCls}>ينتهي في (اختياري)</label><input type="datetime-local" value={editCoupon.expiresAt ? editCoupon.expiresAt.slice(0, 16) : ""} onChange={(e) => setEditCoupon(c => ({ ...c, expiresAt: e.target.value || null }))} className={`${inputCls}`} dir="ltr" /></div>
              <div><label className={labelCls}>الوصف (اختياري)</label><input value={editCoupon.description ?? ""} onChange={(e) => setEditCoupon(c => ({ ...c, description: e.target.value }))} className={inputCls} placeholder="كوبون خاص بأعضاء VIP" /></div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={editCoupon.isActive ?? true} onChange={(e) => setEditCoupon(c => ({ ...c, isActive: e.target.checked }))} className="accent-[#C9A84C]" />
                <span className="text-[#B0A890] text-sm">مفعّل</span>
              </label>
            </div>
            <div className="flex gap-3 mt-6">
              <Button onClick={saveCoupon} loading={saving} className="flex-1 gap-1"><Save size={16} /><span>{isEditingCoupon ? "حفظ" : "إنشاء الكوبون"}</span></Button>
              <Button variant="ghost" onClick={() => setCouponModal(false)} className="flex-1">إلغاء</Button>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
}
