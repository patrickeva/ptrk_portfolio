import { useState } from "react";
import { motion } from "framer-motion";
import { GiBasketballBall } from "react-icons/gi";
import { useViewCounter } from "../hooks/useViewCounter";
import { CountUp, Marquee, Reveal, SectionHeading, Spotlight, ease } from "./ui";

const highlights = [
  { icon: "bx bx-code-alt",     label: "Web Developer", value: "Front-end & Full-stack" },
  { icon: "bx bx-brain",        label: "ML Engineer",   value: "Deep Learning & AI" },
  { icon: "bx bxs-graduation",  label: "CS Student",    value: "NU Lipa · 2022–2026" },
  { icon: "bx bx-map-pin",      label: "Location",      value: "Cuenca, Batangas" },
];

const stats = [
  { value: "6+",  label: "Projects Built" },
  { value: "3+",  label: "Years Coding" },
  { value: "10+", label: "Technologies" },
  { value: "2",   label: "ML Models" },
];

const hobbies = [
  { ReactIcon: GiBasketballBall, label: "Basketball" },
  { icon: "bx bx-coffee",        label: "Coffee" },
  { icon: "bx bx-music",         label: "Music" },
  { icon: "bx bx-movie-play",    label: "Movies & Anime" },
  { icon: "bx bx-code-block",    label: "Open Source" },
  { icon: "bx bx-dumbbell",      label: "Fitness" },
];

const photos = [
  { src: "/images/690881314_1748629913178069_3056507052526470357_n.webp", alt: "Patrick — graduation" },
  { src: "/images/688440369_868476066282165_3935547601184706507_n.webp",  alt: "Patrick — cap selfie" },
  { src: "/images/690500051_26732529726430846_4946360910293840089_n.webp", alt: "Patrick — barong tagalog" },
  { src: "/images/688702407_2076772699857409_7060957408574411639_n.webp", alt: "Patrick — mirror selfie" },
  { src: "/images/new2.jpg",                                              alt: "Patrick" },
  { src: "/images/684971070_2741610899539307_6143368263426878188_n.webp", alt: "Patrick — basketball jersey" },
];

function GalleryItem({ photo }) {
  const [broken, setBroken] = useState(false);
  return (
    <figure className="gallery-item">
      {broken ? (
        <span className="gallery-item__placeholder">
          <i className="bx bx-image" />
        </span>
      ) : (
        <img src={photo.src} alt={photo.alt} loading="lazy" onError={() => setBroken(true)} />
      )}
    </figure>
  );
}

export default function About() {
  const views = useViewCounter();

  return (
    <section className="section about" id="about">
      <div className="container">
        <SectionHeading index="01" eyebrow="About" title="About" accent="Me" />

        <div className="about__grid">
          <Reveal className="about__visual">
            <div className="about__photo">
              <img src="/images/aboutP.jpg" alt="Patrick Eva" />
              <div className="about__photo-tag">
                <span>
                  <strong>Patrick Eva</strong>
                  <small>Cuenca, Batangas</small>
                </span>
                <span className="about__views" title="Portfolio views">
                  <i className="bx bx-show" />
                  {views !== null ? views.toLocaleString() : "—"}
                  <small>{views === 1 ? "view" : "views"}</small>
                </span>
              </div>
            </div>

            <div className="about__stats">
              {stats.map((s, i) => (
                <Spotlight
                  key={s.label}
                  className="stat"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, ease, delay: 0.1 + i * 0.08 }}
                >
                  <span className="stat__value gradient-text">
                    <CountUp value={s.value} />
                  </span>
                  <span className="stat__label">{s.label}</span>
                </Spotlight>
              ))}
            </div>
          </Reveal>

          <div className="about__content">
            <Reveal className="subhead" y={12}>
              <i className="bx bx-user" /> Who I Am
            </Reveal>

            <Reveal as="p" className="about__lead" delay={0.05}>
              Hi! I'm <strong>Patrick Eva</strong>, a passionate Computer Science student and
              aspiring Full-Stack Developer based in Cuenca, Batangas. I love crafting clean,
              modern web apps and exploring machine learning solutions that solve real-world problems.
            </Reveal>

            <Reveal as="p" className="about__bio" delay={0.1}>
              With hands-on experience in React, Firebase, Supabase, and Python, I've built
              everything from franchise tracking platforms to AI-powered admission systems. I'm
              driven by clean code, meaningful UI/UX, and the endless possibilities technology offers.
            </Reveal>

            <div className="about__highlights">
              {highlights.map((h, i) => (
                <Spotlight
                  key={h.label}
                  className="highlight"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, ease, delay: 0.15 + i * 0.08 }}
                >
                  <span className="icon-tile">
                    <i className={h.icon} />
                  </span>
                  <span className="highlight__text">
                    <span className="highlight__label">{h.label}</span>
                    <span className="highlight__value">{h.value}</span>
                  </span>
                </Spotlight>
              ))}
            </div>
          </div>
        </div>

        <div className="about__extra">
          <div>
            <Reveal className="subhead" y={12}>
              <i className="bx bx-heart" /> Hobbies &amp; Interests
            </Reveal>
            <div className="hobbies">
              {hobbies.map((h, i) => (
                <motion.span
                  key={h.label}
                  className="hobby"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, ease, delay: i * 0.06 }}
                >
                  {h.ReactIcon ? <h.ReactIcon /> : <i className={h.icon} />}
                  {h.label}
                </motion.span>
              ))}
            </div>
          </div>

          <div>
            <Reveal className="subhead" y={12}>
              <i className="bx bx-images" /> Gallery
            </Reveal>
            <Reveal>
              <Marquee speed={0.4} className="gallery">
                {photos.map((p) => (
                  <GalleryItem key={p.src} photo={p} />
                ))}
              </Marquee>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
