import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./glass.css";
import "./all-pages.css";

const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });

const description = "PINCODE IT designs, builds and supports websites, digital platforms and business technology. Explore practical development, optimization and support services in Bangladesh.";

export const metadata: Metadata = {
  metadataBase: new URL("https://pincodeit.com"),
  title: { default: "PINCODE IT — Coding Made Simple", template: "%s | PINCODE IT" },
  description,
  applicationName: "PINCODE IT",
  keywords: [
    "PINCODE IT", "Coding Made Simple", "Website Design",
    "Application Development", "Mobile App Development",
    "Software Development", "Web Hosting", "IT Consulting",
    "Technical Support", "Dhaka", "Bangladesh",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website", siteName: "PINCODE IT",
    title: "PINCODE IT — Coding Made Simple", description,
    url: "https://pincodeit.com/", locale: "en_BD",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "PINCODE IT — Technology that moves business forward" }],
  },
  twitter: { card: "summary_large_image", title: "PINCODE IT — Coding Made Simple", description },
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }, { url: "/icon.svg", type: "image/svg+xml", sizes: "any" }], shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={inter.variable}><body>{children}</body></html>;
}
