import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";

/* ─────────────────────────────────────────
   PROJECT DATA
───────────────────────────────────────── */
const projects = [

  {
    id: 1,
    image: "/images/sb-picture.png",
    title: "Cuenca Legislative Tracking System",
    subtitle: "Sangguniang Bayan Legislative Tracker",
    description:
      "A centralized digital platform for tracking ordinances and resolutions, featuring secure cloud storage and automated status monitoring to enhance municipal transparency.",
    tags: ["React", "Firebase", "Supabase", "JavaScript"],
    link: "https://github.com/patrickeva/sb-cuenca-docsys",
  },
  {
    id: 1,
    image: "/images/ampalaya.jpg",
    title: "NPK Deficiency Detector",
    subtitle: "in Bitter Gourd Leaves",
    description:
      "A Deep Learning CNN Model focused on distinguishing between Healthy, Nitrogen, Phosphorus, and Potassium Deficient Bitter Gourd Plants.",
    tags: ["Deep Learning", "CNN", "IoT", "Python"],
    link: "https://github.com/itzjmbruhhh/NPK_Deficiency_Classifier_IoT",
  },
  {
    id: 2,
    image: "/images/leaf.jpg",
    title: "Leaf it Up to Me",
    subtitle: "Coffee Leaf Disease Detector",
    description:
      "A web application designed to detect coffee leaf diseases using a Convolutional Neural Network (CNN) based on MobileNetV2 architecture.",
    tags: ["MobileNetV2", "CNN", "Web App", "Python"],
    link: "https://github.com/itzjmbruhhh/coffee_leaf_diseases_classifier",
  },
  {
    id: 3,
    image: "/images/portfolio.jpg",
    title: "My Portfolio",
    subtitle: "Personal Portfolio Website",
    description:
      "Create like a pro, Turn your dreams into reality. A personal portfolio showcasing projects, skills, and experience.",
    tags: ["React", "CSS3", "HTML5", "JavaScript"],
    link: "https://github.com/patrickeva/ptrk_portfolio",
  },
  {
    id: 4,
    image: "/images/NU_Admission.jpg",
    title: "AI-Powered Admission System – NU Lipa",
    subtitle: "Admission System with Future ML Integration",
    description:
      "A Django-based student admission system for NU Lipa, allowing student registration, admin management, and future ML integration for processing applications.",
    tags: ["Django", "Python", "JavaScript", "TensorFlow"],
    link: "https://github.com/itzjmbruhhh/NU_Admission",
  },
];

const GAP = 24; // px — matches CSS gap on .exp-track

function getVisibleCount() {
  if (typeof window === "undefined") return 3;
  if (window.innerWidth <= 767) return 1;
  if (window.innerWidth <= 1099) return 2;
  return 3;
}

/* ─────────────────────────────────────────
   COMPONENT
───────────────────────────────────────── */
export default function Experience() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(getVisibleCount);
  const [offset, setOffset] = useState(0);

  const sliderRef = useRef(null);
  const touchStartX = useRef(null);
  const maxIndex = projects.length - visibleCount;

  /* ── Recompute pixel offset ───────────────────────────────
     cardWidth = (sliderWidth - (visible-1) * GAP) / visible
     step      = cardWidth + GAP
     offset    = current * step
  ───────────────────────────────────────────────────────── */
  const recalc = useCallback(() => {
    if (!sliderRef.current) return;
    const sliderW = sliderRef.current.getBoundingClientRect().width;
    if (!sliderW) return;
    const cardW = (sliderW - (visibleCount - 1) * GAP) / visibleCount;
    setOffset(current * (cardW + GAP));
  }, [current, visibleCount]);

  useEffect(() => { recalc(); }, [recalc]);

  // ResizeObserver keeps offset accurate after any layout shift
  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => recalc());
    ro.observe(el);
    return () => ro.disconnect();
  }, [recalc]);

  // Window resize → update visibleCount and clamp index
  useEffect(() => {
    const onResize = () => {
      const newCount = getVisibleCount();
      setVisibleCount(newCount);
      setCurrent((c) => Math.min(c, Math.max(0, projects.length - newCount)));
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  /* ── Nav ─────────────────────────────────────────────────── */
  const next = useCallback(() =>
    setCurrent((c) => (c >= maxIndex ? 0 : c + 1)), [maxIndex]);
  const prev = useCallback(() =>
    setCurrent((c) => (c <= 0 ? maxIndex : c - 1)), [maxIndex]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 3500);
    return () => clearInterval(t);
  }, [paused, next]);

  /* ── Touch ───────────────────────────────────────────────── */
  const onTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].clientX;
    setPaused(true);
  };
  const onTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    setPaused(false);
  };

  // Each card gets an explicit flex-basis so CSS and JS agree
  const cardStyle = {
    flex: `0 0 calc((100% - ${(visibleCount - 1) * GAP}px) / ${visibleCount})`,
    minWidth: 0,
    boxSizing: "border-box",
  };

  return (
    <section
      className="services"
      id="experience"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <h2 className="heading">
        My <span>Projects</span>
      </h2>

      {/* ── [arrow] [slider] [arrow] ── */}
      <div className="exp-wrapper">
        <button
          className="exp-arrow"
          onClick={prev}
          aria-label="Previous"
          type="button"
        >
          <i className="bx bx-chevron-left" />
        </button>

        <div
          className="exp-slider"
          ref={sliderRef}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="exp-track"
            style={{ transform: `translateX(-${offset}px)` }}
          >
            {projects.map((p, i) => (
              <motion.div
                key={p.id}
                className="exp-card"
                style={cardStyle}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.52,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.1 + i * 0.1,
                }}
              >
                <div className="exp-card__img">
                  <img src={p.image} alt={p.title} loading="lazy" />
                  <div className="exp-card__shine" />
                </div>
                <div className="exp-card__body">
                  <h3 className="exp-card__title">{p.title}</h3>
                  <p className="exp-card__subtitle">{p.subtitle}</p>
                  <p className="exp-card__desc">{p.description}</p>
                  <div className="exp-card__tags">
                    {p.tags.map((tag) => (
                      <span key={tag} className="exp-card__tag">{tag}</span>
                    ))}
                  </div>
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="exp-card__btn"
                  >
                    <i className="bx bxl-github" />
                    View on GitHub
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <button
          className="exp-arrow"
          onClick={next}
          aria-label="Next"
          type="button"
        >
          <i className="bx bx-chevron-right" />
        </button>
      </div>

      {/* ── Dots ── */}
      <div className="exp-dots">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            className={`exp-dot${current === i ? " exp-dot--active" : ""}`}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
            type="button"
          />
        ))}
      </div>
    </section>
  );
}
