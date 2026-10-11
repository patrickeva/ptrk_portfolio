import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Reveal, SectionHeading, ease } from "./ui";
import Icon from "./Icon";
import Testimonials from "./Testimonials";

const projects = [
  {
    image: "/images/BusTracking.png",
    title: "BMTC Minibus Tracker",
    subtitle: "Fleet Management System · Real-Time GPS Tracking",
    challenge:
      "Passengers on the SM Lemery–SM Lipa route had no way to know where the minibuses were, leading to long and uncertain waits.",
    solution:
      "A public live map that needs no app or sign-up, plus a native Android driver app that keeps sending GPS even with the screen off.",
    result:
      "Live at bmtctracker.com — passengers can check bus locations before heading out, and the cooperative can monitor its fleet in real time.",
    tags: ["React", "Supabase", "PostgreSQL", "Capacitor", "Java", "Leaflet"],
    link: "https://github.com/patrickeva/minibus-tracker",
    liveLink: "https://bmtctracker.com",
  },
  {
    image: "/images/franchiseBG.png",
    title: "Tricycle Franchise Tracker",
    subtitle: "Real-Time Monitoring · Driver Franchises & Licenses",
    challenge:
      "Issuing and renewing tricycle franchises relied on manual records that were hard to search and easy to let expire.",
    solution:
      "A web system with real-time sync and admin dashboards for franchises, drivers, and licenses.",
    result:
      "Franchise and license status lives in one place, so staff can spot renewals before they lapse.",
    tags: ["React 18", "Firebase", "Supabase", "Tailwind CSS"],
    link: "https://github.com/patrickeva/Tric-Franchise-Tracker",
    liveLink: "https://tric-franchise-tracker.vercel.app/",
  },
  {
    image: "/images/sbBackground.png",
    title: "Cuenca Legislative Tracker",
    subtitle: "Sangguniang Bayan · Legislative Document System",
    challenge:
      "Ordinances and resolutions were kept on paper, making them slow to find and hard for the public to access.",
    solution:
      "A centralized document platform with secure cloud storage and automated status monitoring.",
    result:
      "Faster document retrieval for the Sangguniang Bayan and better transparency for residents.",
    tags: ["React", "Firebase", "Supabase", "JavaScript"],
    link: "https://github.com/patrickeva/sb-cuenca-docsys",
    liveLink: "https://sb-cuenca-docsys.vercel.app/",
  },
  {
    image: "/images/freelanceWEB.png",
    title: "Patrick F Web",
    subtitle: "Freelance Web Development · Business Website",
    challenge:
      "Freelance clients need to quickly understand what services are offered and how to get started.",
    solution:
      "A modern business website presenting services, selected projects, pricing, and workflow.",
    result:
      "A live online storefront that turns visitors into project inquiries.",
    tags: ["React", "Vite", "JavaScript", "CSS3"],
    link: "https://github.com/patrickeva/patrick-FWeb",
    liveLink: "https://patrick-f-web.vercel.app/",
  },
  {
    image: "/images/ampalaya.jpg",
    title: "NPK Deficiency Detector",
    subtitle: "Deep Learning · Bitter Gourd Leaf Analysis",
    challenge:
      "Farmers can't easily tell which nutrient a bitter gourd plant lacks just by looking at its leaves.",
    solution:
      "A CNN model that classifies Healthy, Nitrogen, Phosphorus, and Potassium deficiencies, paired with IoT hardware for field use.",
    result:
      "A leaf photo becomes an instant nutrient diagnosis that helps guide fertilizer decisions.",
    tags: ["Deep Learning", "CNN", "IoT", "Python"],
    link: "https://github.com/itzjmbruhhh/NPK_Deficiency_Classifier_IoT",
    liveLink: "https://npknows.vercel.app/",
  },
  {
    image: "/images/leaf.jpg",
    title: "Leaf it Up to Me",
    subtitle: "Machine Learning · Coffee Leaf Disease Detection",
    challenge:
      "Coffee leaf diseases are hard to identify early without an expert on site.",
    solution:
      "A MobileNetV2-based web app that classifies diseases from an uploaded leaf photo.",
    result:
      "Growers get a quick, accessible first diagnosis from any phone or computer.",
    tags: ["MobileNetV2", "CNN", "Python", "Web App"],
    link: "https://github.com/itzjmbruhhh/coffee_leaf_diseases_classifier",
  },
  {
    image: "/images/myPortfolio.png",
    title: "Personal Portfolio",
    subtitle: "Frontend · React Portfolio Website",
    challenge:
      "Clients need one place to see skills, past work, and services before reaching out.",
    solution:
      "An interactive React site with a services catalog, case studies, and an inquiry form.",
    result:
      "The site you're on right now.",
    tags: ["React", "Framer Motion", "CSS3", "Vite"],
    link: "https://github.com/patrickeva/ptrk_portfolio",
  },
  {
    image: "/images/NU_Admission.jpg",
    title: "AI-Powered Admission System",
    subtitle: "NU Lipa · Student Admission with ML Integration",
    challenge:
      "Processing student applications involves repetitive manual work for the admissions team.",
    solution:
      "A Django platform for student registration and admin management, designed for TensorFlow ML integration.",
    result:
      "A digital admission flow ready for ML-assisted application screening.",
    tags: ["Django", "Python", "TensorFlow", "JavaScript"],
    link: "https://github.com/itzjmbruhhh/NU_Admission",
  },
];

