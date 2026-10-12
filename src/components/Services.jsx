import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useScroll, useSpring } from "framer-motion";
import { Magnetic, Reveal, SectionHeading, Spotlight, ease } from "./ui";
import Icon from "./Icon";

const EMAIL = "patrickramoseva@gmail.com";

// Desktops rarely have a mail app wired to mailto:, so open Gmail's composer there instead.
function requestQuote(e, topic) {
  const subject = `PREtech inquiry — ${topic}`;
  const body = "Hi Patrick,\n\nI'd like to ask about:\n\nProject details:\nTimeline:\nBudget range:\n\nThanks!";
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    e.preventDefault();
    const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }
}

const quoteHref = (topic) =>
  `mailto:${EMAIL}?subject=${encodeURIComponent(`PREtech inquiry — ${topic}`)}`;

const categories = [
  { id: "all", label: "All services" },
  { id: "build", label: "Web & Mobile" },
  { id: "systems", label: "Systems & Data" },
  { id: "ai", label: "AI & ML" },
];

const services = [
  {
    id: "web-apps",
    category: "build",
    icon: "laptop",
    title: "Web Application Development",
    summary: "Fast, secure, responsive web apps built around your workflow, your users, and the way your business actually runs.",
    detail:
      "From admin dashboards to client portals, I build full web applications with authentication, role-based access, real-time data, and clean responsive interfaces that work on any device.",
    deliverables: ["Responsive React frontend", "Login, roles & permissions", "Admin dashboard", "Database & API setup", "Deployment on a live domain"],
    stack: ["React", "Vite", "Tailwind CSS", "Supabase", "Firebase"],
    proof: { label: "Tricycle Franchise Tracker", url: "https://tric-franchise-tracker.vercel.app/" },
  },
  {
    id: "websites",
    category: "build",
    icon: "monitor",
    title: "Business & Freelance Websites",
    summary: "Modern websites and landing pages that present your brand, list your services, and turn visitors into inquiries.",
    detail:
      "Perfect for small businesses, professionals, and personal brands. Includes a polished design, smooth animations, contact options, SEO basics, and help connecting your own domain.",
    deliverables: ["Custom design (no templates)", "Mobile-first layout", "Contact / inquiry flow", "SEO & social previews", "Domain + hosting setup"],
    stack: ["React", "Framer Motion", "CSS3", "Vercel"],
    proof: { label: "Patrick F Web", url: "https://patrick-f-web.vercel.app/" },
  },
  {
    id: "mobile",
    category: "build",
    icon: "smartphone",
    title: "Mobile App Development",
    summary: "Android apps that share one codebase with your web system — built for drivers, field staff, or your customers.",
    detail:
      "Using Capacitor and native Android modules, I turn web systems into installable apps that can use GPS, run in the background, and keep working even when the screen is off.",
    deliverables: ["Installable Android app (APK)", "GPS & device features", "Background services", "Sync with your web system", "Play Store–ready build"],
    stack: ["Capacitor", "Java", "React", "Android"],
    proof: { label: "BMTC Minibus Tracker", url: "https://bmtctracker.com" },
  },
  {
    id: "tracking",
    category: "systems",
    icon: "map",
    title: "Real-Time Tracking & Fleet Systems",
    summary: "Live GPS maps, vehicle tracking, and monitoring dashboards for transport groups, cooperatives, and delivery teams.",
    detail:
      "I've shipped a production fleet tracker used by a real transport cooperative. Passengers see live locations without signing up, while operators get a dashboard for vehicles, drivers, and trip history.",
    deliverables: ["Live map with moving markers", "Driver tracking app", "Public passenger view", "Operator dashboard", "Trip & location history"],
    stack: ["Leaflet", "Supabase Realtime", "PostgreSQL", "Capacitor"],
    proof: { label: "BMTC Minibus Tracker", url: "https://bmtctracker.com" },
  },
  {
    id: "records",
    category: "systems",
    icon: "landmark",
    title: "LGU & Office Records Systems",
    summary: "Digitize paper processes — permits, franchises, ordinances, and documents — into searchable, trackable systems.",
    detail:
      "Built for local government units, offices, and organizations that still run on paper. Track statuses, renewals, and approvals, store files securely in the cloud, and give the public transparent access.",
    deliverables: ["Document upload & storage", "Status & renewal tracking", "Search and filters", "Reports & summaries", "Public transparency page"],
    stack: ["React", "Firebase", "Supabase Storage", "PostgreSQL"],
    proof: { label: "Cuenca Legislative Tracker", url: "https://sb-cuenca-docsys.vercel.app/" },
  },
  {
    id: "backend",
    category: "systems",
    icon: "database",
    title: "Backend, Database & API Integration",
    summary: "The engine behind your apps — databases, APIs, authentication, file storage, and third-party integrations.",
    detail:
      "I design database schemas, secure them with row-level policies, build APIs and serverless functions, and connect services like email, maps, payments, and analytics.",
    deliverables: ["Database schema design", "REST / serverless APIs", "Auth & security rules", "Third-party integrations", "Data migration"],
    stack: ["Node.js", "PostgreSQL", "Supabase", "Firebase", "Django"],
    proof: { label: "AI-Powered Admission System", url: "https://github.com/itzjmbruhhh/NU_Admission" },
  },
  {
    id: "ml",
    category: "ai",
    icon: "brain",
    title: "Machine Learning & Image Detection",
    summary: "Custom models that classify images and detect problems — from crop diseases to quality checks — wrapped in a usable app.",
    detail:
      "I train and deploy CNN models (like MobileNetV2) on your own data, then connect them to a web app or IoT device so non-technical users can upload a photo and get an instant result.",
    deliverables: ["Dataset preparation", "Model training & evaluation", "Web app for predictions", "IoT / device integration", "Accuracy report"],
    stack: ["Python", "TensorFlow", "CNN", "MobileNetV2", "IoT"],
    proof: { label: "NPK Deficiency Detector", url: "https://npknows.vercel.app/" },
  },
  {
    id: "ai-assistant",
    category: "ai",
    icon: "bot",
    title: "AI Chatbots & Assistants",
    summary: "AI assistants that answer customer questions about your business, 24/7, right on your website.",
    detail:
      "I build chatbots powered by large language models that know your services, prices, and FAQs — with a secure server-side API so your keys stay private. Just like the assistant on this portfolio.",
    deliverables: ["Custom-trained on your info", "Website chat widget", "Secure server-side API", "Conversation guardrails", "Usage monitoring"],
    stack: ["Claude API", "Node.js", "Serverless", "React"],
    proof: null,
  },
  {
    id: "dashboards",
    category: "ai",
    icon: "bar-chart",
    title: "Dashboards & Data Insights",
    summary: "Turn spreadsheets and raw records into clear dashboards, KPIs, and reports your team can act on.",
    detail:
      "I connect to your existing data, clean it up, and build interactive dashboards with charts, filters, and exportable reports — so decisions are based on numbers, not guesswork.",
    deliverables: ["KPI dashboard", "Interactive charts & filters", "Automated reports", "Excel / CSV import", "Export to PDF / CSV"],
    stack: ["React", "PostgreSQL", "Python", "Charts"],
    proof: null,
  },
];

