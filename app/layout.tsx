import type { Metadata } from "next";
import "./globals.css";
import "./glass.css";
import "./all-pages.css";
import "./support.css";
import { ServiceAssistant } from "@/components/ServiceAssistant";

const description = "PINCODE is one of the newest famous IT firms. Our tag 'Coding Made Simple' defines who we are. We provide the best IT solution in a very short time with a professional team of skilled workers.";

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
    images: [{ url: "/brand/pincode-mark.svg", width: 512, height: 512, alt: "PINCODE IT logo" }],
  },
  twitter: { card: "summary", title: "PINCODE IT — Coding Made Simple", description },
  icons: { icon: "/brand/pincode-mark.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}<ServiceAssistant /></body></html>;
}

