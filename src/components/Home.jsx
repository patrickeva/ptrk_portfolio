import { useState } from "react";

export default function Home() {
  const [copied, setCopied] = useState(false);

  const handleContactClick = async (e) => {
    e.preventDefault();
    const email = "patrickramoseva@gmail.com";
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
    <section className="home site-section" id="home">
      <div className="home-content">
        <h3>Hello, I am</h3>
        <h1>PATRICK EVA</h1>
        <p className="home-degree">Bachelor of Science in Computer Science</p>

        {/* Details — role, email, location */}
        <ul className="home-details">
          <li>
            <span className="home-details-icon">
              <i className="bx bx-code-alt"></i>
            </span>
            <span>Web Developer</span>
          </li>
          <li>
            <span className="home-details-icon">
              <i className="bx bx-envelope"></i>
            </span>
            <span>patrickramoseva@gmail.com</span>
          </li>
          <li>
            <span className="home-details-icon">
              <i className="bx bx-map"></i>
            </span>
            <span>Cuenca, Batangas</span>
          </li>
        </ul>

        <div className="home-buttons">
          <a
            href="/cv/Patrick_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            View Resume
          </a>

          <button
            className={`btn home-contact-btn${copied ? " home-contact-btn--copied" : ""}`}
            onClick={handleContactClick}
          >
            {copied ? (
              <><i className="bx bx-check" /> Copied!</>
            ) : (
              <><i className="bx bx-envelope" /> Contact Me</>
            )}
          </button>
        </div>

        {/* Toast notification */}
        <div className={`home-copy-toast${copied ? " home-copy-toast--show" : ""}`}>
          <i className="bx bx-check-circle" />
          patrickramoseva@gmail.com copied!
        </div>
      </div>

      <div className="about-img">
        <img src="/images/profile.jpeg" alt="Profile" />
      </div>
    </section>
  );
}