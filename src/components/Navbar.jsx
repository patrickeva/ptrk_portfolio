import { useState, useEffect } from 'react';

export default function Navbar({ activeSection, navigateTo }) {
  const [isDarkMode, setIsDarkMode] = useState(true); // always open in dark mode
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const body = document.body;
    // Disable transitions for the swap so colors apply instantly, then
    // re-enable on the next frame so hover/interaction animations keep working.
    body.classList.add('theme-switching');
    body.classList.toggle('dark-mode', isDarkMode);
    void body.offsetHeight; // force layout with transitions still disabled

    const id = requestAnimationFrame(() => {
      body.classList.remove('theme-switching');
    });
    return () => cancelAnimationFrame(id);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const handleNav = (e, sectionId) => {
    e.preventDefault();
    setMenuOpen(false);
    navigateTo(sectionId);
  };

  const links = [
    { id: 'home',      label: 'Home' },
    { id: 'about',     label: 'About' },
    { id: 'skills',    label: 'Skills' },
    { id: 'services',  label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'contact',   label: 'Socials' },
  ];

  return (
    <header className={`header sticky`}>

      <a
        href="#"
        className="logo"
        onClick={(e) => handleNav(e, 'home')}
      >
        <img
          src="/images/pp.jpg"
          alt="Patrick Eva"
          style={{
            width: '45px',
            height: '45px',
            borderRadius: '50%',
            objectFit: 'cover',
            objectPosition: 'center top',
            border: '2px solid var(--main-color, #00abf0)',
            display: 'block',
          }}
        />
      </a>

      <nav className={`navbar ${menuOpen ? 'active' : ''}`}>
        {links.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            className={activeSection === id ? 'active' : ''}
            onClick={(e) => handleNav(e, id)}
          >
            {label}
          </a>
        ))}
      </nav>

      {/* Dark mode toggle */}
      <div
        className={`bx ${isDarkMode ? 'bx-sun' : 'bx-moon'}`}
        id="darkMode-icon"
        onClick={toggleDarkMode}
        style={{ cursor: 'pointer', fontSize: '2.5rem' }}
      />

      {/* Hamburger menu */}
      <div
        className={`bx ${menuOpen ? 'bx-x' : 'bx-menu'}`}
        id="menu-icon"
        onClick={() => setMenuOpen(!menuOpen)}
      />
    </header>
  );
}