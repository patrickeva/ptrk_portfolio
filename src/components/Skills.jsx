import { motion } from "framer-motion";
import TechStack from "./TechStack";

const skillGroups = [
  {
    icon: "bx-code-alt",
    title: "Web Development",
    description:
      "Building responsive and user-focused websites and web applications.",
    skills: [
      "HTML & CSS",
      "JavaScript",
      "React",
      "Responsive Design",
      "UI Implementation",
    ],
  },
  {
    icon: "bx-server",
    title: "System Development",
    description:
      "Developing practical systems focused on functionality, usability, and maintainability.",
    skills: [
      "Frontend Development",
      "Backend Development",
      "Database Integration",
      "API Integration",
      "CRUD Systems",
    ],
  },
  {
    icon: "bxl-python",
    title: "Python Development",
    description:
      "Using Python for application development, automation, data processing, and technical projects.",
    skills: [
      "Python",
      "Data Processing",
      "Automation",
      "Problem Solving",
      "Basic Data Analysis",
    ],
  },
  {
    icon: "bx-data",
    title: "Database & Tools",
    description:
      "Working with development tools and databases used in modern software projects.",
    skills: [
      "PostgreSQL",
      "Supabase",
      "Git & GitHub",
      "Vite",
      "Firebase",
    ],
  },
  {
    icon: "bx-brain",
    title: "Machine Learning",
    description:
      "Foundational experience applying machine learning concepts to academic and project-based work.",
    skills: [
      "KNN",
      "Classification",
      "CNN Fundamentals",
      "Model Evaluation",
      "Data Preparation",
    ],
  },
  {
    icon: "bx-layer",
    title: "Development Practices",
    description:
      "Applying practical development workflows to create organized and maintainable projects.",
    skills: [
      "Version Control",
      "Component-Based Development",
      "Responsive Design",
      "Problem Solving",
      "Project Deployment",
    ],
  },
];

function SkillCard({ skill, index }) {
  return (
    <motion.article
      className="skill-card"
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -5 }}
    >
      <div className="skill-card-top">
        <div className="skill-icon-wrap">
          <i className={`bx ${skill.icon}`} />
        </div>

        <span className="skill-number">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="skill-card-content">
        <h3>{skill.title}</h3>
        <p>{skill.description}</p>
      </div>

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
      <div className="skills-header">
        <motion.span
          className="section-label"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          WHAT I WORK WITH
        </motion.span>

        <motion.h2
          className="heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Skills & <span>Expertise</span>
        </motion.h2>

        <motion.p
          className="skills-intro"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          A practical set of technologies and development skills I use to
          build modern websites, systems, and software projects.
        </motion.p>
      </div>

      <div className="skills-grid">
        {skillGroups.map((skill, index) => (
          <SkillCard
            key={skill.title}
            skill={skill}
            index={index}
          />
        ))}
      </div>

      <motion.div
        className="tech-stack-heading"
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span className="section-label">TOOLS & TECHNOLOGIES</span>
      </motion.div>

      <TechStack />
    </section>
  );
}