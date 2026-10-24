import type { Metadata, Viewport } from "next";
import { Caveat, DM_Sans, Instrument_Serif } from "next/font/google";
import { site, siteUrl } from "@/content/site";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: site.name,
  description: site.description,
  openGraph: {
    title: site.name,
    description: site.description,
    url: "/",
    siteName: site.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#f2ebdd",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${dmSans.variable} ${caveat.variable} antialiased`}
    >
      <body className="min-h-screen font-sans text-ink">{children}</body>
    </html>
  );
}
