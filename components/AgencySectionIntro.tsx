type AgencySectionIntroProps = {
  variant: "explore" | "contact";
  headingId: string;
  eyebrow: string;
  title: string;
  description: string;
};

/** Reuses heading hierarchy, scroll reveal and typography across sections. */
export function AgencySectionIntro({
  variant,
  headingId,
  eyebrow,
  title,
  description,
}: AgencySectionIntroProps) {
  const heading = (
    <>
      <span className="agency-eyebrow">{eyebrow}</span>
      <h2 id={headingId}>{title}</h2>
    </>
  );
  if (variant === "explore") {
    return (
      <div className="agency-explore-intro" data-site-motion="section">
        <div>{heading}</div>
        <p>{description}</p>
      </div>
    );
  }
  return (
    <div className="agency-contact-intro" data-site-motion="section">
      {heading}
      <p>{description}</p>
    </div>
  );
}
