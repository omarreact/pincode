"use client";
import {useState} from "react";
const prompts=[
{label:"What are you trying to do?",options:["Build a new website","Create an e-commerce platform","Improve an existing website","Security or ongoing support"]},
{label:"What matters most right now?",options:["Launch or relaunch","Better user experience","Speed and performance","Reliability and maintainability"]},
{label:"What happens after launch?",options:["I need ongoing support","Project delivery only","Not sure yet","Need to discuss"]},
];
export function ContactBuilder(){
const [step,setStep]=useState(0),[answers,setAnswers]=useState<string[]>([]);
const [name,setName]=useState(""),[contact,setContact]=useState(""),[message,setMessage]=useState("");
function select(value:string){setAnswers(old=>[...old.slice(0,step),value]);if(step<2)setStep(step+1);}
const ready=answers.length===3;
const summary=["Project: "+(answers[0]||""),"Priority: "+(answers[1]||""),"After launch: "+(answers[2]||""),name&&"Name: "+name,contact&&"Contact: "+contact,message&&"Details: "+message].filter(Boolean).join("\n");
return <div className="contact-builder"><p className="eyebrow">PROJECT BUILDER / STEP {step+1} OF 3</p><h2>{prompts[step].label}</h2><div className="builder-options">{prompts[step].options.map(o=><button key={o} type="button" className={answers[step]===o?"selected":""} onClick={()=>select(o)}>{o} <span>↗</span></button>)}</div>{step>0&&<button className="builder-back" onClick={()=>setStep(step-1)}>← Previous question</button>}
{ready&&<div className="builder-finish"><h3>Ready to discuss?</h3><p>Your brief remains in your browser. Nothing is submitted or stored by the website.</p><label>Name (optional)<input value={name} onChange={e=>setName(e.target.value)}/></label><label>Email or phone (optional)<input value={contact} onChange={e=>setContact(e.target.value)}/></label><label>Project details (optional)<textarea value={message} onChange={e=>setMessage(e.target.value)} rows={4}/></label><a className="pill green" target="_blank" rel="noopener noreferrer" href={"https://wa.me/8801575412056?text="+encodeURIComponent("Hello PINCODE IT,\n"+summary)}>Continue on WhatsApp ↗</a></div>}</div>;
}
