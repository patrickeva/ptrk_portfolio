import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* =========================================================
   PROJECT DATA
========================================================= */

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
    liveLink: "https://sb-cuenca-docsys.vercel.app/",
  },

  /* =======================================================
     PROJECT #03
     PATRICK F WEB
  ======================================================= */

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


/* =========================================================
   SLIDE ANIMATION
========================================================= */

const slideVariants = {
  enter: (direction) => ({
    opacity: 0,
    x: direction === "next" ? 60 : -60,
  }),

  center: {
    opacity: 1,
    x: 0,
  },

  exit: (direction) => ({
    opacity: 0,
    x: direction === "next" ? -60 : 60,
  }),
};


/* =========================================================
   EXPERIENCE / PROJECTS COMPONENT
========================================================= */

export default function Experience() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState("next");
  const [paused, setPaused] = useState(false);


  /* =======================================================
     CHANGE PROJECT
  ======================================================= */

  const goToProject = useCallback((newDirection, newIndex) => {
    setDirection(newDirection);
    setIndex(newIndex);
  }, []);


  /* =======================================================
     NEXT PROJECT
  ======================================================= */

  const next = useCallback(() => {
    goToProject(
      "next",
      (index + 1) % projects.length
    );
  }, [goToProject, index]);


  /* =======================================================
     PREVIOUS PROJECT
  ======================================================= */

  const prev = useCallback(() => {
    goToProject(
      "prev",
      (index - 1 + projects.length) % projects.length
    );
  }, [goToProject, index]);


  /* =======================================================
     AUTO SLIDE
  ======================================================= */

  useEffect(() => {
    if (paused) {
      return;
    }

    const timer = setInterval(() => {
      next();
    }, 4500);

    return () => {
      clearInterval(timer);
    };
  }, [paused, next]);


  /* =======================================================
     CURRENT PROJECT
  ======================================================= */

  const project = projects[index];

  const currentNumber = String(index + 1).padStart(2, "0");

  const totalProjects = String(projects.length).padStart(2, "0");

  const progress =
    ((index + 1) / projects.length) * 100;


  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <section
      className="projects-section"
      id="services"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >

      {/* ===================================================
          SECTION HEADER
      =================================================== */}

      <motion.h2
        className="heading"
        initial={{
          opacity: 0,
          y: -20,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          margin: "-60px",
        }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        My <span>Projects</span>
      </motion.h2>


      {/* ===================================================
          PROJECT STAGE
      =================================================== */}

      <div className="proj-stage">

        <AnimatePresence
          mode="wait"
          custom={direction}
        >

          <motion.div
            key={index}
            className="proj-card"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.42,
              ease: [0.22, 1, 0.36, 1],
            }}
          >

            {/* =============================================
                PROJECT IMAGE
            ============================================== */}

            <div className="proj-card__visual">

              <img
                src={project.image}
                alt={`${project.title} project preview`}
                loading="lazy"
              />

              <div className="proj-card__img-overlay" />

              <span className="proj-card__big-num">
                {currentNumber}
              </span>

            </div>


            {/* =============================================
                PROJECT INFORMATION
            ============================================== */}

            <div className="proj-card__body">

              {/* Project counter */}

              <span className="proj-card__counter">
                {currentNumber} / {totalProjects}
              </span>


              {/* Project title */}

              <h3 className="proj-card__title">
                {project.title}
              </h3>


              {/* Project subtitle */}

              <p className="proj-card__subtitle">
                {project.subtitle}
              </p>


              {/* Project description */}

              <p className="proj-card__desc">
                {project.description}
              </p>


              {/* =========================================
                  TECHNOLOGY TAGS
              ========================================== */}

              <div className="proj-card__tags">

                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="proj-card__tag"
                  >
                    {tag}
                  </span>
                ))}

              </div>


              {/* =========================================
                  PROJECT ACTIONS
              ========================================== */}

              <div className="proj-card__actions">

                {/* GitHub */}

                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="proj-btn proj-btn--ghost"
                  aria-label={`View ${project.title} source code on GitHub`}
                >
                  <i className="bx bxl-github"></i>

                  <span>GitHub</span>
                </a>


                {/* Live Website */}

                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="proj-btn proj-btn--solid"
                    aria-label={`View live ${project.title} website`}
                  >
                    <i className="bx bx-link-external"></i>

                    <span>Live Demo</span>
                  </a>
                )}

              </div>

            </div>

          </motion.div>

        </AnimatePresence>


        {/* =================================================
            SIDE PREVIOUS BUTTON
        ================================================== */}

        <button
          type="button"
          className="proj-arrow proj-arrow--prev"
          onClick={prev}
          aria-label="Previous project"
        >
          <i className="bx bx-chevron-left"></i>
        </button>


        {/* =================================================
            SIDE NEXT BUTTON
        ================================================== */}

        <button
          type="button"
          className="proj-arrow proj-arrow--next"
          onClick={next}
          aria-label="Next project"
        >
          <i className="bx bx-chevron-right"></i>
        </button>

      </div>


      {/* ===================================================
          PROJECT PROGRESS NAVIGATION
      =================================================== */}

      <div className="proj-nav">

        {/* Previous */}

        <button
          type="button"
          className="proj-nav__arrow"
          onClick={prev}
          aria-label="Previous project"
        >
          <i className="bx bx-arrow-back"></i>
        </button>


        {/* Progress */}

        <div
          className="proj-progress"
          aria-label={`Project ${currentNumber} of ${totalProjects}`}
        >

          <div
            className="proj-progress__fill"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>


        {/* Next */}

        <button
          type="button"
          className="proj-nav__arrow"
          onClick={next}
          aria-label="Next project"
        >
          <i className="bx bx-right-arrow-alt"></i>
        </button>

      </div>

    </section>
  );
}