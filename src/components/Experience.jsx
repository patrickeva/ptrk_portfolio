import React, { useState, useEffect, useCallback, useRef } from "react";

/* ─── Project data ─────────────────────────────────────── */
const projects = [
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

const TRACK_GAP = 24; // px — must match CSS gap on .projects-track

function getVisible(sliderWidth) {
  if (sliderWidth < 768) return 1;
  if (sliderWidth < 1100) return 2;
  return 3;
}

export default function Experience() {
  const [current, setCurrent]           = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [paused, setPaused]             = useState(false);

  const sliderRef   = useRef(null);
  const touchStartX = useRef(null);

  /* ResizeObserver on the slider clip element itself */
  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;

    const apply = (width) => {
      const next = getVisible(width);
      setVisibleCount((prev) => {
        if (prev === next) return prev;
        setCurrent((c) => Math.min(c, Math.max(0, projects.length - next)));
        return next;
      });
    };

    apply(el.offsetWidth); // ← runs immediately on mount (key fix for mobile)

    const ro = new ResizeObserver((entries) => {
      for (const e of entries) apply(e.contentRect.width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const maxIndex = Math.max(0, projects.length - visibleCount);

  const next = useCallback(() => {
    setCurrent((c) => (c >= maxIndex ? 0 : c + 1));
  }, [maxIndex]);

  const prev = useCallback(() => {
    setCurrent((c) => (c <= 0 ? maxIndex : c - 1));
  }, [maxIndex]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 3500);
    return () => clearInterval(id);
  }, [paused, next]);

  const onTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].clientX;
    setPaused(true);
  };
  const onTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    setPaused(false);
  };

  /*
   * translateX:
   *   visible=1 → step = 100% + 24px
   *   visible=2 → step = 50%  + 12px
   *   visible=3 → step = 33.333% + 8px
   */
  const pct   = (100 / visibleCount).toFixed(6);
  const gapPx = (TRACK_GAP / visibleCount).toFixed(6);
  const translateX = `calc(${current} * -1 * (${pct}% + ${gapPx}px))`;

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

      <div className="projects-slider-wrapper">
        <button
          className="slider-btn prev"
          onClick={prev}
          aria-label="Previous project"
          type="button"
        >
          <i className="bx bx-chevron-left" />
        </button>

        <div
          className="projects-slider"
          ref={sliderRef}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="projects-track"
            style={{ transform: `translateX(${translateX})` }}
          >
            {projects.map((project) => (
              <div key={project.id} className="project-card">
                <div className="project-img-wrapper">
                  <img src={project.image} alt={project.title} />
                  <div className="project-img-shine" />
                </div>
                <div className="project-body">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-subtitle">{project.subtitle}</p>
                  <p className="project-desc">{project.description}</p>
                  <div className="project-tags">
                    {project.tags.map((tag) => (
                      <span key={tag} className="project-tag">{tag}</span>
                    ))}
                  </div>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-btn"
                  >
                    <i className="bx bxl-github" />
                    View on GitHub
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          className="slider-btn next"
          onClick={next}
          aria-label="Next project"
          type="button"
        >
          <i className="bx bx-chevron-right" />
        </button>
      </div>

      <div className="slider-dots">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            type="button"
            className={`slider-dot${current === i ? " active" : ""}`}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}