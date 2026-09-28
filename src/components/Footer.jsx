const socials = [
  { label: 'GitHub',   icon: 'bxl-github',          url: 'https://github.com/patrickeva' },
  { label: 'LinkedIn', icon: 'bxl-linkedin-square', url: 'https://www.linkedin.com/in/patrickeva/' },
  { label: 'Facebook', icon: 'bxl-facebook-square', url: 'https://www.facebook.com/ptrkrmseva' },
];

export default function Footer({ navigateTo }) {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          
          <p>
            © {new Date().getFullYear()} · Made by <strong>Patrick Eva</strong>
          </p>
        </div>

        <div className="footer__socials">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="icon-btn"
              aria-label={s.label}
            >
              <i className={`bx ${s.icon}`} />
            </a>
          ))}
          <button
            type="button"
            className="icon-btn footer__top"
            onClick={() => navigateTo('home')}
            aria-label="Back to top"
          >
            <i className="bx bx-up-arrow-alt" />
          </button>
        </div>
      </div>
    </footer>
  );
}
