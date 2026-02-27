import { useState } from "react";

export default function Home() {
  const [copied, setCopied] = useState(false);

  const handleContactClick = async (e) => {
    e.preventDefault();
    const email = "patrickramoseva@gmail.com";
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // fallback for older browsers
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
        <p>Bachelor of Science in Computer Science</p>

        <div className="social-media">
          <a href="https://www.facebook.com/ptrkrmseva/">
            <i className="bx bxl-facebook"></i>
          </a>
          <a href="https://www.instagram.com/_ptrkeva/">
            <i className="bx bxl-instagram-alt"></i>
          </a>
          <a href="https://www.linkedin.com/in/patrick-eva-a8b249364/">
            <i className="bx bxl-linkedin"></i>
          </a>
        </div>

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