type ContactOptionCardProps = {
  label: string;
  title: string;
  description: string;
  href?: string;
  linkLabel?: string;
};

/** Reusable contact-information surface with optional mail/action link. */
export function ContactOptionCard({ label, title, description, href, linkLabel }: ContactOptionCardProps) {
  return (
    <article className="agency-contact-option" data-site-motion="card">
      <small>{label}</small>
      <h3>{title}</h3>
      <p>{description}</p>
      {href && linkLabel ? <a href={href}>{linkLabel}</a> : null}
    </article>
  );
}
