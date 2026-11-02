import Link from "next/link";

export type AgencyAction = {
  label: string;
  href: string;
  arrow: "↓" | "↗";
};

type AgencyActionLinkProps = AgencyAction & {
  variant: "primary" | "outline" | "light";
};

/** Shared button styling without a client-side JavaScript dependency. */
export function AgencyActionLink({ label, href, arrow, variant }: AgencyActionLinkProps) {
  const className = `agency-glass-button agency-glass-button-${variant}`;
  const children = <>{label} <span aria-hidden="true">{arrow}</span></>;
  if (href.startsWith("mailto:")) {
    return <a href={href} className={className}>{children}</a>;
  }
  return <Link href={href} className={className}>{children}</Link>;
}
