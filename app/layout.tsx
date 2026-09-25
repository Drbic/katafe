import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "KATAFE — Kavárna & brunch v Chrudimi",
  description:
    "KATAFE v Chrudimi: espresso a filtrovaná káva, brunch, matcha a denní nabídka. Místo pro malou pauzu a dobré jídlo.",
};

export const viewport: Viewport = { themeColor: "#f4f1e9" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs" className={montserrat.variable}>
      <body>{children}</body>
    </html>
  );
}
