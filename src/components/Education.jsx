import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const schools = [
  {
    name: 'National University Lipa',
    year: 'Bachelor of Science in Computer Science (2022 – 2026)',
    location: 'Lipa City, Batangas',
    img: '/images/college.jpg',
    icon: 'bxs-school',
  },
  {
    name: 'Cuenca Senior High School',
    year: 'Accountancy Business and Management (2019 – 2021)',
    location: 'Cuenca, Batangas',
    img: '/images/shs.jpg',
    icon: 'bx-book-open',
  },
  {
    name: 'Cuenca Institute',
    year: '(2015 – 2019)',
    location: 'Cuenca, Batangas',
    img: '/images/hshs.jpg',
    icon: 'bx-pencil',
  },
];

export default function Education() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="education site-section" id="education">
      <motion.h2
        className="heading"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        My <span>Education</span>
      </motion.h2>

      <div className="education-grid">
        {/* Card list */}
        <motion.div
          className="edu-list"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          {schools.map((s, i) => (
            <motion.div
              key={i}
              className={`edu-card${activeIdx === i ? ' edu-card--active' : ''}`}
              onMouseEnter={() => setActiveIdx(i)}
              onFocus={() => setActiveIdx(i)}
              tabIndex={0}
              role="button"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="edu-card-inner">
                <div className="edu-card-icon">
                  <i className={`bx ${s.icon}`} />
                </div>
                <div className="edu-card-text">
                  <h3 className="edu-school">{s.name}</h3>
                  <p className="edu-degree">{s.year}</p>
                  <p className="edu-location">
                    <i className="bx bx-map-pin" />
                    {s.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Image panel */}
        <motion.div
          className="edu-image"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <div className="edu-hero">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeIdx}
                src={schools[activeIdx].img}
                alt={schools[activeIdx].name}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              />
            </AnimatePresence>
          </div>
          <p className="edu-active-label">{schools[activeIdx].name}</p>
        </motion.div>
      </div>
    </section>
  );
}
