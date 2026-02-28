import React, { useState, useEffect, useCallback } from "react";

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
    title: "AI-Powered Admission System - NU Lipa",
    subtitle: "Admission System with Future ML Integration",
    description:
      "A Django-based student admission system for NU Lipa, allowing student registration, admin management, and future ML integration for processing applications.",
    tags: ["Django", "Python", "JavaScript", "TensorFlow"],
    link: "https://github.com/itzjmbruhhh/NU_Admission",
  },
];

const VISIBLE = 3;
const MAX_INDEX = projects.length - VISIBLE;

export default function Experience() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((c) => (c >= MAX_INDEX ? 0 : c + 1));
  }, []);

  const prev = () => {
    setCurrent((c) => (c <= 0 ? MAX_INDEX : c - 1));
  };

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 3000);
    return () => clearInterval(timer);
  }, [paused, next]);

  const translateX = `calc(${current} * -1 * (100% + 24px) / 3)`;

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
        <button className="slider-btn prev" onClick={prev} aria-label="Previous">
          <i className="bx bx-chevron-left" />
        </button>

        <div className="projects-slider">
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

        <button className="slider-btn next" onClick={next} aria-label="Next">
          <i className="bx bx-chevron-right" />
        </button>
      </div>

      <div className="slider-dots">
        {Array.from({ length: MAX_INDEX + 1 }).map((_, i) => (
          <button
            key={i}
            className={`slider-dot${current === i ? " active" : ""}`}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}