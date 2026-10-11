import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Magnetic, ease } from "./ui";
import Icon from "./Icon";

const EMAIL = "patrickramoseva@gmail.com";
const SUBJECT = "Hello Patrick — let's connect";
const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent(SUBJECT)}`;
const GMAIL_COMPOSE = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}&su=${encodeURIComponent(SUBJECT)}`;

const details = [
  { icon: "code", text: "Freelance Web & Software Developer" },
];

const roles = ["web applications", "full-stack systems", "machine learning solutions"];

const content = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};

const nameLine = {
  hidden: {},
  show: { transition: { staggerChildren: 0.035 } },
};

const char = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 1, ease } },
};

function SplitChars({ text }) {
  return text.split("").map((c, i) => (
    <span className="char-mask" key={i}>
      <motion.span className="char" variants={char}>
        {c}
      </motion.span>
    </span>
  ));
}

export default function Home({ ready, navigateTo }) {
  const [roleIdx, setRoleIdx] = useState(0);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 18 });

  useEffect(() => {
    const t = setInterval(() => setRoleIdx((i) => (i + 1) % roles.length), 2800);
    return () => clearInterval(t);
  }, []);

  // Desktops rarely have a mail app wired to mailto:, so open Gmail's composer there instead.
  const handleContactClick = (e) => {
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      e.preventDefault();
      window.open(GMAIL_COMPOSE, "_blank", "noopener,noreferrer");
    }
  };

  const handleTilt = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const resetTilt = () => {
    mx.set(0);
    my.set(0);
  };

  const state = ready ? "show" : "hidden";

  return (
    <section className="hero" id="home">
      <div className="container hero__grid">
        <motion.div className="hero__content" variants={content} initial="hidden" animate={state}>

          <h1 className="hero__name" aria-label="Patrick Eva">
            <motion.span className="hero__name-line" variants={nameLine} aria-hidden="true">
              <SplitChars text="Patrick" />
            </motion.span>
            <span className="hero__name-line" aria-hidden="true">
              <span className="char-mask">
                <motion.span className="char gradient-text" variants={char}>
                  Eva
                </motion.span>
              </span>
            </span>
          </h1>

          <motion.p className="hero__role" variants={item}>
            I build
            <span className="hero__rotator">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={roleIdx}
                  className="gradient-text"
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.6, ease }}
                >
                  {roles[roleIdx]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.p>

          <motion.p className="hero__degree" variants={item}>
            <Icon name="graduation" />
            Bachelor of Science in Computer Science
          </motion.p>

          <motion.ul className="hero__details" variants={item}>
            {details.map((d) => (
              <li key={d.text}>
                <Icon name={d.icon} />
                <span>{d.text}</span>
              </li>
            ))}
          </motion.ul>

          <motion.div className="hero__actions" variants={item}>
            <Magnetic>
              <a
                href="#services"
                className="btn btn--primary btn--lg"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo("services");
                }}
              >
                <Icon name="briefcase" />
                View Services
              </a>
            </Magnetic>

            <Magnetic>
              <a href={MAILTO} className="btn btn--ghost btn--lg" onClick={handleContactClick}>
                <Icon name="mail" /> Let's Talk
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero__visual"
          onMouseMove={handleTilt}
          onMouseLeave={resetTilt}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
          transition={{ duration: 1.2, ease, delay: 0.35 }}
        >
          <motion.div className="hero__portrait" style={{ rotateX, rotateY }}>
            <div className="hero__portrait-glow" />
            <motion.div
              className="hero__portrait-back"
              initial={{ rotate: 0, x: 0, y: 0, opacity: 0 }}
              animate={ready ? { rotate: 6, x: 22, y: 12, opacity: 1 } : {}}
              transition={{ duration: 1.2, ease, delay: 0.7 }}
            />
            <div className="hero__portrait-dots hero__portrait-dots--tr" />
            <div className="hero__portrait-dots hero__portrait-dots--bl" />
            <div className="hero__portrait-ring" />
            <div className="hero__portrait-frame">
              <img src="/images/pp.jpg" alt="Patrick Eva" />
              <motion.div
                className="hero__portrait-caption"
                initial={{ opacity: 0, y: 16 }}
                animate={ready ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease, delay: 1.1 }}
              >
                <span>
                  <strong>Patrick Eva</strong>
                  <small>
                    <span className="hero__portrait-status" />
                    Cuenca, Batangas
                  </small>
                </span>
                <span className="hero__portrait-caption-icon">
                  <Icon name="code" />
                </span>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.button
        type="button"
        className="hero__scroll"
        onClick={() => navigateTo("about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        aria-label="Scroll to About section"
      >
        <span className="hero__mouse" />
        Scroll
      </motion.button>

    </section>
  );
}
