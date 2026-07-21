import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0B1F3A",
          fontFamily: "sans-serif",
          fontWeight: 800,
          fontSize: 64,
          letterSpacing: -2,
        }}
      >
        <span style={{ color: "#00C853" }}>8</span>
        <span style={{ color: "#00C853" }}>0</span>
        <span style={{ color: "rgba(255,255,255,0.4)" }}>/</span>
        <span style={{ color: "#1565C0" }}>2</span>
        <span style={{ color: "#1565C0" }}>0</span>
      </div>
    ),
    { ...size }
  );
}
