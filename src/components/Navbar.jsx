import { useState, useEffect } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { ease } from './ui';

const links = [
  { id: 'home',      label: 'Home' },
  { id: 'about',     label: 'About' },
  { id: 'skills',    label: 'Skills' },
  { id: 'services',  label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact',   label: 'Socials' },
];

export default function Navbar({ activeSection, navigateTo }) {
  const [isDark, setIsDark] = useState(() => document.body.classList.contains('dark-mode'));
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > prev && y > 240);
  });

  useEffect(() => {
    const body = document.body;
    // Swap the theme with transitions disabled so every surface repaints in one frame.
    body.classList.add('theme-switching');
    body.classList.toggle('dark-mode', isDark);
    try { localStorage.setItem('theme', isDark ? 'dark' : 'light'); } catch { /* private mode */ }
    void body.offsetHeight;
    const id = requestAnimationFrame(() => body.classList.remove('theme-switching'));
    return () => cancelAnimationFrame(id);
  }, [isDark]);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [menuOpen]);

  const handleNav = (e, sectionId) => {
    e.preventDefault();
    setMenuOpen(false);
    navigateTo(sectionId);
  };

  return (
    <motion.header
      className={`nav${scrolled || menuOpen ? ' nav--scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: hidden && !menuOpen ? -110 : 0 }}
      transition={{ duration: 0.45, ease }}
    >
      <div className="nav__inner">
        <a href="#home" className="nav__brand" onClick={(e) => handleNav(e, 'home')}>
          <img src="/images/pp.jpg" alt="" />
          <span>Patrick<b>.</b></span>
        </a>

        <nav className="nav__links" aria-label="Primary">
          {links.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`nav__link${activeSection === id ? ' is-active' : ''}`}
              aria-current={activeSection === id ? 'page' : undefined}
              onClick={(e) => handleNav(e, id)}
            >
              {activeSection === id && (
                <motion.span
                  layoutId="nav-pill"
                  className="nav__pill"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <span className="nav__label">{label}</span>
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <button
            type="button"
            className="icon-btn"
            onClick={() => setIsDark((v) => !v)}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.i
                key={isDark ? 'sun' : 'moon'}
                className={`bx ${isDark ? 'bx-sun' : 'bx-moon'}`}
                initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.25 }}
              />
            </AnimatePresence>
          </button>

          <button
            type="button"
            className="icon-btn nav__toggle"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <i className={`bx ${menuOpen ? 'bx-x' : 'bx-menu'}`} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="nav__mobile"
            aria-label="Mobile"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.3, ease }}
          >
            {links.map(({ id, label }, i) => (
              <motion.a
                key={id}
                href={`#${id}`}
                className={activeSection === id ? 'is-active' : ''}
                onClick={(e) => handleNav(e, id)}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, ease, delay: 0.04 * i }}
              >
                {label}
                <i className="bx bx-right-arrow-alt" />
              </motion.a>
            ))}
            <a
              href="/cv/Eva_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary nav__mobile-cta"
            >
              <i className="bx bx-file" /> View Resume
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