const support = [
  { icon: "wrench", title: "Maintenance & Bug Fixes", text: "Monthly updates, fixes, and security patches so your system stays healthy." },
  { icon: "palette", title: "Redesign & Modernization", text: "Refresh outdated sites and move old systems to modern, faster tech." },
  { icon: "globe", title: "Domain, Hosting & Deployment", text: "Domain purchase, DNS, SSL, and deployment on reliable hosting." },
  { icon: "zap", title: "Speed & SEO Optimization", text: "Faster load times, better Lighthouse scores, and search visibility." },
];

const process = [
  { icon: "conversation", title: "Discover", text: "A free call to understand your goals, users, and budget." },
  { icon: "pencil", title: "Plan & Design", text: "Scope, timeline, and UI mockups you approve before coding." },
  { icon: "code-curly", title: "Build", text: "Weekly progress updates with a live preview link you can test." },
  { icon: "rocket", title: "Launch", text: "Deployment, domain setup, and a walkthrough for your team." },
  { icon: "shield", title: "Support", text: "Free fixes after launch, then optional monthly maintenance." },
];


const quoteFactors = [
  "Number of pages, screens & features",
  "User accounts, roles & permissions",
  "Mobile app, GPS, or AI components",
  "Integrations with other services",
  "Data migration from existing systems",
  "Ongoing maintenance & support",
];

const engagements = [
  {
    icon: "clipboard",
    title: "Fixed Scope Project",
    text: "Best when requirements are clear. One agreed scope, deliverables, and price — no surprises.",
  },
  {
    icon: "trending-up",
    title: "Milestone-Based",
    text: "For bigger or evolving projects. Work is split into phases you approve and pay for one at a time.",
  },
  {
    icon: "repeat",
    title: "Monthly Maintenance",
    text: "Ongoing updates, fixes, monitoring, and small enhancements for systems already in production.",
  },
];

const principles = [
  { icon: "eye", title: "Transparent", text: "Itemized quotes — you see exactly what you pay for." },
  { icon: "sliders", title: "Tailored", text: "Every quote reflects your project's actual scope." },
  { icon: "badge-check", title: "No hidden costs", text: "Changes are discussed and approved before any extra work." },
  { icon: "key", title: "You own it", text: "Full source code, domain, and accounts are yours." },
];

