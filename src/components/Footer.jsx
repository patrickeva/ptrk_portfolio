import Icon from "./Icon";
import Brand from "./Brand";

const EMAIL = "patrickramoseva@gmail.com";

const socials = [
  { label: "GitHub",   icon: "github",   url: "https://github.com/patrickeva" },
  { label: "LinkedIn", icon: "linkedin", url: "https://www.linkedin.com/in/patrickeva/" },
  { label: "Facebook", icon: "facebook", url: "https://www.facebook.com/ptrkrmseva" },
];

const columns = [
  {
    title: "Services",
    links: [
      { label: "Web Applications", href: "#services" },
      { label: "Mobile Apps", href: "#services" },
      { label: "Tracking Systems", href: "#services" },
      { label: "LGU & Records Systems", href: "#services" },
      { label: "AI & Machine Learning", href: "#services" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "About", href: "#about" },
      { label: "Selected Work", href: "#projects" },
      { label: "Skills & Stack", href: "#skills" },
      { label: "Start a Project", href: "#contact" },
    ],
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Brand />
            <p className="footer__tagline">
              Freelance software studio building web apps, mobile apps, tracking systems, and AI
              solutions for businesses and LGUs.
            </p>
            <span className="footer__status">
              <span className="hero__badge-dot" aria-hidden="true" />
              Available for new projects
            </span>
          </div>

          {columns.map((col) => (
            <nav key={col.title} className="footer__col" aria-label={col.title}>
              <h4>{col.title}</h4>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="footer__col">
            <h4>Contact</h4>
            <ul>
              <li>
                <a href={`mailto:${EMAIL}`} className="footer__contact">
                  <Icon name="mail" /> {EMAIL}
                </a>
              </li>
              <li className="footer__contact">
                <Icon name="map-pin" /> Cuenca, Batangas, PH
              </li>
              <li>
                <a href="/cv/Eva_Resume.pdf" target="_blank" rel="noopener noreferrer" className="footer__contact">
                  <Icon name="file" /> Résumé (PDF)
                </a>
              </li>
            </ul>
            <div className="footer__socials">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-btn"
                  aria-label={s.label}
                  title={s.label}
                >
                  <Icon name={s.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p>
            © {year} <strong>PREtech</strong>. All rights reserved. · Built by Patrick Eva
          </p>
          <a href="#home" className="footer__top-link">
            Back to top <Icon name="arrow-up" />
          </a>
        </div>
      </div>
    </footer>
  );
}
