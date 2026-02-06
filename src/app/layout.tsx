import type { Metadata } from "next";
import { Source_Sans_3, Merriweather } from "next/font/google";
import { Providers } from "@/components/Providers";
import "./globals.css";

// Source Sans 3 - Used by U.S. Government design systems
const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  weight: ["300", "400", "500", "600", "700"],
});

// Merriweather - Authoritative serif for headings
const merriweather = Merriweather({
  subsets: ["latin"],
  variable: "--font-merriweather",
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "City of Mansfield Events Calendar",
  description: "Discover events, programs, and activities in Mansfield, Texas",
  keywords: ["Mansfield", "Texas", "events", "calendar", "community", "parks", "library"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sourceSans.variable} ${merriweather.variable} font-sans antialiased`}>
        <a href="#main-content" className="skip-nav">
          Skip to main content
        </a>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
