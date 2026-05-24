import { ImageResponse } from "next/og";

export const alt = "Sura Portfolio";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#ffffff",
          color: "#1b1b1b",
          display: "flex",
          fontFamily: "Arial, sans-serif",
          height: "100%",
          justifyContent: "center",
          padding: 72,
          width: "100%",
        }}
      >
        <div
          style={{
            border: "2px solid #2b7fff",
            borderRadius: 28,
            display: "flex",
            flexDirection: "column",
            gap: 24,
            padding: 56,
            width: "100%",
          }}
        >
          <div style={{ color: "#426188", fontSize: 28, fontWeight: 700 }}>
            AI / Backend / Product Engineering
          </div>
          <div style={{ fontSize: 86, fontWeight: 900, lineHeight: 0.95 }}>
            Sura Portfolio
          </div>
          <div style={{ color: "rgba(27,27,27,0.68)", fontSize: 32, lineHeight: 1.35 }}>
            Useful systems, clear evidence, and practical engineering decisions.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
