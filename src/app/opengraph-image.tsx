import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = "Phey Rashidova, a digital scrapbook";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Satori needs TTF/OTF, so these ship with the repo (OFL-licensed fonts).
const fontDir = join(process.cwd(), "src/assets/og-fonts");

export default async function Image() {
  const [serif, hand, sans] = await Promise.all([
    readFile(join(fontDir, "InstrumentSerif.ttf")),
    readFile(join(fontDir, "Caveat.ttf")),
    readFile(join(fontDir, "DMSans.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f2ebdd",
          fontFamily: "DM Sans",
        }}
      >
        {/* Back sheet */}
        <div
          style={{
            position: "absolute",
            width: 860,
            height: 440,
            background: "#a3aa91",
            opacity: 0.45,
            transform: "rotate(3deg)",
          }}
        />
        {/* Main card */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: 860,
            height: 440,
            padding: "0 72px",
            background: "#faf7f0",
            transform: "rotate(-1.5deg)",
            boxShadow: "0 18px 40px rgba(55,52,47,0.18)",
          }}
        >
          {/* Tape */}
          <div
            style={{
              position: "absolute",
              top: -22,
              left: 360,
              width: 150,
              height: 44,
              background: "#b9785c",
              opacity: 0.75,
              transform: "rotate(-4deg)",
            }}
          />
          <div style={{ fontFamily: "Caveat", fontSize: 40, color: "#b9785c" }}>
            a digital scrapbook of
          </div>
          <div
            style={{
              fontFamily: "Instrument Serif",
              fontSize: 112,
              lineHeight: 1,
              color: "#455646",
              marginTop: 8,
            }}
          >
            {site.name}
          </div>
          <div style={{ fontSize: 28, color: "#37342f", marginTop: 28 }}>
            Uzbekistan → Duke · dance · baking · side quests
          </div>
          <div
            style={{
              position: "absolute",
              right: 48,
              bottom: 36,
              fontFamily: "Caveat",
              fontSize: 34,
              color: "#806d59",
              transform: "rotate(-4deg)",
            }}
          >
            knowledge is meant to be shared
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Instrument Serif", data: serif, style: "normal", weight: 400 },
        { name: "Caveat", data: hand, style: "normal", weight: 600 },
        { name: "DM Sans", data: sans, style: "normal", weight: 400 },
      ],
    },
  );
}
