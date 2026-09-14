import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "HQN POLICE MOD | الموقع الرسمي";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #07070A 0%, #0D0D14 60%, #07070A 100%)",
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* Grid lines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(201,168,76,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.06) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Gold top border */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, transparent, #C9A84C, #E8C96A, #C9A84C, transparent)",
          }}
        />

        {/* Gold bottom border */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, transparent, #C9A84C, #E8C96A, #C9A84C, transparent)",
          }}
        />

        {/* Logo */}
        <img
          src="https://hqn-police-mod.vercel.app/HQN.png"
          width={180}
          height={180}
          style={{ marginBottom: "24px", objectFit: "contain" }}
        />

        {/* Title */}
        <div
          style={{
            fontSize: "72px",
            fontWeight: 900,
            color: "#C9A84C",
            letterSpacing: "-2px",
            marginBottom: "12px",
          }}
        >
          HQN POLICE MOD
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "28px",
            color: "#8A8070",
            letterSpacing: "2px",
          }}
        >
          تجربة Police Mod مختلفة
        </div>

        {/* Motto */}
        <div
          style={{
            position: "absolute",
            bottom: "24px",
            fontSize: "18px",
            color: "#5A5045",
            letterSpacing: "4px",
          }}
        >
          تراثنا أصالتنا
        </div>
      </div>
    ),
    { ...size }
  );
}
