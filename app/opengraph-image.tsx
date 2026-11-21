import { ImageResponse } from "next/og";

export const alt = "Ask2Gift: a one-minute gift finder quiz";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          backgroundColor: "#21493D",
          color: "#FFF9F2",
          fontFamily: "sans-serif"
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 84,
              height: 84,
              borderRadius: 42,
              backgroundColor: "#F57F6C",
              fontSize: 30,
              fontWeight: 700
            }}
          >
            a2g
          </div>
          <div style={{ display: "flex", marginLeft: 24, fontSize: 38, fontWeight: 700, letterSpacing: 6 }}>ASK2GIFT</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 76, fontWeight: 700, lineHeight: 1.08, maxWidth: 980 }}>
            Thoughtful gift ideas for every occasion.
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 34, color: "#EAF4EF" }}>
            Free gift finder quiz. No account needed.
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#F9E7DF" }}>ask2gift.com</div>
      </div>
    ),
    size
  );
}
