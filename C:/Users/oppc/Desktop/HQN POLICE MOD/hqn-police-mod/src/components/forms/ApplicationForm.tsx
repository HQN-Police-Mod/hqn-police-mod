"use client";

import { useState } from "react";
import { CheckCircle, XCircle, Send } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { sectors } from "@/data/sectors";
import { cn } from "@/utils/cn";
import type { ApplicationFormValues } from "@/utils/validation";

type SubmitState = "idle" | "loading" | "success" | "error";
type Errors = Partial<Record<keyof ApplicationFormValues, string>>;

function validate(form: ApplicationFormValues): Errors {
  const e: Errors = {};
  if (!form.name || form.name.trim().length < 3)
    e.name = "الاسم يجب أن يكون 3 أحرف على الأقل";
  const age = Number(form.age);
  if (isNaN(age) || age < 16) e.age = "يجب أن يكون عمرك 16 سنة على الأقل";
  if (!form.discord || form.discord.trim().length < 2)
    e.discord = "اسم Discord غير صحيح";
  if (!form.sector) e.sector = "الرجاء اختيار القطاع";
  if (!form.rank) e.rank = "الرجاء اختيار الرتبة";
  if (!form.experience || form.experience.trim().length < 20)
    e.experience = "الرجاء كتابة خبرتك بشكل مفصل (20 حرف على الأقل)";
  if (!form.reason || form.reason.trim().length < 30)
    e.reason = "الرجاء كتابة سبب التقديم بشكل مفصل (30 حرف على الأقل)";
  return e;
}

const empty: ApplicationFormValues = {
  name: "",
  age: "" as unknown as number,
  discord: "",
  sector: "",
  rank: "",
  experience: "",
  reason: "",
  additionalInfo: "",
};

