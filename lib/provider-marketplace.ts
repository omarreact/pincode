/**
 * PINCODE IT third-party price comparison. Provider-owned checkout only.
 * Published reference prices are not represented as live checkout quotes.
 */
export type Kind="hosting"|"domain";
export type Offer={
  id:string;kind:Kind;provider:string;plan:string;url:string;source:string;
  first:number|null;renew:number|null;months:number;features:string[];details:string;
  basis:"refreshed"|"reference"|"provider";asOf:string;tld?:string;category?:string;
};
export type Coupon={provider:string;code:string;details:string;url:string;asOf:string;expires?:string};
type Base=Omit<Offer,"basis"|"asOf">;
const snapshot="2026-10-29";
const URLs={
  hostinger:"https://www.hostinger.com/web-hosting",
  namecheapHost:"https://www.namecheap.com/hosting/top10/",
  siteground:"https://www.siteground.com/web-hosting.htm",
  porkbun:"https://porkbun.com/products/domains",
  namecheapDomain:"https://www.namecheap.com/domains/domain-name-search/",
  coupons:"https://www.namecheap.com/promos/coupons/",
  godaddy:"https://www.godaddy.com/domains"
} as const;
const hosting:Base[]=[
  {id:"nc-stellar",kind:"hosting",provider:"Namecheap",plan:"Stellar",category:"shared",url:"https://www.namecheap.com/hosting/shared/",source:URLs.namecheapHost,first:1.88,renew:102.88/24,months:24,features:["3 websites","20 GB SSD","cPanel","Email + SSL"],details:"24 months prepaid. Reference: $44.88 first term, $102.88 every 24 months on renewal."},
  {id:"nc-plus",kind:"hosting",provider:"Namecheap",plan:"Stellar Plus",category:"shared",url:"https://www.namecheap.com/hosting/shared/",source:URLs.namecheapHost,first:2.28,renew:146.44/24,months:24,features:["Multiple websites","Unmetered SSD subject to policy","cPanel","AutoBackup"],details:"24 months prepaid. Reference: $53.88 first term, $146.44 every 24 months on renewal."},
  {id:"host-premium",kind:"hosting",provider:"Hostinger",plan:"Premium",category:"managed",url:URLs.hostinger,source:URLs.hostinger,first:2.99,renew:10.99,months:48,features:["3 websites","20 GB SSD","Weekly backups","Free domain, eligible first year"],details:"Advertised 48-month initial term; renewal price varies with checkout conditions."},
  {id:"host-unlimited",kind:"hosting",provider:"Hostinger",plan:"Unlimited",category:"managed",url:URLs.hostinger,source:URLs.hostinger,first:3.99,renew:16.99,months:48,features:["Multiple websites (fair use)","50 GB NVMe","Daily backups","Free domain, eligible first year"],details:"Advertised 48-month initial term; resource fair-use conditions apply."},
  {id:"sg-startup",kind:"hosting",provider:"SiteGround",plan:"StartUp",category:"wordpress",url:URLs.siteground,source:URLs.siteground,first:2.99,renew:17.99,months:12,features:["1 website","10 GB storage","Daily backups","WordPress tools"],details:"12-month initial term. SiteGround signup discount is automatic; no promo code needed."},
  {id:"sg-growbig",kind:"hosting",provider:"SiteGround",plan:"GrowBig",category:"wordpress",url:URLs.siteground,source:URLs.siteground,first:4.99,renew:29.99,months:12,features:["Multiple websites","50 GB storage","Daily backups","WordPress staging"],details:"12-month initial term. Renewal is substantially higher than the new-customer price."}
];
const domains:Base[]=[
  ...([["com",11.08,11.08],["net",12.52,12.52],["org",7.98,11.84],["dev",8.75,12.87],["app",8.75,14.93]] as const).map(([tld,first,renew])=>({
    id:"porkbun-"+tld,kind:"domain" as const,provider:"Porkbun",plan:"."+tld,tld,url:URLs.porkbun,source:URLs.porkbun,first,renew,months:12,
    features:["DNS management","Direct registrar checkout"],details:"One-year reference price for eligible non-premium domains."
  })),
  ...([["com",11.28,18.48],["net",12.48,18.58],["org",8.48,18.98],["dev",10.98,20.98],["app",10.98,22.98]] as const).map(([tld,first,renew])=>({
    id:"namecheap-"+tld,kind:"domain" as const,provider:"Namecheap",plan:"."+tld,tld,url:URLs.namecheapDomain,source:URLs.namecheapDomain,first,renew,months:12,
    features:["DNS management","Free privacy on eligible TLDs"],details:"One-year reference price; applicable ICANN fees may be added at checkout."
  })),
  {id:"godaddy-com",kind:"domain",provider:"GoDaddy",plan:".com",tld:"com",url:URLs.godaddy,source:URLs.godaddy,first:null,renew:null,months:12,
    features:["Registrar search","Direct checkout"],details:"First-customer discounts may apply; view name-specific prices on GoDaddy."}
];
async function fetchOfficial(url:string):Promise<{text:string;checked:string}|null>{
  try{
    const response=await fetch(url,{headers:{"Accept":"text/html","Accept-Language":"en-US,en;q=0.8"},next:{revalidate:14400},
      signal:AbortSignal.timeout(5500),redirect:"error"});
    if(!response.ok||!(response.headers.get("content-type")||"").includes("text/html"))return null;
    const html=(await response.text()).slice(0,900000);
    if(html.length<1500)return null;
    const text=html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi," ").replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi," ")
      .replace(/<[^>]*>/g," ").replace(/&nbsp;|&#160;/gi," ").replace(/&amp;/gi,"&").replace(/\s+/g," ").trim();
    return {text,checked:new Date().toISOString()};
  }catch{return null;}
}
function extractHosting(text:string,plan:string,old:number|null):number|null{
  if(old===null)return null;
  const re=new RegExp("\\b"+plan+"\\b","gi");
  const matches=[...text.matchAll(re)].slice(0,25);
  const candidates:number[]=[];
  for(const match of matches){
    const section=text.slice((match.index||0)+plan.length,(match.index||0)+plan.length+500);
    for(const item of section.matchAll(/(?:\$|USD\s*)(\d{1,3}(?:\.\d{1,2})?)\s*\/\s*mo\b/gi)){
      const value=Number(item[1]);if(value>=old*0.65&&value<=old*1.8)candidates.push(value);
    }
  }
  return candidates.length?Math.min(...candidates):null;
}
function extractNamecheapDomain(text:string,tld:string,old:number|null):number|null{
  if(old===null)return null;
  const ix=text.indexOf("Top-level domains available");
  if(ix<0)return null;
  const area=text.slice(ix,ix+3000);
  const re=new RegExp("\\."+tld+"\\*?\\s+\\$([\\d.]+)\\s+(?:Sale\\s+)?Renewal\\s+\\$([\\d.]+)","i");
  const match=area.match(re);
  if(!match)return null;
  const val=Number(match[1]);
  return val>0&&val<=old*2&&val>=old*.5?val:null;
}
function couponFromOfficial(text:string,checked:string):Coupon|null{
  const dates=text.match(/Valid\s+(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2}\s*[-–]\s*(?:[A-Za-z]+\s+)?(\d{1,2}),?\s+(20\d{2})/i);
  const code=text.match(/Discounted registration and transfer[\s\S]{0,220}?\b([A-Z][A-Z0-9]{4,15})\s+Copied\b/);
  if(!dates||!code)return null;
  const month=["january","february","march","april","may","june","july","august","september","october","november","december"].indexOf(dates[1].toLowerCase());
  if(month<0)return null;
  const expires=new Date(Date.UTC(Number(dates[3]),month,Number(dates[2])+1)).toISOString();
  if(Date.now()>=Date.parse(expires))return null;
  return {provider:"Namecheap",code:code[1],details:"Official monthly domain-registration/transfer offer. TLD eligibility, limits and final discount must be verified at checkout.",url:URLs.coupons,asOf:checked,expires};
}
export async function loadMarketplace(kind:Kind):Promise<{offers:Offer[];coupons:Coupon[];generatedAt:string}>{
  const urls:string[]=kind==="hosting"?[URLs.hostinger,URLs.namecheapHost,URLs.siteground]:
    [URLs.porkbun,URLs.namecheapDomain,URLs.coupons,URLs.godaddy];
  const scanned=await Promise.all(urls.map(async url=>({url,data:await fetchOfficial(url)})));
  const sources=new Map(scanned.map(x=>[x.url,x.data]));
  const offers=(kind==="hosting"?hosting:domains).map((item):Offer=>{
    const source=sources.get(item.source);
    let current:number|null=null;
    if(source&&kind==="hosting")current=extractHosting(source.text,item.plan,item.first);
    if(source&&kind==="domain"&&item.provider==="Namecheap"&&item.tld)
      current=extractNamecheapDomain(source.text,item.tld,item.first);
    return {...item,first:current??item.first,basis:current!==null?"refreshed":item.first!==null?"reference":"provider",
      asOf:current!==null&&source?source.checked:snapshot};
  });
  const coupons:Coupon[]=[];
  if(kind==="domain"){
    const nc=sources.get(URLs.coupons);
    if(nc){const deal=couponFromOfficial(nc.text,nc.checked);if(deal)coupons.push(deal);}
    const gd=sources.get(URLs.godaddy);
    if(gd&&/\bGDWELCOME\b/.test(gd.text))
      coupons.push({provider:"GoDaddy",code:"GDWELCOME",details:"Official-page new-customer offer for eligible domains. Check qualification and final pricing at checkout.",url:URLs.godaddy,asOf:gd.checked});
  }
  return {offers,coupons,generatedAt:new Date().toISOString()};
}
