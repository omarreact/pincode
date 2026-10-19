"use client";
import { useRef, useState, type FormEvent } from "react";
import { priorities, services, supportRequest, timelines } from "@/lib/support";
const prompts = [
  { label: "Which service do you need?", options: services },
  { label: "What are you trying to do?", options: priorities },
  { label: "When would you like to start?", options: timelines },
];
export function ContactBuilder() {
  const [step, setStep] = useState(0), [answers, setAnswers] = useState<string[]>([]);
  const [pending, setPending] = useState(false), [error, setError] = useState("");
  const [receipt, setReceipt] = useState(""), [sameNumber, setSameNumber] = useState(true);
  const [preferred, setPreferred] = useState("email");
  const requestId = useRef({ id: "", signature: "" });
  const ready = answers.length === prompts.length;
  const select = (answer: string) => {
    setAnswers(previous => { const next = [...previous]; next[step] = answer; return next; });
    if (step < prompts.length - 1) setStep(step + 1);
  };
  const restart = () => {
    setStep(0); setAnswers([]); setReceipt(""); setError("");
    setSameNumber(true); setPreferred("email"); requestId.current = { id: "", signature: "" };
  };
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (pending) return;
    const data = new FormData(event.currentTarget);
    setPending(true); setError("");
    try {
      const details = {
        name: String(data.get("name") || "").trim(),
        email: String(data.get("email") || "").trim(), phone: String(data.get("phone") || "").trim(),
        whatsapp: String(data.get(sameNumber ? "phone" : "whatsapp") || "").trim(),
        preferredContact: preferred, service: answers[0], priority: answers[1], timeline: answers[2],
        message: String(data.get("message") || "").trim(), consent: data.get("consent") === "on",
        website: String(data.get("website") || ""),
      };
      const signature = JSON.stringify(details);
      if (requestId.current.signature !== signature) requestId.current = { id: crypto.randomUUID(), signature };
      const result = await supportRequest<{ reference: string }>("enquiries", { ...details, requestId: requestId.current.id });
      if (!result.reference) throw new Error("We couldn't confirm receipt. Please try again.");
      setReceipt(result.reference);
    } catch (e) { setError(e instanceof Error && e.name !== "TimeoutError" ? e.message :
      "We couldn't confirm delivery. Your details are still here. Try again or email our team."); }
    finally { setPending(false); }
  }
  if (receipt) return <div className="contact-builder enquiry-receipt" role="status">
    <span className="eyebrow">ENQUIRY RECEIVED</span><h2>You're in our support inbox.</h2>
    <p>Our team can follow up using your selected contact method. Keep this reference for your enquiry.</p>
    <p className="enquiry-reference">{receipt}</p>
    <button type="button" className="agency-glass-button agency-glass-button-primary" onClick={restart}>Send another enquiry</button>
  </div>;
  return <div className="contact-builder" aria-labelledby="agency-question-heading">
    <div className="agency-form-progress" role="group" aria-label={`Question ${step + 1} of ${prompts.length}`}>
      {prompts.map((_, index) => <span key={index} className={index <= step ? "active" : ""} aria-hidden="true" />)}
    </div>
    <p className="eyebrow">SERVICE ENQUIRY / STEP {step + 1} OF {prompts.length}</p>
    <h2 id="agency-question-heading">{prompts[step].label}</h2>
    <div className="builder-options" role="group" aria-label={prompts[step].label}>
      {prompts[step].options.map(option => <button key={option} type="button" disabled={pending}
        aria-pressed={answers[step] === option} className={answers[step] === option ? "selected" : ""}
        onClick={() => select(option)}><span>{option}</span><span aria-hidden="true">↗</span></button>)}
    </div>
    {step > 0 && <button type="button" disabled={pending} className="builder-back" onClick={() => setStep(step - 1)}>← Previous question</button>}
    {ready && <form onSubmit={submit} className="builder-finish">
      <span className="eyebrow">YOUR CONTACT DETAILS</span><h3>How can our team reach you?</h3>
      <div className="agency-answer-summary"><strong>Your service request</strong><p>{answers.join(" · ")}</p></div>
      <div className="enquiry-fields">
        <label>Your name<input name="name" required minLength={2} maxLength={120} autoComplete="name" /></label>
        <label>Email address<input name="email" type="email" required maxLength={254} autoComplete="email" /></label>
        <label>Phone number<input name="phone" type="tel" required minLength={7} maxLength={30} autoComplete="tel" placeholder="Include country code" /></label>
        <label className="enquiry-check"><input type="checkbox" checked={sameNumber} onChange={e => setSameNumber(e.target.checked)} />Use my phone number for WhatsApp</label>
        {!sameNumber && <label>WhatsApp number{preferred !== "whatsapp" && " (optional)"}<input name="whatsapp" type="tel" required={preferred === "whatsapp"} maxLength={30} minLength={7} placeholder="Include country code" /></label>}
      </div>
      <fieldset className="enquiry-preference"><legend>Preferred contact method</legend><div className="builder-options">
        {["email", "phone", "whatsapp"].map(method => <button key={method} type="button" className={preferred === method ? "selected" : ""}
          aria-pressed={preferred === method} onClick={() => setPreferred(method)}>{method === "whatsapp" ? "WhatsApp" : method === "email" ? "Email" : "Phone"}</button>)}
      </div></fieldset>
      <label>Tell us a little about your project<textarea name="message" required minLength={10} maxLength={2000} rows={4} /></label>
      <div className="enquiry-trap" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <label className="enquiry-check"><input type="checkbox" name="consent" required />I agree that PINCODE IT may store this enquiry and contact me about my service request using these details.</label>
      {error && <p role="alert" className="enquiry-error">{error}</p>}
      <div className="agency-builder-actions"><button className="agency-glass-button agency-glass-button-primary" disabled={pending} type="submit">{pending ? "Sending…" : "Send to support team"}</button>
        <button disabled={pending} type="button" className="builder-back" onClick={restart}>Start again</button></div>
      <p className="enquiry-help">Prefer email? <a href="mailto:pincodeit.com.bd@gmail.com">pincodeit.com.bd@gmail.com</a></p>
    </form>}
  </div>;
}
