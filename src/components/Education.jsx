import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Reveal, SectionHeading, Spotlight, ease } from './ui';

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
    <section className="section education" id="education">
      <div className="container">
        <SectionHeading index="04" eyebrow="Background" title="My" accent="Education" />

        <div className="edu__grid">
          <div className="edu__timeline">
            {schools.map((s, i) => (
              <Spotlight
                key={s.name}
                role="button"
                tabIndex={0}
                aria-pressed={activeIdx === i}
                className={`edu-item${activeIdx === i ? ' is-active' : ''}`}
                onClick={() => setActiveIdx(i)}
                onMouseEnter={() => setActiveIdx(i)}
                onFocus={() => setActiveIdx(i)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActiveIdx(i);
                  }
                }}
                initial={{ opacity: 0, x: -28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, ease, delay: i * 0.1 }}
              >
                {activeIdx === i && (
                  <motion.span
                    layoutId="edu-indicator"
                    className="edu-item__bar"
                    transition={{ type: 'spring', stiffness: 380, damping: 34 }}
                  />
                )}
                <span className="icon-tile edu-item__icon">
                  <i className={`bx ${s.icon}`} />
                </span>
                <div className="edu-item__body">
                  <span className="edu-item__type">{s.type}</span>
                  <h3 className="edu-item__name">{s.name}</h3>
                  <p className="edu-item__degree">{s.degree}</p>
                  <div className="edu-item__meta">
                    <span><i className="bx bx-calendar" /> {s.year}</span>
                    <span><i className="bx bx-map-pin" /> {s.location}</span>
                  </div>
                </div>
              </Spotlight>
            ))}
          </div>

          <Reveal className="edu__showcase" delay={0.15}>
            <div className="edu__frame">
              <AnimatePresence initial={false}>
                <motion.img
                  key={activeIdx}
                  src={active.img}
                  alt={active.name}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease }}
                />
              </AnimatePresence>

              <div className="edu__caption">
                <span className="edu__caption-icon">
                  <i className={`bx ${active.icon}`} />
                </span>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={activeIdx}
                    className="edu__caption-text"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease }}
                  >
                    <strong>{active.name}</strong>
                    <small>{active.year}</small>
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
