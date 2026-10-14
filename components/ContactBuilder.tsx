"use client";

import { useState } from "react";

const prompts = [
  {
    label: "What are you trying to do?",
    options: ["Build a new website", "Create an e-commerce platform", "Improve an existing website", "Security or ongoing support"],
  },
  {
    label: "What matters most right now?",
    options: ["Launch or relaunch", "Better user experience", "Speed and performance", "Reliability and maintainability"],
  },
  {
    label: "What happens after launch?",
    options: ["I need ongoing support", "Project delivery only", "Not sure yet", "Need to discuss"],
  },
];

export function ContactBuilder() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [replyEmail, setReplyEmail] = useState("");
  const [message, setMessage] = useState("");

  const ready = answers.length === prompts.length;
  const select = (answer: string) => {
    setAnswers(previous => [...previous.slice(0, step), answer]);
    if (step < prompts.length - 1) setStep(step + 1);
  };
  const restart = () => {
    setStep(0);
    setAnswers([]);
    setName("");
    setReplyEmail("");
    setMessage("");
  };
  const summary = [
    "Project: " + (answers[0] ?? "Not specified"),
    "Priority: " + (answers[1] ?? "Not specified"),
    "After launch: " + (answers[2] ?? "Not specified"),
    name.trim() && "Name: " + name.trim(),
    replyEmail.trim() && "Reply email: " + replyEmail.trim(),
    message.trim() && "Details: " + message.trim(),
  ].filter(Boolean).join("\n");

  const mailto = "mailto:pincodeit.com.bd@gmail.com?subject=" +
    encodeURIComponent("PINCODE IT — new project enquiry") +
    "&body=" + encodeURIComponent("Hello PINCODE IT,\n\n" + summary);

  return (
    <div className="contact-builder" aria-labelledby="agency-question-heading">
      <div className="agency-form-progress" role="group" aria-label={`Question ${step + 1} of ${prompts.length}`}>
        {prompts.map((_, index) => (
          <span key={index} className={index <= step ? "active" : ""} aria-hidden="true" />
        ))}
      </div>
      <p className="eyebrow">PROJECT BUILDER / STEP {step + 1} OF {prompts.length}</p>
      <h2 id="agency-question-heading">{prompts[step].label}</h2>

      <div className="builder-options" role="group" aria-label={prompts[step].label}>
        {prompts[step].options.map(option => (
          <button
            key={option}
            type="button"
            aria-pressed={answers[step] === option}
            className={answers[step] === option ? "selected" : ""}
            onClick={() => select(option)}
          >
            <span>{option}</span>
            <span aria-hidden="true">↗</span>
          </button>
        ))}
      </div>

      {step > 0 && (
        <button type="button" className="builder-back" onClick={() => setStep(step - 1)}>
          ← Previous question
        </button>
      )}

      {ready && (
        <div className="builder-finish">
          <span className="eyebrow">YOUR PROJECT BRIEF</span>
          <h3>Ready to discuss?</h3>
          <div className="agency-answer-summary">
            <strong>What you've chosen</strong>
            <p>{answers[0]} · {answers[1]} · {answers[2]}</p>
          </div>
          <p>Complete any optional details, then open a prepared message in your email application. Your answers stay in this browser until you choose to send.</p>

          <label>
            Your name (optional)
            <input autoComplete="name" value={name} onChange={event => setName(event.target.value)} />
          </label>
          <label>
            Reply email (optional)
            <input
              type="email"
              autoComplete="email"
              value={replyEmail}
              onChange={event => setReplyEmail(event.target.value)}
            />
          </label>
          <label>
            Project details (optional)
            <textarea rows={4} value={message} onChange={event => setMessage(event.target.value)} />
          </label>
          <div className="agency-builder-actions">
            <a className="agency-glass-button agency-glass-button-light" href={mailto}>
              Continue by email <span aria-hidden="true">↗</span>
            </a>
            <button type="button" className="builder-back" onClick={restart}>
              Start again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
