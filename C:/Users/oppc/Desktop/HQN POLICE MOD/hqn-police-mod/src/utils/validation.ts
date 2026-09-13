// ===================================================
// HQN POLICE MOD — Validation (no external deps)
// ===================================================

export interface ValidationError {
  field: string;
  message: string;
}

export interface ApplicationFormValues {
  name: string;
  age: number | string;
  discord: string;
  sector: string;
  rank: string;
  experience: string;
  reason: string;
  additionalInfo?: string;
}

export function validateApplication(data: ApplicationFormValues): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!data.name || String(data.name).trim().length < 3)
    errors.push({ field: "name", message: "الاسم يجب أن يكون 3 أحرف على الأقل" });
  if (String(data.name).length > 50)
    errors.push({ field: "name", message: "الاسم طويل جداً" });

  const age = Number(data.age);
  if (isNaN(age) || age < 16)
    errors.push({ field: "age", message: "يجب أن يكون عمرك 16 سنة على الأقل" });
  if (age > 60)
    errors.push({ field: "age", message: "الرجاء التحقق من العمر المدخل" });

  if (!data.discord || data.discord.trim().length < 2)
    errors.push({ field: "discord", message: "اسم Discord غير صحيح" });

  if (!data.sector)
    errors.push({ field: "sector", message: "الرجاء اختيار القطاع" });

  if (!data.rank)
    errors.push({ field: "rank", message: "الرجاء اختيار الرتبة" });

  if (!data.experience || data.experience.trim().length < 20)
    errors.push({ field: "experience", message: "الرجاء كتابة خبرتك بشكل مفصل (20 حرف على الأقل)" });

  if (!data.reason || data.reason.trim().length < 30)
    errors.push({ field: "reason", message: "الرجاء كتابة سبب التقديم بشكل مفصل (30 حرف على الأقل)" });

  return errors;
}

export interface AdminLoginValues {
  username: string;
  password: string;
}

export function validateAdminLogin(data: AdminLoginValues): ValidationError[] {
  const errors: ValidationError[] = [];
  if (!data.username) errors.push({ field: "username", message: "اسم المستخدم مطلوب" });
  if (!data.password || data.password.length < 6)
    errors.push({ field: "password", message: "كلمة المرور يجب أن تكون 6 أحرف على الأقل" });
  return errors;
}

/** Sanitize string input — strip HTML tags */
export function sanitize(str: string): string {
  return str.replace(/<[^>]*>/g, "").trim();
}
