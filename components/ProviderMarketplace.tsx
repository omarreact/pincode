"use client";

import { useEffect, useMemo, useState } from "react";
import type { Coupon, Kind, Offer } from "@/lib/provider-marketplace";

type Feed={offers:Offer[];coupons:Coupon[];generatedAt:string};
type Sort="price"|"renewal"|"commitment";

function dollars(v:number|null):string{
  return v===null?"View official price":new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",maximumFractionDigits:2}).format(v);
}
function freshness(offer:Offer):string{
  return offer.basis==="refreshed"?"Updated from official page":offer.basis==="reference"?"Reference · 29 Oct 2026":"Price at provider";
}

export function ProviderMarketplace({kind}:{kind:Kind}){
  const [feed,setFeed]=useState<Feed|null>(null);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState("");
  const [tld,setTld]=useState("com");
  const [category,setCategory]=useState("all");
  const [sort,setSort]=useState<Sort>("price");

  useEffect(()=>{
    const abort=new AbortController();
    setLoading(true);
    fetch("/api/marketplace/offers?kind="+kind,{signal:abort.signal})
      .then(async res=>{if(!res.ok)throw new Error("Price feed unavailable");return res.json() as Promise<Feed>;})
      .then(data=>{if(!abort.signal.aborted){setFeed(data);setError("");}})
      .catch(()=>{if(!abort.signal.aborted)setError("Pricing feed is temporarily unavailable. Open an official provider page for current offers.");})
      .finally(()=>{if(!abort.signal.aborted)setLoading(false);});
    return ()=>abort.abort();
  },[kind]);

  const visible=useMemo(()=>{
    const selected=(feed?.offers??[]).filter(item=>kind==="domain"?item.tld===tld:category==="all"||item.category===category);
    return [...selected].sort((a,b)=>{
      if(sort==="commitment")return a.months-b.months||(a.first??999)-(b.first??999);
      if(sort==="renewal")return (a.renew??999)-(b.renew??999)||(a.first??999)-(b.first??999);
      return (a.first??999)-(b.first??999)||(a.renew??999)-(b.renew??999);
    });
  },[feed,kind,tld,category,sort]);
  const top=visible.find(o=>o.first!==null);

  return (
    <section id={kind==="domain"?"domain-provider-comparison":"hosting-provider-comparison"} className="marketplace" aria-labelledby={kind+"-marketplace-heading"}>
      <div className="marketplace-top">
        <div>
          <span className="marketplace-eyebrow">PINCODE IT / INDEPENDENT PROVIDER COMPARISON</span>
          <h2 id={kind+"-marketplace-heading"}>{kind==="domain"?"Compare domain registrars":"Find a hosting plan that fits"}</h2>
          <p>{kind==="domain"?"Compare first-year registration and renewal reference prices, then register directly with the official provider.":"Compare published introductory and renewal rates, hosting features, and payment commitments."}</p>
        </div>
        <div className="marketplace-stat"><strong>{kind==="domain"?"3":"3"} providers</strong><span>Official provider links</span></div>
      </div>

      <div className="marketplace-controls">
        {kind==="domain" ? <div className="marketplace-filter"><label htmlFor="market-tld">Domain extension</label>
          <select id="market-tld" value={tld} onChange={e=>setTld(e.target.value)}>
            {["com","net","org","dev","app"].map(x=><option value={x} key={x}>.{x}</option>)}
          </select></div>
        : <div className="marketplace-filter"><label htmlFor="market-category">Hosting category</label>
          <select id="market-category" value={category} onChange={e=>setCategory(e.target.value)}>
            <option value="all">All hosting</option><option value="shared">Shared cPanel</option>
            <option value="managed">Managed / website builder</option><option value="wordpress">WordPress focus</option>
          </select></div>}
        <div className="marketplace-filter"><label htmlFor={kind+"-sort"}>Compare by</label>
          <select id={kind+"-sort"} value={sort} onChange={e=>setSort(e.target.value as Sort)}>
            <option value="price">Lowest initial monthly equivalent</option>
            <option value="renewal">Lowest renewal equivalent</option>
            <option value="commitment">Shortest prepaid commitment</option>
          </select>
        </div>
        <span className="marketplace-count">{visible.length} plans</span>
      </div>

      {loading&&<div className="marketplace-loading" role="status">Checking provider pricing pages…</div>}
      {error&&<p className="marketplace-error" role="alert">{error}</p>}

      {!loading&&top&&<div className="marketplace-recommendation">
        <div><span className="marketplace-reco-label">LOWEST DISPLAYED {kind==="domain"?"FIRST-YEAR PRICE":"INTRODUCTORY MONTHLY EQUIVALENT"}</span>
          <strong>{top.provider} · {top.plan}</strong>
          <small>Based only on the displayed comparable prices, not independent quality ratings. Prepayment durations may differ.</small></div>
        <a href={top.url} target="_blank" rel="noopener noreferrer">Check this offer ↗</a>
      </div>}

      <div className="marketplace-grid" aria-live="polite">
        {visible.map(offer=>(
          <article key={offer.id} className="marketplace-card">
            <div className="marketplace-card-head">
              <span className="marketplace-provider">{offer.provider}</span>
              <span className={"marketplace-freshness "+(offer.basis==="refreshed"?"fresh":"")}>{freshness(offer)}</span>
            </div>
            <h3>{offer.plan}</h3>
            <div className="marketplace-price">
              <strong>{dollars(offer.first)}</strong>
              {offer.first!==null&&<span>/{kind==="domain"?"first year":"month equivalent"}</span>}
            </div>
            <div className="marketplace-terms">
              {kind==="hosting"?<span>Pay upfront for {offer.months} months · approx. <b>{dollars(offer.first!==null?offer.first*offer.months:null)}</b> first term</span>
                :<span>Standard non-premium name; exact-domain quotes vary</span>}
              <span>Published renewal equivalent: <b>{dollars(offer.renew)}{offer.renew!==null?(kind==="domain"?"/year":"/month"):""}</b></span>
            </div>
            <ul className="marketplace-features">{offer.features.map(feature=><li key={feature}><span aria-hidden="true">✓</span>{feature}</li>)}</ul>
            <p className="marketplace-plan-note">{offer.details}</p>
            <a className="marketplace-order" href={offer.url} target="_blank" rel="noopener noreferrer">
              Go to {offer.provider} order page <span aria-hidden="true">↗</span>
            </a>
            <a className="marketplace-source" href={offer.source} target="_blank" rel="noopener noreferrer">Official pricing source ↗</a>
          </article>
        ))}
      </div>

      {!loading&&feed&&kind==="domain"&&(
        <div className="marketplace-coupons">
          <div><span className="marketplace-eyebrow">VERIFIED OFFICIAL PROMOTIONS</span>
            <h3>Available coupons and deals</h3>
            <p>Only codes detected on official provider pages are displayed. Offers can expire or be restricted at checkout.</p>
          </div>
          {feed.coupons.length?feed.coupons.map(coupon=><div className="marketplace-coupon" key={coupon.provider+coupon.code}>
            <strong>{coupon.provider}</strong>
            <code>{coupon.code}</code>
            <span>{coupon.details}</span>
            {coupon.expires&&<small>Listed expiry: {new Date(coupon.expires).toLocaleDateString("en-GB",{timeZone:"UTC",day:"numeric",month:"short",year:"numeric"})}</small>}
            <a href={coupon.url} target="_blank" rel="noopener noreferrer">Check official offer ↗</a>
          </div>):<p className="marketplace-no-coupon">No current coupon code could be independently verified. Visit official offers pages for today's deals: <a href="https://www.namecheap.com/promos/coupons/" target="_blank" rel="noopener noreferrer">Namecheap</a>.</p>}
        </div>
      )}
      {kind==="hosting"&&<div className="marketplace-autodeal">SiteGround's introductory discounts are normally applied automatically, with no coupon code needed. Always confirm the final checkout total and renewal term.</div>}
      <p className="marketplace-disclosure">
        <strong>Price transparency:</strong> “Updated from official page” indicates a recent successful public-page price extraction; “Reference” is a dated 29 October 2026 published rate, not a live quote. Prices shown in USD, before taxes, payment conversion costs, add-ons or premium domain fees. Promotions, regions, and new-customer eligibility affect checkout totals. Different prepaid terms mean monthly figures are not directly equivalent.
        PINCODE IT does not process provider payments or register your name in this comparison. Selecting an offer opens the provider's official ordering site. No affiliate commission arrangement is implied.
      </p>
    </section>
  );
}
