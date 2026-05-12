import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const projects = [
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
    liveLink: "https://sb-cuenca-docsys.vercel.app",
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
      "This portfolio — crafted with React, Framer Motion, and custom CSS. Scroll-triggered animations, dark mode, and a fully responsive layout.",
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

const slideVariants = {
  enter: (dir) => ({ opacity: 0, x: dir === "next" ? 60 : -60 }),
  center: { opacity: 1, x: 0 },
  exit:  (dir) => ({ opacity: 0, x: dir === "next" ? -60 : 60 }),
};

export default function Experience() {
  const [index, setIndex]   = useState(0);
  const [dir, setDir]       = useState("next");
  const [paused, setPaused] = useState(false);

  const go = useCallback((newDir, newIdx) => {
    setDir(newDir);
    setIndex(newIdx);
  }, []);

  const next = useCallback(() =>
    go("next", (index + 1) % projects.length), [go, index]);
  const prev = useCallback(() =>
    go("prev", (index - 1 + projects.length) % projects.length), [go, index]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 4500);
    return () => clearInterval(t);
  }, [paused, next]);

  const p   = projects[index];
  const num = String(index + 1).padStart(2, "0");
  const tot = String(projects.length).padStart(2, "0");

  return (
    <section
      className="projects-section"
      id="services"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.h2
        className="heading"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        My <span>Projects</span>
      </motion.h2>

      <div className="proj-stage">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={index}
            className="proj-card"
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* ── Left: image ── */}
            <div className="proj-card__visual">
              <img src={p.image} alt={p.title} loading="lazy" />
              <div className="proj-card__img-overlay" />
              <span className="proj-card__big-num">{num}</span>
            </div>

            {/* ── Right: content ── */}
            <div className="proj-card__body">
              <span className="proj-card__counter">{num} / {tot}</span>

              <h3 className="proj-card__title">{p.title}</h3>
              <p className="proj-card__subtitle">{p.subtitle}</p>
              <p className="proj-card__desc">{p.description}</p>

              <div className="proj-card__tags">
                {p.tags.map(tag => (
                  <span key={tag} className="proj-card__tag">{tag}</span>
                ))}
              </div>

              <div className="proj-card__actions">
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="proj-btn proj-btn--ghost"
                >
                  <i className="bx bxl-github" /> GitHub
                </a>
                {p.liveLink && (
                  <a
                    href={p.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="proj-btn proj-btn--solid"
                  >
                    <i className="bx bx-link-external" /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Side arrows */}
        <button className="proj-arrow proj-arrow--prev" onClick={prev} aria-label="Previous">
          <i className="bx bx-chevron-left" />
        </button>
        <button className="proj-arrow proj-arrow--next" onClick={next} aria-label="Next">
          <i className="bx bx-chevron-right" />
        </button>
      </div>

      {/* Progress bar + dots */}
      <div className="proj-nav">
        <button className="proj-nav__arrow" onClick={prev} aria-label="Previous">
          <i className="bx bx-arrow-back" />
        </button>

        <div className="proj-progress">
          <div
            className="proj-progress__fill"
            style={{ width: `${((index + 1) / projects.length) * 100}%` }}
          />
        </div>

        <button className="proj-nav__arrow" onClick={next} aria-label="Next">
          <i className="bx bx-right-arrow-alt" />
        </button>
      </div>
    </section>
  );
}
