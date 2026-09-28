import { useEffect, useRef, useState } from "react";
import {
  motion,
  animate,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

export const ease = [0.22, 1, 0.36, 1];

export function Reveal({ as = "div", delay = 0, y = 28, className, children, ...rest }) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease, delay }}
      {...rest}
    >
      {children}
    </Comp>
  );
}

const titleVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const wordVariants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.9, ease } },
};

export function SectionHeading({ index, eyebrow, title, accent, subtitle, align = "center" }) {
  const words = title.split(" ");
  const all = accent ? [...words, accent] : words;

  return (
    <div className={`section-head section-head--${align}`}>
      <Reveal className="eyebrow" y={12}>
        <span className="eyebrow__index">{index}</span>
        <span className="eyebrow__line" />
        {eyebrow}
      </Reveal>

      <motion.h2
        className="section-title"
        variants={titleVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
      >
        {all.map((word, i) => (
          <span className="word-mask" key={i}>
            <motion.span
              className={accent && i === all.length - 1 ? "word gradient-text" : "word"}
              variants={wordVariants}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </motion.h2>

      {subtitle && (
        <Reveal as="p" className="section-subtitle" delay={0.2}>
          {subtitle}
        </Reveal>
      )}
    </div>
  );
}

export function Spotlight({ as = "div", className = "", children, ...rest }) {
  const ref = useRef(null);
  const Comp = motion[as];

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <Comp ref={ref} onMouseMove={handleMove} className={`card spotlight ${className}`} {...rest}>
      {children}
    </Comp>
  );
}

export function Magnetic({ children, strength = 0.25 }) {
  const ref = useRef(null);
  const x = useSpring(0, { stiffness: 220, damping: 16, mass: 0.4 });
  const y = useSpring(0, { stiffness: 220, damping: 16, mass: 0.4 });

  const handleMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className="magnetic"
      style={{ x, y }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >
      {children}
    </motion.div>
  );
}

export function CountUp({ value, duration = 1.6 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const match = /^(\d+)(.*)$/.exec(String(value));
  const target = match ? Number(match[1]) : null;
  const suffix = match ? match[2] : "";
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView || target === null) return;
    const controls = animate(0, target, {
      duration,
      ease,
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, target, duration]);

  if (target === null) return <span>{value}</span>;

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

export function Marquee({ children, speed = 0.5, reverse = false, repeat = 4, className = "" }) {
  const trackRef = useRef(null);
  const paused = useRef(false);
  const x = useMotionValue(0);
  const reduce = useReducedMotion();

  useAnimationFrame((_, delta) => {
    const el = trackRef.current;
    if (!el || paused.current || reduce) return;
    const period = el.scrollWidth / repeat;
    if (!period) return;
    let next = x.get() + (reverse ? 1 : -1) * speed * (delta / 16.667);
    if (next <= -period) next += period;
    if (next > 0) next -= period;
    x.set(next);
  });

  return (
    <div
      className={`marquee ${className}`}
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
    >
      <motion.div ref={trackRef} className="marquee__track" style={{ x }}>
        {Array.from({ length: repeat }, (_, i) => (
          <div key={i} className="marquee__group" aria-hidden={i > 0 || undefined}>
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
