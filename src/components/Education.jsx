import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const schools = [
  {
    name: 'National University Lipa',
    degree: 'Bachelor of Science in Computer Science',
    year: '2022 – 2026',
    location: 'Lipa City, Batangas',
    type: 'College',
    img: '/images/college.jpg',
    icon: 'bxs-graduation',
  },
  {
    name: 'Cuenca Senior High School',
    degree: 'Accountancy Business and Management',
    year: '2019 – 2021',
    location: 'Cuenca, Batangas',
    type: 'Senior High',
    img: '/images/shs.jpg',
    icon: 'bx-book-open',
  },
  {
    name: 'Cuenca Institute',
    degree: 'Junior High School',
    year: '2015 – 2019',
    location: 'Cuenca, Batangas',
    type: 'High School',
    img: '/images/hshs.jpg',
    icon: 'bx-pencil',
  },
];

export default function Education() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = schools[activeIdx];

  return (
    <section className="education site-section" id="education">
      <motion.h2
        className="heading"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        My <span>Education</span>
      </motion.h2>

      <div className="edu-layout">

        {/* ── Left: vertical timeline ── */}
        <motion.div
          className="edu-timeline"
          initial={{ opacity: 0, x: -36 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          {schools.map((s, i) => (
            <motion.div
              key={i}
              className={`edu-node${activeIdx === i ? ' edu-node--active' : ''}`}
              onClick={() => setActiveIdx(i)}
              onMouseEnter={() => setActiveIdx(i)}
              initial={{ opacity: 0, x: -22 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="edu-node__track">
                <div className="edu-node__dot">
                  <i className={`bx ${s.icon}`} />
                </div>
                {i < schools.length - 1 && <div className="edu-node__line" />}
              </div>

              <div className="edu-node__body">
                <span className="edu-node__type">{s.type}</span>
                <h3 className="edu-node__name">{s.name}</h3>
                <p className="edu-node__degree">{s.degree}</p>
                <div className="edu-node__meta">
                  <span><i className="bx bx-calendar" /> {s.year}</span>
                  <span><i className="bx bx-map-pin" /> {s.location}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Right: image viewer (no text overlay) ── */}
        <motion.div
          className="edu-showcase"
          initial={{ opacity: 0, x: 36 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <div className="edu-showcase__frame">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeIdx}
                src={active.img}
                alt={active.name}
                className="edu-showcase__img"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.03 }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              />
            </AnimatePresence>
          </div>

          {/* School name label below the frame */}
          <AnimatePresence mode="wait">
            <motion.p
              key={activeIdx}
              className="edu-showcase__label"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <i className={`bx ${active.icon}`} />
              {active.name}
            </motion.p>
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
