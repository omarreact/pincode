export const supportOrigin = "https://admin.pincodeit.com";
export const services = ["Website & business solutions", "E-commerce", "Application & software development", "Mobile app development", "Web hosting & technical support", "IT consulting", "Performance improvement", "Security & reliability", "Managed support", "Digital improvement", "Not sure yet"];
export const priorities = ["New project", "Improve an existing project", "Fix a problem", "Ongoing support"];
export const timelines = ["As soon as possible", "Within a month", "Within 3 months", "Just exploring"];
export async function supportRequest<T>(path: "enquiries" | "assistant", body: unknown): Promise<T> {
  let res: Response;
  try { res = await fetch(`${supportOrigin}/api/public/${path}`, {
    method: "POST", credentials: "omit", headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body), signal: AbortSignal.timeout(30000),
  }); } catch { throw new Error("We couldn't connect to support. Please try again or email our team."); }
  let data: T & { error?: string };
  try { data = await res.json(); }
  catch { throw new Error("Support is temporarily unavailable. Please try again or email our team."); }
  if (!res.ok) throw new Error(data.error || "Support is temporarily unavailable. Please email our team.");
  return data;
}
