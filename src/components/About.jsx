import { CountUp, Reveal, SectionHeading, Spotlight, ease } from "./ui";
import Icon, { Icon3D } from "./Icon";

const highlights = [
  { icon: "laptop",     label: "Web Developer", value: "Front-end & Full-stack" },
  { icon: "brain",        label: "ML Engineer",   value: "Deep Learning & AI" },
  { icon: "graduation_cap",  label: "CS Graduate",   value: "NU Lipa · 2022–2026" },
  { icon: "round_pushpin",      label: "Location",      value: "Cuenca, Batangas" },
];

const stats = [
  { value: "8+",  label: "Projects Built" },
  { value: "3+",  label: "Years Coding" },
  { value: "10+", label: "Technologies" },
  { value: "2",   label: "ML Models" },
];


export default function About() {
  return (
    <section className="section about" id="about">
      <div className="container">
        <SectionHeading index="01" eyebrow="About" title="About" accent="Me" />

        <div className="about__grid">
          <Reveal className="about__visual">
            <div className="about__photo">
              <img src="/images/aboutP.jpg" alt="Patrick Eva" />
              <div className="about__photo-tag">
                <span>
                  <strong>Patrick Eva</strong>
                  <small>Cuenca, Batangas</small>
                </span>
              </div>
            </div>

            <div className="about__stats">
              {stats.map((s, i) => (
                <Spotlight
                  key={s.label}
                  className="stat"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, ease, delay: 0.1 + i * 0.08 }}
                >
                  <span className="stat__value gradient-text">
                    <CountUp value={s.value} />
                  </span>
                  <span className="stat__label">{s.label}</span>
                </Spotlight>
              ))}
            </div>
          </Reveal>

          <div className="about__content">
            <Reveal className="subhead" y={12}>
              <Icon name="user" /> Who I Am
            </Reveal>

            <Reveal as="p" className="about__lead" delay={0.05}>
              Hi! I'm <strong>Patrick Eva</strong>, a Full-Stack Developer from Cuenca, Batangas
              building clean web apps and practical AI solutions for real-world problems.
            </Reveal>

            <div className="about__highlights">
              {highlights.map((h, i) => (
                <Spotlight
                  key={h.label}
                  className="highlight"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, ease, delay: 0.15 + i * 0.08 }}
                >
                  <span className="icon-tile">
                    <Icon3D name={h.icon} />
                  </span>
                  <span className="highlight__text">
                    <span className="highlight__label">{h.label}</span>
                    <span className="highlight__value">{h.value}</span>
                  </span>
                </Spotlight>
              ))}
            </div>

            <Reveal className="about__cv" delay={0.2}>
              <a href="/cv/Eva_Resume.pdf" target="_blank" rel="noopener noreferrer" className="btn btn--ghost btn--sm">
                <Icon name="download" /> Download CV
              </a>
              <span>For hiring managers &amp; recruiters</span>
            </Reveal>
          </div>
        </div>

      </div>
    </section>
  );
}
