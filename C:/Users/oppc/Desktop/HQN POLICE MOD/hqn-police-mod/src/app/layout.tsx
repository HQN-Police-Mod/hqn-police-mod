import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { PageIntro } from "@/components/layout/PageIntro";
import { PageTransition } from "@/components/layout/PageTransition";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-cairo",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.SITE_URL),
  title: {
    default: "HQN POLICE MOD | الموقع الرسمي",
    template: "%s | HQN POLICE MOD",
  },
  description: siteConfig.SERVER_DESCRIPTION,
  keywords: ["HQN", "Police Mod", "FiveM", "Saudi", "Roleplay", "حقن مود الشرطة", "سيرفر شرطة"],
  authors: [{ name: "HQN POLICE MOD" }],
  creator: "HQN POLICE MOD",
  openGraph: {
    type: "website",
    locale: "ar_SA",
    url: siteConfig.SITE_URL,
    title: "HQN POLICE MOD | الموقع الرسمي",
    description: siteConfig.SERVER_DESCRIPTION,
    siteName: siteConfig.SERVER_NAME,
    images: [{ url: siteConfig.OG_IMAGE, width: 1200, height: 630, alt: "HQN POLICE MOD" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "HQN POLICE MOD | الموقع الرسمي",
    description: siteConfig.SERVER_DESCRIPTION,
    images: [siteConfig.OG_IMAGE],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/HQN.png",
    shortcut: "/HQN.png",
    apple: "/HQN.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable} suppressHydrationWarning>
      <body className={cairo.className} suppressHydrationWarning>
        {/* Intro — shows once per session */}
        <PageIntro />
        {/* Page transition wrapper */}
        <PageTransition>
          {children}
        </PageTransition>
      </body>
    </html>
  );
}
