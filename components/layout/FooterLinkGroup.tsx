import Link from "next/link";

type FooterLink = { label: string; href: string; className?: string };

/** Server-rendered footer column; no hydration for plain links. */
export function FooterLinkGroup({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div>
      <b>{title}</b>
      {links.map(({ label, href, className }) =>
        href.startsWith("mailto:") ? (
          <a key={href} href={href} className={className}>{label}</a>
        ) : (
          <Link key={href} href={href} className={className}>{label}</Link>
        ),
      )}
    </div>
  );
}
