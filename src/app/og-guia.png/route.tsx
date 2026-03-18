import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
          padding: "60px 80px",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(251, 191, 36, 0.15)",
            border: "1px solid rgba(251, 191, 36, 0.3)",
            borderRadius: "100px",
            padding: "8px 20px",
            marginBottom: "32px",
          }}
        >
          <span style={{ fontSize: "16px" }}>📘</span>
          <span style={{ color: "#fbbf24", fontSize: "16px", fontWeight: 700, letterSpacing: "0.05em" }}>
            GUÍA GRATUITA
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            marginBottom: "32px",
          }}
        >
          <span style={{ color: "#ffffff", fontSize: "52px", fontWeight: 800, lineHeight: 1.15 }}>
            5 Errores en tus
          </span>
          <span style={{ color: "#ffffff", fontSize: "52px", fontWeight: 800, lineHeight: 1.15 }}>
            Cotizaciones que te
          </span>
          <span style={{ color: "#ffffff", fontSize: "52px", fontWeight: 800, lineHeight: 1.15 }}>
            Hacen{" "}
            <span style={{ color: "#ef4444" }}>Perder Ventas</span>
          </span>
        </div>

        {/* Subtitle */}
        <span
          style={{
            color: "rgba(255,255,255,0.6)",
            fontSize: "22px",
            lineHeight: 1.5,
            maxWidth: "700px",
            marginBottom: "40px",
          }}
        >
          Descarga la guía gratuita y aprende cómo cerrar más deals con cotizaciones profesionales.
        </span>

        {/* Footer */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              background: "#3a9bb5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: 800,
              fontSize: "20px",
            }}
          >
            D
          </div>
          <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "20px", fontWeight: 600 }}>
            dealforge.es/guia
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
