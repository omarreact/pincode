import { ImageResponse } from "next/og";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "PINCODE IT — Technology that moves business forward";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{
      width: "100%", height: "100%", display: "flex", flexDirection: "column",
      justifyContent: "space-between", padding: 75, color: "#0d3323",
      background: "linear-gradient(138deg,#f7fdf9 0%,#e4f6ec 55%,#b1e8ce 100%)",
      fontFamily: "sans-serif",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div style={{ width: 63, height: 63, borderRadius: 18, background: "#008f64", display: "flex", alignItems: "center", justifyContent: "center", color: "#ffffff", fontWeight: 900, fontSize: 37 }}>P</div>
        <div style={{ fontSize: 33, fontWeight: 800, letterSpacing: -1 }}>PINCODE IT</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div style={{ fontSize: 78, fontWeight: 800, letterSpacing: -3, lineHeight: 1.02 }}>Technology that moves</div>
        <div style={{ fontSize: 78, fontWeight: 800, letterSpacing: -3, color: "#008f64", lineHeight: 1.02 }}>business forward.</div>
        <div style={{ fontSize: 24, color: "#426c56" }}>Web development · Digital platforms · Technical support</div>
      </div>
      <div style={{ fontSize: 22, color: "#337052", display: "flex", justifyContent: "flex-end" }}>pincodeit.com</div>
    </div>, size,
  );
}