const solutions = [
  "Transport & Fleet Tracking",
  "LGU Digital Transformation",
  "Small Business Online Presence",
  "AI for Agriculture",
];

const faqs = [
  {
    q: "Do you charge for the first consultation?",
    a: "No. The first call is free — we talk about your goals and requirements, and you receive a quote with no obligation to proceed.",
  },
  {
    q: "How much does a project cost?",
    a: "It depends on the features you need. Simple websites start lower, while systems with logins, dashboards, mobile apps, or AI cost more. Send me your idea and I'll give you a free, itemized quote.",
  },
  {
    q: "How does payment work?",
    a: "Usually 50% down payment to start and 50% upon launch. For bigger projects we can split it into milestones. GCash and bank transfer are accepted.",
  },
  {
    q: "Can the scope change mid-project?",
    a: "Yes. If you want to add or change features, I'll explain the impact first and update the quote. Nothing extra is billed without your approval.",
  },
  {
    q: "Will I own the code and the website?",
    a: "Yes. Once fully paid, you own the source code, the domain, and all content. I'll hand over the repository and every account credential.",
  },
  {
    q: "Do you offer support after launch?",
    a: "Every project includes a free fix period after launch. After that, you can choose an optional monthly maintenance plan or just reach out when you need changes.",
  },
];

