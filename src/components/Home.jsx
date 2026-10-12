import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Magnetic, ease } from "./ui";
import Icon from "./Icon";
import Brand from "./Brand";

const EMAIL = "patrickramoseva@gmail.com";
const SUBJECT = "PREtech inquiry — let's talk";
const MAILTO = `mailto:${EMAIL}?subject=${encodeURIComponent(SUBJECT)}`;
const GMAIL_COMPOSE = `https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}&su=${encodeURIComponent(SUBJECT)}`;

const audiences = ["small businesses", "LGUs & offices", "transport cooperatives", "startups"];

const offerings = [
  { icon: "laptop", text: "Web Apps" },
  { icon: "smartphone", text: "Mobile Apps" },
  { icon: "map", text: "Tracking Systems" },
  { icon: "brain", text: "AI Solutions" },
];

// Screens from shipped projects, layered in the hero showcase.
const screens = [
  { src: "/images/franchiseBG.png", alt: "Tricycle Franchise Tracker", className: "showcase__screen--back-left" },
  { src: "/images/sbBackground.png", alt: "Cuenca Legislative Tracker", className: "showcase__screen--back-right" },
  { src: "/images/BusTracking.png", alt: "BMTC Minibus Tracker", className: "showcase__screen--front" },
];

const content = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};

const titleLine = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const word = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 1, ease } },
};

function SplitWords({ text, className }) {
  return text.split(" ").map((w, i) => (
    <span className="word-mask" key={i}>
      <motion.span className={className ? `word ${className}` : "word"} variants={word}>
        {w}
      </motion.span>
    </span>
  ));
}

export default function Home({ ready, navigateTo }) {
  const [audienceIdx, setAudienceIdx] = useState(0);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 18 });

  useEffect(() => {
    const t = setInterval(() => setAudienceIdx((i) => (i + 1) % audiences.length), 2800);
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
          <motion.span className="hero__badge" variants={item}>
            <span className="hero__badge-dot" aria-hidden="true" />
            <strong>PREtech</strong>
            <span className="hero__badge-sep" aria-hidden="true" />
            Freelance Software Studio
          </motion.span>

          <h1 className="hero__title" aria-label="Software that solves real business problems.">
            <motion.span className="hero__title-line" variants={titleLine} aria-hidden="true">
              <SplitWords text="Software that solves" />
            </motion.span>
            <motion.span className="hero__title-line" variants={titleLine} aria-hidden="true">
              <SplitWords text="real business problems." className="gradient-text" />
            </motion.span>
          </h1>

          <motion.p className="hero__lead" variants={item}>
            Web apps, mobile apps, tracking systems, and AI solutions for
            <span className="hero__rotator">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={audienceIdx}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.6, ease }}
                >
                  {audiences[audienceIdx]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.p>

          <motion.ul className="hero__details" variants={item}>
            {offerings.map((o) => (
              <li key={o.text}>
                <Icon name={o.icon} />
                <span>{o.text}</span>
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

          <motion.p className="hero__founder" variants={item}>
            Founded &amp; built by <strong>Patrick Eva</strong> · BS Computer Science
          </motion.p>
        </motion.div>

        <motion.div
          className="hero__visual"
          onMouseMove={handleTilt}
          onMouseLeave={resetTilt}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 }}
          transition={{ duration: 1.2, ease, delay: 0.35 }}
        >
          <motion.div className="showcase" style={{ rotateX, rotateY }}>
            <div className="showcase__glow" aria-hidden="true" />

            {screens.map((s, i) => (
              <motion.figure
                key={s.src}
                className={`showcase__screen ${s.className}`}
                initial={{ opacity: 0, y: 40 }}
                animate={ready ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, ease, delay: 0.5 + i * 0.15 }}
              >
                <div className="showcase__bar" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
                <img src={s.src} alt={s.alt} />
              </motion.figure>
            ))}

            <motion.div
              className="showcase__card"
              initial={{ opacity: 0, y: 16 }}
              animate={ready ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease, delay: 1.1 }}
            >
              <Brand />
              <small>
                <span className="hero__badge-dot" aria-hidden="true" />
                Available for new projects
              </small>
            </motion.div>
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
