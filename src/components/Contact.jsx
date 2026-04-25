import { useState } from "react";
import { motion } from "framer-motion";

const socialLinks = [
  { id: "github",   label: "GitHub",   icon: "bxl-github",           url: "https://github.com/patrickeva",                     color: "#060606" },
  { id: "linkedin", label: "LinkedIn", icon: "bxl-linkedin-square",  url: "https://www.linkedin.com/in/patrickeva/",            color: "#0a66c2" },
  { id: "facebook", label: "Facebook", icon: "bxl-facebook-square",  url: "https://www.facebook.com/ptrkrmseva",               color: "#1877f2" },
];

function GitHubStats({ username }) {
  const [user, setUser]       = useState(null);
  const [commits, setCommits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(false);

  useState(() => {
    async function fetchStats() {
      try {
        const [userRes, eventsRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/events/public?per_page=100`),
        ]);
        const userData   = await userRes.json();
        const eventsData = await eventsRes.json();
        const pushCommits = Array.isArray(eventsData)
          ? eventsData.filter((e) => e.type === "PushEvent")
              .reduce((sum, e) => sum + (e.payload?.commits?.length || 0), 0)
          : 0;
        setUser(userData);
        setCommits(pushCommits);
      } catch { setError(true); }
      finally  { setLoading(false); }
    }
    fetchStats();
  }, []);

  const stats = user ? [
    { label: "Repos",     value: user.public_repos ?? "–", icon: "bx bx-book-content" },
    { label: "Commits",   value: commits !== null ? `${commits}+` : "–", icon: "bx bx-git-commit" },
    { label: "Followers", value: user.followers ?? "–", icon: "bx bx-user-check" },
    { label: "Following", value: user.following ?? "–", icon: "bx bx-user-plus" },
  ] : [];

  return (
    <motion.div
      className="gh-stats-wrapper"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
    >
      <h3 className="gh-stats-heading">
        <i className="bx bxl-github" /> GitHub Stats
      </h3>
      {loading && <p className="gh-loading">Loading stats…</p>}
      {error   && <p className="gh-error">Could not load GitHub stats.</p>}
      {!loading && !error && user && (
        <div className="gh-stats-grid">
          <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="gh-profile-card">
            <img src={user.avatar_url} alt={user.login} className="gh-avatar" />
            <div className="gh-profile-info">
              <span className="gh-username">@{user.login}</span>
              <span className="gh-view">View profile →</span>
            </div>
          </a>
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="gh-stat-card"
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
              whileHover={{ y: -4, scale: 1.04 }}
            >
              <i className={s.icon} />
              <span className="gh-stat-value">{s.value}</span>
              <span className="gh-stat-label">{s.label}</span>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

function SocialBar() {
  return (
    <motion.div
      className="social-bar"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
    >
      {socialLinks.map((s, i) => (
        <motion.a
          key={s.id}
          href={s.url}
          target="_blank"
          rel="noopener noreferrer"
          className="social-bar__btn"
          aria-label={s.label}
          title={s.label}
          style={{ "--brand": s.color }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.3 + i * 0.1 }}
          whileHover={{ scale: 1.06, y: -4 }}
          whileTap={{ scale: 0.96 }}
        >
          <i className={`bx ${s.icon}`} />
          <span>{s.label}</span>
        </motion.a>
      ))}
    </motion.div>
  );
}

function CopyEmail({ email }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const el = document.createElement("textarea");
      el.value = email;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <motion.div
      className="copy-email-wrapper"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
    >
      <p className="copy-email-label">Get in touch</p>
      <div className="copy-email-box">
        <i className="bx bx-envelope copy-email-icon" />
        <span className="copy-email-text">{email}</span>
        <button
          className={`copy-email-btn${copied ? " copy-email-btn--copied" : ""}`}
          onClick={handleCopy}
          aria-label="Copy email"
        >
          {copied
            ? <><i className="bx bx-check" /> Copied!</>
            : <><i className="bx bx-copy" /> Copy</>
          }
        </button>
      </div>
      {copied && <p className="copy-email-confirm">✅ Email copied to clipboard!</p>}
    </motion.div>
  );
}

export default function Contact() {
  return (
    <section className="contact" id="contact">
      <motion.h2
        className="heading"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        My <span>Socials</span>
      </motion.h2>

      <GitHubStats username="patrickeva" />
      <SocialBar />
      <CopyEmail email="patrickramoseva@gmail.com" />
    </section>
  );
}
