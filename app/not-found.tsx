import { SiteHeader, SiteFooter } from "@/components/SiteShell";
import { AgencyPageHero } from "@/components/AgencyPageHero";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="agency-subpage">
        <AgencyPageHero
          headingId="agency-page-title"
          eyebrow="PINCODE IT / 404"
          title="That page isn't here."
          description="The address may have changed or the page may no longer exist. You can return home or explore our services."
          primary={{ href: "/", label: "Return home", arrow: "↗" }}
          secondary={{ href: "/services", label: "Explore services", arrow: "↗" }}
          stages={["FIND", "EXPLORE", "CONTINUE"]}
        />
      </main>
      <SiteFooter />
    </>
  );
}
