import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "DealForge - CPQ Inteligente con IA para PYMEs";
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
          background: "linear-gradient(135deg, #f0f9ff 0%, #ffffff 50%, #f0fdf4 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Top accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: "linear-gradient(90deg, #3a9bb5, #2d7d94)",
          }}
        />

        {/* Logo area */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "linear-gradient(135deg, #3a9bb5, #2d7d94)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 32,
              fontWeight: 800,
            }}
          >
            D
          </div>
          <span
            style={{
              fontSize: 48,
              fontWeight: 800,
              color: "#111827",
              letterSpacing: -1,
            }}
          >
            DealForge
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            fontWeight: 600,
            color: "#3a9bb5",
            marginBottom: 16,
            letterSpacing: -0.5,
          }}
        >
          CPQ Inteligente con IA
        </div>

        <div
          style={{
            fontSize: 22,
            color: "#6b7280",
            maxWidth: 700,
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          Cotizaciones profesionales en minutos para PYMEs
        </div>

        {/* Feature pills */}
        <div
          style={{
            display: "flex",
            gap: 12,
            marginTop: 40,
          }}
        >
          {["Forge IA", "PDF Profesional", "Reglas Comerciales", "Aprobaciones"].map(
            (f) => (
              <div
                key={f}
                style={{
                  padding: "8px 20px",
                  borderRadius: 999,
                  background: "rgba(58, 155, 181, 0.1)",
                  color: "#3a9bb5",
                  fontSize: 16,
                  fontWeight: 600,
                }}
              >
                {f}
              </div>
            )
          )}
        </div>

        {/* URL */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            fontSize: 18,
            color: "#9ca3af",
            fontWeight: 500,
          }}
        >
          dealforge.es
        </div>
      </div>
    ),
    { ...size }
  );
}
