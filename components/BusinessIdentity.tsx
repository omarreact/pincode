const details = {
  name: "PINCODE IT",
  tagline: "Coding Made Simple",
  description: "PINCODE is one of the newest famous IT firms. Our tag 'Coding Made Simple' defines who we are. We provide the best IT solution in a very short time with a professional team of skilled workers.",
  address: "Patira Bazar, Opposite of Purbachal Sector #1, Tolna, Khilkhet, Dhaka 1229, Bangladesh",
  website: "https://pincodeit.com/",
  hours: "Monday–Thursday, 9:00 AM–5:00 PM",
  services: ["Website Design", "Application Development", "Mobile App Development",
    "Software Development", "Web Hosting & Technical Support", "Computer Support",
    "Installation", "IT Consulting"],
} as const;

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://pincodeit.com/#business",
  name: details.name,
  slogan: details.tagline,
  description: details.description,
  url: details.website,
  logo: "https://pincodeit.com/brand/pincode-mark.svg",
  address: {
    "@type": "PostalAddress", streetAddress: "Patira Bazar, Opposite of Purbachal Sector #1, Tolna, Khilkhet",
    addressLocality: "Dhaka", postalCode: "1229", addressCountry: "BD",
  },
  openingHoursSpecification: [{
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
    opens: "09:00", closes: "17:00",
  }],
  hasOfferCatalog: {
    "@type": "OfferCatalog", name: "PINCODE IT Services",
    itemListElement: details.services.map(name => ({
      "@type": "OfferCatalog", name,
    })),
  },
};

export function BusinessIdentity() {
  return <section aria-labelledby="pincode-business-heading" style={{
    background: "#f8faf8", color: "#101714", padding: "clamp(45px,8vw,95px) clamp(22px,8vw,120px)",
    fontFamily: "Inter,system-ui,sans-serif", borderTop: "1px solid #e6ece7",
  }}>
    <script type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    <div style={{ maxWidth: 1280, margin: "0 auto" }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 18 }}>
        <img src="/brand/pincode-mark.svg" width="64" height="64" alt="PINCODE IT brand symbol" />
        <div>
          <p style={{ fontSize: 12, letterSpacing: "0.15em", color: "#32885d", fontWeight: 800, margin: "0 0 4px" }}>PINCODE IT · BANGLADESH</p>
          <h2 id="pincode-business-heading" style={{ margin: 0, fontSize: "clamp(28px,4vw,46px)", fontWeight: 800 }}>Coding Made Simple.</h2>
        </div>
      </div>
      <p style={{ maxWidth: 790, marginTop: 23, fontSize: 15, lineHeight: 1.8, color: "#59695e" }}>{details.description}</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(240px,100%),1fr))", gap: 22, marginTop: 32 }}>
        <div style={{ border: "1px solid #dce9e0", borderRadius: 20, background: "white", padding: 25 }}>
          <h3 style={{ margin: "0 0 14px", fontSize: 19 }}>Our services</h3>
          <ul style={{ margin: 0, paddingLeft: 22, lineHeight: 2.1, color: "#59695e", fontSize: 13 }}>
            {details.services.map(service => <li key={service}>{service}</li>)}
          </ul>
        </div>
        <div style={{ border: "1px solid #dce9e0", borderRadius: 20, background: "white", padding: 25 }}>
          <h3 style={{ margin: "0 0 14px", fontSize: 19 }}>Visit & contact</h3>
          <address style={{ fontStyle: "normal", lineHeight: 1.9, color: "#59695e", fontSize: 14 }}>
            {details.address}
          </address>
          <p style={{ color: "#59695e", lineHeight: 1.8, fontSize: 14 }}>
            <strong>Hours:</strong> {details.hours}<br/>
          </p>
          <a href="https://share.google/TPwIHMdnBS5GtG8ul" target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-block", borderRadius: 40, background: "#32885d", padding: "12px 18px", color: "white", fontSize: 13, fontWeight: 700 }}>
            View Google Business Profile ↗
          </a>
        </div>
      </div>
    </div>
  </section>;
}
