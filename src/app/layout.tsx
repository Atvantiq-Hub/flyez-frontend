import type { Metadata } from "next";
import { Alegreya, EB_Garamond, Montserrat, Geist_Mono } from "next/font/google";
import "./globals.css";

// Koursair type system: Alegreya (serif headings) + EB Garamond (serif body)
// + Montserrat (sans UI accent). Weights are capped so headings never render
// at 800/900 (which previously looked overly bold and big).
const alegreya = Alegreya({
  variable: "--font-alegreya",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FlyEz — Unpublished Flight Deals & Secret Agent Rates",
  description:
    "Access exclusive offline discounts, private consolidator rates, and group airfare deals not available online.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${alegreya.variable} ${ebGaramond.variable} ${montserrat.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
