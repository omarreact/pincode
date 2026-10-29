"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

const EXTENSIONS = ["com", "net", "org", "dev", "app"] as const;
type Extension = (typeof EXTENSIONS)[number];
type Status = "registered" | "possibly-available" | "unverified";
type DomainResult = {
  domain: string;
  status: Status;
  message: string;
  checkedAt: string;
  source: string;
};

export function DomainSearch() {
  const [query, setQuery] = useState("");
  const [extension, setExtension] = useState<Extension>("com");
  const [results, setResults] = useState<DomainResult[]>([]);
  const [error, setError] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchedName, setSearchedName] = useState("");
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => () => abortRef.current?.abort(), []);

  async function onSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    abortRef.current?.abort();
    const normalized = query.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/^www\./, "");
    const match = normalized.match(/^([a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)(?:\.(com|net|org|dev|app))?$/);
    if (!match) {
      setError("Enter a name such as mybusiness, or a .com, .net, .org, .dev or .app domain.");
      setResults([]);
      setSearchedName("");
      return;
    }
    const label = match[1];
    const preferred = (match[2] ?? extension) as Extension;
    const candidates = [preferred, ...EXTENSIONS.filter(tld => tld !== preferred)];
    const controller = new AbortController();
    abortRef.current = controller;
    setError("");
    setResults([]);
    setSearching(true);
    setSearchedName(label);
    try {
      const checks = await Promise.all(candidates.map(async tld => {
        const domain = `${label}.${tld}`;
        try {
          const response = await fetch(`/api/domains/check?domain=${encodeURIComponent(domain)}`, {
            cache: "no-store",
            signal: controller.signal,
          });
          const payload: DomainResult | { error: string } = await response.json();
          if (!response.ok || !("status" in payload)) {
            return { domain, status: "unverified" as Status, message: "Could not verify right now. Try again shortly.", checkedAt: "", source: "" };
          }
          return payload;
        } catch (cause) {
          if (controller.signal.aborted) throw cause;
          return { domain, status: "unverified" as Status, message: "Could not connect to the registry.", checkedAt: "", source: "" };
        }
      }));
      if (!controller.signal.aborted) setResults(checks);
    } catch {
      // A newer search or page navigation cancelled this request.
    } finally {
      if (abortRef.current === controller) {
        setSearching(false);
        abortRef.current = null;
      }
    }
  }

  return (
    <section className="domain-search-area" aria-labelledby="domain-search-title">
      <div className="domain-search-card">
        <div className="domain-search-header">
          <div>
            <span className="domain-eyebrow">DOMAIN DISCOVERY / LIVE REGISTRY LOOKUP</span>
            <h2 id="domain-search-title">Find the right name for your next idea.</h2>
            <p>Check domain registration records across five popular extensions. No account required.</p>
          </div>
          <span className="domain-search-symbol" aria-hidden="true">↗</span>
        </div>

        <form className="domain-search-form" onSubmit={onSearch}>
          <label htmlFor="domain-name">Your domain name</label>
          <div className="domain-search-controls">
            <div className="domain-input-wrap">
              <span aria-hidden="true">www.</span>
              <input
                id="domain-name"
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                maxLength={68}
                value={query}
                onChange={event => setQuery(event.target.value)}
                placeholder="yourbrand"
                aria-describedby={error ? "domain-input-error" : "domain-help"}
                aria-invalid={Boolean(error)}
                disabled={searching}
              />
            </div>
            <label className="domain-extension-label" htmlFor="domain-extension">Extension</label>
            <select id="domain-extension" value={extension} onChange={event => setExtension(event.target.value as Extension)} disabled={searching}>
              {EXTENSIONS.map(tld => <option key={tld} value={tld}>.{tld}</option>)}
            </select>
            <button type="submit" disabled={searching}>
              {searching ? "Checking…" : "Search domains"} <span aria-hidden="true">→</span>
            </button>
          </div>
          {error
            ? <p className="domain-error" id="domain-input-error" role="alert">{error}</p>
            : <p className="domain-help" id="domain-help">Search a single brand name or a complete supported domain. We check alternative extensions too.</p>}
        </form>

        {searching && <div className="domain-loading" role="status" aria-live="polite">Checking registry records for {searchedName}…</div>}

        {!searching && results.length > 0 && (
          <div className="domain-results" aria-live="polite">
            <div className="domain-results-heading"><h3>Results for “{searchedName}”</h3><span>Checked against public RDAP records</span></div>
            <ul>
              {results.map(item => {
                const likely = item.status === "possibly-available";
                const registered = item.status === "registered";
                return (
                  <li key={item.domain} className="domain-result">
                    <div className="domain-result-info">
                      <strong>{item.domain}</strong>
                      <span>{item.message}</span>
                    </div>
                    <span className={`domain-status domain-status-${item.status}`}>
                      <span aria-hidden="true">{likely ? "✓" : registered ? "×" : "?"}</span>
                      {likely ? "Possibly available" : registered ? "Registered" : "Unverified"}
                    </span>
                  </li>
                );
              })}
            </ul>
            <a className="domain-contact-link" href="/contact">Need hosting, DNS or a website for your domain? Talk to PINCODE IT ↗</a>
          </div>
        )}
        <p className="domain-disclaimer">
          Registry data is informational, not a purchase guarantee. Unregistered domains may still be reserved,
          restricted or premium-priced. Confirm final availability and pricing directly with a domain registrar.
        </p>
      </div>
    </section>
  );
}
