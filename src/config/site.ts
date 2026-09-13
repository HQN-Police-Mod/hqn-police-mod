// ===================================================
// HQN POLICE MOD — Central Configuration
// Edit this file to update all site-wide settings
// ===================================================

export const siteConfig = {
  // Server Info
  SERVER_NAME: "HQN POLICE MOD",
  SERVER_NAME_AR: "حقن مود الشرطة",
  SERVER_TAGLINE: "تجربة Police Mod مختلفة",
  SERVER_DESCRIPTION:
    "سيرفر HQN Police Mod هو تجربة police roleplay سعودية احترافية تجمع بين الواقعية والتنظيم الأمني. نقدم منظومة متكاملة من القطاعات الأمنية بإدارة عالية الجودة ومجتمع متماسك.",

  // Connection
  SERVER_IP: "cfx.re/join/8ee3vd3",
  SERVER_CONNECT: "https://cfx.re/join/8ee3vd3",

  // Discord
  DISCORD_URL: "https://discord.gg/nGYBFVjRDW",
  DISCORD_INVITE: "nGYBFVjRDW",
  DISCORD_WIDGET_ID: "",

  // APIs
  // FiveM public API — returns live players/info for this server code
  SERVER_API: "https://servers-frontend.fivem.net/api/servers/single/8ee3vd3",
  SERVER_CFX_CODE: "8ee3vd3",
  DISCORD_WEBHOOK: "",

  // Store
  STORE_URL: "", // TODO: Add store/payment provider URL
  PAYMENT_PROVIDER: "manual", // "manual" | "stripe" | "paypal" | "custom"

  // Site
  SITE_URL: "https://hqnpolice.sa", // TODO: Replace with actual domain
  SERVER_LOGO: "/HQN.png",
  OG_IMAGE: "/og-image.png", // TODO: Add OG image

  // Limits
  MAX_PLAYERS: 64,

  // Motto
  MOTTO: "تراثنا أصالتنا",
} as const;

export type SiteConfig = typeof siteConfig;
