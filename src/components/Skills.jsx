import { motion } from "framer-motion";
import TechStack from "./TechStack";

const skillGroups = [
  {
    icon: "bx-code-alt",
    title: "Frontend Development",
    description: "Responsive, accessible interfaces built with modern tooling.",
    skills: ["React", "JavaScript", "HTML & CSS", "Tailwind CSS"],
  },
  {
    icon: "bx-server",
    title: "Backend & Databases",
    description: "APIs, data models, and full-stack systems that scale.",
    skills: ["Node.js", "PostgreSQL", "Supabase", "Firebase"],
  },
  {
    icon: "bx-brain",
    title: "Python & Machine Learning",
    description: "Automation, data processing, and applied ML models.",
    skills: ["Python", "TensorFlow", "CNN", "KNN"],
  },
  {
    icon: "bx-git-branch",
    title: "Tools & Workflow",
    description: "Version control, builds, and shipping to production.",
    skills: ["Git & GitHub", "Vite", "Deployment", "Problem Solving"],
  },
];

function SkillCard({ skill, index }) {
  return (
    <motion.article
      className="skill-card"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="skill-card-top">
        <div className="skill-icon-wrap">
          <i className={`bx ${skill.icon}`} />
        </div>
        <h3>{skill.title}</h3>
      </div>

      <p className="skill-card-desc">{skill.description}</p>

      <div className="skill-list">
        {skill.skills.map((item) => (
          <span key={item} className="skill-tag">
            {item}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

export default function Skills() {
  return (
    <section className="skills" id="skills">
      <motion.div
        className="skills-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span className="section-label">WHAT I WORK WITH</span>
        <h2 className="heading">
          Skills & <span>Expertise</span>
        </h2>
        <p className="skills-intro">
          The technologies and practices I use to design, build, and ship
          modern web applications.
        </p>
      </motion.div>

      <div className="skills-grid">
        {skillGroups.map((skill, index) => (
          <SkillCard key={skill.title} skill={skill} index={index} />
        ))}
      </div>

      <TechStack />
    </section>
  );
}
