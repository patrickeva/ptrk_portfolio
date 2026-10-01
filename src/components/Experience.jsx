import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Reveal, SectionHeading, ease } from "./ui";

const projects = [
  {
    image: "/images/BusTracking.png",
    title: "BMTC Minibus Tracker",
    subtitle: "Fleet Management System · Real-Time GPS Tracking",
    description:
      "A real-time GPS fleet tracking system built for a transport cooperative operating the SM Lemery–SM Lipa route. Passengers follow live minibus locations on a public map with no app or sign-up required, while drivers use a native Android app that keeps transmitting even when the phone is closed or the screen is off.",
    tags: ["React", "Supabase", "PostgreSQL", "Capacitor", "Java", "Leaflet"],
    link: "https://github.com/patrickeva/minibus-tracker",
    liveLink: "https://bmtctracker.com",
  },
  {
    image: "/images/franchiseBG.png",
    title: "Tricycle Franchise Tracker",
    subtitle: "Real-Time Monitoring · Driver Franchises & Licenses",
    description:
      "A web-based system for managing the issuance, renewal, and monitoring of tricycle franchises with real-time Firebase sync and admin dashboards.",
    tags: ["React 18", "Firebase", "Supabase", "Tailwind CSS"],
    link: "https://github.com/patrickeva/Tric-Franchise-Tracker",
    liveLink: "https://tric-franchise-tracker.vercel.app/",
  },
  {
    image: "/images/sbBackground.png",
    title: "Cuenca Legislative Tracker",
    subtitle: "Sangguniang Bayan · Legislative Document System",
    description:
      "A centralized digital platform for tracking ordinances and resolutions, featuring secure cloud storage and automated status monitoring to enhance municipal transparency.",
    tags: ["React", "Firebase", "Supabase", "JavaScript"],
    link: "https://github.com/patrickeva/sb-cuenca-docsys",
    liveLink: "https://sb-cuenca-docsys.vercel.app/",
  },
  {
    image: "/images/freelanceWEB.png",
    title: "Patrick F Web",
    subtitle: "Freelance Web Development · Business Website",
    description:
      "A modern freelance web development website created to showcase professional services, selected projects, pricing, workflow, and web solutions for businesses and individuals.",
    tags: ["React", "Vite", "JavaScript", "CSS3"],
    link: "https://github.com/patrickeva/patrick-FWeb",
    liveLink: "https://patrick-f-web.vercel.app/",
  },
  {
    image: "/images/ampalaya.jpg",
    title: "NPK Deficiency Detector",
    subtitle: "Deep Learning · Bitter Gourd Leaf Analysis",
    description:
      "A CNN model that distinguishes Healthy, Nitrogen, Phosphorus, and Potassium deficiencies in bitter gourd plants, paired with IoT hardware for field deployment.",
    tags: ["Deep Learning", "CNN", "IoT", "Python"],
    link: "https://github.com/itzjmbruhhh/NPK_Deficiency_Classifier_IoT",
    liveLink: "https://npknows.vercel.app/",
  },
  {
    image: "/images/leaf.jpg",
    title: "Leaf it Up to Me",
    subtitle: "Machine Learning · Coffee Leaf Disease Detection",
    description:
      "A web application using MobileNetV2 CNN architecture to detect diseases in coffee leaves from uploaded photos with high classification accuracy.",
    tags: ["MobileNetV2", "CNN", "Python", "Web App"],
    link: "https://github.com/itzjmbruhhh/coffee_leaf_diseases_classifier",
  },
  {
    image: "/images/myPortfolio.png",
    title: "Personal Portfolio",
    subtitle: "Frontend · React Portfolio Website",
    description:
      "A modern personal portfolio website built to showcase web development projects, technical skills, experience, and professional services through a responsive and interactive interface.",
    tags: ["React", "Framer Motion", "CSS3", "Vite"],
    link: "https://github.com/patrickeva/ptrk_portfolio",
  },
  {
    image: "/images/NU_Admission.jpg",
    title: "AI-Powered Admission System",
    subtitle: "NU Lipa · Student Admission with ML Integration",
    description:
      "A Django-based admission platform for NU Lipa supporting student registration, admin management, and future TensorFlow ML integration for application processing.",
    tags: ["Django", "Python", "TensorFlow", "JavaScript"],
    link: "https://github.com/itzjmbruhhh/NU_Admission",
  },
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
    <section className="section projects" id="services" ref={sectionRef}>
      <div className="container">
        <SectionHeading
          index="03"
          eyebrow="Selected work"
          title="My"
          accent="Projects"
          subtitle="Real systems built for real users — from government platforms to deep learning research."
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
                <motion.p className="project__desc" variants={bodyItem}>
                  {project.description}
                </motion.p>
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
                    <i className="bx bxl-github" /> GitHub
                  </a>
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn--primary"
                      aria-label={`View live ${project.title} website`}
                    >
                      <i className="bx bx-link-external" /> Live Demo
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
                <i className="bx bx-left-arrow-alt" />
              </button>
              <button type="button" className="icon-btn icon-btn--lg" onClick={next} aria-label="Next project">
                <i className="bx bx-right-arrow-alt" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
