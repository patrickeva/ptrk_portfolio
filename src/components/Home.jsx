import { useState } from "react";
import { motion } from "framer-motion";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
});

const fadeLeft = (delay = 0) => ({
  initial: { opacity: 0, x: -36 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
});

const fadeRight = (delay = 0) => ({
  initial: { opacity: 0, x: 36 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
});

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
      {/* Left: content */}
      <motion.div className="home-content" {...fadeLeft(0.1)}>
        <motion.h1 {...fadeUp(0.15)}>PATRICK EVA</motion.h1>

        <motion.p className="home-degree" {...fadeUp(0.28)}>
          Bachelor of Science in Computer Science
        </motion.p>

        {/* Details */}
        <motion.ul className="home-details" {...fadeUp(0.38)}>
          <li>
            <span className="home-details-icon">
              <i className="bx bx-code-alt" />
            </span>
            <span>Web Developer &nbsp;||&nbsp; Software Engineer</span>
          </li>
          <li>
            <span className="home-details-icon">
              <i className="bx bx-envelope" />
            </span>
            <span>patrickramoseva@gmail.com</span>
          </li>
          <li>
            <span className="home-details-icon">
              <i className="bx bx-map" />
            </span>
            <span>Cuenca, Batangas</span>
          </li>
        </motion.ul>

        <motion.div className="home-buttons" {...fadeUp(0.52)}>
          <a
            href="/cv/Patrick_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            <i className="bx bx-file" style={{ marginRight: "0.5rem" }} />
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
        </motion.div>

        {/* Toast */}
        <div className={`home-copy-toast${copied ? " home-copy-toast--show" : ""}`}>
          <i className="bx bx-check-circle" />
          patrickramoseva@gmail.com copied!
        </div>
      </motion.div>

      {/* Right: profile image */}
      <motion.div className="about-img" {...fadeRight(0.25)}>
        <img src="/images/pp.jpg" alt="Patrick Eva" />
      </motion.div>
    </section>
  );
}
