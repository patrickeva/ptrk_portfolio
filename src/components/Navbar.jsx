import { useState, useEffect } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { ease } from './ui';
import Icon from './Icon';
import Brand from './Brand';

const links = [
  { id: 'home',      label: 'Home' },
  { id: 'about',     label: 'About' },
  { id: 'services',  label: 'Services' },
  { id: 'projects',  label: 'Work' },
  { id: 'skills',    label: 'Skills' },
  { id: 'contact',   label: 'Contact' },
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
        <a href="#home" className="nav__brand" aria-label="PREtech — home" onClick={(e) => handleNav(e, 'home')}>
          <Brand />
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
              <motion.span
                key={isDark ? 'sun' : 'moon'}
                className="nav__theme-icon"
                initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <Icon name={isDark ? 'sun' : 'moon'} />
              </motion.span>
            </AnimatePresence>
          </button>

          <a
            href="#services"
            className="btn btn--primary btn--sm nav__cta"
            onClick={(e) => handleNav(e, 'services')}
          >
            Hire Me
          </a>

          <button
            type="button"
            className="icon-btn nav__toggle"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <Icon name={menuOpen ? 'x' : 'menu'} />
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
                <Icon name="arrow-right" />
              </motion.a>
            ))}
            <a
              href="#services"
              className="btn btn--primary nav__mobile-cta"
              onClick={(e) => handleNav(e, 'services')}
            >
              <Icon name="briefcase" /> Hire Me
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
