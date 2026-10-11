import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { Magnetic, Reveal, SectionHeading, ease } from "./ui";
import Icon from "./Icon";

const EMAIL = "patrickramoseva@gmail.com";

const EMAILJS = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};
const hasEmailJs = Boolean(EMAILJS.serviceId && EMAILJS.templateId && EMAILJS.publicKey);

const socialLinks = [
  { id: "github",   label: "GitHub",   icon: "github",   url: "https://github.com/patrickeva",            color: "#24292f" },
  { id: "linkedin", label: "LinkedIn", icon: "linkedin", url: "https://www.linkedin.com/in/patrickeva/", color: "#0a66c2" },
  { id: "facebook", label: "Facebook", icon: "facebook", url: "https://www.facebook.com/ptrkrmseva",     color: "#1877f2" },
];

const serviceOptions = [
  "Web Application",
  "Business / Freelance Website",
  "Mobile App",
  "Real-Time Tracking System",
  "LGU / Office Records System",
  "Backend, Database & API",
  "Machine Learning / Image Detection",
  "AI Chatbot",
  "Dashboard & Data Insights",
  "Maintenance / Redesign",
  "Not sure yet",
];

const initialForm = { name: "", email: "", service: "", message: "" };

function composeFallback({ name, email, service, message }) {
  const subject = `Project inquiry — ${service || "New project"}`;
  const body = `Hi Patrick,\n\n${message}\n\n— ${name}\n${email}`;
  // Desktops rarely have a mail app wired to mailto:, so open Gmail's composer there instead.
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  } else {
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
}

function InquiryForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!hasEmailJs) {
      composeFallback(form);
      return;
    }
    setStatus("sending");
    try {
      await emailjs.send(
        EMAILJS.serviceId,
        EMAILJS.templateId,
        {
          from_name: form.name,
          reply_to: form.email,
          service: form.service || "Not specified",
          message: form.message,
        },
        { publicKey: EMAILJS.publicKey },
      );
      setStatus("sent");
      setForm(initialForm);
    } catch {
      setStatus("error");
    }
  };

  return (
    <form className="inquiry" onSubmit={handleSubmit}>
      <div className="inquiry__row">
        <label className="field">
          <span>Your name</span>
          <input name="name" value={form.name} onChange={update} required autoComplete="name" />
        </label>
        <label className="field">
          <span>Email</span>
          <input name="email" type="email" value={form.email} onChange={update} required autoComplete="email" />
        </label>
      </div>

      <label className="field">
        <span>What do you need?</span>
        <select name="service" value={form.service} onChange={update} required>
          <option value="" disabled>Select a service</option>
          {serviceOptions.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </label>

      <label className="field">
        <span>Project details</span>
        <textarea
          name="message"
          value={form.message}
          onChange={update}
          required
          rows={5}
          placeholder="Tell me about your business, the problem you want to solve, and any deadline."
        />
      </label>

      <div className="inquiry__foot">
        <button type="submit" className="btn btn--primary btn--lg" disabled={status === "sending"}>
          <Icon name="send" />
          {status === "sending" ? "Sending…" : "Send inquiry"}
        </button>
        <span className="inquiry__note">Free consultation · I usually reply within 24 hours</span>
      </div>

      <AnimatePresence>
        {(status === "sent" || status === "error") && (
          <motion.p
            className={`inquiry__status inquiry__status--${status}`}
            role="status"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease }}
          >
            <Icon name={status === "sent" ? "badge-check" : "x"} />
            {status === "sent"
              ? "Thanks! Your inquiry was sent — I'll get back to you soon."
              : `Something went wrong. Please email me directly at ${EMAIL}.`}
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}

export default function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="container">
        <SectionHeading index="05" eyebrow="Start a project" title="Let's Work" accent="Together" />

        <Reveal className="card contact__panel">
          <div className="contact__glow" aria-hidden="true" />

          <div className="contact__intro">
            <h3 className="contact__title">
              Have a project in mind? <span className="gradient-text">Let's talk.</span>
            </h3>
            <p className="contact__text">
              Tell me what you want to build or fix. You'll get a free consultation and an itemized
              quote — no commitment needed.
            </p>

            <ul className="contact__points">
              <li><Icon name="check" /> Free first consultation</li>
              <li><Icon name="check" /> Clear, itemized proposal</li>
              <li><Icon name="check" /> You own the final code</li>
            </ul>

            <div className="contact__direct">
              <span>Or reach me directly</span>
              <a href={`mailto:${EMAIL}`} className="contact__email">
                <Icon name="mail" /> {EMAIL}
              </a>
              <div className="socials">
                {socialLinks.map((s) => (
                  <Magnetic key={s.id} strength={0.2}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social social--icon"
                      style={{ "--brand": s.color }}
                      aria-label={s.label}
                      title={s.label}
                    >
                      <Icon name={s.icon} />
                    </a>
                  </Magnetic>
                ))}
              </div>
            </div>
          </div>

          <InquiryForm />
        </Reveal>
      </div>
    </section>
  );
}