function ServiceModal({ service, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      className="svc-modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <motion.div
        className="svc-modal__panel card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="svc-modal-title"
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ duration: 0.45, ease }}
        onClick={(e) => e.stopPropagation()}
      >
        <button ref={closeRef} type="button" className="icon-btn svc-modal__close" onClick={onClose} aria-label="Close">
          <Icon name="x" />
        </button>

        <div className="svc-modal__head">
          <span className="icon-tile">
            <Icon name={service.icon} />
          </span>
          <div>
            <span className="svc-modal__cat">
              {categories.find((c) => c.id === service.category)?.label}
            </span>
            <h3 id="svc-modal-title">{service.title}</h3>
          </div>
        </div>

        <p className="svc-modal__detail">{service.detail}</p>

        <div className="svc-modal__grid">
          <div>
            <h4>What you get</h4>
            <ul className="check-list">
              {service.deliverables.map((d) => (
                <li key={d}><Icon name="check" />{d}</li>
              ))}
            </ul>
          </div>
          <div className="svc-modal__meta">
            <div>
              <h4>Tech I use</h4>
              <div className="tags">
                {service.stack.map((s) => <span key={s} className="tag">{s}</span>)}
              </div>
            </div>
            {service.proof && (
              <div>
                <h4>See it in action</h4>
                <a className="svc-link" href={service.proof.url} target="_blank" rel="noopener noreferrer">
                  {service.proof.label} <Icon name="external-link" />
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="svc-modal__actions">
          <a
            className="btn btn--primary"
            href={quoteHref(service.title)}
            onClick={(e) => requestQuote(e, service.title)}
          >
            <Icon name="send" /> Request a quote
          </a>
          <button type="button" className="btn btn--ghost" onClick={onClose}>Back to services</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ProcessTimeline() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <div className="process" ref={ref}>
      <div className="process__rail" aria-hidden="true">
        <motion.span className="process__fill" style={{ scaleX: progress }} />
      </div>
      <ol className="process__steps">
        {process.map((step, i) => (
          <motion.li
            key={step.title}
            className="process__step"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease, delay: i * 0.08 }}
          >
            <span className="process__dot">
              <Icon name={step.icon} />
            </span>
            <span className="process__num">Step {String(i + 1).padStart(2, "0")}</span>
            <h4>{step.title}</h4>
            <p>{step.text}</p>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <div className="faq">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className={`faq__item${isOpen ? " is-open" : ""}`}>
            <button
              type="button"
              className="faq__q"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? -1 : i)}
            >
              {f.q}
              <Icon name="plus" />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  className="faq__a"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease }}
                >
                  <p>{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export default function Services() {
  const [filter, setFilter] = useState("all");
  const [active, setActive] = useState(null);
  const closeModal = useCallback(() => setActive(null), []);
  const visible = services.filter((s) => filter === "all" || s.category === filter);

  return (
    <section className="section services" id="services">
      <div className="container">
        <SectionHeading
          index="02"
          eyebrow="Freelance · What I build"
          title="Services &"
          accent="Solutions"
          subtitle="End-to-end software for businesses, organizations, and LGUs — from planning and design to development, launch, and long-term support."
        />

        <Reveal className="svc-toolbar" y={16}>
          <span className="subhead"><Icon name="grid" /> Core services</span>
          <LayoutGroup id="svc-filter">
            <div className="svc-filter" role="tablist" aria-label="Filter services">
              {categories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  role="tab"
                  aria-selected={filter === c.id}
                  className={`svc-filter__btn${filter === c.id ? " is-active" : ""}`}
                  onClick={() => setFilter(c.id)}
                >
                  {filter === c.id && (
                    <motion.span
                      layoutId="svc-filter-pill"
                      className="svc-filter__pill"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="svc-filter__label">{c.label}</span>
                </button>
              ))}
            </div>
          </LayoutGroup>
        </Reveal>

        <motion.div layout className="svc-grid">
          <AnimatePresence>
            {visible.map((s, i) => (
              <Spotlight
                as="article"
                key={s.id}
                layout
                className="svc-card"
                initial={{ opacity: 0, y: 28, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                transition={{ duration: 0.55, ease, delay: (i % 3) * 0.06 }}
              >
                <span className="svc-card__num">{String(services.indexOf(s) + 1).padStart(2, "0")}</span>
                <span className="icon-tile"><Icon name={s.icon} /></span>
                <h3>{s.title}</h3>
                <p className="svc-card__summary">{s.summary}</p>
                <ul className="check-list check-list--compact">
                  {s.deliverables.slice(0, 3).map((d) => (
                    <li key={d}><Icon name="check" />{d}</li>
                  ))}
                </ul>
                <div className="svc-card__foot">
                  <button type="button" className="svc-link" onClick={() => setActive(s)}>
                    Explore <span className="sr-only">{s.title}</span><Icon name="arrow-right" />
                  </button>
                </div>
              </Spotlight>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="svc-block">
          <Reveal className="subhead" y={12}><Icon name="settings" /> Keeping what you have running</Reveal>
          <div className="support-grid">
            {support.map((s, i) => (
              <Reveal key={s.title} className="support-item" delay={i * 0.06}>
                <Icon name={s.icon} />
                <div>
                  <h4>{s.title}</h4>
                  <p>{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="svc-block">
          <Reveal className="subhead" y={12}><Icon name="git-commit" /> How we'll work together</Reveal>
          <ProcessTimeline />
        </div>


        <div className="svc-block">
          <Reveal className="subhead" y={12}><Icon name="receipt" /> How pricing works</Reveal>
          <div className="pricing-intro">
            <Reveal className="pricing-intro__text">
              <h3>Every project is different — so is every quote.</h3>
              <p>
                I don't use a fixed price list. Instead, I quote each project based on what you actually
                need, so you never pay for features you won't use. After a free consultation, you get a
                clear, itemized proposal covering scope, deliverables, and cost before any work begins.
              </p>
            </Reveal>
            <Reveal className="card pricing-intro__factors" delay={0.1}>
              <h4>What shapes your quote</h4>
              <ul className="check-list">
                {quoteFactors.map((f) => (
                  <li key={f}><Icon name="check" />{f}</li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="engagements">
            {engagements.map((e, i) => (
              <Spotlight
                key={e.title}
                className="engagement"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease, delay: i * 0.08 }}
              >
                <span className="icon-tile"><Icon name={e.icon} /></span>
                <h4>{e.title}</h4>
                <p>{e.text}</p>
              </Spotlight>
            ))}
          </div>

          <div className="principles">
            {principles.map((p, i) => (
              <Reveal key={p.title} className="principle" delay={i * 0.06}>
                <Icon name={p.icon} />
                <div>
                  <h4>{p.title}</h4>
                  <p>{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="card svc-cta">
          <div className="svc-cta__glow" aria-hidden="true" />
          <div className="svc-cta__text">
            <h3>Not sure which service you need?</h3>
            <p>
              Most projects combine several services. Tell me the problem you want to solve, and I'll
              recommend the right mix — no commitment, free consultation.
            </p>
            <div className="svc-chips">
              {solutions.map((s) => (
                <a
                  key={s}
                  className="svc-chip"
                  href={quoteHref(s)}
                  onClick={(e) => requestQuote(e, s)}
                >
                  {s} <Icon name="arrow-right" />
                </a>
              ))}
            </div>
          </div>
          <Magnetic strength={0.2}>
            <a
              className="btn btn--primary btn--lg"
              href={quoteHref("Free consultation")}
              onClick={(e) => requestQuote(e, "Free consultation")}
            >
              <Icon name="calendar-check" /> Book a free consultation
            </a>
          </Magnetic>
        </Reveal>

        <div className="svc-block svc-faq">
          <Reveal className="subhead" y={12}><Icon name="help" /> Frequently asked questions</Reveal>
          <Faq />
        </div>
      </div>

      <AnimatePresence>
        {active && <ServiceModal key={active.id} service={active} onClose={closeModal} />}
      </AnimatePresence>
    </section>
  );
}
