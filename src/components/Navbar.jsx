import { useState } from 'react';

export default function Navbar({ activeSection, navigateTo }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode');
  };

  const handleNav = (e, sectionId) => {
    e.preventDefault();
    setMenuOpen(false);
    navigateTo(sectionId);
  };

  const links = [
    { id: 'home',      label: 'Home' },
    { id: 'skills',    label: 'Skills' },
    { id: 'services',  label: 'Project' },
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
        PE
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