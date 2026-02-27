import { useEffect, useRef, useState } from "react";

const skillData = [
  { name: "HTML & CSS",           level: 70, icon: "bxl-html5",    color: "#e34f26" },
  { name: "JavaScript",           level: 60, icon: "bxl-javascript", color: "#f7df1e" },
  { name: "React",                level: 60, icon: "bxl-react",    color: "#61dafb" },
  { name: "Backend Development",  level: 60, icon: "bx-server",    color: "#0ea5e9" },
  { name: "Python",               level: 70, icon: "bxl-python",   color: "#3776ab" },
  { name: "Machine Learning",     level: 70, icon: "bx-brain",     color: "#8b5cf6" },
];

// Animate bar only when card scrolls into view
function SkillCard({ skill, index }) {
  const ref = useRef(null);
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setFilled(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="skill-card"
      style={{
        "--accent": skill.color,
        animationDelay: `${index * 0.08}s`,
      }}
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

        {/* Track */}
        <div className="skill-track">
          {/* Glow fill */}
          <div
            className="skill-fill"
            style={{ width: filled ? `${skill.level}%` : "0%" }}
          />
          {/* Dot marker */}
          <div
            className="skill-dot"
            style={{ left: filled ? `${skill.level}%` : "0%" }}
          />
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section className="skills" id="skills">
      <h2 className="heading">
        Professional <span>Skills</span>
      </h2>

      <div className="skills-grid">
        {skillData.map((skill, i) => (
          <SkillCard key={skill.name} skill={skill} index={i} />
        ))}
      </div>
    </section>
  );
}