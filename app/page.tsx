import type { Metadata } from "next";
import { LegacyHomepage } from "@/components/LegacyHomepage";
import { LegacyLinkBridge } from "@/components/LegacyLinkBridge";
import { BusinessIdentity } from "@/components/BusinessIdentity";

export const metadata: Metadata = {
  title: { absolute: "PINCODE IT — Coding Made Simple" },
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      {/* React hoists these resources and waits for styles before displaying the
          restored homepage. Both sheets are scoped to #pincode-legacy-home. */}
      <link rel="stylesheet" href="/legacy-home.css" precedence="default" />
      <link rel="stylesheet" href="/legacy-glass.css" precedence="default" />
      <LegacyLinkBridge />
      <LegacyHomepage />
      <BusinessIdentity />
    </>
  );
}
