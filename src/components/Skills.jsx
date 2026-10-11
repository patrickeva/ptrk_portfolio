import TechStack from "./TechStack";
import { SectionHeading, Spotlight, ease } from "./ui";
import { Icon3D } from "./Icon";

const skillGroups = [
  {
    icon: "desktop_computer",
    title: "Frontend Development",
    description: "Responsive, accessible interfaces built with modern tooling.",
    skills: ["React", "JavaScript", "HTML & CSS", "Tailwind CSS"],
  },
  {
    icon: "card_file_box",
    title: "Backend & Databases",
    description: "APIs, data models, and full-stack systems that scale.",
    skills: ["Node.js", "PostgreSQL", "Supabase", "Firebase"],
  },
  {
    icon: "brain",
    title: "Python & Machine Learning",
    description: "Automation, data processing, and applied ML models.",
    skills: ["Python", "TensorFlow", "CNN", "KNN"],
  },
  {
    icon: "toolbox",
    title: "Tools & Workflow",
    description: "Version control, builds, and shipping to production.",
    skills: ["Git & GitHub", "Vite", "Deployment", "Problem Solving"],
  },
];

export default function Skills() {
  return (
    <section className="section skills" id="skills">
      <div className="container">
        <SectionHeading
          index="04"
          eyebrow="What I work with"
          title="Skills &"
          accent="Expertise"
          subtitle="The technologies and practices I use to design, build, and ship modern web applications."
        />

        <div className="skills__grid">
          {skillGroups.map((group, i) => (
            <Spotlight
              as="article"
              key={group.title}
              className="skill-card"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease, delay: (i % 2) * 0.1 }}
            >
              <span className="skill-card__num">{String(i + 1).padStart(2, "0")}</span>
              <div className="skill-card__top">
                <span className="icon-tile">
                  <Icon3D name={group.icon} />
                </span>
                <h3>{group.title}</h3>
              </div>
              <p className="skill-card__desc">{group.description}</p>
              <div className="tags">
                {group.skills.map((s) => (
                  <span key={s} className="tag">{s}</span>
                ))}
              </div>
            </Spotlight>
          ))}
        </div>
      </div>

      <TechStack />
    </section>
  );
}
