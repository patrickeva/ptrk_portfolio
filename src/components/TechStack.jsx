import {
  SiReact, SiVite, SiSupabase, SiFirebase, SiTailwindcss,
  SiTypescript, SiPython, SiNodedotjs, SiTensorflow, SiDjango,
  SiGit, SiPostgresql,
} from 'react-icons/si';
import { Marquee, Reveal } from './ui';
import Icon from './Icon';

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

const half = Math.ceil(techStack.length / 2);
const rows = [techStack.slice(0, half), techStack.slice(half)];

function TechPill({ item }) {
  return (
    <div className="tech-pill" style={{ '--brand': item.color }}>
      <item.Icon className="tech-pill__icon" />
      <span>{item.name}</span>
    </div>
  );
}

export default function TechStack() {
  return (
    <Reveal className="stack">
      <p className="subhead subhead--center">
        <Icon name="layers" /> Tech Stack
      </p>
      <div className="stack__rows">
        {rows.map((row, i) => (
          <Marquee key={i} speed={0.45} reverse={i === 1}>
            {row.map((item) => (
              <TechPill key={item.name} item={item} />
            ))}
          </Marquee>
        ))}
      </div>
    </Reveal>
  );
}
