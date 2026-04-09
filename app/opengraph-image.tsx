import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "linear-gradient(135deg, #dbe3d2 0%, #fcf9f6 46%, #edd9cb 100%)",
          color: "#1c1c1a",
          padding: "64px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "32px",
            borderRadius: "42px",
            border: "1px solid rgba(70, 100, 51, 0.12)",
            background: "rgba(252, 249, 246, 0.64)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            position: "relative",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span
              style={{
                fontSize: 22,
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: "#8f4c2e",
              }}
            >
              Halal in Hamburg
            </span>
            <div
              style={{
                width: 160,
                height: 160,
                borderRadius: 999,
                background: "rgba(70, 100, 51, 0.12)",
              }}
            />
          </div>
          <div style={{ maxWidth: 760, display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 88, fontWeight: 800, lineHeight: 1, letterSpacing: "-0.04em" }}>
              Premium halal-friendly tours in Hamburg
            </span>
            <span
              style={{
                marginTop: 28,
                fontSize: 32,
                lineHeight: 1.4,
                color: "#43483e",
              }}
            >
              Food tours, heritage walks, and calm concierge-style city discovery for Muslim
              travellers.
            </span>
          </div>
          <div style={{ display: "flex", gap: 18 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "18px 28px",
                borderRadius: 20,
                background: "linear-gradient(135deg, #466433 0%, #5e7d49 100%)",
                color: "white",
                fontSize: 22,
                fontWeight: 700,
              }}
            >
              halalinhamburg.com
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
