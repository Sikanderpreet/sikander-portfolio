import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { SITE } from "@/lib/data";

export const alt = `${SITE.name}, ${SITE.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Share card for LinkedIn / WhatsApp previews, in the site's flat look. */
export default async function OpengraphImage() {
  const [black, semi] = await Promise.all([
    readFile(join(process.cwd(), "assets/Montserrat-Black.ttf")),
    readFile(join(process.cwd(), "assets/Montserrat-SemiBold.ttf")),
  ]);
  const ink = "#16141a";
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#f3eee4", padding: 60 }}>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            background: "#fffaf0",
            border: `6px solid ${ink}`,
            borderRadius: 32,
            boxShadow: `14px 14px 0 ${ink}`,
            padding: "56px 64px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontFamily: "Semi", fontSize: 30, color: "#6b6457" }}>
            <div style={{ width: 22, height: 22, background: "#ff5b35", borderRadius: 4, transform: "rotate(-18deg)" }} />
            open to backend roles · remote / Delhi NCR
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontFamily: "Black", color: ink }}>
            <div style={{ fontSize: 92, lineHeight: 1 }}>{SITE.name}</div>
            <div style={{ display: "flex", marginTop: 22 }}>
              <div style={{ fontSize: 56, background: "#ffc83d", padding: "4px 18px", borderRadius: 12 }}>
                Backend Developer · Node.js
              </div>
            </div>
          </div>
          <div style={{ display: "flex", fontFamily: "Semi", fontSize: 30, color: ink }}>
            Production APIs for web and mobile apps · 4+ years
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Black", data: black, weight: 900 },
        { name: "Semi", data: semi, weight: 600 },
      ],
    }
  );
}
