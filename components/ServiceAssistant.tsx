"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { supportRequest } from "@/lib/support";
type Message = { role: "user" | "model"; text: string };
export function ServiceAssistant() {
  const [open, setOpen] = useState(false), [messages, setMessages] = useState<Message[]>([]);
  const [question, setQuestion] = useState(""), [pending, setPending] = useState(false), [error, setError] = useState("");
  const transcript = useRef<HTMLDivElement>(null);
  useEffect(() => { if (transcript.current) transcript.current.scrollTop = transcript.current.scrollHeight; }, [messages, pending]);
  async function ask(event: FormEvent) {
    event.preventDefault(); const text = question.trim(); if (!text || pending) return;
    setError(""); setPending(true);
    const history = messages.slice(-6);
    try {
      const result = await supportRequest<{ text: string }>("assistant", { message: text, history });
      setMessages(previous => [...previous, { role: "user", text }, { role: "model", text: result.text }].slice(-20) as Message[]);
      setQuestion("");
    } catch (e) { setError(e instanceof Error && e.name !== "TimeoutError" ? e.message : "The assistant couldn't reply. Please try again or send an enquiry."); }
    finally { setPending(false); }
  }
  return <aside className="service-assistant" aria-label="PINCODE IT service assistant">
    <button type="button" className="assistant-toggle" aria-expanded={open} aria-controls="service-assistant-panel" onClick={() => setOpen(v => !v)}>
      {open ? "Close assistant ×" : "Ask PINCODE AI ↗"}</button>
    {open && <section id="service-assistant-panel" className="assistant-panel" aria-labelledby="assistant-title">
      <header><div><h2 id="assistant-title">How can we help?</h2><p>AI service assistant · Powered by Gemini</p></div>
        <button type="button" onClick={() => { setMessages([]); setError(""); setQuestion(""); }} disabled={pending} aria-label="Clear this conversation">Clear</button></header>
      <p className="assistant-note">Ask in English or বাংলা. Questions are sent to Google Gemini. Please keep contact details out of chat. Our team confirms quotes and timelines.</p>
      <div className="assistant-transcript" ref={transcript} role="log" aria-live="polite" aria-label="Service conversation">
        {!messages.length && <p className="assistant-bubble">Tell me what you want to build or improve. I can help you choose a service.</p>}
        {messages.map((message, i) => <div key={i} className={`assistant-bubble ${message.role === "user" ? "from-visitor" : ""}`}><strong>{message.role === "user" ? "You" : "PINCODE AI"}</strong><p>{message.text}</p></div>)}
        {pending && <p role="status">Thinking…</p>}
      </div>
      {error && <p role="alert" className="enquiry-error">{error}</p>}
      <form onSubmit={ask}><label htmlFor="service-question" className="assistant-input-label">Your question</label>
        <div className="assistant-compose"><textarea id="service-question" value={question} onChange={e => setQuestion(e.target.value)} maxLength={800} rows={2} required placeholder="Which service is right for my business?" />
          <button type="submit" disabled={pending || !question.trim()}>{pending ? "…" : "Send"}</button></div></form>
      <a className="assistant-enquiry" href="/contact#project-brief" onClick={() => setOpen(false)}>Talk to the support team →</a>
    </section>}
  </aside>;
}
