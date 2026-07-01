import type { Metadata } from "next";
import { EB_Garamond, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import StickyBottomCall from "@/components/StickyBottomCall";

// Koursair font: EB Garamond used site-wide (headings, body, header menu, UI).
// Weights capped at 700 so headings stay elegant, not overly bold/big.
const ebGaramond = EB_Garamond({
  variable: "--font-eb-garamond",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
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
      className={`${ebGaramond.variable} ${geistMono.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <StickyBottomCall />
      </body>
    </html>
  );
}
