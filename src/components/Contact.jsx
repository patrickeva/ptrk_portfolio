import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CountUp, Magnetic, Reveal, SectionHeading, Spotlight, ease } from "./ui";

const socialLinks = [
  { id: "github",   label: "GitHub",   icon: "bxl-github",          url: "https://github.com/patrickeva",            color: "#24292f" },
  { id: "linkedin", label: "LinkedIn", icon: "bxl-linkedin-square", url: "https://www.linkedin.com/in/patrickeva/", color: "#0a66c2" },
  { id: "facebook", label: "Facebook", icon: "bxl-facebook-square", url: "https://www.facebook.com/ptrkrmseva",     color: "#1877f2" },
];

function GitHubStats({ username }) {
  const [user, setUser] = useState(null);
  const [commits, setCommits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function fetchStats() {
      try {
        const [userRes, eventsRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/events/public?per_page=100`),
        ]);
        if (!userRes.ok) throw new Error("GitHub request failed");
        const userData = await userRes.json();
        const eventsData = await eventsRes.json();
        const pushCommits = Array.isArray(eventsData)
          ? eventsData
              .filter((e) => e.type === "PushEvent")
              // GitHub no longer includes commit lists in public events; count a push as one commit then.
              .reduce((sum, e) => sum + (e.payload?.commits?.length || e.payload?.size || 1), 0)
          : 0;
        if (cancelled) return;
        setUser(userData);
        setCommits(pushCommits);
      } catch {
        if (!cancelled) setError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchStats();
    return () => { cancelled = true; };
  }, [username]);

  const stats = user
    ? [
        { label: "Repos",     value: user.public_repos ?? "–",                  icon: "bx bx-book-content" },
        { label: "Commits",   value: commits !== null ? `${commits}+` : "–",    icon: "bx bx-git-commit" },
        { label: "Followers", value: user.followers ?? "–",                     icon: "bx bx-user-check" },
        { label: "Following", value: user.following ?? "–",                     icon: "bx bx-user-plus" },
      ]
    : [];

  return (
    <Spotlight
      className="gh"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease }}
    >
      <div className="gh__head">
        <h3 className="gh__title">
          <i className="bx bxl-github" /> GitHub Stats
        </h3>
        {user && (
          <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="gh__profile">
            <img src={user.avatar_url} alt={user.login} />
            <span>
              <strong>@{user.login}</strong>
              <small>View profile →</small>
            </span>
          </a>
        )}
      </div>

      {error && <p className="gh__error">Could not load GitHub stats.</p>}

      {!error && (
        <div className="gh__grid">
          {loading
            ? Array.from({ length: 4 }, (_, i) => <div key={i} className="gh-stat gh-stat--skeleton" />)
            : stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  className="gh-stat"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease, delay: i * 0.08 }}
                >
                  <i className={s.icon} />
                  <span className="gh-stat__value"><CountUp value={s.value} /></span>
                  <span className="gh-stat__label">{s.label}</span>
                </motion.div>
              ))}
        </div>
      )}
    </Spotlight>
  );
}

export default function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="container">
        <SectionHeading index="05" eyebrow="Get in touch" title="My" accent="Socials" />

        <Reveal className="card contact__panel">
          <div className="contact__glow" aria-hidden="true" />
          <h3 className="contact__title">
            Let's build something <span className="gradient-text nowrap">great together.</span>
          </h3>
          <p className="contact__text">
            Have a project in mind, an opportunity, or just want to say hi? Reach out on any of my socials.
          </p>

          <div className="socials">
            {socialLinks.map((s) => (
              <Magnetic key={s.id} strength={0.2}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social"
                  style={{ "--brand": s.color }}
                  aria-label={s.label}
                >
                  <i className={`bx ${s.icon}`} />
                  {s.label}
                </a>
              </Magnetic>
            ))}
          </div>
        </Reveal>

        <GitHubStats username="patrickeva" />
      </div>
    </section>
  );
}