const caseSteps = [
  { key: "challenge", label: "Challenge", icon: "help" },
  { key: "solution", label: "Solution", icon: "wrench" },
  { key: "result", label: "Result", icon: "badge-check" },
];

const pad = (n) => String(n).padStart(2, "0");

const bodyVariants = {
  enter: {},
  center: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
  exit: {},
};

const bodyItem = {
  enter: { opacity: 0, y: 18 },
  center: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.25 } },
};

export default function Experience() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [hovering, setHovering] = useState(false);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { amount: 0.35 });
  const paused = hovering || !inView;

  const goTo = useCallback((i, dir) => {
    setDirection(dir);
    setIndex((i + projects.length) % projects.length);
  }, []);

  const next = useCallback(() => goTo(index + 1, 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1, -1), [goTo, index]);

  useEffect(() => {
    if (!inView) return;
    const onKey = (e) => {
      if (e.target.closest?.("input, textarea")) return;
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [inView, next, prev]);

  const project = projects[index];

  return (
    <section className="section projects" id="projects" ref={sectionRef}>
      <div className="container">
        <SectionHeading
          index="03"
          eyebrow="Case studies"
          title="Selected"
          accent="Work"
          subtitle="Real systems built for real users — the problem, how I solved it, and what changed."
        />

        <Reveal
          className="projects__stage"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.article
              key={index}
              className="card project"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="project__visual"
                custom={direction}
                variants={{
                  enter: (d) => ({ clipPath: d > 0 ? "inset(0 0 0 100%)" : "inset(0 100% 0 0)" }),
                  center: { clipPath: "inset(0 0 0 0%)", transition: { duration: 0.9, ease } },
                  exit: { opacity: 0, transition: { duration: 0.25 } },
                }}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <span className="project__num">{pad(index + 1)}</span>
                <motion.div
                  className="project__window"
                  initial={{ y: 40, scale: 0.94 }}
                  animate={{ y: 0, scale: 1 }}
                  transition={{ duration: 1.1, ease, delay: 0.15 }}
                >
                  <div className="project__window-bar" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                  <img src={project.image} alt={`${project.title} preview`} />
                </motion.div>
              </motion.div>

              <motion.div
                className="project__body"
                variants={bodyVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <motion.span className="project__counter" variants={bodyItem}>
                  Project {pad(index + 1)} / {pad(projects.length)}
                </motion.span>
                <motion.h3 className="project__title" variants={bodyItem}>
                  {project.title}
                </motion.h3>
                <motion.p className="project__subtitle" variants={bodyItem}>
                  {project.subtitle}
                </motion.p>
                <motion.dl className="project__case" variants={bodyItem}>
                  {caseSteps.map((step) => (
                    <div key={step.key} className="project__case-item">
                      <dt><Icon name={step.icon} /> {step.label}</dt>
                      <dd>{project[step.key]}</dd>
                    </div>
                  ))}
                </motion.dl>
                <motion.div className="tags" variants={bodyItem}>
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </motion.div>
                <motion.div className="project__actions" variants={bodyItem}>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--ghost"
                    aria-label={`View ${project.title} source code on GitHub`}
                  >
                    <Icon name="github" /> GitHub
                  </a>
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn--primary"
                      aria-label={`View live ${project.title} website`}
                    >
                      <Icon name="external-link" /> Live Demo
                    </a>
                  )}
                </motion.div>
              </motion.div>
            </motion.article>
          </AnimatePresence>

          <div className="projects__controls">
            <span className="projects__count">
              <strong>{pad(index + 1)}</strong>
              <span>/ {pad(projects.length)}</span>
            </span>

            <div className="projects__segments" role="tablist" aria-label="Projects">
              {projects.map((p, i) => (
                <button
                  key={p.title}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`${p.title} (${i + 1} of ${projects.length})`}
                  className={`seg${i < index ? " is-done" : ""}${i === index ? " is-active" : ""}`}
                  onClick={() => goTo(i, i >= index ? 1 : -1)}
                >
                  <span className="seg__bar">
                    <span
                      key={i === index ? `active-${index}` : i}
                      className="seg__fill"
                      style={{ animationPlayState: paused ? "paused" : "running" }}
                      onAnimationEnd={i === index ? next : undefined}
                    />
                  </span>
                </button>
              ))}
            </div>

            <div className="projects__arrows">
              <button type="button" className="icon-btn icon-btn--lg" onClick={prev} aria-label="Previous project">
                <Icon name="arrow-left" />
              </button>
              <button type="button" className="icon-btn icon-btn--lg" onClick={next} aria-label="Next project">
                <Icon name="arrow-right" />
              </button>
            </div>
          </div>
        </Reveal>

        <Testimonials />
      </div>
    </section>
  );
}
