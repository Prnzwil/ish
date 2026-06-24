import type { Metadata } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import ChromeGate from "@/components/ChromeGate";
import FloatBook from "@/components/FloatBook";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kutie's Beauty Lounge — Where Beauty Meets Confidence",
  description:
    "A modern hair and beauty salon offering styling, color, treatments, extensions, bridal, and beauty services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body>
        <ChromeGate>
          <Nav />
        </ChromeGate>
        <main>{children}</main>
        <ChromeGate>
          <Footer />
          <FloatBook />
        </ChromeGate>
      </body>
    </html>
  );
}