export function ApplicationForm() {
  const [form, setForm] = useState<ApplicationFormValues>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ApplicationFormValues, boolean>>>({});
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [serverError, setServerError] = useState("");

  const set = (key: keyof ApplicationFormValues, value: string) => {
    setForm((p) => ({ ...p, [key]: value }));
    setTouched((p) => ({ ...p, [key]: true }));
    // Live validation
    const next = { ...form, [key]: value };
    const v = validate(next);
    setErrors((p) => ({ ...p, [key]: v[key] }));
  };

  const sectorObj = sectors.find((s) => s.id === form.sector);
  const availableRanks = sectorObj?.ranks ?? [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allErrors = validate(form);
    setErrors(allErrors);
    // Mark all touched
    const allTouched = Object.keys(empty).reduce(
      (acc, k) => ({ ...acc, [k]: true }),
      {} as typeof touched
    );
    setTouched(allTouched);

    if (Object.keys(allErrors).length > 0) return;

    setSubmitState("loading");
    setServerError("");

    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, age: Number(form.age) }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) throw new Error(json.error ?? "خطأ غير متوقع");
      setSubmitState("success");
      setForm(empty);
      setTouched({});
    } catch (err) {
      setSubmitState("error");
      setServerError(err instanceof Error ? err.message : "حدث خطأ. حاول لاحقاً.");
    }
  };

  if (submitState === "success") {
    return (
      <GlassCard className="p-10 text-center" glow>
        <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-green-400" />
        </div>
        <h2 className="heading-ar text-2xl font-bold text-[#F5F0E8] mb-3">
          تم إرسال طلبك بنجاح! ✅
        </h2>
        <p className="text-[#8A8070] leading-relaxed mb-6 max-w-md mx-auto">
          شكراً لتقديمك. سيقوم فريق الإدارة بمراجعة طلبك والرد عليك عبر Discord
          خلال 24-72 ساعة.
        </p>
        <Button variant="outline" onClick={() => setSubmitState("idle")}>
          تقديم طلب جديد
        </Button>
      </GlassCard>
    );
  }

  const inputClass = (field: keyof ApplicationFormValues) =>
    cn(
      "input-dark w-full px-4 py-3 rounded-xl text-sm font-medium",
      touched[field] && errors[field] && "border-red-500/50"
    );

  const err = (field: keyof ApplicationFormValues) =>
    touched[field] && errors[field] ? (
      <p className="text-red-400 text-xs mt-1">{errors[field]}</p>
    ) : null;

  return (
    <GlassCard className="p-6 md:p-8">
      <h2 className="heading-ar text-xl font-bold text-[#F5F0E8] mb-6">نموذج التقديم</h2>

      {submitState === "error" && (
        <div className="flex items-center gap-2 p-4 rounded-xl bg-red-500/10 border border-red-500/20 mb-6">
          <XCircle size={18} className="text-red-400 shrink-0" />
          <p className="text-red-400 text-sm">{serverError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* Name + Age */}
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-[#C9A84C] text-sm font-semibold mb-2">
              الاسم الكامل *
            </label>
            <input
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="اسمك الكامل"
              className={inputClass("name")}
            />
            {err("name")}
          </div>
          <div>
            <label className="block text-[#C9A84C] text-sm font-semibold mb-2">
              العمر *
            </label>
            <input
              value={String(form.age)}
              onChange={(e) => set("age", e.target.value)}
              type="number"
              placeholder="عمرك"
              min={16}
              max={60}
              className={inputClass("age")}
            />
            {err("age")}
          </div>
        </div>

        {/* Discord */}
        <div>
          <label className="block text-[#C9A84C] text-sm font-semibold mb-2">
            اسم Discord *
          </label>
          <input
            value={form.discord}
            onChange={(e) => set("discord", e.target.value)}
            placeholder="اسمك على Discord"
            className={inputClass("discord")}
            dir="ltr"
          />
          {err("discord")}
        </div>

        {/* Sector + Rank */}
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-[#C9A84C] text-sm font-semibold mb-2">
              القطاع المطلوب *
            </label>
            <select
              value={form.sector}
              onChange={(e) => {
                set("sector", e.target.value);
                set("rank", ""); // reset rank on sector change
              }}
              className={cn(inputClass("sector"), "cursor-pointer")}
            >
              <option value="">-- اختر القطاع --</option>
              {sectors
                .filter((s) => s.isOpen)
                .map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.nameAr}
                  </option>
                ))}
            </select>
            {err("sector")}
          </div>
          <div>
            <label className="block text-[#C9A84C] text-sm font-semibold mb-2">
              الرتبة / المسار *
            </label>
            <select
              value={form.rank}
              onChange={(e) => set("rank", e.target.value)}
              className={cn(inputClass("rank"), "cursor-pointer")}
              disabled={!form.sector}
            >
              <option value="">-- اختر الرتبة --</option>
              {availableRanks.map((r) => (
                <option key={r.level} value={r.nameAr}>
                  {r.nameAr}
                </option>
              ))}
            </select>
            {err("rank")}
          </div>
        </div>

        {/* Experience */}
        <div>
          <label className="block text-[#C9A84C] text-sm font-semibold mb-2">
            خبرتك في Roleplay *
          </label>
          <textarea
            value={form.experience}
            onChange={(e) => set("experience", e.target.value)}
            rows={3}
            placeholder="اشرح خبرتك في الـ roleplay والسيرفرات السابقة..."
            className={cn(inputClass("experience"), "resize-none")}
          />
          {err("experience")}
        </div>

        {/* Reason */}
        <div>
          <label className="block text-[#C9A84C] text-sm font-semibold mb-2">
            سبب التقديم *
          </label>
          <textarea
            value={form.reason}
            onChange={(e) => set("reason", e.target.value)}
            rows={4}
            placeholder="لماذا تريد الانضمام إلى HQN POLICE MOD؟ وما الذي ستضيفه للسيرفر؟"
            className={cn(inputClass("reason"), "resize-none")}
          />
          {err("reason")}
        </div>

        {/* Additional */}
        <div>
          <label className="block text-[#C9A84C] text-sm font-semibold mb-2">
            معلومات إضافية (اختياري)
          </label>
          <textarea
            value={form.additionalInfo ?? ""}
            onChange={(e) => set("additionalInfo", e.target.value)}
            rows={2}
            placeholder="أي معلومات إضافية تريد إضافتها..."
            className={cn("input-dark w-full px-4 py-3 rounded-xl text-sm resize-none")}
          />
        </div>

        {/* Submit */}
        <div className="pt-2">
          <Button
            type="submit"
            loading={submitState === "loading"}
            className="w-full py-4 text-base"
          >
            <Send size={18} />
            <span>{submitState === "loading" ? "جاري الإرسال..." : "إرسال الطلب"}</span>
          </Button>
          <p className="text-[#5A5045] text-xs text-center mt-3">
            بإرسال الطلب، تؤكد أن جميع البيانات صحيحة ودقيقة
          </p>
        </div>
      </form>
    </GlassCard>
  );
}
