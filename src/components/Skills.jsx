import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import TechStack from "./TechStack";

const skillData = [
  { name: "HTML & CSS",           level: 70, icon: "bxl-html5",    color: "#e34f26" },
  { name: "JavaScript",           level: 60, icon: "bxl-javascript", color: "#f7df1e" },
  { name: "React",                level: 60, icon: "bxl-react",    color: "#61dafb" },
  { name: "Backend Development",  level: 60, icon: "bx-server",    color: "#0ea5e9" },
  { name: "Python",               level: 70, icon: "bxl-python",   color: "#3776ab" },
  { name: "Machine Learning",     level: 70, icon: "bx-brain",     color: "#8b5cf6" },
];

function SkillCard({ skill, index }) {
  const ref    = useRef(null);
  const [filled, setFilled] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          setFilled(true);
        }
      },
      { threshold: 0.25 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      className="skill-card"
      style={{ "--accent": skill.color, animationDelay: `${index * 0.08}s` }}
      initial={{ opacity: 0, y: 30 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.07 }}
      whileHover={{ scale: 1.02 }}
    >
      {/* Icon bubble */}
      <div className="skill-icon-wrap">
        <i className={`bx ${skill.icon} skill-icon`} />
      </div>

      {/* Text + bar */}
      <div className="skill-info">
        <div className="skill-header">
          <span className="skill-name">{skill.name}</span>
          <span className="skill-percent">{skill.level}%</span>
        </div>

        <div className="skill-track">
          <div
            className="skill-fill"
            style={{ width: filled ? `${skill.level}%` : "0%" }}
          />
          <div
            className="skill-dot"
            style={{ left: filled ? `${skill.level}%` : "0%" }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section className="skills" id="skills">
      <motion.h2
        className="heading"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        Professional <span>Skills</span>
      </motion.h2>

      <div className="skills-grid">
        {skillData.map((skill, i) => (
          <SkillCard key={skill.name} skill={skill} index={i} />
        ))}
      </div>

      {/* Scroll hint — mobile only */}
      <div className="scroll-hint" aria-hidden="true">
        <i className="bx bx-chevron-down" />
        <span>Tech Stack below</span>
        <i className="bx bx-chevron-down" />
      </div>

      <TechStack />
    </section>
  );
}
