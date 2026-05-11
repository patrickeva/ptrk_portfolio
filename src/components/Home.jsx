import { useState } from "react";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

const fadeUp   = (delay = 0) => ({ initial: { opacity: 0, y: 32 },  animate: { opacity: 1, y: 0 },  transition: { duration: 0.65, ease, delay } });
const fadeLeft = (delay = 0) => ({ initial: { opacity: 0, x: -44 }, animate: { opacity: 1, x: 0 },  transition: { duration: 0.7,  ease, delay } });
const fadeRight= (delay = 0) => ({ initial: { opacity: 0, x: 44 },  animate: { opacity: 1, x: 0 },  transition: { duration: 0.7,  ease, delay } });

const details = [
  { icon: "bx bx-code-alt",  text: "Web Developer  ·  Software Engineer" },
  { icon: "bx bx-envelope",  text: "patrickramoseva@gmail.com" },
  { icon: "bx bx-map",       text: "Cuenca, Batangas" },
];

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

      {/* ── LEFT: text content ── */}
      <motion.div className="home-content" {...fadeLeft(0.08)}>

        {/* Available badge */}
        <motion.div
          className="home-available-badge"
          initial={{ opacity: 0, scale: 0.7, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, type: "spring", stiffness: 280, damping: 20 }}
        >
          <span className="home-available-dot" />
          Available for opportunities
        </motion.div>

        {/* Name */}
        <motion.h1 {...fadeUp(0.18)}>PATRICK EVA</motion.h1>

        {/* Degree */}
        <motion.p className="home-degree" {...fadeUp(0.28)}>
          Bachelor of Science in Computer Science
        </motion.p>

        {/* Detail list */}
        <motion.ul className="home-details" {...fadeUp(0.38)}>
          {details.map((d, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.4 + i * 0.08 }}
            >
              <span className="home-details-icon"><i className={d.icon} /></span>
              <span>{d.text}</span>
            </motion.li>
          ))}
        </motion.ul>

        {/* CTA buttons */}
        <motion.div className="home-buttons" {...fadeUp(0.58)}>
          <motion.a
            href="/cv/Patrick_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--primary"
            whileHover={{ scale: 1.04, y: -3 }}
            whileTap={{ scale: 0.97 }}
          >
            <i className="bx bx-file" />
            View Resume
          </motion.a>

          <motion.button
            className={`btn btn--outline home-contact-btn${copied ? " home-contact-btn--copied" : ""}`}
            onClick={handleContactClick}
            whileHover={{ scale: 1.04, y: -3 }}
            whileTap={{ scale: 0.97 }}
          >
            {copied
              ? <><i className="bx bx-check" /> Copied!</>
              : <><i className="bx bx-envelope" /> Contact Me</>}
          </motion.button>
        </motion.div>

        {/* Toast */}
        <div className={`home-copy-toast${copied ? " home-copy-toast--show" : ""}`}>
          <i className="bx bx-check-circle" />
          patrickramoseva@gmail.com copied!
        </div>
      </motion.div>

      {/* ── RIGHT: profile image ── */}
      <motion.div className="about-img" {...fadeRight(0.22)}>
        <img src="/images/pp.jpg" alt="Patrick Eva" />
      </motion.div>

    </section>
  );
}
