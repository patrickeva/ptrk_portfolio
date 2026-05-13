import { useState, useRef } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import { GiBasketballBall } from "react-icons/gi";

const vp = { once: true, margin: "-60px" };

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: vp,
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
});

const fadeLeft = (delay = 0) => ({
  initial: { opacity: 0, x: -44 },
  whileInView: { opacity: 1, x: 0 },
  viewport: vp,
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
});

const fadeRight = (delay = 0) => ({
  initial: { opacity: 0, x: 44 },
  whileInView: { opacity: 1, x: 0 },
  viewport: vp,
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
});

const highlights = [
  { icon: "bx bx-code-alt",    label: "Web Developer",  value: "Front-end & Full-stack" },
  { icon: "bx bx-brain",       label: "ML Engineer",    value: "Deep Learning & AI" },
  { icon: "bxs-graduation",    label: "CS Student",     value: "NU Lipa · 2022–2026" },
  { icon: "bx bx-map-pin",     label: "Location",       value: "Cuenca, Batangas" },
];

const stats = [
  { value: "6+",  label: "Projects Built" },
  { value: "3+",  label: "Years Coding" },
  { value: "10+", label: "Technologies" },
  { value: "2",   label: "ML Models" },
];

const hobbies = [
  { ReactIcon: GiBasketballBall, label: "Basketball" },
  { icon: "bx bx-beer",        label: "Drinker" },
  { icon: "bx bx-music",       label: "Music" },
  { icon: "bx bx-movie-play",  label: "Movies & Anime" },
  { icon: "bx bx-code-block",  label: "Open Source" },
  { icon: "bx bx-dumbbell",    label: "Fitness" },
];

const photos = [
  { src: "/images/690881314_1748629913178069_3056507052526470357_n.webp",  alt: "Patrick — graduation" },
  { src: "/images/688440369_868476066282165_3935547601184706507_n.webp",   alt: "Patrick — cap selfie" },
  { src: "/images/690500051_26732529726430846_4946360910293840089_n.webp",  alt: "Patrick — barong tagalog" },
  { src: "/images/688702407_2076772699857409_7060957408574411639_n.webp",  alt: "Patrick — mirror selfie" },
  { src: "/images/new2.jpg",                                               alt: "Patrick" },
  { src: "/images/684971070_2741610899539307_6143368263426878188_n.webp",  alt: "Patrick — basketball jersey" },
];

function GalleryCard({ photo }) {
  const [broken, setBroken] = useState(false);
  return (
    <motion.div
      className="gallery-card"
      whileHover={{ y: -6, scale: 1.04 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
    >
      {photo.src && !broken ? (
        <img src={photo.src} alt={photo.alt} onError={() => setBroken(true)} loading="lazy" />
      ) : (
        <span className="gallery-card__placeholder">
          <i className="bx bx-image-add" />
        </span>
      )}
    </motion.div>
  );
}

function GalleryMarquee({ photos }) {
  const trackRef = useRef(null);
  const x = useMotionValue(0);
  const [paused, setPaused] = useState(false);

  useAnimationFrame((_, delta) => {
    if (paused || !trackRef.current) return;
    const halfWidth = trackRef.current.scrollWidth / 2;
    const next = x.get() - 0.38 * (delta / 16.667);
    x.set(next <= -halfWidth ? 0 : next);
  });

  return (
    <div
      className="gallery-marquee-viewport"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div ref={trackRef} className="gallery-marquee-track" style={{ x }}>
        {[...photos, ...photos].map((photo, i) => (
          <GalleryCard key={i} photo={photo} />
        ))}
      </motion.div>
    </div>
  );
}

export default function About() {
  return (
    <section className="about-me site-section" id="about">
      {/* Section heading */}
      <motion.h2
        className="heading"
        initial={{ opacity: 0, y: -22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={vp}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        About <span>Me</span>
      </motion.h2>

      <div className="about-me-grid">

        {/* ── LEFT: image + badge + stats ── */}
        <motion.div className="about-me-visual" {...fadeLeft(0.12)}>

          {/* Glowing image frame */}
          <div className="about-me-frame">
            <img src="/images/aboutP.jpg" alt="Patrick Eva" className="about-me-photo" />
            <div className="about-me-ring about-me-ring--1" aria-hidden="true" />
            <div className="about-me-ring about-me-ring--2" aria-hidden="true" />
            <div className="about-me-ring about-me-ring--3" aria-hidden="true" />
          </div>

          {/* Mini stats row */}
          <motion.div
            className="about-me-stats"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                className="about-me-stat"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={vp}
                transition={{ duration: 0.4, delay: 0.12 + i * 0.07 }}
                whileHover={{ y: -4, scale: 1.06 }}
              >
                <span className="about-me-stat-value">{s.value}</span>
                <span className="about-me-stat-label">{s.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── RIGHT: bio + highlights + traits ── */}
        <motion.div className="about-me-content" {...fadeRight(0.18)}>

          {/* Eyebrow */}
          <motion.p className="about-me-eyebrow" {...fadeUp(0.28)}>
            <i className="bx bx-user" /> Who I Am
          </motion.p>

          {/* Bio */}
          <motion.p className="about-me-bio" {...fadeUp(0.36)}>
            Hi! I'm <strong>Patrick Eva</strong>, a passionate Computer Science student and
            aspiring Full-Stack Developer based in Cuenca, Batangas. I love crafting clean,
            modern web apps and exploring machine learning solutions that solve real-world problems.
          </motion.p>
          <motion.p className="about-me-bio" {...fadeUp(0.44)}>
            With hands-on experience in React, Firebase, Supabase, and Python, I've built
            everything from franchise tracking platforms to AI-powered admission systems. I'm
            driven by clean code, meaningful UI/UX, and the endless possibilities technology offers.
          </motion.p>

          {/* Highlights grid */}
          <motion.div className="about-me-highlights" {...fadeUp(0.52)}>
            {highlights.map((h, i) => (
              <motion.div
                key={h.label}
                className="about-me-highlight"
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.54 + i * 0.08 }}
                whileHover={{ y: -5, scale: 1.03 }}
              >
                <span className="about-me-highlight-icon">
                  <i className={h.icon} />
                </span>
                <div className="about-me-highlight-text">
                  <span className="about-me-highlight-label">{h.label}</span>
                  <span className="about-me-highlight-value">{h.value}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </motion.div>

      </div>

      {/* ── HOBBIES + PHOTOS ── */}
      <motion.div
        className="about-me-extra"
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={vp}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      >
        {/* Hobbies */}
        <div className="about-me-hobbies-block">
          <p className="about-me-section-eyebrow">
            <i className="bx bx-heart" /> Hobbies &amp; Interests
          </p>
          <div className="about-me-hobbies">
            {hobbies.map((h, i) => (
              <motion.div
                key={h.label}
                className="about-me-hobby"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={vp}
                transition={{ duration: 0.4, delay: 0.05 + i * 0.07 }}
                whileHover={{ y: -5, scale: 1.06 }}
              >
                {h.ReactIcon
                  ? <h.ReactIcon className="about-me-hobby-react-icon" />
                  : <i className={h.icon} />}
                <span>{h.label}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Photo gallery */}
        <div className="about-me-photos-block">
          <p className="about-me-section-eyebrow">
            <i className="bx bx-images" /> Gallery
          </p>
          <div className="gallery-marquee-wrapper">
            <div className="gallery-marquee-fade gallery-marquee-fade--left" />
            <GalleryMarquee photos={photos} />
            <div className="gallery-marquee-fade gallery-marquee-fade--right" />
          </div>
        </div>
      </motion.div>

    </section>
  );
}
