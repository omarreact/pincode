import Image from "next/image";
import Link from "next/link";
import "./project-showcase.css";

/**
 * Repository-backed interface previews. Assets are copied from the public
 * PinCMS and PinAI repositories into the website, not fabricated mockups.
 */
export function ProjectShowcase() {
  return (
    <section className="agency-project-showcase" aria-labelledby="real-projects-title">
      <div className="agency-project-heading">
        <div>
          <span className="agency-eyebrow">SELECTED INTERFACES / REPOSITORY PREVIEWS</span>
          <h2 id="real-projects-title">Products you can actually explore.</h2>
        </div>
        <p>See interface previews from public PINCODE IT engineering projects. These are repository images, not screenshots of fictional clients or performance claims.</p>
      </div>
      <div className="agency-project-gallery">
        <article className="agency-project-feature agency-project-feature-cms">
          <div className="agency-project-art" aria-label="PinCMS preview images">
            <div className="agency-browser agency-browser-main">
              <div className="agency-browser-top"><span className="agency-browser-dots" aria-hidden="true">● ● ●</span><span>PINCODE IT / CMS</span></div>
              <div className="agency-browser-image"><Image src="/images/projects/pincms-dashboard.webp" alt="PinCMS content dashboard preview from the project repository" fill sizes="(max-width: 840px) 84vw, 44vw" quality={82} /></div>
            </div>
            <div className="agency-browser agency-browser-float">
              <div className="agency-browser-top"><span className="agency-browser-dots" aria-hidden="true">● ● ●</span><span>EDITOR</span></div>
              <div className="agency-browser-image"><Image src="/images/projects/pincms-editor.webp" alt="PinCMS editing interface preview" fill sizes="(max-width: 840px) 54vw, 26vw" quality={80} /></div>
            </div>
          </div>
          <div className="agency-project-description">
            <div><span className="agency-project-category">CONTENT MANAGEMENT / NEXT.JS</span><h3>PinCMS</h3><p>An editing workspace, content dashboard and theme-management foundation for modern websites.</p></div>
            <a href="https://github.com/omarreact/PinCMS" target="_blank" rel="noopener noreferrer">Explore source <span aria-hidden="true">↗</span></a>
          </div>
        </article>
        <article className="agency-project-feature agency-project-feature-ai">
          <div className="agency-project-art agency-project-art-ai" aria-label="PinAI interface previews">
            <div className="agency-browser agency-browser-ai-main">
              <div className="agency-browser-top"><span className="agency-browser-dots" aria-hidden="true">● ● ●</span><span>PINAI / WORKSPACE</span></div>
              <div className="agency-browser-image"><Image src="/images/projects/pinai-builder.png" alt="PinAI application builder workspace captured in the public repository" fill sizes="(max-width: 840px) 84vw, 44vw" quality={82}/></div>
            </div>
            <div className="agency-browser agency-browser-ai-float">
              <div className="agency-browser-image"><Image src="/images/projects/pinai-scan.png" alt="PinAI scan interface repository screenshot" fill sizes="(max-width: 840px) 42vw, 18vw" quality={78}/></div>
            </div>
          </div>
          <div className="agency-project-description">
            <div><span className="agency-project-category">AI TOOLS / APPLICATION WORKSPACE</span><h3>PinAI</h3><p>Developer-oriented tools and interfaces, with implementation and release status visible in the public codebase.</p></div>
            <a href="https://github.com/omarreact/PinAI" target="_blank" rel="noopener noreferrer">Explore source <span aria-hidden="true">↗</span></a>
          </div>
        </article>
      </div>
      <div className="agency-project-bottom"><span>Screenshots from public repositories · UI may change between releases</span><Link href="/contact">Discuss a project <span aria-hidden="true">↗</span></Link></div>
    </section>
  );
}
