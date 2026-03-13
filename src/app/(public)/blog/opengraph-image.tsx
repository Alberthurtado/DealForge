import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Blog DealForge - Articulos sobre ventas, CPQ e IA";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #f0f9ff 0%, #ffffff 50%, #f5f3ff 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: "linear-gradient(90deg, #3a9bb5, #7c3aed)",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "linear-gradient(135deg, #3a9bb5, #2d7d94)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 24,
              fontWeight: 800,
            }}
          >
            D
          </div>
          <span style={{ fontSize: 32, fontWeight: 700, color: "#6b7280" }}>
            DealForge
          </span>
        </div>

        <div
          style={{
            fontSize: 52,
            fontWeight: 800,
            color: "#111827",
            letterSpacing: -1,
            marginBottom: 16,
          }}
        >
          Blog
        </div>

        <div
          style={{
            fontSize: 24,
            color: "#6b7280",
            maxWidth: 600,
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          Articulos sobre ventas, CPQ e inteligencia artificial para PYMEs
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 32,
            fontSize: 18,
            color: "#9ca3af",
          }}
        >
          dealforge.es/blog
        </div>
      </div>
    ),
    { ...size }
  );
}
