import type { Metadata } from "next";
import { LegacyHomepage } from "@/components/LegacyHomepage";
export const metadata: Metadata = { title: "PINCODE IT — Technology that moves business forward", alternates: { canonical: "/" } };
export default function HomePage(){return <LegacyHomepage/>}
