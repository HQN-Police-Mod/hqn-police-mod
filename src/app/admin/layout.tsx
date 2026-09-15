import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { default: "لوحة الإدارة", template: "%s | Admin — HQN" },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <style>{`body{font-family:'Cairo',sans-serif;background:#09090C;color:#F5F0E8;margin:0}`}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}
