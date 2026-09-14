import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { PageIntro } from "@/components/layout/PageIntro";
import { PageTransition } from "@/components/layout/PageTransition";
import { Providers } from "@/components/layout/Providers";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.SITE_URL),
  title: {
    default: "HQN POLICE MOD | الموقع الرسمي",
    template: "%s | HQN POLICE MOD",
  },
  description: siteConfig.SERVER_DESCRIPTION,
  keywords: ["HQN", "Police Mod", "FiveM", "Saudi", "Roleplay", "حقن مود الشرطة"],
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
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/HQN.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        {/* Cairo font via Google Fonts CDN */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <style>{`
          :root { --font-cairo: 'Cairo', sans-serif; }
          body { font-family: 'Cairo', sans-serif; }
        `}</style>
      </head>
      <body suppressHydrationWarning>
        <Providers>
          <PageIntro />
          <PageTransition>{children}</PageTransition>
        </Providers>
      </body>
    </html>
  );
}
