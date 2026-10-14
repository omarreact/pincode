import type { Metadata } from "next";
import "./globals.css";
import "./glass.css";
export const metadata: Metadata = {
  metadataBase: new URL("https://www.pincodeit.com"),
  title: { default: "PINCODE IT — Technology that moves business forward", template: "%s | PINCODE IT" },
  description: "PINCODE IT builds, improves and supports useful digital systems for real business.",
  alternates: { canonical: "/" },
  openGraph: { type: "website", title: "PINCODE IT", description: "Technology that moves business forward.", url: "https://www.pincodeit.com" },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
