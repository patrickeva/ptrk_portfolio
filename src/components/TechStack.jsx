import { useRef, useState } from 'react';
import { motion, useAnimationFrame, useMotionValue } from 'framer-motion';
import {
  SiReact, SiVite, SiSupabase, SiFirebase, SiTailwindcss,
  SiTypescript, SiPython, SiNodedotjs, SiTensorflow, SiDjango,
  SiGit, SiPostgresql,
} from 'react-icons/si';

const techStack = [
  { name: 'React',        Icon: SiReact,       color: '#61DAFB' },
  { name: 'Vite',         Icon: SiVite,        color: '#848cff' },
  { name: 'Supabase',     Icon: SiSupabase,    color: '#3ECF8E' },
  { name: 'Firebase',     Icon: SiFirebase,    color: '#FFA000' },
  { name: 'Tailwind CSS', Icon: SiTailwindcss, color: '#06B6D4' },
  { name: 'TypeScript',   Icon: SiTypescript,  color: '#3B82F6' },
  { name: 'Python',       Icon: SiPython,      color: '#60A5FA' },
  { name: 'Node.js',      Icon: SiNodedotjs,   color: '#6CC24A' },
  { name: 'TensorFlow',   Icon: SiTensorflow,  color: '#FF6F00' },
  { name: 'Django',       Icon: SiDjango,      color: '#44B78B' },
  { name: 'Git',          Icon: SiGit,         color: '#F05032' },
  { name: 'PostgreSQL',   Icon: SiPostgresql,  color: '#7B9FE0' },
];

function TechCard({ item }) {
  return (
    <motion.div
      className="tech-card"
      whileHover={{ y: -8, scale: 1.07 }}
      transition={{ type: 'spring', stiffness: 350, damping: 22 }}
    >
      <div className="tech-card__icon" style={{ color: item.color }}>
        <item.Icon size={34} />
      </div>
      <span className="tech-card__name">{item.name}</span>
    </motion.div>
  );
}

function InfiniteMarquee({ items, speed = 0.55 }) {
  const trackRef = useRef(null);
  const x = useMotionValue(0);
  const [paused, setPaused] = useState(false);

  useAnimationFrame((_, delta) => {
    if (paused || !trackRef.current) return;
    const halfWidth = trackRef.current.scrollWidth / 2;
    const next = x.get() - speed * (delta / 16.667);
    x.set(next <= -halfWidth ? 0 : next);
  });

  return (
    <div
      className="tech-marquee-viewport"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div
        ref={trackRef}
        className="tech-marquee-track"
        style={{ x }}
      >
        {[...items, ...items].map((item, i) => (
          <TechCard key={i} item={item} />
        ))}
      </motion.div>
    </div>
  );
}

export default function TechStack() {
  return (
    <motion.div
      className="tech-stack-section"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="tech-stack-eyebrow">Tech Stack</p>
      <div className="tech-marquee-wrapper">
        <div className="tech-marquee-fade tech-marquee-fade--left" />
        <InfiniteMarquee items={techStack} />
        <div className="tech-marquee-fade tech-marquee-fade--right" />
      </div>
    </motion.div>
  );
}
