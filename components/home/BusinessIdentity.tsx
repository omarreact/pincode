const details = {
  name: "PINCODE IT",
  tagline: "Coding Made Simple",
  description: "PINCODE IT designs, builds and supports websites, applications and reliable digital systems for businesses. Our approach prioritizes practical solutions, clear communication and long-term support.",
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

/**
 * Business identity is structured data, not a second homepage footer.
 * The visible homepage already contains a proper CTA and a site footer.
 */
export function BusinessIdentity() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
      }}
    />
  );
}
