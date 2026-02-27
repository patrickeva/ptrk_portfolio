import { useState } from "react";

// ── Social Links Data ───────────────────────────────────────
const socialLinks = [
  {
    id: "github",
    label: "GitHub",
    icon: "bxl-github",
    url: "https://github.com/patrickeva",
    color: "#24292e",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    icon: "bxl-linkedin-square",
    url: "https://www.linkedin.com/in/patrickeva/",
    color: "#0a66c2",
  },
  {
    id: "facebook",
    label: "Facebook",
    icon: "bxl-facebook-square",
    url: "https://www.facebook.com/ptrkrmseva",   
    color: "#1877f2",
  },
];

// ── GitHub Stats Component ──────────────────────────────────
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
          ? eventsData
              .filter((e) => e.type === "PushEvent")
              .reduce((sum, e) => sum + (e.payload?.commits?.length || 0), 0)
          : 0;

        setUser(userData);
        setCommits(pushCommits);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
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
    <div className="gh-stats-wrapper">
      <h3 className="gh-stats-heading">
        <i className="bx bxl-github" /> GitHub Stats
      </h3>

      {loading && <p className="gh-loading">Loading stats…</p>}
      {error   && <p className="gh-error">Could not load GitHub stats.</p>}

      {!loading && !error && user && (
        <div className="gh-stats-grid">
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="gh-profile-card"
          >
            <img src={user.avatar_url} alt={user.login} className="gh-avatar" />
            <div className="gh-profile-info">
              <span className="gh-username">@{user.login}</span>
              <span className="gh-view">View profile →</span>
            </div>
          </a>

          {stats.map((s) => (
            <div key={s.label} className="gh-stat-card">
              <i className={s.icon} />
              <span className="gh-stat-value">{s.value}</span>
              <span className="gh-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Social Links Bar ────────────────────────────────────────
function SocialBar() {
  return (
    <div className="social-bar">
      {socialLinks.map((s) => (
        <a
          key={s.id}
          href={s.url}
          target="_blank"
          rel="noopener noreferrer"
          className="social-bar__btn"
          aria-label={s.label}
          title={s.label}
          style={{ "--brand": s.color }}
        >
          <i className={`bx ${s.icon}`} />
          <span>{s.label}</span>
        </a>
      ))}
    </div>
  );
}

// ── Copy to Clipboard Email ─────────────────────────────────
function CopyEmail({ email }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const el = document.createElement("textarea");
      el.value = email;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="copy-email-wrapper">
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
      {copied && (
        <p className="copy-email-confirm">
          ✅ Email copied to clipboard!
        </p>
      )}
    </div>
  );
}

// ── Contact Section ─────────────────────────────────────────
export default function Contact() {
  return (
    <section className="contact" id="contact">
      <h2 className="heading">My <span>Experience</span></h2>

      {/* GitHub Stats */}
      <GitHubStats username="patrickeva" />

      {/* ── Social Links — between GitHub Stats and email ── */}
      <SocialBar />

      {/* Copy Email */}
      <CopyEmail email="patrickramoseva@gmail.com" />
    </section>
  );
}