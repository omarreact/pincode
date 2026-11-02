/**
 * Free-to-use editorial photographs from Unsplash.
 *
 * Images illustrate design, technology and business environments; they never
 * represent PINCODE IT employees, clients or completed customer projects.
 * All sources are documented in docs/IMAGE-SOURCES.md.
 */
const unsplash = (id: string) => `https://images.unsplash.com/${id}`;

export const photos = {
  programming: { src: unsplash("photo-1498050108023-c5249f4df085"), alt: "Laptop showing software code in a bright workspace" },
  teamwork: { src: unsplash("photo-1519389950473-47ba0277781c"), alt: "Colleagues collaborating around laptop computers" },
  studio: { src: unsplash("photo-1497366754035-f200968a6e72"), alt: "Bright modern office and shared working space" },
  workspace: { src: unsplash("photo-1524758631624-e2822e304c36"), alt: "Contemporary studio workspace and seating" },
  strategy: { src: unsplash("photo-1552664730-d307ca884978"), alt: "Workshop participants planning a project using sticky notes" },
  infrastructure: { src: unsplash("photo-1558494949-ef010cbdcc31"), alt: "Server infrastructure in a professional data center" },
  connected: { src: unsplash("photo-1451187580459-43490279c0fa"), alt: "Earth at night, illustrating an interconnected digital world" },
  insights: { src: unsplash("photo-1516321318423-f06f85e504b3"), alt: "Collaborative digital workspace with laptop computers" },
  planning: { src: unsplash("photo-1531403009284-440f080d1e12"), alt: "Project-planning desk with notes and materials" },
  productivity: { src: unsplash("photo-1504384308090-c894fdcc538d"), alt: "Busy contemporary open-plan technology workspace" },
  business: { src: unsplash("photo-1521737711867-e3b97375f902"), alt: "Professional group working together around a table" },
  digital: { src: unsplash("photo-1460925895917-afdab827c52f"), alt: "Laptop displaying analytics and digital business charts" },
  laptop: { src: unsplash("photo-1499951360447-b19be8fe80f5"), alt: "Laptop on a well-organized modern office desk" },
  userExperience: { src: unsplash("photo-1559028012-481c04fa702d"), alt: "Design and user experience workspace" },
  mobile: { src: unsplash("photo-1512941937669-90a1b58e7e9f"), alt: "Mobile devices used in digital product development" },
  network: { src: unsplash("photo-1518770660439-4636190af475"), alt: "Electronic circuit board representing computing infrastructure" },
  architecture: { src: unsplash("photo-1486406146926-c627a92ad1ab"), alt: "Modern glass architecture from a low angle" },
  security: { src: unsplash("photo-1563013544-824ae1b704d3"), alt: "Digital security and technology illustration" },
  dashboard: { src: unsplash("photo-1551288049-bebda4e38f71"), alt: "Business performance analytics on a computer display" },
  workshop: { src: unsplash("photo-1522071820081-009f0129c71c"), alt: "Creative professionals working together" },
  meeting: { src: unsplash("photo-1556761175-b413da4baf72"), alt: "Business team in a collaborative meeting" },
  leadership: { src: unsplash("photo-1560472354-b33ff0c44a43"), alt: "Professionals collaborating on business decisions" },
  building: { src: unsplash("photo-1497366811353-6870744d04b2"), alt: "A minimalist contemporary office interior" },
  hosting: { src: unsplash("photo-1518770660439-4636190af475"), alt: "Technology hardware and electronic circuits" },
  consultation: { src: unsplash("photo-1542744173-8e7e53415bb0"), alt: "Business presentation and consulting session" },
  creative: { src: unsplash("photo-1522202176988-66273c2fd55f"), alt: "People collaborating in a creative learning environment" },
} as const;

export type PhotoKey = keyof typeof photos;
export type GalleryName = "services" | "solutions" | "work" | "about" | "insights" | "contact" | "domains" | "hosting";

export const pagePhotography: Record<GalleryName, {
  hero: PhotoKey;
  cards: readonly PhotoKey[];
  mosaic: readonly [PhotoKey, PhotoKey, PhotoKey];
  caption: string;
}> = {
  services: { hero: "programming", cards: ["programming","mobile","digital","network","infrastructure","strategy"], mosaic: ["teamwork","laptop","workspace"], caption: "Built for people. Engineered for progress." },
  solutions: { hero: "teamwork", cards: ["architecture","digital","productivity","security"], mosaic: ["business","dashboard","planning"], caption: "Different challenges. Thoughtful solutions." },
  work: { hero: "productivity", cards: ["userExperience","programming","strategy","infrastructure"], mosaic: ["workshop","digital","consultation"], caption: "Explore the disciplines behind well-built products." },
  about: { hero: "studio", cards: ["meeting","laptop","network","business"], mosaic: ["workspace","strategy","teamwork"], caption: "Practical thinking, human collaboration, lasting care." },
  insights: { hero: "insights", cards: ["planning","programming","security","business"], mosaic: ["digital","workshop","architecture"], caption: "Perspectives that connect ideas with outcomes." },
  contact: { hero: "consultation", cards: ["strategy","workshop","studio"], mosaic: ["meeting","laptop","workspace"], caption: "A good project starts with a clear conversation." },
  domains: { hero: "connected", cards: ["laptop","architecture","digital"], mosaic: ["network","workspace","business"], caption: "From a name to a memorable digital presence." },
  hosting: { hero: "infrastructure", cards: ["infrastructure","security","dashboard"], mosaic: ["network","productivity","studio"], caption: "A reliable foundation supports everything above it." },
};

export const photo = (key: PhotoKey) => photos[key];
