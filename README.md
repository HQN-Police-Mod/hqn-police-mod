# HQN POLICE MOD — الموقع الرسمي

الموقع الرسمي لسيرفر **HQN POLICE MOD** — تجربة Police Mod سعودية احترافية.

---

## 🚀 تشغيل المشروع

### المتطلبات
- Node.js v18+
- npm

### التثبيت
```bash
cd hqn-police-mod
npm install
```

### تشغيل بيئة التطوير
```bash
# Windows — PowerShell
node_modules\.bin\next.cmd dev

# أو بعد إضافة PATH:
npm run dev
```

افتح [http://localhost:3000](http://localhost:3000)

### البناء للإنتاج
```bash
# Windows
node_modules\.bin\next.cmd build
node_modules\.bin\next.cmd start
```

---

## ⚙️ الإعداد

### 1. متغيرات البيئة
انسخ `.env.local` وعدّل القيم:

```env
ADMIN_SECRET=your_strong_secret_here
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/...
SERVER_API_URL=https://...
```

### 2. إعدادات السيرفر
عدّل `src/config/site.ts` لتغيير:
- IP السيرفر
- رابط Discord
- اسم السيرفر
- الحد الأقصى للاعبين
- وغيرها

---

## 📁 هيكل المشروع

```
src/
├── app/                  # Next.js App Router (الصفحات)
│   ├── page.tsx          # الرئيسية
│   ├── about/            # عن السيرفر
│   ├── sectors/          # القطاعات
│   ├── apply/            # التقديم
│   ├── store/            # المتجر
│   ├── rules/            # القوانين
│   ├── staff/            # الإدارة
│   ├── discord/          # Discord
│   ├── admin/            # لوحة الإدارة
│   └── api/              # API Routes
├── components/
│   ├── layout/           # Navbar, Footer, PageLayout
│   ├── sections/         # Hero, Stats, Store, Cart...
│   ├── forms/            # نموذج التقديم
│   ├── ui/               # GlassCard, Button, Badge...
│   └── admin/            # AdminShell, AdminSidebar
├── config/
│   └── site.ts           # ⭐ الإعدادات المركزية
├── data/                 # بيانات ثابتة (sectors, products, staff, rules)
├── hooks/                # useServerStatus, useCart
├── types/                # TypeScript Types
└── utils/                # cn, format, validation
```

---

## 🔗 الصفحات

| الصفحة | الرابط |
|--------|--------|
| الرئيسية | `/` |
| عن السيرفر | `/about` |
| القطاعات | `/sectors` |
| التقديم | `/apply` |
| المتجر | `/store` |
| تفاصيل منتج | `/store/[id]` |
| القوانين | `/rules` |
| الإدارة | `/staff` |
| Discord | `/discord` |
| لوحة الإدارة | `/admin` |

---

## 🔌 ربط الخدمات الخارجية

### حالة السيرفر (FiveM)
في `src/config/site.ts`:
```ts
SERVER_API: "https://servers-frontend.fivem.net/api/servers/single/YOUR_ID",
```
أو في `.env.local`:
```env
SERVER_API_URL=...
```

### Discord Webhook (للطلبات)
```env
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/ID/TOKEN
```

### نظام الدفع (المتجر)
في `src/config/site.ts`:
```ts
STORE_URL: "https://your-payment-page.com",
PAYMENT_PROVIDER: "stripe", // أو paypal أو custom
```

---

## 🛡️ الأمان

- جميع API routes محمية بـ `ADMIN_SECRET`
- Rate limiting على نموذج التقديم (3 طلبات/ساعة لكل IP)
- Sanitization لجميع المدخلات
- Security headers مضافة في `next.config.ts`
- `/admin` مستثنى من robots.txt و sitemap

---

## 🎨 الألوان (من الشعار)

| المتغير | القيمة | الاستخدام |
|---------|--------|-----------|
| `--gold-primary` | `#C9A84C` | العناصر الرئيسية |
| `--gold-light` | `#E8C96A` | النصوص المضيئة |
| `--gold-dark` | `#A07832` | التدرجات |
| `--black-base` | `#111114` | خلفية الموقع |
| `--black-surface` | `#1A1A1F` | الكروت |

---

## 📝 TODO

- [ ] ربط قاعدة بيانات (Prisma + PostgreSQL / Firebase)
- [ ] إضافة نظام مصادقة للـ Admin (NextAuth.js / Clerk)
- [ ] ربط FiveM API لحالة السيرفر الحقيقية
- [ ] ربط Discord Webhook لإشعارات التقديم
- [ ] ربط مزود خدمة الدفع للمتجر
- [ ] رفع الموقع على Vercel أو VPS

---

*HQN POLICE MOD — تراثنا أصالتنا | Heritage. Honor. Duty.*
