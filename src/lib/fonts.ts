import { Inter, Cormorant_Garamond, Noto_Serif_JP, JetBrains_Mono } from "next/font/google";

export const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const fontDisplay = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display-cormorant",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const fontJp = Noto_Serif_JP({
  subsets: ["latin"],
  variable: "--font-jp-noto",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-jet",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});
