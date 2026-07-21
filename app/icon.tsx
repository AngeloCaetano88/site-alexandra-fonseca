import { ImageResponse } from "next/og";

export const size = { width: 48, height: 48 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 10,
          fontFamily: "sans-serif",
          fontWeight: 800,
          fontSize: 20,
          letterSpacing: -1,
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
