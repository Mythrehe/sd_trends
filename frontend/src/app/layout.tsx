import "./globals.css";
import { StoreProvider } from "../context/StoreContext";
import { Roboto, Playfair_Display, Oswald } from "next/font/google";
import ThemeToggle from "../components/ThemeToggle/ThemeToggle";
import BackToTop from "../components/BackToTop/BackToTop";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfair-display",
});

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-oswald",
});

export const metadata = {
  title: "SD Trends Design | Luxury Fine Jewelry & Accessories",
  description: "Discover curated collections of diamond engagement rings, vintage emerald bands, South Sea pearls, gold hoops, and tennis bracelets at SD Trends Design. Elegant handcrafted luxury.",
  keywords: "jewelry store, diamonds, engagement rings, gold necklaces, emerald band, luxury accessories, sd trends design, boutique jewelry",
  authors: [{ name: "SD Trends Design" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${roboto.variable} ${playfair.variable} ${oswald.variable}`}>
      <body>
        <StoreProvider>
          {children}
          <ThemeToggle />
          <BackToTop />
        </StoreProvider>
      </body>
    </html>
  );
}
